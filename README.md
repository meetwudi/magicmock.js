<big><h1 align="center">
  <img src="https://cdn.rawgit.com/tjwudi/magicmock.js/master/misc/logo.svg"
         alt="MagicMock.js">
</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/magicmock">
    <img src="https://img.shields.io/npm/v/magicmock.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/tjwudi/magicmock">
    <img src="https://img.shields.io/coveralls/tjwudi/magicmock.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/tjwudi/magicmock.js">
    <img src="https://img.shields.io/travis/tjwudi/magicmock.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/magicmock">
    <img src="http://img.shields.io/npm/dm/magicmock.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/tjwudi/magicmock.js.svg">
    <img src="https://david-dm.org/tjwudi/magicmock.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/tjwudi/magicmock/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/magicmock.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
Mocked objects with ES6, inspired by python's unittest.mock module.
</big></p>

## Install

```sh
npm i -D --save-dev magicmock
```

## Prerequisite

Use magicmock with Node.js/io.js (with `--harmony_reflect`). Currently we only test it against Node.js 4 and Node.js 5. To request more engine support, please kindly send in an issue or pull request.

## Usage

### Mock method

The terms **method** and **function** are interchangeable here.

```
import {mockMethod} from 'magicmock';

let mockedMethod = mockMethod();
mockedMethod.returnValue = 100;
mockedMethod(1, 2, 3); // => 100
console.log(mockedMethod.called()); // => true
console.log(mockedMethod.calledWith(1, 2, 3)); // => true
console.log(mockedMethod.calledWith(1, 2)); // => false
```

##### mockedMethod.returnValue

Setting `returnValue` property of the `mockedMethod` changes the return value when executing `mockedMethod`.

`returnValue` is also accepted as an option to `mockMethod()` factory method. 

```
let mockedMethod = mockMethod({
  returnValue: 100
});
mockedMethod(1, 2, 3); // => 100
```

##### mockedMethod.called()

Returns a boolean. Indicates whether the method was called or not.

##### mockedMethod.calledWith(args)

Returns a boolean. Indicates whether the method was called with exactly the same argument list or not.

### Mock object

`mockObject()` factory method creates an object `mockedObject`. When you access any of undefined property of `mockedObject`, it returns a `mockedMethod` instead of `undefined`.

```
let mockedObject = mockObject();
// mockedObject.testMethod is undefined
mockedObject.testMethod.returnValue = 101;
console.log(mockedObject.testMethod()); // => 101
```

You could still assign property value to `mockedObject` after its creation.

```
let mockedObject = mockObject();
// mockedObject.testMethod is undefined
mockedObject.testMethod.returnValue = 101;
console.log(mockedObject.testMethod()); // => 101
mockedObject.testMethod = 'not a method anymore';
console.log(mockedObject.testMethod()); // => 'not a method anymore'
```

`mockObject()` factory method accepts an option with `props` key, which defines properties upon creation.

```
let mockedObject = mockObject({
  props: {
    myProperty: 'this is a string'
  }
});
console.log(mockedObject.myProperty); // => this is a string
```

## Use for testing only

magicmock was designed for testing. You don't want to run magicmock code in production code, neither client-side nor server-side.

## License

MIT © [tjwudi](http://github.com/tjwudi)

[npm-url]: https://npmjs.org/package/magicmock
[npm-image]: https://img.shields.io/npm/v/magicmock.svg?style=flat-square

[travis-url]: https://travis-ci.org/tjwudi/magicmock
[travis-image]: https://img.shields.io/travis/tjwudi/magicmock.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/tjwudi/magicmock
[coveralls-image]: https://img.shields.io/coveralls/tjwudi/magicmock.svg?style=flat-square

[depstat-url]: https://david-dm.org/tjwudi/magicmock
[depstat-image]: https://david-dm.org/tjwudi/magicmock.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/magicmock.svg?style=flat-square
