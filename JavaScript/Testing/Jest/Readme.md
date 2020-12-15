<div dir='rtl' align='justify'>
<h2 align="center">Jest</h2>
<p align="center"><img src="https://github.com/facebook/jest/blob/master/website/static/img/jest-readme-headline.png" width="80%"/></p>
  
# عناوین

- [راه‌اندازی و شروع](#راهاندازی-و-شروع)
- [اجرا از طریق command line](#اجرا-از-طریق-command-line)
- [تنظیمات اضافی](#تنظیمات-اضافی)
  - [ایجاد فایل با تنظیمات اولیه](#ایجاد-یک-فایل-تنظیمات-اولیه)
  - [اضافه‌کردن Babel](#اضافهکردن-babel)
- [Matchers](#matchers)
  - [Matcher های رایج](#matcher-های-رایج)
  - [truthiness](#truthiness)
  - [Numbers](#numbers)
  - [Strings](#strings)
  - [Arrays and Iterables](#arrays-and-iterables)
  - [Exceptions](#exceptions)
  - [And More](#and-more)
- [Testing Asynchronous Code](#testing-asynchronous-code)
  - [Callbacks](#callbacks)
  - [Promises](#promises)
  - [resolves / rejects](#resolves--rejects)
  - [Async/Await](#asyncawait)
- [Setup and Teardown](#Setup-and-Teardown)
  - [Repeating Setup For Many Tests](#Repeating-Setup-For-Many-Tests)
  - [one-Time Setup](#one-Time-Setup)
  - [Scoping](#Scoping)
  - [Order of execution of describe and test blocks](#Order-of-execution-of-describe-and-test-blocks)
  - [General Advice](#General-Advice)
- [Mock Functions](#Mock-Functions)
  - [استفاده از mock function](#استفاده-از-mock-function)
  - [mock property](#mock-property)
  - [Mock Return Values](#Mock-Return-Values)
  - [Mocking Modules](#Mocking-Modules)
  - [Mock Implementations](#Mock-Implementations)
  - [Mock Names](#Mock-Names)
  - [Custom Matchers](#Custom-Matchers)
  
# راه‌اندازی و شروع
در ابتدا 
Jest
را با
[`yarn`](https://yarnpkg.com/en/package/jest)
نصب کنید :
<div dir='ltr' align='justify'>

```bash
yarn add --dev jest
```

</div>

یا می‌توانید با دستور زیر با 
[`npm`](https://www.npmjs.com/package/jest)
آن را به ‌پروژه‌ی خود اضافه کنید:
<div dir='ltr' align='justify'>

```bash
npm install --save-dev jest
```

</div>

 با نوشتن تست برای یک تابع ساده که دو عدد را جمع می‌کند، شروع می‌کنیم.
ابتدا یک فایل به نام 
`sum.js`
ایجاد می‌کنیم و تابع جمع را در آن قرار می‌دهیم:

<div dir='ltr' align='justify'>

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
</div>

سپس یک فایل دیگر به نام 
`sum.test.js`
ایجاد می‌کنیم که تست‌مان را در این فایل قرار می‌دهیم:

<div dir='ltr' align='justify'>

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
</div>

قسمت زیر را به فایل
`package.json`
خود اضافه کنید:

<div dir='ltr' align='justify'>

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
</div>

در انتها کامند
`yarn test`
یا
`npm run test`
را اجرا کنید و 
Jest
این پیغام را خروجی می‌دهد:

<div dir='ltr' align='justify'>

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
</div>

**شما همین ‌الان اولین تست‌تان را با 
Jest 
با موفقیت نوشتید!**

تستی که در فایل
`sum.test.js`
قرار دادیم، از دو تابع
`expect`
و
`toBe`
استفاده می‌کند تا تست کند که مقدار به دست‌آمده از تابع 
`sum`
و مقدار موردانتظار ما برای جمع، دقیقا برابر باشند.

برای آشنایی با دیگر توابع
Jest
که امکان تست کردن را به ما می‌دهند می‌توانید به قسمت
[Matchers](#Matchers)
مراجعه کنید.

# اجرا از طریق command line

شما می‌توانید
Jest
را به‌صورت مستقیم از 
CLI
(اگر 
Jest
به‌صورت
global
در
`Path`
تان قابل‌دسترسی است)
با انواع تنظیمات مختلف اجرا کنید.

با دستورات
`yarn global add jest`
یا
`npm install jest --global`
 می‌توانید 
 Jest
 را به صورت‌
 global
 نصب کنید.

به‌عنوان مثال برای اجرا کردن
Jest
بر روی فایل‌هایی که با
`my-test`
مشابه‌هستند و با استفاده از فایل
`config.json`
به عنوان فایل تنظیمات، کامند زیر را اجرا می‌کنیم:

<div dir='ltr' align='justify'>

```bash
jest my-test --notify --config=config.json
```
</div>

فلگ
`notify--`
موجب می‌شود تا پس از اجرای کامند، یک پیغام اطلاع‌رسانی نشان‌داده شود.

# تنظیمات اضافی

## ایجاد یک فایل تنظیمات اولیه

با اجرای دستور زیر،
Jest
با توجه به پروژه‌تان چند سوال از شما خواهد‌ پرسید و یک فایل با تنظیمات اولیه را ایجاد خواهد کرد.
<div dir='ltr' align='justify'>

```bash
jest --init
```
</div>

## اضافه‌کردن Babel

برای استفاده از 
[Babel](https://babeljs.io/)
وابستگی‌های موردنیاز را با 
`yarn`
نصب کنید:

<div dir='ltr' align='justify'>

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```
</div>

با ایجاد فایل
`babel.config.js`
در 
root
پروژه‌تان
و قرار دادن کد زیر در آن،
Babel
را تنظیم کنید تا ورژن فعلی
Node
تان را 
target
قرار دهد.

<div dir='ltr' align='justify'>

```javascript
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```
</div>

# Matchers
توابعی هستند که به ما اجازه می‌دهند مقادیر را در با روش های متفاوت تست کنیم.
این‌قسمت به معرفی چند عدد از پرکاربردترین 
Matcher
ها می‌پردازد. برای دیدن لیست کامل به
[`expect` API doc](ExpectAPI.md)
مراجعه کنید.

## Matcher های رایج
ساده‌ترین راه برای تست یک مقدار، استفاده از تساوی می‌باشد.
<div dir='ltr' align='justify'>

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
</div>

در کد بالا
`expect(2 + 2)`
یک 
"expectation" object
برمی‌گرداند.
ما معمولا کاری با این
"expectation" object
ها نداریم، به‌جز فراخوانی
Matcher
ها روی آن‌ها.
در کد بالا،
`toBe(4).`
یک
Matcher
می‌باشد.
زمانی که
Jest
را اجرا می‌کنیم،
Jest
همه‌ی 
Matcher
هایی که شرط آن ها 
Fail
شده‌است را با پیغام مناسب به ما نشان می‌دهد.

`toBe`
برای تست برابری مطلق از
`Object.is`
استفاده می‌کند. اگر می‌خواهید که فقط مقدار ها مقایسه شوند و 
`type`
ورودی ها چک نشود، می‌توانید به‌جای
`toBe`
از
`toEqual`
استفاده کنید:
<div dir='ltr' align='justify'>

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```
</div>

`toEqual`
به‌طور بازگشتی، برابری هر فیلد از یک 
object
یا
array
را چک می‌کند.

همچنین می‌توان از مخالف یک 
Matcher
نیز استفاده کرد:

<div dir='ltr' align='justify'>

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```
</div>

## Truthiness
بعضی‌مواقع نیاز داریم تا در تست ها بین
`undefined`, `null` 
و
`false`
تمایز قائل شویم و همچنین نیز در بعضی‌موارد می‌خواهیم تا با آن ها رفتار یکسان داشته‌باشیم.
Jest
توابع کمک‌کننده‌ای دارد که می‌توانیم با توجه به نیازمان هر کدام را انتخاب کنیم.

<div dir='ltr' align='justify'>

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as true
- `toBeFalsy` matches anything that an `if` statement treats as false 
</div>

برای مثال داریم:
<div dir='ltr' align='justify'>

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```
</div>

شما باید از
Matcher
ی استفاده کنید که دقیقاً با کاری که می خواهید کد شما انجام دهد تطابق داشته‌باشد.

## Numbers
برای اکثر روش‌های مقایسه‌ی اعداد، تابع
Matcher
مناسب وجود دارد که می‌توان برای تست کردن از آن ها استفاده کرد.
<div dir='ltr' align='justify'>

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
</div>

برای تست برابری در مقادیر اعشاری به‌جای
`toEqual`
از
`toBeCloseTo`
استفاده کنید زیرا نمی‌خواهیم که تست به خطای کوچک مقادیر اعشاری وابسته باشد.
<div dir='ltr' align='justify'>

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```
</div>

## Strings
برای چک کردن تطابق
string
با یک 
regular expression
می‌توانیم از 
`toMatch`
استفاده کنیم:
<div dir='ltr' align='justify'>

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
</div>

## Arrays and Iterables
برای چک کردن اینکه یک
item
خاص در یک
array
یا یک
iterable
قرار دارد می‌توانیم از
`toContain`
استفاده کنیم:
<div dir='ltr' align='justify'>

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```
</div>

## Exceptions
برای چک کردن اینکه یک تابع خاص هنگام فراخوانی
exception
پرتاب می‌کند یا نه، می‌توانیم از
`toThrow`
استفاده کنیم:
<div dir='ltr' align='justify'>

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```
</div>

> تابعی که 
exception
را ایجاد می‌کند نیاز دارد تا توسط یک تابع دیگر فراخوانی شود همانند مثال بالا که تابع موردنظرمان را با یک 
arrow function
فراخوانی کرده‌ایم. 

## And More
توابع معرفی‌شده در بالا تنها بخشی از توابعی است که 
Jest
برای تست کردن در اختیار ما قرار می‌دهد.برای مطالعه‌ی بیشتر می‌توانید به 
[اینجا](https://jestjs.io/docs/en/expect)
مراجعه کنید.

# Testing Asynchronous Code
با توجه به 
single thread
بودن 
JavaScript
و رایج بودن 
asynchronous programming
در این زبان، احتیاج به ابزاری داریم که بتوانیم کد های
asynchronous
 را تست کنیم.
 Jest
 این نیاز را برای ما برطرف می‌کند.
 Jest
 چند راه مختلف برای تست کردن این نوع توابع دارد.

## Callbacks
callback
 ها رایج‌ترین شیوه‌‌ی نوشتن کد 
asynchronous
می‌باشند.
برای مثال فرض کنیم تابع
`fetchData(callback)`
داریم که اطلاعاتی را دریافت کرده و زمانی که کامل می‌شود 
`callback(data)`
را فراخوانی می‌کند. می‌خواهیم تست کنیم که
data
‌ی خروجی داده‌شده رشته‌ی
`'peanut butter'`
می‌باشد.

به‌طور پیشفرض تست‌های
Jest
وقتی به پایان اجرای خود می‌رسند، تمام می‌شوند.
در نتیجه، این تست آن‌طور که انتظار داریم؛ انجام نمی‌شود.
<div dir='ltr' align='justify'>

```js
// Don't do this!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```
</div>

مشکل تست بالا این است که به محض‌اینکه 
`fetchData`
کامل می‌شود؛ قبل از اینکه 
`callback`
فراخوانی شود؛ تست تمام می‌شود.

یک فرم جایگزین از
`test`
 وجود دارد که این مشکل را حل می‌کند. به‌جای قرار دادن 
 `test`
 در یک تابع با آرگومان خالی ، از یک آرگومان با نام 
 `done`
 استفاده کنید.
 Jest
 تا زمانی
 `done`
 اجرا نشود صبر خواهد کرد و پس از اجرای کامل
 `done`
 تست به‌پایان می‌رسد.
 <div dir='ltr' align='justify'>

```js
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```
</div>

اگر
`()done`
فراخوانی نشود، تست
fail
می‌شود که همان رفتار موردانتظار ماست.

اگر
`expect`
در تست بالا
fail
شود؛ یک 
exception
پرتاب خواهد‌کرد و 
`()done`
فراخوانی نخواهدشد.اگر می‌خواهیم در لاگ تست ببینیم که چرا تست 
fail
شده‌است؛َ باید عبارت
`expect`
را درون 
`try`
بگذاریم و 
error
در قسمت
catch
را به‌عنوان آرگومان به 
`done`
 بدهیم. درغیر اینصورت با یک 
 timeout error
  مبهم روبرو خواهیم شد که مشخص نمی‌کند 
  `expect(data)`
  چه مقداری را دریافت کرده‌است.
## Promises
اگر کدتان از
promise
ها استفاده می‌کند، یک راه ساده‌تر برای هندل کردن تست‌های 
asynchronous
وجود دارد. یک 
promise
را به‌عنوان خروجی تست
return
کنید، 
Jest
تا زمانی که 
promise
خروجی‌داده‌شده
resolve
نشود صبر می‌کند. اگر 
promise
خروجی‌دادشده
reject
شود تست به صورت خورکار 
fail
می‌شود.

برای مثال فرض کینم
`fetchData`
به‌جای استفاده از
callback
یک 
promise
برمی‌گرداند که 
resolve
شده و رشته‌ی 
`'peanut butter'`
را به عنوان جواب دارد:
<div dir='ltr' align='justify'>

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```
</div>

اطمینان حاصل کنید که حتما یک
promise
را برگردانید. اگر عبارت
`return`
را از قلم بیندازید، تست‌تان قبل از اینکه
promise
خروجی‌داده‌شده از
`fetchData`
نتیجه بدهد و توسط
`()then`
استفاده شود، به‌اتمام می‌رسد.

اگر انتظار دارید یک
promise
بدون موفقیت انجام شود و
reject
شود، از تابع
`catch.`
استفاده کنید.
مطمئن شوید که 
`expect.assertions`
را برای اینکه بررسی کنید تعداد مشخصی از 
assertion
ها فراخوانی شده‌اند، به کدتان اضافه کنید. درغیراینصورت یک
promise
با نتیجه‌ی 
fulfilled
تست زیر را 
fail
نخواهد کرد.
<div dir='ltr' align='justify'>

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```
</div>

## `resolves` / `rejects`
شما همچنین می‌توانید از تابع
`resolves.`
در عبارت
`expect`
استفاده کنید و 
Jest
تا زمانی که 
promise
موردنظر ما
resolve 
نشود، صبر خواهد کرد. اگر 
promise
موردنظر ما
reject
شود؛ تست به صورت خودکار
fail
می‌شود:
<div dir='ltr' align='justify'>

```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```
</div>

اطمینان حاصل کنید که حتما عبارت
assertion
را برگردانید. اگر عبارت
`return`
را از قلم بیندازید، تست‌تان قبل از اینکه
promise
خروجی‌داده‌شده از
`fetchData`
نتیجه بدهد و توسط
`()then`
استفاده شود، به‌اتمام می‌رسد.

اگر انتظار دارید که 
promise
موردنظر ما 
reject 
شود؛ از تابع
`rejects.`
استفاده کنید. این تابع از نظر منطقی مانند
`resolves.`
رفتار می‌کند. اگر 
promise
موردنظر ما 
fulfilled
شود؛ تست به‌صورت خودکار 
fail
می‌شود.
<div dir='ltr' align='justify'>

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```
</div>

## Async/Await
همچنین می‌توانید از
`async`
و
`await`
در تست‌هایتان استفاده کنید. برای نوشتن یک تست
async
از کلیدواژه‌ی 
`async`
قبل از تابعی که به
`test`
پاس می‌دهید استفاده کنید. برای مثال همان تابع
`fetchData`
را این‌بار به این‌روش تست می‌کنیم:
<div dir='ltr' align='justify'>

```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```
</div>

همچنین می‌توان
`async`
و
`await`
را به‌صورت ترکیبی با
`resolves.`
و
`rejects.`
استفاده کرد.
<div dir='ltr' align='justify'>

```js
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```
</div>

در این موارد
`async`
و
`await`
فقط
syntactic sugar
برای همان منطقی هستند که درمثال های 
promise
دیدم.

هیچ‌کدام از روش‌های بالا مزیتی نسبت به دیگری ندارند و فقط بستگی به این دارد که به نظر شما کدام یک از روش های بالا	تست های‌تان را ساده‌تر می‌کند. 

# Setup and Teardown

معمولا درهنگام نوشتن تست‌ها نیاز است که کارهایی قبل از انجام تست و هنچنین بعد از اجرای تست انجام شود.
jest
برای شما توابع کمکی‌ای را فراهم کرده است که این کار را انجام دهند.

## Repeating Setup For Many Tests

اگر شما نیاز دارید تا بعضی کارها به صورت تکراری برای بسیاری از تست ها انجام شود می‌توانید از
`boforeEach`
و
`afterEach`
استفاده کنید.


به عنوان مثال شما می‌خواهید تعدادی تست را که با دیتابیسی از شهر‌ها در ارتباط است تست کنید.
شما نیاز دارید که در ابتدا تابع
`()initializeCityDatabase`
را پیش از هر تست صدا کنید و همچنین متد
`()clearCityDatabase`
را بعد از پایان هر تست اجرا کنید.
شما می‌توانید این کار را به صورت زیر انجام دهید.

<div dir='ltr' align='justify'>
 
```js
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

`beforeEach`
و
`afterEach`
می‌توانند کد هارا به همان شیوه‌ی
[test can handle asynchronous code TODO](#testing-asynchronous-code)
و به صورت ناهمگام
(asynchronous)
مدیریت کنند.
آن‌ها همچنین می‌توانند یک
پارامتر
`done`
بگیرند و یا یک
`promise`
را به عنوان خروجی برگردانند.

<div dir='ltr' align='justify'>
 
```js
beforeEach(() => {
  return initializeCityDatabase();
});
```

</div>

## one-Time Setup
در بعضی موارد شما نیاز دارید که فقط یکبار و در ابتدای فایل، 
setup
را انجام دهید. یان کار می‌تواند اذاردهنده باشد اگر این
setup
به صورت ناهمگام
(asynchronous)
باشد، پس بنابر این شما نمی‌توانید به صورت 
 inline
 این کار را انجام دهید.
 jest
 برای انجام این کار
 `beforeAll`
 و
 `afterAll`
 را فراهم کرده است تا این شرایط را مدیریت کنید.
 
 
 برای مثال، اگر دو متر
 `initializeCityDatabase`
 و
 `clearCityDatabase`
 به ما
 `promise`
 برگردانند، و 
`city database`
قابل استفاده مجدد در طول تست باشد، ما می‌توانیم تست‌هایمان را به صورت زیر تغییر دهیم:

<div dir='ltr' align='justify'>
 
```js
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

## Scoping
به صورت پیشفرض
`before`
و
`after`
برای همه‌ی تست‌ها به‌کار گرفته می‌شود. شما می‌توانید تست‌ها را با استفاده از 
`describe`
گروه‌بندی کنید.
وقتی که آنها داخل یک بلاک از
`describe`
قرار می‌گیرند،
`before`
و
`after`
فقط برای تست‌های داخل آن بلاک
`describe`
به‌کار گرفته می‌شود.

<div dir='ltr' align='justify'>
 
```js
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

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});

```

</div>

توجه داشته‌باشید که 
`beforeEach`
 ای که در سطح بالا
 (top-level)
 قرار دارد قبل از
 `beforeEach`
 ای که داخل بلاک
 `describe`
 قرار دارد اجرا می‌شود.
 کد زیر می‌تواند ترتیب اجرا را به شما نشان دهد.
 
 <div dir='ltr' align='justify'>
 
```js
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

## Order of execution of describe and test blocks
jest
در یک فایل تست، تمام
describe handler
ها را قبل از تست‌ها اجرا می‌کند.
این دلیل دیگری است که 
setup
و
teardown
ها را به‌جای قرار دادن داخل بلاک
describe
در داخل
`before*`
و
`after*`
ها قرار دهید.
به صورت پیشفرض در ابتدا بلاک‌های
describe
کامل می‌شوند و سپس 
jest 
تست‌ها را به صورت متوالی با توجه به ترتیبی که می‌بیند اجرا می‌کند و صبر می‌کند تا آن تست اجرا شود سپس سراغ تست بعدی می‌رود.


برای فهم بهتر به فایل تست زیر و خروجی آن توجه کنید:

 <div dir='ltr' align='justify'>
 
```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

</div>


## General Advice
اگر یک تست 
fail
شد، یکی از مواردی که بهتر است در ابتدا چک شود این است که آیا اگر آن تست به تنهایی اجرا شود باز هم 
fail
می‌شود یا خیر. برای اینکه در
jest
فقط یک تست اجرا شود می‌توانید به صورت موقت
`test`
را به
`test.only`
تغییر دهید.

 <div dir='ltr' align='justify'>
 
```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

</div>

اینکه یک تست وقتی که با بقیه‌ی تست‌ها اجرا می‌شود 
fail
می‌شود ولی وقتی که به تنهایی اجرا می‌شود مشکلی ندارد نشان می‌دهد که این تست با تست دیگری تداخل دارد که این مشکل ایجاد شده است.
شما معمولی می‌توانید این مشکل را با جذف حالات اشتراکی
(shared state)
به وسیله‌ی 
`beforeEach`
رفع کنید.
اگر شما شک دارید که بعضی از حالات اشتراکی
(shared stae)
در طول تست تغییر می‌کنند یا نه می‌توانید با
`beforeEach`
این حالات را لاگ کرده و بررسی‌ی لازم را انجام دهید.


# Mock Functions
توابع ساختگی
(Mock functions)
به شما این امکان را می‌دهد که با پاک‌کردن پیاده‌سازی اصلی‌ی یک تابع، کنترل‌کردن فراخوانی‌های تابع(و پارامتر‌های استفاده شده)، کنترل‌کردن نمونه‌هایی که با دستور 
`new`
به‌وسیله‌ی توابع سازنده ساخته شده‌اند و امکان پیکربندی مقادیر خروجی در زمان تست، به تست کردن ارتباطات در کد بپردازید.
 
 دو راه برای 
 mock
 کردن توابع وجود دارد:ساخت یک
 mock function
 برای استفاده در کد یا، نوشتن یک
 [`manual mock`](https://jestjs.io/docs/en/manual-mocks)
برای
override
کردن وابستگی‌های یک ماژول.

## استفاده از mock function
فرض کنید که ما می‌خواهیم یک پیاده سازی از یک تابع 
`forEach`
را تست کنیم که برای هر آیتم در ارایه‌ی داده شده تابع
callback
را بر روی آن اجرا کند.

<div dir='ltr' align='justify'>
 
```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

</div>

برای تست‌کردن این تابع ما می‌توانیم از یک
mock function 
استفاده کنیم و حالت 
mock
شده را بررسی کنیم تا مطمئن شویم که 
callback
مطابق انتظار فراخوانی شده باشد.

<div dir='ltr' align='justify'>
 
```js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);

```

</div>

## `mock` property 
تمام 
mock function
ها
property
ی
`mock.`
را دارند که تمام اطلاعات مربوط به اینکه تابع چگونه صدا زده شده است و مقادیر خروجی چه بوده است را نگه می‌دارد.
property
ی
`mock.`
همچنین مقدار
`this`
را برای هر بار فراخوانی تابع نگه می‌دارد، که این کار باعث می‌شود این بررسی بهتر انجام شود.

<div dir='ltr' align='justify'>
 
```js
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```

</div>

این قابلیت‌های 
mock
در هنگام تست بسیار کاربردی است  وقتی که بخواهیم در تست، طریقه‌ی صدا زده شدن تابع، نحوه‌ی نمونه‌گیری و یا مقادیر خروجی‌ای که برگردانده است را 
assert
کنیم.

<div dir='ltr' align='justify'>
 
```js
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

</div>

## Mock Return Values
همچنین از 
mock function 
ها می‌توان برای اضافه‌کردن مقدار‌تست به کد در زمان اجرای تست استفاده کرد.


<div dir='ltr' align='justify'>
 
```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

</div>

mock function
ها بسیار در کد کارا هستند وقتی که ما از یک تابع با استایل 
continuation-passing
استفاده می‌کنیم.نوشتن کد به این شیوه برای تست باعث می‌شود ما از نوشتن کدی که بیاید یک رفتار پیچیده را بسازد جلوگیری کنیم. برای این کار به راحتی می‌توانیم مقادیر خروجی را قبل از استفاده به صورت مستقیم به تابع 
mock
شده، تزریق
(inject)
کنیم.



<div dir='ltr' align='justify'>
 
```js
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]
```

</div>


در اکثر مثال‌های دنیای واقعی شما درگیر نگه‌داری 
mock function
هستید ولی در این روش به‌جای آنکه درگیر پیاده سازی تابعی شوید که قصد تست کردن آن را ندارید به راحتی می‌توانید مقادیر خروجی را به آن بدهید و به تست کردن بخش مورد نظر بپردازید.


## Mocking Modules
فرض کنید که یک کلاس داریم که 
users 
را از 
API
ی مان می‌گیرد. کلاس ما از 
[axios](https://github.com/axios/axios)
برای صدا زدن
API
استفاده می‌کند و سپس
`data`
را که شامل تمام
user
ها است باز می‌گردانیم.


<div dir='ltr' align='justify'>
 
```js
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;

```

</div>

حال ما می‌خواهیم بدون فراخوانی
API
متدمان را تست کنیم. در این‌جا ما می‌توانیم از 
`(...)jest.mock`
استفاده کنیم تا ماژول
axios
به صورت خودکار 
mock
شود.


در ابتدا با استفاده از 
`mockResolvedValue`
می‌گوییم که خروجی 
`get.`
را دیتایی قرار دهد که ما به آن می‌دهیم. در واقع ما می‌خواهیم که خروجی
`axios.get('/uses.json')`
داده‌ی
fake
ای باشد که ما به آن داده‌ایم.

<div dir='ltr' align='justify'>
 
```js
// users.test.js
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

## Mock Implementations
مواردی وجود دارد که در آن مشخص کردن مقدار خروجی به تنهایی کافی نیست و نیاز است که در آن تابع 
mock
شده، پیاده‌سازی جدیدی را بگیرد. این کار با استفاده از
`jest.fn`
یا
`mockImplementationOnce`
قابل انجام است.

<div dir='ltr' align='justify'>
 
```js
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

</div>

متد
`mockImplementation`
زمانی مفید است که شما به پیاده‌سازی پیشفرض از یک تابع
mock
که از یک ماژول دیگر آمده است، نیاز داشته باشید.

<div dir='ltr' align='justify'>
 
```js
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

</div>

زمانی که شما به ایجاد رفتار پیچیده از یک 
mock function
نیاز دارید که در آن فراخوانی‌ها، خروجی‌های گوناگون تولید می‌کنند،
`mockImplementationOnec`
به‌کار شما می‌آید.

<div dir='ltr' align='justify'>
 
```js
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

زمانی که پیاده‌سازی‌های اضافه شده به‌وسیله‌ی
`mockImplementationOnce`
تمام می‌شود، پیاده‌سازی پیشفرض که با
`jest.fn`
تعریف شده‌است ، اجرا می‌شود.
(در صورت تعریف).

<div dir='ltr' align='justify'>
 
```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

</div>

در مواردی که ما متد‌هایی داریم که به هم زنجیر شده اند
(یعنی در همیشه
`this`
را برمی‌گردانند)،
ما می‌توانیم از یک 
API
جالب برای ساده‌سازی استفاده کنیم.
این ساده سازی به‌وسیله‌ی 
`mockReturnThis`
انجام می‌شود.

<div dir='ltr' align='justify'>
 
```js
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

## Mock Names
شما می‌توانی به صورت اختیاری یک نام به تابع
mock
شده‌ی تان اختصاص دهید، که در هنگام مشکل در خروجی‌ی تست به‌جای
`jest.jn()`
نمایش داده شود.با این کار شما سریع‌تر می‌توانید 
mock function
ای را که سبب خطا شده است را پیدا کنید.

<div dir='ltr' align='justify'>
 
```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

</div>

## Custom Matchers
در نهایت، برای اینکه چک کردن فراخوانی‌های 
mock function
ها آسان‌تر شود، می‌توانید از 
matcher function
هایی که دراختیارتان قرارگرفته است استفاده کنید.

<div dir='ltr' align='justify'>
 
```js
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

این 
matcher
ها برای بررسی‌های رایج از 
property
ی
`mock.`
بسیار لذت‌بخش هستند.

شما می‌توانید به صورت دستی نیز این کارها را انجام دهید، اگر انجام دستی‌ی آنها برای شما لذت‌بخش تر است یا اینکه می‌خواهید کارهای خاص دیگری انجام دهید.


<div dir='ltr' align='justify'>
 
```js
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

برای دیدن لیست کامل این 
matcher
ها می‌توانید 
[داک اصلی](https://jestjs.io/docs/en/expect)
را چک کنید


</div>
