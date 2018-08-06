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
