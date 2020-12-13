
<div dir='rtl' align='justify'>

# عناوین

- [راه‌اندازی و شروع](#راهاندازی-و-شروع)
- [اجرا از طریق command line](#اجرا-از-طریق-command-line)
- [تنظیمات اضافی](#تنظیمات-اضافی)
  - [ایجاد فایل با تنظیمات اولیه](#ایجاد-یک-فایل-تنظیمات-اولیه)
  - [اضافه‌کردن Babel](#اضافهکردن-babel)
  - [Using Webpack](#using-webpack)
  - [Using Parcel](#using-parcel)
  - [Using Typescript](#using-typescript)
- [Matchers](#matchers)
  - [Matcher های رایج](#matcher-های-رایج)
  - [truthiness](#truthiness)
  - [Numbers](#numbers)

## راه‌اندازی و شروع
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

## اجرا از طریق command line

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
`--notify`
موجب می‌شود تا پس از اجرای کامند، یک پیغام اطلاع‌رسانی نشان‌داده شود.

## تنظیمات اضافی

### ایجاد یک فایل تنظیمات اولیه

با اجرای دستور زیر،
Jest
با توجه به پروژه‌تان چند سوال از شما خواهد‌ پرسید و یک فایل با تنظیمات اولیه را ایجاد خواهد کرد.
<div dir='ltr' align='justify'>

```bash
jest --init
```
</div>

### اضافه‌کردن Babel

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

## Matchers
توابعی هستند که به ما اجازه می‌دهند مقادیر را در با روش های متفاوت تست کنیم.
این‌قسمت به معرفی چند عدد از پرکاربردترین 
Matcher
ها می‌پردازد. برای دیدن لیست کامل به
[`expect` API doc](ExpectAPI.md)
مراجعه کنید.

### Matcher های رایج
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
`.toBe(4)`
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

### Truthiness
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

### Numbers
بیشتر روش‌های مقایسه‌ی اعداد
</div>





</div>
