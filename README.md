## API

### Basic Example

```js
const identifyStream = new IdentifyStream();
const inputStream = fs.createReadStream('./input.png');
const outputStream = fs.createWriteStream('./output.png');

inputStream.pipe(identifyStream).pipe(outputStream);

identifyStream.on('identity', (mimeType) => {
  console.log(mimeType); // 'image/png'
});
```

### Custom Format Example

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
* mp4
* mov
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
