## API

```js
var identifyStream = new IdentifyStream([options]);

identifyStream.on('identity', function(type) {
  console.log(type);
});
```

## Options

customFormats - object

* customFormats <object> Default: null
* highWaterMark <integer> Default: 16384

## Supported File Types

* avi
* bmp
* bz2
* exe
* flac
* gif
* gz
* ico
* jpg
* jpf
* m4a
* mp3
* mp4
* ogg
* pdf
* png
* psd
* rtf
* tiff
* wav
* webm
* webp
* zip
