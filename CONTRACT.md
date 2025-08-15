# TiredChefOnline Contract
These paths and tags are stable and must not change.

Static publish: /public
11ty publish: /_site
Functions: /netlify/functions

Required files (static):
- /public/index.html
- /public/404.html
- /public/robots.txt
- /public/sitemap.xml
- /public/assets/css/site.css
- /public/assets/js/main.js
- /public/assets/brand/logo.svg
- /public/assets/brand/favicon.ico
- /public/assets/brand/favicon.svg
- /public/assets/brand/apple-touch-icon.png
- /public/assets/brand/og-default.png
- /netlify.toml

Head snippet required on all pages:
<link rel="icon" href="/assets/brand/favicon.ico" sizes="any">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
<meta property="og:image" content="/assets/brand/og-default.png">

Header contract:
- .nav-toggle toggles #nav
- Logo uses /assets/brand/logo.svg

If a change needs to break any of the above, open a PR titled "contract change" with migration notes.
