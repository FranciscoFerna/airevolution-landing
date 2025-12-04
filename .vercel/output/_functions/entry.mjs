import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D1a0igq1.mjs';
import { manifest } from './manifest_XFB0afmZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/delete-user.astro.mjs');
const _page2 = () => import('./pages/api/leads.astro.mjs');
const _page3 = () => import('./pages/aviso-legal.astro.mjs');
const _page4 = () => import('./pages/cookies.astro.mjs');
const _page5 = () => import('./pages/privacidad.astro.mjs');
const _page6 = () => import('./pages/terminos.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/delete-user.ts", _page1],
    ["src/pages/api/leads.ts", _page2],
    ["src/pages/aviso-legal.astro", _page3],
    ["src/pages/cookies.astro", _page4],
    ["src/pages/privacidad.astro", _page5],
    ["src/pages/terminos.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d3c1fd8f-8d92-494e-bb81-5bf351ee92ea",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
