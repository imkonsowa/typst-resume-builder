// @ts-ignore
import React from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './assets/css/all.min.css'
import './assets/fonts/fa-regular-400.ttf'

import {$typst} from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import {preloadRemoteFonts,} from "@myriaddreamin/typst.ts";

$typst.setCompilerInitOptions({
    beforeBuild: [
        preloadRemoteFonts([
            "/dist/fonts/fa-regular-400.ttf",
            'http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf',
        ])
    ],
    getModule: () =>
        '/dist/wasm/compiler.wasm',
});

$typst.setRendererInitOptions({
    getModule: () =>
        '/dist/wasm/renderer.wasm',
});

// @ts-ignore
window.$typst = $typst

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
