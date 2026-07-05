# ytdl-core

YouTube video downloader in pure JavaScript.

## Installation

```bash
npm install ytdl-core
```

## Usage

```js
const ytdl = require("ytdl-core");

// Download a video
ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(
  require("fs").createWriteStream("video.mp4"),
);

// Get video info
ytdl.getBasicInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ").then(info => {
  console.log(info.videoDetails.title);
});

// Get video info with download formats
ytdl.getInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ").then(info => {
  console.log(info.formats);
});
```

## API

### ytdl(url, [options])

Returns a readable stream that downloads the video.

### ytdl.getInfo(url, [options])

Returns an object with video details and available formats.

### ytdl.getBasicInfo(url, [options])

Returns an object with video details (no download formats).

## Options

- `requestOptions` — undici RequestOptions
- `agent` — custom agent for cookies/proxy
- `playerClients` — array of player clients to use. Defaults to `["WEB_EMBEDDED", "IOS", "ANDROID", "TV"]`.
- `fetch` — custom fetch implementation
- `dlChunkSize` — download chunk size in bytes (default 10MB)
- `highWaterMark` — stream high water mark (default 512KB)

## Cookies Support

```js
const ytdl = require("ytdl-core");
const agent = ytdl.createAgent([
  { name: "cookie1", value: "COOKIE1_HERE" },
]);
ytdl.getInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ", { agent });
```

## Proxy Support

```js
const ytdl = require("ytdl-core");
const agent = ytdl.createProxyAgent({ uri: "my.proxy.server" });
ytdl.getInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ", { agent });
```

## License

MIT
