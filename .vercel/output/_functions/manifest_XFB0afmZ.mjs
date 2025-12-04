import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_COIheRYN.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CXgUZ0Br.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///vercel/sandbox/primary/","cacheDir":"file:///vercel/sandbox/primary/node_modules/.astro/","outDir":"file:///vercel/sandbox/primary/dist/","srcDir":"file:///vercel/sandbox/primary/src/","publicDir":"file:///vercel/sandbox/primary/public/","buildClientDir":"file:///vercel/sandbox/primary/dist/client/","buildServerDir":"file:///vercel/sandbox/primary/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"terminos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terminos","isIndex":false,"type":"page","pattern":"^\\/terminos\\/?$","segments":[[{"content":"terminos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terminos.astro","pathname":"/terminos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/delete-user","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/delete-user\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"delete-user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/delete-user.ts","pathname":"/api/delete-user","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/leads","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/leads\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"leads","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/leads.ts","pathname":"/api/leads","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.BQdIVU6Y.css"}],"routeData":{"route":"/aviso-legal","isIndex":false,"type":"page","pattern":"^\\/aviso-legal\\/?$","segments":[[{"content":"aviso-legal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-legal.astro","pathname":"/aviso-legal","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.BQdIVU6Y.css"}],"routeData":{"route":"/cookies","isIndex":false,"type":"page","pattern":"^\\/cookies\\/?$","segments":[[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookies.astro","pathname":"/cookies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.BQdIVU6Y.css"}],"routeData":{"route":"/privacidad","isIndex":false,"type":"page","pattern":"^\\/privacidad\\/?$","segments":[[{"content":"privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacidad.astro","pathname":"/privacidad","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-legal.BQdIVU6Y.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://airevolution.es","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/vercel/sandbox/primary/src/pages/aviso-legal.astro",{"propagation":"none","containsHead":true}],["/vercel/sandbox/primary/src/pages/cookies.astro",{"propagation":"none","containsHead":true}],["/vercel/sandbox/primary/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/vercel/sandbox/primary/src/pages/privacidad.astro",{"propagation":"none","containsHead":true}],["/vercel/sandbox/primary/src/pages/terminos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/delete-user@_@ts":"pages/api/delete-user.astro.mjs","\u0000@astro-page:src/pages/api/leads@_@ts":"pages/api/leads.astro.mjs","\u0000@astro-page:src/pages/aviso-legal@_@astro":"pages/aviso-legal.astro.mjs","\u0000@astro-page:src/pages/cookies@_@astro":"pages/cookies.astro.mjs","\u0000@astro-page:src/pages/privacidad@_@astro":"pages/privacidad.astro.mjs","\u0000@astro-page:src/pages/terminos@_@astro":"pages/terminos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_XFB0afmZ.mjs","/vercel/sandbox/primary/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CEuTxs6X.mjs","/vercel/sandbox/primary/src/components/Header":"_astro/Header.BHuL10MB.js","/vercel/sandbox/primary/src/components/Footer":"_astro/Footer.CTvjxkpV.js","/vercel/sandbox/primary/src/components/Hero":"_astro/Hero.xrucWddw.js","/vercel/sandbox/primary/src/components/Features":"_astro/Features.bIsH1o9i.js","/vercel/sandbox/primary/src/components/HowItWorks":"_astro/HowItWorks.D702FwAG.js","/vercel/sandbox/primary/src/components/Testimonials":"_astro/Testimonials.CBeqsE8s.js","/vercel/sandbox/primary/src/components/CTA":"_astro/CTA.3hQf-2DZ.js","/vercel/sandbox/primary/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C06vs49o.js","@astrojs/react/client.js":"_astro/client.BLUn-lwI.js","/vercel/sandbox/primary/src/components/CookieBanner":"_astro/CookieBanner.ZUhLxcbJ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/vercel/sandbox/primary/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var f=\"@vercel/analytics\",l=\"1.6.1\",w=()=>{window.va||(window.va=function(...r){(window.vaq=window.vaq||[]).push(r)})};function d(){return typeof window<\"u\"}function u(){try{const e=\"production\"}catch{}return\"production\"}function v(e=\"auto\"){if(e===\"auto\"){window.vam=u();return}window.vam=e}function m(){return(d()?window.vam:u())||\"production\"}function c(){return m()===\"development\"}function b(e,r){if(!e||!r)return e;let n=e;try{const t=Object.entries(r);for(const[a,i]of t)if(!Array.isArray(i)){const o=s(i);o.test(n)&&(n=n.replace(o,`/[${a}]`))}for(const[a,i]of t)if(Array.isArray(i)){const o=s(i.join(\"/\"));o.test(n)&&(n=n.replace(o,`/[...${a}]`))}return n}catch{return e}}function s(e){return new RegExp(`/${h(e)}(?=[/?#]|$)`)}function h(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}function y(e){return e.scriptSrc?e.scriptSrc:c()?\"https://va.vercel-scripts.com/v1/script.debug.js\":e.basePath?`${e.basePath}/insights/script.js`:\"/_vercel/insights/script.js\"}function g(e={debug:!0}){var r;if(!d())return;v(e.mode),w(),e.beforeSend&&((r=window.va)==null||r.call(window,\"beforeSend\",e.beforeSend));const n=y(e);if(document.head.querySelector(`script[src*=\"${n}\"]`))return;const t=document.createElement(\"script\");t.src=n,t.defer=!0,t.dataset.sdkn=f+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.disableAutoTrack&&(t.dataset.disableAutoTrack=\"1\"),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(t.dataset.dsn=e.dsn),t.onerror=()=>{const a=c()?\"Please check if any ad blockers are enabled and try again.\":\"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.\";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${a}`)},c()&&e.debug===!1&&(t.dataset.debug=\"false\"),document.head.appendChild(t)}function p({route:e,path:r}){var n;(n=window.va)==null||n.call(window,\"pageview\",{route:e,path:r})}function k(){try{return}catch{}}customElements.define(\"vercel-analytics\",class extends HTMLElement{constructor(){super();try{const r=JSON.parse(this.dataset.props??\"{}\"),n=JSON.parse(this.dataset.params??\"{}\");g({...r,disableAutoTrack:!0,framework:\"astro\",basePath:k(),beforeSend:window.webAnalyticsBeforeSend});const t=this.dataset.pathname;p({route:b(t??\"\",n),path:t})}catch(r){throw new Error(`Failed to parse WebAnalytics properties: ${r}`)}}});"]],"assets":["/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-cyrillic-ext-500-normal.B0yAr1jD.woff2","/_astro/inter-greek-ext-500-normal.C4iEst2y.woff2","/_astro/inter-cyrillic-500-normal.BasfLYem.woff2","/_astro/inter-greek-500-normal.BIZE56-Y.woff2","/_astro/inter-vietnamese-500-normal.DOriooB6.woff2","/_astro/inter-latin-ext-500-normal.CV4jyFjo.woff2","/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-cyrillic-600-normal.CWCymEST.woff2","/_astro/inter-cyrillic-ext-600-normal.Dfes3d0z.woff2","/_astro/inter-greek-ext-600-normal.DRtmH8MT.woff2","/_astro/inter-greek-600-normal.plRanbMR.woff2","/_astro/inter-vietnamese-600-normal.Cc8MFFhd.woff2","/_astro/inter-latin-ext-600-normal.D2bJ5OIk.woff2","/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_astro/inter-cyrillic-ext-700-normal.BjwYoWNd.woff2","/_astro/inter-greek-ext-700-normal.qfdV9bQt.woff2","/_astro/inter-cyrillic-700-normal.CjBOestx.woff2","/_astro/inter-greek-700-normal.C3JjAnD8.woff2","/_astro/inter-vietnamese-700-normal.DlLaEgI2.woff2","/_astro/inter-latin-ext-700-normal.Ca8adRJv.woff2","/_astro/inter-latin-700-normal.Yt3aPRUw.woff2","/_astro/inter-cyrillic-ext-800-normal.BZOjs1Xv.woff2","/_astro/inter-cyrillic-800-normal.C7MGvYyJ.woff2","/_astro/inter-greek-ext-800-normal.B--PVpEC.woff2","/_astro/inter-greek-800-normal.CLIouy3y.woff2","/_astro/inter-vietnamese-800-normal.Cm7tD1pz.woff2","/_astro/inter-latin-ext-800-normal.DZJjya6U.woff2","/_astro/inter-latin-800-normal.BYj_oED-.woff2","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-cyrillic-ext-500-normal.BmqWE9Dz.woff","/_astro/inter-greek-ext-500-normal.2j5mBUwD.woff","/_astro/inter-cyrillic-500-normal.CxZf_p3X.woff","/_astro/inter-greek-500-normal.Xzm54t5V.woff","/_astro/inter-vietnamese-500-normal.mJboJaSs.woff","/_astro/inter-latin-ext-500-normal.BxGbmqWO.woff","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-cyrillic-600-normal.4D_pXhcN.woff","/_astro/inter-cyrillic-ext-600-normal.Bcila6Z-.woff","/_astro/inter-greek-ext-600-normal.B8X0CLgF.woff","/_astro/inter-greek-600-normal.BZpKdvQh.woff","/_astro/inter-vietnamese-600-normal.BuLX-rYi.woff","/_astro/inter-latin-ext-600-normal.CIVaiw4L.woff","/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_astro/inter-cyrillic-ext-700-normal.LO58E6JB.woff","/_astro/inter-greek-ext-700-normal.BoQ6DsYi.woff","/_astro/inter-cyrillic-700-normal.DrXBdSj3.woff","/_astro/inter-greek-700-normal.BUv2fZ6O.woff","/_astro/inter-vietnamese-700-normal.BZaoP0fm.woff","/_astro/inter-latin-ext-700-normal.TidjK2hL.woff","/_astro/inter-latin-700-normal.BLAVimhd.woff","/_astro/inter-cyrillic-ext-800-normal.Ca-gJeZY.woff","/_astro/inter-cyrillic-800-normal.CCHyn08d.woff","/_astro/inter-greek-ext-800-normal.DUe57HfS.woff","/_astro/inter-greek-800-normal.BU00tryP.woff","/_astro/inter-vietnamese-800-normal.DDlpr_Ee.woff","/_astro/inter-latin-ext-800-normal.BOMpwxm3.woff","/_astro/inter-latin-800-normal.D1mf63XC.woff","/_astro/aviso-legal.BQdIVU6Y.css","/favicon.svg","/logo.png","/robots.txt","/_astro/CTA.3hQf-2DZ.js","/_astro/CookieBanner.ZUhLxcbJ.js","/_astro/Features.bIsH1o9i.js","/_astro/Footer.CTvjxkpV.js","/_astro/Header.BHuL10MB.js","/_astro/Hero.xrucWddw.js","/_astro/HowItWorks.D702FwAG.js","/_astro/LeadForm.CwhIlzWw.js","/_astro/Testimonials.CBeqsE8s.js","/_astro/client.BLUn-lwI.js","/_astro/index.Cd_vQiNd.js","/_astro/jsx-runtime.D_zvdyIk.js","/terminos/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"OiR+TmRFIeddxNaKbft1oN5Ja2eZe5uCJ45h9e1kK30="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
