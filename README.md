# identify-stream

Indentify the contents of a Node stream based on the presence of a file signature (magic number). Can be extended to check for additional file formats.

## Install

```
$ npm install --save indentify-stream
```

## Examples

## Basic Usage

```js
const identifyStream = new IdentifyStream();
const inputStream = fs.createReadStream('./input.png');
const outputStream = fs.createWriteStream('./output.png');

inputStream.pipe(identifyStream).pipe(outputStream);

identifyStream.on('complete', (result) => {
  console.log(result); // {name: "PNG Image", extension: "png", mime: "image/png"}
});
```

## Detecting Subtypes

Some file formats have two or more different variants, each with their own distinct file signature. Where this is the case the result object will feature an additional `subtype` property as seen below:

```js
const identifyStream = new IdentifyStream();
const inputStream = fs.createReadStream('./input.gif');
const outputStream = fs.createWriteStream('./output.gig');

inputStream.pipe(identifyStream).pipe(outputStream);

identifyStream.on('complete', (result) => {
  console.log(result); // {name: "GIF Image", extension: "gif", mime: "image/gif", subtype: "87a"}
});
```

## Detecting Custom Formats

Instances of IdentifyStream may be extended to detect additional file formats. See (Defining Custom Formats)[#defining-custom-formats] for more information.

```js
const identifyStream = new IdentifyStream({
  formats: {
    extension: 'pseudo format',
    extension: 'pseudo',
    mime: 'application/x-custom',
    signature: [{
      value: '7fa92c',
      offset: 0
    }];
  }
});
const inputStream = fs.createReadStream('./input.pseudo');
const outputStream = fs.createWriteStream('./output.pseudo');

inputStream.pipe(identifyStream).pipe(outputStream);

identifyStream.on('complete', (result) => {
  console.log(result); // {name: "pseudo format", extension: "pseudo", mime: "application/x-custom"}
});
```

## API

### new IdentityStream([options])

* `options` <Object>
  - `formats` {Format | <Format[]} An optional list of custom file formats to detect [(See below)](#defining-custom-formats).

  - `highWaterMark` {Number} The node streams `highWaterMark` setting. Default: `16384`

## Defining Custom Formats

Instances of IdentifyStream may be configured to detect file formats beyond those already supported. To do so, use the formats option to provide one or more `Format` objects. See /data/formats.json for examples.

### Format

Property    | Type                               | Description
------------|------------------------------------|------------
`extension` | String                             | The file formats's extension
`mime`      | String                             | The file formats's MIME type.
`signature` | Signature&nbsp;\|&nbsp;Signature[] | One or more `Signature` objects. Identity-Stream will only match with this format if all signatures are present in the stream.
`subtypes`  | Subtype&nbsp;\|&nbsp;Subtype[]     | One or more `Subtype` objects.

### SubType

Property    | Type                               | Description
------------|------------------------------------|------------
`type`      | String                             | The name of this subtype
`signature` | Signature&nbsp;\|&nbsp;Signature[] | One or more `Signature` objects. Identity-Stream will only match with this subtype if all signatures are present in the stream.

### Signature

| Property | Type   | Description
|----------|--------|------------
| `value`  | String | The signature to check for (in hex format).
| `offset` | Number | The offset of the signatue in bytes.

## Events

### complete

The `complete` event is emitted when the stream has succesfully identified the stream file format, or ruled out all known file formats. Callback functions attached to this event receive the MIME type of the streamed file, or `null` if the format is not recognized.

### error

The `error` event is emitted when the stream encounters an unexpected situation, for example if it is connected to an object stream.

## Supported File Types

Extension | MIME type
----------|----------------------------
7z        | application/x-7z-compressed
avi       | video/avi
bmp       | image/bmp
bz2       | application/bzip2
exe       | application/octet-stream
flac      | audio/flac
gif       | image/gif
gz        | application/gzip
ico       | image/ico
jpg       | image/jpeg
jpf       | image/jpx
m4a       | audio/m4a
mov       | video/quicktime
mp3       | audio/mpeg
mp4       | video/mp4
ogg       | audio/ogg
pdf       | application/pdf
png       | image/png
psd       | image/psd
rtf       | application/rtf
tiff      | image/tiff
wav       | audio/wav
webm      | video/webm
webp      | image/webp
xz        | application/x-xz
zip       | application/zip

## License

ISC
