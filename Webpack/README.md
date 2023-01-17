<div dir="rtl">

# webpack

<p align=center><img src="./images/icon.svg" width="25%" height="25%"></p>

## فهرست مطالب
- [مقدمه](#مقدمه)
- [نحوه استفاده](#نحوه-استفاده)
  - [ابزار کامندلاین](#webpack-cli)
  - [فایل های کانفیگ](#webpack-configuration-files)
- [لودر ها](#loaders)
- [منابع](#منابع)

## نویسندگان
- [نازنین آذریان](https://github.com/Nazhixx)
- [فاطمه عسگری](https://github.com/fatemeh-asgari)
- [پویا اسمعیلی](https://github.com/PouyaEsmaili)


<br/>

## مقدمه 
<p align=right style="text-align: justify;">
هنگام برنامه نویسی وب که میخواهیم کد های ما در 
browser 
به کاربر نمایش داده شود با محدودیت هایی روبرو هستیم:

1- ما در کد های خود از import استفاده میکنیم که توسط browser قابل فهم نیست.

2- درون کد ما یک گراف وابستگی به وجود میاید به این شکل که هر 
library که به آن وابستگی داریم میتواند به library های دیگری وابستگی داشته باشد. برای مدیریت این وابستگی های تو در تو به این صورت که مثلا چند بار کد های یکسانی را load نکنیم نیاز به ابزار داریم.

3- کد های تو در توی جاوااسکریپت ما عمدتا فایل های حجیمی میسازند که اگر بتوانیم آنها را بهینه کنیم load کردن آن برای کاربر آسان تر خواهد بود.

برای رفع این مشکلات bundler ها توسعه داده شده اند که وظیفه دارند از فایل های جاوا اسکریپت پروژه ما bundle file ایجاد کنند و در کنار آن گراف وابستگی ها را نیز مدیریت کنند تا خروجی بهسنه و قابل فهم برای browser در اختیار کاربر قرار دهیم و درگیر پیچیدگی های این چنینی که مدیریت آنها سخت است نشویم.

یکی از محبوب ترین bundler ها webpack است که یک ابزار open source   و رایگان است و قابلیت مدیریت جاوا اسکریپت،CSS ، HTML و تصاویر را دارد.
</p>

</br>

<p align=center><img src="./images/webpack-prosite.jpg" ></p>

## نحوه استفاده
### webpack cli
### webpack configuration files

## loaders
مقالات webpack ابزار هایی را معرفی میکند که استفاده از آنها در کنار webpack میتواندمفید باشد:
- responsive-loader:
</br>
<p align=right style="text-align: justify;"> از این ابزار برای ساخت صفحات وب responsive استفاده میشود. نحوه عملکرد آن به آن صورت است که از هر عکس سایز های مختلف متناسب با سیستم های مختلف میسازد تا هنگام نمایش در هر platform  به خوبی نشان داده شود. </p>

- babel-loader:
</br>
<p align=right style="text-align: justify;">
ازین ابزار برای تبدیل جاوا اسکریپت از ES6 به ES5 استفاده میشود.
</p>

- graphQL-loader:
</br>
<p align=right style="text-align: justify;">
این ابزار فایل های graphQL شامل اسکیما، کوئری ها و میوتیشن هارا load میکند و همچنین امکان فعال سازی ارزیابی را نیز محیا میکند.
</p>

## منابع
https://www.smashingmagazine.com/2021/06/getting-started-webpack/

https://youtu.be/5IG4UmULyoA

https://webpack.js.org/concepts/loaders/


</div>