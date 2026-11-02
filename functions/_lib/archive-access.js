//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/buffer_utils.js
var e = new TextEncoder(), t = new TextDecoder(), n = new TextDecoder("utf-8", { fatal: !0 });
function r(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
var i = /[^\x00-\x7f]/;
function a(t) {
	if (typeof t == "string" && t.length >= 128) {
		if (i.test(t)) throw TypeError("non-ASCII string encountered in encode()");
		return e.encode(t);
	}
	let n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) {
		let r = t.charCodeAt(e);
		if (r > 127) throw TypeError("non-ASCII string encountered in encode()");
		n[e] = r;
	}
	return n;
}
function o(e, t = !1) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e, { alphabet: t ? "base64url" : "base64" });
	if (t) {
		if (e.includes("+") || e.includes("/")) throw TypeError("Invalid base64url");
		e = e.replace(/-/g, "+").replace(/_/g, "/");
	}
	let n = atob(e), r = new Uint8Array(n.length);
	for (let e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
	return r;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/util/errors.js
var s = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(e, t) {
		super(e, t), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
}, c = class extends s {
	static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	claim;
	reason;
	payload;
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.claim = n, this.reason = r, this.payload = t;
	}
}, l = class extends s {
	static code = "ERR_JWT_EXPIRED";
	code = "ERR_JWT_EXPIRED";
	claim;
	reason;
	payload;
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.claim = n, this.reason = r, this.payload = t;
	}
}, u = class extends s {
	static code = "ERR_JOSE_ALG_NOT_ALLOWED";
	code = "ERR_JOSE_ALG_NOT_ALLOWED";
}, d = class extends s {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
}, f = class extends s {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
}, p = class extends s {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
}, m = class extends s {
	static code = "ERR_JWKS_INVALID";
	code = "ERR_JWKS_INVALID";
}, h = class extends s {
	static code = "ERR_JWKS_NO_MATCHING_KEY";
	code = "ERR_JWKS_NO_MATCHING_KEY";
	constructor(e = "no applicable key found in the JSON Web Key Set", t) {
		super(e, t);
	}
}, g = class extends s {
	[Symbol.asyncIterator] = async function* () {};
	static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
		super(e, t);
	}
}, _ = class extends s {
	static code = "ERR_JWKS_TIMEOUT";
	code = "ERR_JWKS_TIMEOUT";
	constructor(e = "request timed out", t) {
		super(e, t);
	}
}, v = class extends s {
	static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	constructor(e = "signature verification failed", t) {
		super(e, t);
	}
}, y = "The input to be decoded is not correctly encoded.";
function b(e) {
	try {
		return o(typeof e == "string" ? e : t.decode(e), !0);
	} catch (e) {
		throw TypeError(y, { cause: e });
	}
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/validate.js
function x(e) {
	if (typeof e != "object" || !e || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || Object.getPrototypeOf(t) === null;
}
function S(e) {
	return x(e) && Array.isArray(e.keys) && Array.from(e.keys).every(x);
}
function ee(...e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (n) for (let e of Object.keys(n)) {
		if (t.has(e)) return !1;
		t.add(e);
	}
	return !0;
}
function C(e, t, n) {
	try {
		return b(e);
	} catch (e) {
		throw new n(`Failed to base64url decode the ${t}`, { cause: e });
	}
}
function te(e, t, n) {
	try {
		return a(e);
	} catch (e) {
		throw new n(`The ${t} is not a valid base64url string`, { cause: e });
	}
}
function w(e, t, r) {
	let i;
	try {
		i = JSON.parse(n.decode(b(e)));
	} catch (e) {
		throw new t(r, { cause: e });
	}
	if (!x(i)) throw new t(r);
	return i;
}
var ne = {
	__proto__: null,
	b64: !0
};
function T(e, t) {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != "string"))) throw TypeError(`"${e}" option must be an array of strings`);
	return t === void 0 ? void 0 : new Set(t);
}
function re(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!r || r.crit === void 0) return [];
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != "string" || e.length === 0)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let a = n === void 0 ? t : {
		__proto__: null,
		...n,
		...t
	};
	for (let t of r.crit) {
		if (!(t in a)) throw new d(`Extension Header Parameter "${t}" is not recognized`);
		if (!Object.hasOwn(i, t) || i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a[t] && (!Object.hasOwn(r, t) || r[t] === void 0)) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return r.crit;
}
function ie(e, t) {
	if (t.includes("b64")) {
		let t = e.b64;
		if (typeof t != "boolean") throw new f("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		return t;
	}
	return !0;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/key.js
var E = (e) => e[Symbol.toStringTag], ae = (e, t, n) => {
	let { alg: r } = e;
	if (t.use !== void 0) {
		let e = n === "sign" || n === "verify" ? "sig" : "enc";
		if (t.use !== e) throw TypeError(`Invalid key for this operation, its "use" must be "${e}" when present`);
	}
	if (t.alg !== void 0 && t.alg !== r) throw TypeError(`Invalid key for this operation, its "alg" must be "${r}" when present`);
	if (Array.isArray(t.key_ops)) {
		let r = n === "encrypt" || n === "decrypt" ? e.ops?.[n === "encrypt" ? 0 : 1] : n;
		if (r && !t.key_ops.includes(r)) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${r}" when present`);
	}
};
async function oe(e, t, n) {
	let { alg: r, secret: i } = e, a = n === "decrypt" || n === "sign";
	if (i && t instanceof Uint8Array) return t;
	let o, s;
	if (x(t)) {
		if (o = me(t), typeof o.kty != "string") throw k(r, t, i);
		if (!(i ? o.kty === "oct" && typeof o.k == "string" : o.kty !== "oct" && (a ? o.kty === "AKP" && typeof o.priv == "string" || typeof o.d == "string" : o.d === void 0 && o.priv === void 0))) throw TypeError(i ? "JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present" : `JSON Web Key for this operation must be a ${a ? "private" : "public"} JWK`);
		if (ae(e, o, n), o.kty === "oct") return b(o.k);
		if (!Object.isFrozen(t)) {
			let { key_ops: e } = t;
			Array.isArray(e) && Object.freeze(e), Object.freeze(t);
		}
	} else {
		if (!le(t)) throw k(r, t, i);
		let e = i ? "secret" : a ? "private" : "public";
		if (t.type !== e && (i || [
			"secret",
			"public",
			"private"
		].includes(t.type))) throw TypeError(`${E(t)} instances must be of type "${e}" for the ${r} algorithm`);
		if (O(t)) return t;
		if (s = t, s.type === "secret") return s.export();
	}
	D ||= /* @__PURE__ */ new WeakMap();
	let c = t, l = D.get(c);
	if (l?.[r]) return l[r];
	if (l || D.set(c, l = {}), s && typeof s.toCryptoKey == "function") {
		let t = s.type === "public", n = se[s.asymmetricKeyDetails?.namedCurve], i = e.resolve?.({
			crv: n,
			asymmetricKeyType: s.asymmetricKeyType
		}) ?? e.subtle;
		return l[r] = s.toCryptoKey(i, t, e.usages[+!t]);
	}
	return o ??= s.export({ format: "jwk" }), o.alg = r, l[r] = await M(e, o);
}
var D, se = {
	__proto__: null,
	prime256v1: "P-256",
	secp384r1: "P-384",
	secp521r1: "P-521"
}, O = (e) => {
	if (e?.[Symbol.toStringTag] === "CryptoKey") return !0;
	try {
		return e instanceof CryptoKey;
	} catch {
		return !1;
	}
}, ce = (e) => e?.[Symbol.toStringTag] === "KeyObject", le = (e) => O(e) || ce(e);
function ue(e, t, ...n) {
	if (n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(", ")}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
function k(e, t, n) {
	let r = [
		"CryptoKey",
		"KeyObject",
		"JSON Web Key"
	];
	return n && r.push("Uint8Array"), TypeError(ue(`Key for the ${e} algorithm must be `, t, ...r));
}
var A = (e, t = "algorithm.name") => /* @__PURE__ */ TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
function de(e, t) {
	if (t && !e.usages.includes(t)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t}.`);
}
function fe(e, t) {
	let { modulusLength: n } = t.algorithm;
	if (typeof n != "number" || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
}
function pe(e, t, n) {
	let r = e.algorithm;
	if (r.name !== t.name) throw A(t.name);
	if (t.hash && r.hash?.name !== t.hash) throw A(t.hash, "algorithm.hash");
	if (t.namedCurve && r.namedCurve !== t.namedCurve) throw A(t.namedCurve, "algorithm.namedCurve");
	if (t.length !== void 0 && r.length !== t.length) throw A(t.length, "algorithm.length");
	de(e, n);
}
function j(e) {
	return {
		__proto__: null,
		...e
	};
}
function me(e) {
	let t = j(e);
	if (t.ext !== void 0 && typeof t.ext != "boolean") throw TypeError("\"ext\" (Extractable) Parameter must be a boolean");
	if (t.key_ops !== void 0) {
		let e = t.key_ops, n = Array.isArray(e) ? [...e] : void 0;
		if (!n || n.some((e) => typeof e != "string") || new Set(n).size !== n.length) throw TypeError("\"key_ops\" (Key Operations) Parameter must be an array of unique strings");
		t.key_ops = n;
	}
	return t;
}
async function M(e, t, n) {
	if (!e.kty.includes(t.kty)) throw new d("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	let r = e.resolve?.({
		kty: t.kty,
		crv: t.crv
	}) ?? e.subtle, i = !!(t.d || t.priv), a = {
		...t,
		ext: n ?? t.ext
	};
	return a.kty !== "AKP" && delete a.alg, delete a.use, crypto.subtle.importKey("jwk", a, r, a.ext ?? !i, t.key_ops ?? e.usages[+!!i]);
}
async function he(e, t, n, r = !1) {
	return e instanceof Uint8Array && (e = await crypto.subtle.importKey("raw", e, t, r, [n])), pe(e, t, n), e;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/key_descriptor.js
function ge(e) {
	let t = { __proto__: null };
	for (let n in e) t[n] = {
		...e[n],
		alg: n
	};
	return t;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/jws_algorithms.js
var N = [["verify"], ["sign"]];
function P(e) {
	let t = {
		name: "HMAC",
		hash: `SHA-${e}`
	};
	return {
		kty: ["oct"],
		secret: !0,
		subtle: t,
		signing: t,
		usages: N
	};
}
function F(e, t) {
	let n = {
		name: t ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
		hash: `SHA-${e}`
	};
	return {
		kty: ["RSA"],
		subtle: n,
		signing: t ? {
			...n,
			saltLength: t
		} : n,
		usages: N,
		minRsaBits: 2048
	};
}
function I(e, t) {
	return {
		kty: ["EC"],
		crv: e,
		subtle: {
			name: "ECDSA",
			namedCurve: e
		},
		signing: {
			name: "ECDSA",
			hash: `SHA-${t}`
		},
		usages: N
	};
}
function L() {
	let e = { name: "Ed25519" };
	return {
		kty: ["OKP"],
		crv: "Ed25519",
		subtle: e,
		signing: e,
		usages: N
	};
}
function R(e) {
	let t = { name: `ML-DSA-${e}` };
	return {
		kty: ["AKP"],
		subtle: t,
		signing: t,
		usages: N
	};
}
var z = ge({
	HS256: P(256),
	HS384: P(384),
	HS512: P(512),
	RS256: F(256),
	RS384: F(384),
	RS512: F(512),
	PS256: F(256, 32),
	PS384: F(384, 48),
	PS512: F(512, 64),
	ES256: I("P-256", 256),
	ES384: I("P-384", 384),
	ES512: I("P-521", 512),
	EdDSA: L(),
	Ed25519: L(),
	"ML-DSA-44": R(44),
	"ML-DSA-65": R(65),
	"ML-DSA-87": R(87)
});
function _e(e) {
	let t = typeof e == "string" ? z[e] : void 0;
	if (!t) throw new d(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	return t;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/jws_verify.js
function ve(e) {
	return [e && T("algorithms", e.algorithms), e?.crit];
}
function ye(e) {
	return e === void 0 ? {} : w(e, f, "JWS Protected Header is invalid");
}
function be(e) {
	try {
		return a(e);
	} catch (e) {
		throw new f("JWS Compact Serialization payload must use only ASCII characters", { cause: e });
	}
}
async function xe(e, t, n, i, o) {
	let { protected: s, header: c, payload: l } = e, d = o ?? ye(s);
	if (!ee(d, c)) throw new f("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	let p = {
		...d,
		...c
	}, m = ie(d, re(f, ne, t[1], d, p)), { alg: h } = p;
	if (typeof h != "string" || !h) throw new f("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	if (t[0] && !t[0].has(h)) throw new u("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (m) {
		if (typeof l != "string") throw new f("JWS Payload must be a string");
	} else if (typeof l != "string" && !(l instanceof Uint8Array)) throw new f("JWS Payload must be a string or an Uint8Array instance");
	let g = m || typeof l != "string" ? l : i(l), _ = !1;
	typeof n == "function" && (n = await n(d, e), _ = !0);
	let y = _e(h), b = r(s === void 0 ? new Uint8Array() : a(s), a("."), typeof g == "string" ? t[2] ??= te(g, "payload", f) : g), x = C(e.signature, "signature", f), S = await oe(y, n, "verify"), w = await he(S, y.subtle, "verify");
	y.minRsaBits && fe(y.alg, w);
	let T = !1;
	try {
		T = await crypto.subtle.verify(y.signing, w, x, b);
	} catch (e) {
		throw new v(void 0, { cause: e });
	}
	if (!T) throw new v();
	let E = { payload: typeof g == "string" ? C(g, "payload", f) : g };
	return s !== void 0 && (E.protectedHeader = d), c !== void 0 && (E.unprotectedHeader = c), _ ? [{
		...E,
		key: S
	}, m] : [E, m];
}
async function B(e, n, r) {
	if (e instanceof Uint8Array && (e = t.decode(e)), typeof e != "string") throw new f("Compact JWS must be a string or Uint8Array");
	let { 0: i, 1: a, 2: o, length: s } = e.split(".");
	if (s !== 3) throw new f("Invalid Compact JWS");
	return xe({
		payload: a,
		protected: i,
		signature: o
	}, n, r, be);
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var Se = (e) => Math.floor(e.getTime() / 1e3), Ce = {
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
	w: 604800,
	y: 31557600
}, we = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, V = "check_failed";
function H() {
	throw TypeError("Invalid time period format");
}
function U(e) {
	typeof e != "string" && H();
	let t = we.exec(e);
	(!t || t[4] && t[1]) && H();
	let n = parseFloat(t[2]), r = Math.round(n * Ce[t[3][0].toLowerCase()]);
	return Number.isFinite(r) || H(), t[1] === "-" || t[4] === "ago" ? -r : r;
}
function W(e, t) {
	if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
	return t;
}
var G = (e) => {
	let t = e.toLowerCase();
	return e.includes("/") ? t : `application/${t}`;
}, Te = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some((t) => e.includes(t)) : !1;
function K(e, t, n = !1) {
	let r = e[t];
	if (!(r === void 0 && !n)) {
		if (typeof r != "number") throw new c(`"${t}" claim must be a number`, e, t, "invalid");
		return r;
	}
}
function q(e, t) {
	throw new c(`unexpected "${t}" claim value`, e, t, V);
}
function Ee(e, t, r = {}) {
	let i;
	try {
		i = JSON.parse(n.decode(t));
	} catch (e) {
		throw new p("JWT Claims Set must be a top-level JSON object", { cause: e });
	}
	if (!x(i)) throw new p("JWT Claims Set must be a top-level JSON object");
	let { typ: a } = r;
	if (a !== void 0 && (typeof e.typ != "string" || G(e.typ) !== G(a))) throw new c("unexpected \"typ\" JWT header value", i, "typ", V);
	let { requiredClaims: o = [], issuer: s, subject: u, audience: d, maxTokenAge: f } = r, m = [...o];
	f !== void 0 && m.push("iat"), d !== void 0 && m.push("aud"), u !== void 0 && m.push("sub"), s !== void 0 && m.push("iss");
	for (let e of new Set(m.reverse())) if (!Object.hasOwn(i, e)) throw new c(`missing required "${e}" claim`, i, e, "missing");
	s !== void 0 && !(Array.isArray(s) ? s : [s]).includes(i.iss) && q(i, "iss"), u !== void 0 && i.sub !== u && q(i, "sub"), d !== void 0 && !Te(i.aud, typeof d == "string" ? [d] : d) && q(i, "aud");
	let { clockTolerance: h } = r, g = 0;
	if (typeof h == "string") g = U(h);
	else if (h !== void 0) {
		if (typeof h != "number") throw TypeError("Invalid clockTolerance option type");
		g = h;
	}
	W("clockTolerance option", g);
	let { currentDate: _ } = r, v = W("currentDate option", Se(_ === void 0 ? /* @__PURE__ */ new Date() : _)), y = K(i, "iat", f !== void 0), b = K(i, "nbf");
	if (b !== void 0 && b > v + g) throw new c("\"nbf\" claim timestamp check failed", i, "nbf", V);
	let S = K(i, "exp");
	if (S !== void 0 && S <= v - g) throw new l("\"exp\" claim timestamp check failed", i, "exp", V);
	if (f !== void 0) {
		let e = v - y, t = W("maxTokenAge option", typeof f == "number" ? f : U(f));
		if (e - g > t) throw new l("\"iat\" claim timestamp check failed (too far in the past)", i, "iat", V);
		if (e < -g) throw new c("\"iat\" claim timestamp check failed (it should be in the past)", i, "iat", V);
	}
	return i;
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/jwt/verify.js
async function De(e, t, n) {
	let [r, i] = await B(e, ve(n), t);
	if (!i) throw new p("JWTs MUST NOT use unencoded payload");
	let a = Ee(r.protectedHeader, r.payload, n);
	return {
		...r,
		payload: a
	};
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/jwks/local.js
function Oe(e, t, n, r) {
	let { kty: i, key_ops: a, ext: o, kid: s, alg: c, use: l, crv: u } = e;
	return (o === void 0 || typeof o == "boolean") && (a === void 0 || Array.isArray(a) && a.every((e, t) => typeof e == "string" && a.indexOf(e) === t) && a.includes("verify")) && t.kty.includes(i) && (r === void 0 || typeof r == "string" && r === s) && (c === void 0 ? i !== "AKP" : n === c) && (l === void 0 || l === "sig") && (!t.crv || u === t.crv);
}
async function J(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t), { alg: i } = n;
	if (r[i] === void 0) {
		let e = M(n, t, !0).then((e) => {
			if (e.type !== "public") throw new m("JSON Web Key Set members must be public keys");
			return r[i] = e, e;
		}).catch((t) => {
			throw r[i] === e && delete r[i], t;
		});
		r[i] = e;
	}
	return r[i];
}
function Y(e) {
	let t;
	try {
		t = structuredClone(e);
	} catch (e) {
		throw new m("JSON Web Key Set malformed", { cause: e });
	}
	if (!S(t)) throw new m("JSON Web Key Set malformed");
	let n = t.keys.map((e) => {
		let t = j(e);
		return Array.isArray(t.key_ops) && (t.key_ops = [...t.key_ops]), t;
	}), r = /* @__PURE__ */ new WeakMap();
	return Object.defineProperty(async (e, i) => {
		let { alg: a, kid: o } = {
			...e,
			...i?.header
		}, s = typeof a == "string" ? z[a] : void 0;
		if (!s || s.secret) throw new d("Unsupported \"alg\" value for a JSON Web Key Set");
		let c = t.keys.filter((e, t) => Oe(n[t], s, a, o)), { 0: l, length: u } = c;
		if (!u) throw new h();
		if (u !== 1) {
			let e = new g();
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of c) try {
					yield await J(r, e, s);
				} catch {}
			}, e;
		}
		return J(r, l, s);
	}, "jwks", { value: () => structuredClone(t) });
}
//#endregion
//#region tools/bk-archive/node_modules/.pnpm/jose@6.2.14/node_modules/jose/dist/webapi/jwks/remote.js
function ke() {
	return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var X;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (X = "jose/v6.2.14");
var Ae = /* @__PURE__ */ Symbol();
async function je(e, t, n, r = fetch) {
	let i = await r(e, {
		method: "GET",
		signal: n,
		redirect: "manual",
		headers: t
	}).catch((e) => {
		throw e.name === "TimeoutError" ? new _(void 0, { cause: e }) : e;
	});
	if (i.status !== 200) throw new s("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await i.json();
	} catch (e) {
		throw new s("Failed to parse the JSON Web Key Set HTTP response as JSON", { cause: e });
	}
}
var Me = /* @__PURE__ */ Symbol();
function Z(e, t) {
	return Number.isFinite(e) && Date.now() < e + t;
}
function Q(e, t, n) {
	if (Number.isNaN(e)) throw TypeError(`"${n}" option must not be NaN`);
	return typeof e == "number" ? e : t;
}
function Ne(e, t) {
	if (!(e instanceof URL)) throw TypeError("url must be an instance of URL");
	let n = new URL(e.href).href, r = t ?? {}, i = r.timeoutDuration;
	if (typeof i == "number" && (!Number.isInteger(i) || i < 0)) throw TypeError("\"timeoutDuration\" option must be a non-negative integer");
	let a = typeof i == "number" ? i : 5e3, o = Q(r.cooldownDuration, 3e4, "cooldownDuration"), s = Q(r.cacheMaxAge, 6e5, "cacheMaxAge"), c = new Headers(r.headers);
	X && !c.has("User-Agent") && c.set("User-Agent", X), c.has("accept") || c.set("accept", "application/json, application/jwk-set+json");
	let l = r[Ae], u = r[Me], d, f, p = 0, m = 0, g;
	if (u && typeof u == "object") {
		let { uat: e, jwks: t } = u;
		Z(e, s) && S(t) && (d = e, g = Y(t));
	}
	let _ = async () => {
		if (f && ke() && (f = void 0), !f) {
			let e = ++p, t = f = je(n, c, AbortSignal.timeout(a), l).then((t) => {
				let n = Y(t);
				if (e <= m) return;
				g = n;
				let r = Date.now();
				u && (u.uat = r, u.jwks = t), d = r, m = e;
			}).finally(() => {
				f === t && (f = void 0);
			});
		}
		await f;
	};
	return Object.defineProperties(async (e, t) => {
		(!g || !Z(d, s)) && await _();
		try {
			return await g(e, t);
		} catch (n) {
			if (n instanceof h && !Z(d, o)) return await _(), g(e, t);
			throw n;
		}
	}, {
		coolingDown: {
			get: () => Z(d, o),
			enumerable: !0
		},
		fresh: {
			get: () => Z(d, s),
			enumerable: !0
		},
		reload: {
			value: _,
			enumerable: !0
		},
		reloading: {
			get: () => !!f,
			enumerable: !0
		},
		jwks: {
			value: () => g?.jwks(),
			enumerable: !0
		}
	});
}
//#endregion
//#region tools/bk-archive/src/access.js
var $ = /* @__PURE__ */ new Map();
async function Pe(e, t, n = De) {
	let r = String(t.BK_ARCHIVE_ACCESS_TEAM_DOMAIN || "").trim(), i = String(t.BK_ARCHIVE_ACCESS_AUD || "").trim(), a = String(t.BK_ARCHIVE_OWNER_EMAIL || "").trim().toLowerCase();
	if (!/^[a-z0-9-]+\.cloudflareaccess\.com$/i.test(r) || !i || !a) return {
		status: 503,
		error: "The private archive is awaiting its Cloudflare access setup."
	};
	let o = e.headers.get("Cf-Access-Jwt-Assertion");
	if (!o) return {
		status: 401,
		error: "Sign in through the protected Hamza.AM archive to continue."
	};
	let s = "https://" + r;
	try {
		$.has(s) || $.set(s, Ne(new URL(s + "/cdn-cgi/access/certs")));
		let { payload: e } = await n(o, $.get(s), {
			issuer: s,
			audience: i,
			algorithms: ["RS256"],
			requiredClaims: [
				"exp",
				"iat",
				"email",
				"sub"
			]
		});
		return typeof e.email != "string" || e.email.toLowerCase() !== a ? {
			status: 403,
			error: "This archive is private to its owner."
		} : {
			status: 200,
			email: e.email
		};
	} catch {
		return {
			status: 403,
			error: "Your archive sign-in could not be verified. Please sign in again."
		};
	}
}
//#endregion
export { Pe as authenticateArchive };
