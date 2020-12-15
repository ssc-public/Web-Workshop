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

</div>
