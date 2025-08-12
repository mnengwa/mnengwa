# Nakala

**_nakala_** • _nomino_ <br/>
Maandishi, mchoro au picha kilichonakiliwa.

> **_Nakala_** is a swahili noun that translates to written text.

Nakala is a curated collection of articles, digital art, and interesting references & look-up datasets.

## HTML imports

This uses HTMLRewriter to scan the HTML for `<script>` and `<link>` tags, run's Bun's JavaScript & CSS bundler on them, transpiles any TypeScript, JSX, and TSX, downlevels CSS with Bun's CSS parser and serves the result.

Bundles HTML routes:

└─ `/` → `./index.html`

└─ `/about` → `./about.html`

```javascript
...

import about from "./about.html";
import index from "./index.html";

const server = serve({
  routes: {
    "/": index,
    "/about": about,
...

```

## API routes
