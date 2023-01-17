<div dir="rtl">

# Webpack

<p align=center><img src="./images/icon.svg" width="25%" height="25%"></p>

## فهرست مطالب
- [مقدمه](#مقدمه)
- [تاریخچه](#تاریخچه)
- [نحوه استفاده](#نحوه-استفاده)
  - [ابزار کامندلاین](#webpack-cli)
  - [فایل‌های کانفیگ](#مفاهیم-و-نحوه‌ی-استفاده-از-config-file)
- [لودرها](#loaders)
- [منابع](#منابع)

## نویسندگان
- [نازنین آذریان](https://github.com/Nazhixx)
- [فاطمه عسگری](https://github.com/fatemeh-asgari)
- [پویا اسمعیلی](https://github.com/PouyaEsmaili)


<br/>

## مقدمه 
<p align=right style="text-align: justify;">
در برنامه‌نویسی وب از آن‌جایی که کدهای ما در 
browser 
به کاربر نمایش داده می‌شود با محدودیت‌هایی روبرو هستیم:

1- ما در کدهای خود از import استفاده می‌کنیم که توسط browser قابل فهم نیست.

2- از آن‌جایی که در کد یک سری وابستگی به libraryهای مختلف وجود دارد و آن‌ها نیز ممکن است به یک سری library دیگر وابستگی داشته باشند، درون کد یک گراف وابستگی به وجود می‌آید.
برای مدیریت این وابستگی‌‌ها نیاز به یک ابزار داریم که در این امر به ما کمک کند؛ به طور مثال این ابزار می‌تواند از load شدن چندین باره‌‌ی کدهای یکسان جلوگیری کند.

3- کدهای تو در توی جاوااسکریپت ما عمدتا فایل‌های حجیمی می‌سازند که اگر بتوانیم آن‌ها را بهینه کنیم load کردن آن برای کاربر آسان‌تر خواهد بود.

برای رفع این مشکلات bundlerها توسعه داده شده‌اند که وظیفه دارند از فایل‌های جاوا اسکریپت پروژه ما bundle file ایجاد کنند و در کنار آن گراف وابستگی‌ها را نیز مدیریت کنند تا خروجی بهینه و قابل فهم برای browser در اختیار کاربر قرار دهیم و درگیر پیچیدگی‌های این‌چنینی که مدیریت آن‌ها سخت است نشویم.

یکی از محبوب‌ترین bundlerها Webpack است که یک ابزار open source   و رایگان است و قابلیت مدیریت جاوا اسکریپت،CSS ، HTML و تصاویر را دارد.
</p>

</br>

<p align=center><img src="./images/Webpack-prosite.jpg" ></p>

## تاریخچه
<p align=right style="text-align: justify;">
وب پک از اوایل سال 2014 توسعه پیدا کرد و از سال 2016 به محبوبیت رسید و تا این لحظه نیز محبوبیت خود را حفط نموده است.
مزیت وب پک نسبت به  bundler های  پیش از خود ترکیب bundling و complie  بود
که باعث سادگی بیشتر می شد.
Webpack مزیت های بیشتری هم دارداز جمله آنکه bundling و transfer فایل های non javascript را هم انجام میدهد. همچینین api های ساده تری نسبت به bundler های پیش از خود ارائه میدهد.( البته bundler های امروزی api  های ساده تری پیاده کرده اند.)
</p>
<p align=right style="text-align: justify;">
امروزه ابزار های بسیاری از قبیل create-react-app و next.js ازWebpack استفاده میکنند.
</p>
</br>

## نحوه استفاده

### Webpack CLI

<p align=right style="text-align: justify;">
برای استفاده از Webpack لازم است ابتدا command line interface آن را نصب کنید.
برای نصب در پروژه، کامند زیر را اجرا کنید:

```bash
npm install --save-dev Webpack Webpack-cli
```

سپس می‌توانید با استفاده از کامندهای زیر، Webpack را اجرا کنید:

```bash
npx Webpack
```

در ساده‌ترین حالت می‌توان ورودی entry را ست کرد تا به وسیله‌ی آن، Webpack بتواند نقطه‌ی شروع کار خود را پیدا کند.

```bash
npx Webpack --entry <entry>
```

برای مثال:

```bash
npx Webpack --entry ./script.js
```

همچنین می‌توان آدرس و نام فایل خروجی را نیز مشخص کرد:

```bash
npx Webpack --entry <entry> --output-path <output-path>
```

برای مثال:

```bash
npx Webpack --entry ./script.js --output-path ./dist
```

اگر این مقدار ست ننشود، به طور پیشفرض نیز آدرس فایل خروجی در پوشه‌ی dist قرار خواهد گرفت.

یکی دیگر از قابلیت‌های Webpack، بروزرسانی خودکار یا hot reloading است که به وسیله‌ی آن می‌توان در محیط developement، بدون نیاز به انجام build مجدد و تنها با ذخیره کردن فایل مورد نظر، Webpack را به طوری راه اندازی کرد که در صورت نیاز خودش مجددا عملیات build را انجام دهد.

برای استفاده از این قابلیت، کافی است از کامند زیر استفاده کنید:

```bash
npx Webpack watch
```

همچنین می‌توانید هر کدام از option های قسمت قبل را نیز در ادامه‌ی این کامند قرار دهید.

اگرچه می‌توان تنظیمات مورد نظر را با استفاده از option ها در command line انجام داد، اما برای تنظیمات پیچیده‌تر، بهتر است از فایل کانفیگ استفاده کنید.
در این حالت کافی است همه‌ی تنظیمات مورد نظر را در این فایل قرار داده و کامند اصلی را به شکل زیر اجرا کنید:

```bash
npx Webpack --config <config-file-path>
```

و چون معمولا این فایل با نام `webpack.config.js` بوده و در پوشه‌ی اصلی قرار دارد، کامند بالا به صورت زیر خواهد بود:

```bash
npx Webpack --config webpack.config.js
```

البته قبل از اجرای این دستور می‌توان با استفاده از دستور زیر از صحت فایل کانفیگ اطمینان حاصل کرد:

```bash
npx Webpack configtest <config-file-path>
```

</p>

### مفاهیم و نحوه‌ی استفاده از Config File

#### Entry
همانطور که در command line نیز می‌توانستیم از `entry` را مشخص کنیم، در فایل کانفیگ نیز می‌توانیم مقدار `entry` استفاده کنیم تا فایل یا فایل‌های اولیه را مشخص کنیم.

برای مثال می‌توانیم فایل زیر را داشته باشیم:

### webpack.config.js
```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```

#### Output
در این قسمت می‌توان محل قرار گیری و نام فایل‌های خروجی را مشخص کرد. برای مثال با استفاده از config زیر، ۲ فایل خروجی که از ۲ فایل ورودی ساخته شده‌اند خواهیم داشت.

### webpack.config.js
```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```

در این حالت ۲ فایل خروجی با آدرس‌های `dist/app.js` و `dist/search.js` خواهیم داشت.

## Loaders
<p align=right style="text-align: justify;">
مقالات Webpack ابزارهایی را معرفی می‌کند که استفاده از آن‌ها در کنار Webpack می‌تواند مفید باشد.
</p>
<p align=right style="text-align: justify;">
برای استفاده از این loaderها باید دو property به فایل کانفیگ Webpack اضافه کنیم:
</p>

<ol>
<li>test:</li>
<p align=right style="text-align: justify;">
نشان می‌دهد کدام فایل‌ها نیاز است منتقل بشوند.
</p>
<li>use:</li>
<p align=right style="text-align: justify;">
نشان می‌دهد از کدام loader باید برای انتقال استفاده کرد.
</p>
</ol>

### webpack.config.js
``` js
const path = require('path');
module.exports = {
  output: {
    filename: 'my-first-Webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
</br>

برخی loaderهایی که کنار Webpack استفاده می‌شوند:


- responsive-loader:
</br>
<p align=right style="text-align: justify;"> از این ابزار برای ساخت صفحات وب responsive استفاده می‌شود. نحوه عملکرد آن به آن صورت است که از هر عکس سایزهای مختلف متناسب با سیستم‌های مختلف می‌سازد تا هنگام نمایش در هر platform  به خوبی نشان داده شود. </p>

- babel-loader:
</br>
<p align=right style="text-align: justify;">
از این ابزار برای تبدیل جاوا اسکریپت از ES6 به ES5 استفاده می‌شود.
</p>

- graphQL-loader:
</br>
<p align=right style="text-align: justify;">
این ابزار فایل‌های graphQL شامل اسکیما، کوئری‌ها و میوتیشن‌ها را load می‌کند و هم‌چنین امکان فعال‌سازی ارزیابی را نیز مهیا می‌کند.
</p>

## منابع
https://www.smashingmagazine.com/2021/06/getting-started-Webpack/

https://webpack.js.org/concepts/

https://youtu.be/5IG4UmULyoA

https://Webpack.js.org/concepts/loaders/

https://Webpack.js.org/api/cli/

https://byteofdev.com/posts/bundlers/
</div>