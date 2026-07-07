const undici = require('undici');

const N_TRANSFORM_TCE_REGEXP =
  "function\\(\\s*(\\w+)\\s*\\)\\s*\\{" +
  "\\s*var\\s*(\\w+)=\\1\\.split\\(\\1\\.slice\\(0,0\\)\\),\\s*(\\w+)=\\[.*?];" +
  ".*?catch\\(\\s*(\\w+)\\s*\\)\\s*\\{" +
  "\\s*return(?:\"[^\"]+\"|\\s*[a-zA-Z_0-9$]*\\[\\d+])\\s*\\+\\s*\\1\\s*}" +
  "\\s*return\\s*\\2\\.join\\((?:\"\"|[a-zA-Z_0-9$]*\\[\\d+])\\)};";

const N_TRANSFORM_REGEXP =
  "function\\(\\s*(\\w+)\\s*\\)\\s*\\{" +
  "var\\s*(\\w+)=(?:\\1\\.split\\(.*?\\)|String\\.prototype\\.split\\.call\\(\\1,.*?\\))," +
  "\\s*(\\w+)=(\\[.*?]);\\s*\\3\\[\\d+]" +
  "(.*?try)(\\{.*?})catch\\(\\s*(\\w+)\\s*\\)\\s*\\{" +
  '\\s*return"[\\w-]+([A-z0-9-]+)"\\s*\\+\\s*\\1\\s*}' +
  '\\s*return\\s*(\\2\\.join\\(""\\)|Array\\.prototype\\.join\\.call\\(\\2,.*?\\))};';

(async () => {
  const r = await undici.request('https://www.youtube.com/s/player/4918c89a/player_es6.vflset/en_US/base.js', {
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const b = await r.body.text();
  
  const tceRe = new RegExp(N_TRANSFORM_TCE_REGEXP, 's');
  const nRe = new RegExp(N_TRANSFORM_REGEXP, 's');
  
  const tceMatch = b.match(tceRe);
  const nMatch = b.match(nRe);
  
  console.log('N_TRANSFORM_TCE_REGEXP match:', !!tceMatch);
  console.log('N_TRANSFORM_REGEXP match:', !!nMatch);
  
  // Also check the NEW format extraction
  const zRegex = /'use strict';var\s+z\s*=\s*"([^"]*)"\s*\.split\s*\(\s*";"\s*\)\s*,/;
  const pRegex = /pM\s*=\s*function\s*\(([^)]*)\)\s*\{/;
  console.log('NEW FORMAT z:', !!b.match(zRegex));
  console.log('NEW FORMAT pM:', !!b.match(pRegex));
  
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
