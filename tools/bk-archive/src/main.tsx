import React from 'react';
import {createRoot} from 'react-dom/client';
import Explorer from './explorer';
import './globals.css';
createRoot(document.getElementById('archive-root')!).render(<Explorer/>);
