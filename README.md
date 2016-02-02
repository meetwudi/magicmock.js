<big><h1 align="center">magicmock</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/magicmock">
    <img src="https://img.shields.io/npm/v/magicmock.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/tjwudi/magicmock">
    <img src="https://img.shields.io/coveralls/tjwudi/magicmock.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/tjwudi/magicmock">
    <img src="https://img.shields.io/travis/tjwudi/magicmock.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/magicmock">
    <img src="http://img.shields.io/npm/dm/magicmock.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/tjwudi/magicmock.svg">
    <img src="https://david-dm.org/tjwudi/magicmock.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/tjwudi/magicmock/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/magicmock.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
Mocked objects with ES6
</big></p>


## Install

```sh
npm i -D --save-dev magicmock
```

## Prerequisite

Use magicmock with Node.js/io.js (with `--harmony_reflect`). Currently we only test it against Node.js 4 and Node.js 5. To request more engine support, please kindly send in an issue or pull request.

## Usage

### Mock method

The term **method** and **function** is interchangeable here.

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

##### mockedMethod.called()

Returns a boolean. Indicates whether the method was called or not.

##### mockedMethod.calledWith(args)

Returns a boolean. Indicates whether the method was called with exactly the same argument list or not.

## Use for testing only

magicmock was designed for testing. You don't want to run magicmock code in production code, neither client-side or server-side.

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
