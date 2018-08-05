## API

```js
var identifyStream = new IdentifyStream([options]);

identifyStream.on('identity', function(type) {
  console.log(type);
});
```

## Options

Standard stream options
customFormats
