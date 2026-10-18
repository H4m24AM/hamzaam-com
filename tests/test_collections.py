"""Behavior tests use temporary synthetic images, never portfolio content."""
import importlib.util
import json
import re
import tempfile
import unittest
from pathlib import Path
from PIL import Image

MODULE = Path(__file__).resolve().parents[1] / 'scripts/build_collections.py'
spec = importlib.util.spec_from_file_location('collections_builder', MODULE)
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

class CollectionBuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix=".collection-test-", dir=MODULE.parents[1])
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for folder in ('templates', 'css', 'js', 'images', 'photography/real-estate/example'):
            (self.root / folder).mkdir(parents=True)
        (self.root / 'templates/collection.html').write_text(builder.read_text(MODULE.parents[1] / 'templates/collection.html'), encoding='utf-8')
        (self.root / 'index.html').write_text('<footer class="footer"><a href="about.html">About</a><a href="#contact">Contact</a></footer>')
        (self.root / 'photography.html').write_text('<nav class="nav"><a href="photography.html">Photography</a></nav>Black Fathers Matter Real Estate<!-- COLLECTION_FEATURES --><!-- COLLECTION_ARCHIVE -->')
        (self.root / 'photography/real-estate/example/index.html').write_bytes(b'existing gallery preserved')
        self.folder = self.root / 'content/photography/collections/example'
        self.folder.mkdir(parents=True)
        self.data = {'title': 'Example', 'description': 'A test collection.', 'published': True, 'featured': True}
        self.save()
    def save(self):
        (self.folder / 'collection.json').write_text(json.dumps(self.data))
    def photo(self, name, size=(120,80)):
        Image.new('RGB',size,'gray').save(self.folder / name)
    def build(self):
        return builder.build(self.root)
    def test_discovery_order_add_remove_and_optional_metadata(self):
        for name in ('10.jpg','2.jpg','1.jpg'): self.photo(name)
        self.assertEqual([p.name for p in builder.load_collections(self.root)[0]['files']], ['1.jpg','2.jpg','10.jpg'])
        out=self.build(); page=(out/'photography/collections/example/index.html').read_text(encoding="utf-8")
        self.assertEqual(page.count('<figure class="collection-photo">'),3)
        self.assertNotIn('<figcaption>',page)
        self.photo('3.jpg');out=self.build()
        self.assertEqual((out/'photography/collections/example/index.html').read_text(encoding="utf-8").count('<figure class="collection-photo">'),4)
        (self.folder/'2.jpg').unlink();out=self.build()
        self.assertEqual((out/'photography/collections/example/index.html').read_text(encoding="utf-8").count('<figure class="collection-photo">'),3)
        self.data['published']=False;self.save();out=self.build()
        self.assertFalse((out/'photography/collections/example').exists())
        self.assertFalse((out/'images/photography/collections/example').exists())
    def test_mixed_orientation_cover_caption_and_escape(self):
        self.photo('01.jpg',(400,200));self.photo('02.png',(200,400));self.photo('03.webp',(300,300))
        self.data.update(coverImage='02.png', images={'01.jpg':{'title':'A < B','description':'<script>bad</script>'}});self.save()
        out=self.build(); page=(out/'photography/collections/example/index.html').read_text(encoding="utf-8")
        self.assertIn('A &lt; B',page);self.assertNotIn('<script>bad',page)
        self.assertIn('width="200" height="400"',page);self.assertIn('width="300" height="300"',page)
        self.assertIn('/002-200.webp',(out/'photography.html').read_text(encoding="utf-8"))
        self.assertIn('width="400" height="200"',page)
        self.assertEqual(page.count('loading="eager"'),1)
        self.assertFalse((out/'content').exists())
        self.assertEqual((out/'photography/real-estate/example/index.html').read_bytes(),b'existing gallery preserved')
    def test_draft_without_images_preview_only(self):
        self.data['published']=False;self.save();out=self.build()
        self.assertFalse((out/'photography/collections/example').exists())
        preview=builder.build(self.root,preview=True)
        page=(preview/'photography/collections/example/index.html').read_text(encoding="utf-8")
        self.assertIn('noindex,nofollow',page);self.assertNotIn('<img ',page)
        self.assertNotIn('/collections/example/',(preview/'photography.html').read_text(encoding="utf-8"))
    def test_invalid_publication_fails_before_output(self):
        with self.assertRaises(ValueError):self.build()
        self.photo('1.jpg');self.data['coverImage']='missing.jpg';self.save()
        with self.assertRaises(ValueError):self.build()
    def test_previous_next_and_published_index(self):
        self.photo('1.jpg')
        other=self.folder.parent/'second';other.mkdir()
        (other/'collection.json').write_text(json.dumps({'title':'Second','description':'Next','published':True}))
        Image.new('RGB',(20,20)).save(other/'1.jpg')
        out=self.build();first=(out/'photography/collections/example/index.html').read_text(encoding="utf-8")
        self.assertIn('href="/index.html#contact"',first)
        self.assertIn('Next collection',first);self.assertNotIn('Previous collection',first)
        self.assertIn('Previous collection',(out/'photography/collections/second/index.html').read_text(encoding="utf-8"))
        self.assertIn('Second',(out/'photography/collections/index.html').read_text(encoding="utf-8"))
    def test_optimized_output_no_upscale_and_metadata_stripped(self):
        im=Image.new('RGB',(2400,1200));exif=Image.Exif();exif[270]='private source description'
        im.save(self.folder/'1.jpg',exif=exif)
        out=self.build()
        variants=list((out/'images/photography/collections/example').glob('*.webp'))
        self.assertEqual(len(variants),3)
        widths=[]
        for p in variants:
            with Image.open(p) as image:
                widths.append(image.width)
                self.assertFalse(image.getexif())
                self.assertEqual(image.width,image.height*2)
        self.assertEqual(sorted(widths),[640,1280,1920])

    def test_exif_orientation(self):
        im=Image.new('RGB',(120,80));exif=Image.Exif();exif[274]=6;im.save(self.folder/'1.jpg',exif=exif)
        out=self.build();page=(out/'photography/collections/example/index.html').read_text(encoding="utf-8")
        self.assertIn('width="80" height="120"',page)

if __name__=='__main__':unittest.main()
