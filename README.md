# identify-stream

## Install

```
$ npm install --save indentify-stream
```

## Usage

```js
const identifyStream = new IdentifyStream();
const inputStream = fs.createReadStream('./input.png');
const outputStream = fs.createWriteStream('./output.png');

inputStream.pipe(identifyStream).pipe(outputStream);

identifyStream.on('identity', (mimeType) => {
  console.log(mimeType); // 'image/png'
});
```

### Usage With Custom Formats

## API

new IdentityStream([option])

* `options` <Object>
  * `customFormats` <Object> | <Object[]> Define any additional file formats you would like to search for.
    * `extension` <string> The file formats's extension
    * `mime` <string> The file formats's MIME type.
    * `signature` <Object> | <Object[]> The file format's signature. If an array of objects are provided each signature will have to match.
      * `value` <string> The signature to check for.
      * `offset` <number> The offset of the signatue.
    * `subtypes` <Object> | <Object[]> Define different types of the format.
  * `highWaterMark` <number> Default: `16384`

## Supported File Types

* 7z
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
* xz
* zip

## License

ISC
