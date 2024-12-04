// @ts-ignore
import React from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './assets/css/all.min.css'
import './assets/fonts/fa-regular-400.ttf'

import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import {preloadRemoteFonts} from "@myriaddreamin/typst.ts";

$typst.setCompilerInitOptions({
    beforeBuild: [
        preloadRemoteFonts([
            "/dist/fonts/fa-regular-400.ttf",
            'http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/T1xnudodhcgwXCmZQ490TPesZW2xOQ-xsNqO47m55DA.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/iE8HhaRzdhPxC93dOdA056CWcynf_cDxXwCLxiixG1c.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/daIfzbEw-lbjMyv4rMUUTqCWcynf_cDxXwCLxiixG1c.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/owYYXKukxFDFjr0ZO8NXh6CWcynf_cDxXwCLxiixG1c.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/H1vB34nOKWXqzKotq25pcg.ttf',
            'http://fonts.gstatic.com/s/roboto/v15/b9PWBSMHrT2zM5FgUdtu0aCWcynf_cDxXwCLxiixG1c.ttf',
        ])
    ],
    getModule: () =>
        'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
});

$typst.setRendererInitOptions({
    beforeBuild: [],
    getModule: () =>
        'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
});

window.$typst = $typst

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
