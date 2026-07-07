const sig = require('./lib/sig');
const undici = require('undici');

(async () => {
  const r = await undici.request('https://www.youtube.com/s/player/4918c89a/player_es6.vflset/en_US/base.js', {
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const b = await r.body.text();
  
  console.log('Player length:', b.length);
  
  const funcs = sig.extractFunctions(b);
  console.log('decipher:', !!funcs[0], 'ntransform:', !!funcs[1]);
  
  if (funcs[1]) {
    try {
      const r1 = funcs[1].runInNewContext({ ncode: 'abc123' });
      console.log('ntransform abc123:', JSON.stringify(r1));
    } catch(e) {
      console.log('ntransform error:', e.message);
    }
  }
  
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
