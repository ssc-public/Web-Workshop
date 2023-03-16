<p align="center">
    <img src="jest-readme-headline.png" height="250px" alt="parse server logo">
    <br/>
تست JavaScript با JestJS
    <br/>
برنامه سازی وب، دانشگاه صنعتی شریف
    <br/>
ارائه دهنده درس: جناب آقای امید جعفری نژاد
    <br/>
نویسندگان: نگار نوبختی، ندا تقی زاده، شهاب حسینی مقدم
</p>

<div dir="rtl">

[//]: # (neda section, from line 15 to line 948)

<div dir="ltr">

```javascript
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```
</div>

`beforeEach` و `afterEach`
میتوانند همانند تست ها، کد آسنکرون را اجرا کنند - 
یعنی میتوانند یا یک پارامتر 
done 
بگیرند یا یک promise برگردانند.
به عنوان مثال اگر تابع `initializeCityDatabase` یک promise برگرداند که وقتی دیتابیس شروع به کار کرد reslove شود،
ما باید promise را برگردانیم:

<div dir="ltr">

```javascript
beforeEach(() => {
  return initializeCityDatabase();
});
```
</div>

## تنظیمات یک-باره 

در بعضی از حالات، لازم است که یک بار تنظیمات را در ابتدای فایل انجام دهیم.
این کار میتواند دردسرزا باشد مخصوصا اگر تنظیمات آسنکرون باشند، چون نمیتوان به صورت inline آنها را انجام داد.
در این شرایط میتوان از قلاب های `beforeAll` و `afterAll` استفاده کرد.

به عنوان مثال اگز هر توابع `initializeCityDatabase` و `clearCityDatabase`  هردو promise برگرداندند،
و پایگاه داده شهر ها میتوانست بین تست ها مشترکا استفاده شود، میتوانیم کد تست را به صورت زیر تغییر دهیم:

<div dir="ltr">

```javascript
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```
</div>

## دید 

قلاب های سظح بالای `before` و `after` بر روی تمام تست های فایل اعمال میشوند.
قلاب هایی که در بلوک `descibe` تعریف شده باشند تنها بر روی تست هایی که در همان بلوک `describe` هستند تعریف میشوند.

به طور مثال، فرض کنید که علاوه بر پایگاه داده شهر، یک پایگاه داده غذا هم داشتیم.
در این شرایط میتوانستیم برای تست های مختلف، تنظیمات مختلف انجام دهیم:

<div dir="ltr">

```javascript
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```
</div>

توجه داشته باشید که `beforeEach` در سطح بالا، قبل از `beforeEach` داخل بلوک `descibe` اجر میشود.
کد زیر میتواند ترتیب اجرای قلاب ها را به خوبی نمایش دهد:


<div dir="ltr">

```javascript
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```
</div>

## ترتیب اجرا 

Jest، تمام هندلر های describe یک فایل تست را 
<i>قبل</i>
از تست ها اجرا میکند.
به همین دلیل، بهتر است که تنظیم و جمع آوری تست ها در هندلر های `before` و `after` انجام شود،
به جای این که در بلوک `describe` باشد.
وقتی که بلوک های `describe` کامل شدند، Jest به طور پیش فرض، تمام تست ها را به صورت متوالی به ترتیبی که به آنها
بر بخورد، اجرا خواهد کرد، برای هر یک از آنها منتظر خواهد ماند که تمام شوند و اثرشان پاک شود، سپس سراغ تست بعدی می رود.

برای درک بهتر این ترتیب، به تست زیر دقت کنید:


<div dir="ltr">

```javascript
describe('describe outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3
```
</div>

Jest، قلاب های `before` و `after` را مثل مثل بلوک های `describe` و `test` به ترتیب تعریف شدنشان فراخوانی می کند.
توجه داشته باشید که قلاب های `after` دیدی که در آن قرار دارند، زودتر فراخوانی می شوند.
به طور مثال، به صورت زیر می توانید منابعی را که به یک دیگر نیاز دارند تنظیم و جمع آوری کنید:


<div dir="ltr">

```javascript
beforeEach(() => console.log('connection setup'));
beforeEach(() => console.log('database setup'));

afterEach(() => console.log('database teardown'));
afterEach(() => console.log('connection teardown'));

test('test 1', () => console.log('test 1'));

describe('extra', () => {
  beforeEach(() => console.log('extra database setup'));
  afterEach(() => console.log('extra database teardown'));

  test('test 2', () => console.log('test 2'));
});

// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown
```
</div>

## توصیه های عمومی

اگر تستی رد می شود، قبل از هر کاری باید چک کنیم که آیا آن تست وقتی به تنهایی اجرا شود هم رد می شود یا خیر.
برای این که فقط یک تست را اجرا کنیم، میتوانیم دستور `test` را به طور موقت با دستور  `test.only` جایگزین کنیم:


<div dir="ltr">

```javascript
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```
</div>

اگر تستی دارید که معمولا وقتی در کنار تست های دیگر اجرا می شود، رد می شود، ولی وقتی به تنهایی آن را اجرا کنید رد نمی شود،
میتوان حدس زد که تست دیگری وجود دارد که با آن تست تداخل دارد.
این مشکل را معمولا میتوان با پاک کردن برخی داده ها که با `beforeEach` مشترک است رفع کرد.
اگر مطمپن نیستید که آیا چنین تداخلی وجود دارد یا خیر، میتوانید `beforeEach`، لاگ بگیرید 


# توابع قلابی

با استفاده از توابع قلابی می توانید با پاک کردن بدنه تابع، ارتباطات بین قسمت های مختلف کد را بررسی کنید،
فراخوانی های تابع را به همراه پارامتر های آن بررسی کنید، توابع constructor فراخوانی شده را پیدا کنید،
و در هنگام تست، مقادیر برگردانده شده توسط تابع را تنظیم کنید.

دو راه برای قلابی سازی توابع وجود دارد:
یا ساختتن یک تابع قلابی برای استفاده در تست، یا نوشتن یک `manual mock` برای بازنویسی وابستگی به یک ماژول.

## استفاده از تابع قلابی

فرض کنید که می خواهیم تابع `forEach` را تست کنیم که به ازای هر یک از عناصر آرایه ای که به آن داده شده است،
یک callback را صدا می زند.

<div dir="ltr">

```javascript
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```
</div>

برای تست کردن این تابع می توانیم از یک تابع قلابی استفاده کنیم، سپس بررسی کنیم که آیا callback به درستی صدا زده شده یا خیر:

<div dir="ltr">

```javascript
const forEach = require('./forEach');

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```
</div>

## صفت mock.
 
تمام توابع قلابی یک صفت ویژه به نام `mock.` دارند که اطلاعاتی در مورد این که تابع چگونه صدا زده شده و 
چیزی برگردانده را در خود نگه می دارد. همچنین این صفت، مقدار `this` را برای هر فراخوانی نگه می دارد.
پس میتوان چیز هایی مانند مثال زیر را بررسی کرد:

<div dir="ltr">

```javascript
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]
```
</div>

همان طور که گفته شد، با استفاده از این ويژگی می توان نحوه صدا زده شدن توابع، ایجاد شدن آنها و نتیچه ی برگشته شده از آنها را بررسی کرد:

<div dir="ltr">

```javascript
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe('test');

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```
</div>

## نتیجه قلابی تابع

با استفاده از توابع قلابی،‌ می توان مقادیری را برای تست کردن به کد وارد کرد:

<div dir="ltr">

```javascript
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```
</div>

توابع قلابی در کدهایی که به طور مستمر پارامتر ها را به تابع تحویل می دهند هم مثمر ثمر هستند. 
برای کد هایی با این ویژگی، تست نوشتن راحت تر است چون لازم نیست برای شبیه سازی عمل کرد کد کار زیادی بکنیم،
 در عوض، مقداری که تابع قرار است برگرداند را در همانجا که لازم داریم به طور مستقیم وارد کد می کنیم:

<div dir="ltr">

```javascript
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```
</div>

در اکثر استفاده های واقعی، شما می خواهید که یک تابع قلابی از کامپوننتی وابسته داشته باشید و آن را تنظیم کنید، ولی روش کار مشابه همین کار است.
در این شرایط بهتر است تا جای ممکن در توابعی که به طور مستقیم آن ها را تست نمی کنید، هیچ گونه منطقی پیاده نکنید.

## ماژول قلابی 

فرض کنید کلاسی داریم که کاربران را از API فراخوانی می کند. این کلاس با استفاده از 
[axios](https://github.com/axios/axios)
 API را صدا می کند و صفت 
`data` که شامل تمام کاربران است را بر می گرداند:

<div dir="ltr">

```javascript
// users.js:
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```
</div>

حال، برای این که این تابع را بدون وصل شدن به API
(که باعث کند و نامطمین شدن تست ها می شود)،
می توانیم از تابع 
<span dir = "ltr">
`jest.mock(...)`
</span>
استفاده کنیم تا یک نمونه قلابی از ماژول axios داشته باشیم.

با داشتن ماژول قلابی، می توانیم یک mockResolvedValue برای 
<span dir = "ltr"> `.get`</span> 
داشته باشیم که بتوانیم نتیجه تست را با آن مقایسه کنیم.
در حقیقت، می خواهیم که 
<span dir = "ltr"> `axios.get('/users.json')`</span> 
یک پاسخ قلابی برگرداند.

<div dir="ltr">

```javascript
// users.test.js:
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```
</div>

## partial های تقلبی

می توان قسمت هایی از ماژول را با کد قلابی عوض کرد در حالی که مابقی ماژول دست نخورده باقی بماند.

<div dir="ltr">

```javascript
// foo-bar-baz.js:
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```
</div>



<div dir="ltr">

```javascript
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```
</div>

## پیاده سازی قلابی 

گاهی وقت ها نیاز است که به جای تغییر دادن مقدار بازگشتی تابع تقلبی، پیاده سازی دیگری به جای آن بگذاریم.
این کار را می توان با 
<span dir = "ltr"> </span> 
یا 
بر روی توابع قلابی انجام داد.

<div dir="ltr">

```javascript
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```
</div>



<div dir="ltr">

```javascript
// foo.js:
module.exports = function () {
  // some implementation;
};
```
</div>

از `mockImplementation` می توان برای تابع قلابی که قرار است در یک ماژول دیگر ساخته شود، پیاده سازی پیش فرض تعیین کرد.

<div dir="ltr">

```javascript
// test.js:
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```
</div>

وقتی نیاز است که رفتار تابع تقلبی را در شرایطی پیچیده بررسی کنید، مثلا وقتی که چند بار صدا زده شدن تابع چند خروجی متفاوت داشته باشد،
می توانید از متد `mockImplementationOnce` استفاده کنید.

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```
</div>

وقتی تمام پیاده سازی هایی که با `mockImplementationOnce` تعریف کرده ایم تمام شوند، از دفعه بعد، پیاده سازی پیش فرض که با 
`jest.fn` (در صورتی که وجود داشته باشد):

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```
</div>

برای حالاتی که متد ها به صورت زنجیره ای فراخوانی می شوند (و همواره نیاز دارند که `this`) را برگردانند، می توان به راحتی از 
<span dir="ltr">`.mockReturnThis()`</span>
استفاده کرد که در API ارایه شده برای همه توابع تقلبی وجود دارد.

<div dir="ltr">

```javascript
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```
</div>

## نام های تقلبی 

اگر بخواهید، می توانید برای توابع قلابی، نام بگذارید. این نام به جای 
<span dir="ltr">`jest.fn`</span>
در خروجی error ها نشان داده خواهد شد.
اگر می خواهید به راحتی تابع قلابی که خطا می دهد را شناسایی کنید، از
<span dir="ltr"> ```.mockName()```</span>
استفاده کنید.

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```
</div>

## Custom Matchers

برای این که راحت تر بتوانیم assert کنیم که توابع قلابی چگونه صدا شده اند، می توانیم از custom matcher ها استفاده کنیم:

<div dir="ltr">

```javascript
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```
</div>

با استفاده از این mathcer ها می توان به راحتی صفت
<span dir="ltr">`.mock`</span>
را بررسی کرد.
البته اگر می خواهید چیز خاصی را چک کنید یا به این نحوه نگارش عادت ندارید، می توانید این کار را به صورت دستی انجام دهید.


<div dir="ltr">

```javascript
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');
```
</div>

برای مشاهده لیست کاملی از matcher ها، می توانید به
[مستندات](https://jestjs.io/docs/expect)
مراجعه کنید.

[//]: # (negar section from line 1642 to 1972)

</div>
