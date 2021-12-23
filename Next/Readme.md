<div dir="rtl">

# NextJs
## مقدمه
توصیه میشه اول با کتابخونه‌ی [ReactJs][React-research] آشنا بشید، چون NextJs یک فریمورک (ساختاری با هدف ساده و بهتر کردن کار‌ها) روی این کتابخونه است.
<br/>
به طور خلاصه React یک کتابخونه javascript برای کد های frontend هست، که هدفش بهبود دادن ساخت user interface هاست و اینکارو با فیچر هایی مثل کامپوننت ها و هوک و ... انجام میده، Next هم یک فریمورک بر اساس React هست که کارش اسکیل پذیر کردن و راحت کردن کار برای پروژه های سنگینِ Reactی است.
<br/>
به  همین دلیل Next خودش را یک فریمورک React برای پروداکشن
می داند، زیرا فیچر های متعددی دارد که ساخت اپ های React توسعه پذیر را ساده کرده و بهبود می‌بخشد.
<img src="./images/whats_nextjs_academind.png" style="display: block;padding:5px; auto;padding-top:10px; width: 90%; margin-left: auto;margin-right: auto;">

## راه اندازی اولیه
برای ایجاد پروژه نیازمند [node.js][node.js] خواهید بود.
<br/>
پس از نصب node به سادگی می‌توانید با دستورات زیر پروژه Next خود را بسازید:
<div dir="ltr">

```
npx create-next-app@latest
# or
yarn create next-app
```
</div>
برای ساخت پروژه Typescript نیز از <span style="color:yellow">typescript--</span> استفاده کنید:

<div dir="ltr">

```
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```
</div>
پس از ساخت پروژه می‌توانید با دستورات زیر صفحه دیفالت ایجاد شده را مشاهده کرده و از صحت نصب اطمینان حاصل کنید:
<div dir="ltr">

```
npx run dev
# or
yarn dev
# then visit http://localhost:3000
```
</div>

## تفاوت های React و Next
ابتدا لازم است تفاوت کتابخانه (library) و فریمورک (framework) را بررسی کنیم:
<br/>
کتابخانه: یک کتابخانه عموماً مجموعه ای از توابع و کلاس‌هاست که با استفاده از آنها کاری را انجام می دهیم و پس از استفاده کنترل ادامه کار با خروجی آن تابع در هدایت خودمان است. ما در کدمان از کتابخانه استفاده می کنیم.
<br/>
فریمورک: یک فریمورک ساختار و فلو را شکل کلی می دهد و ما از جاهای خالی که برایمان در نظر گرفته برای پیاده سازی استفاده می‌کنیم. در اینجا فریمورک است که از کد ما استفاده می‌کند.
<br/>
 فریمورک قوانین و محدودیت های راه را تایین می کند و لایبراری وسیله است که در مسیر به کمک‌مان می‌آید.
در واقع فریمورک اسکلت را مشخص می کند و با استفاده از لایبراری می توانیم دور این اسکلت را پر کنیم.
<br/>
<br/>
تفاوت اصلی React و Next ، لایبراری بودن React و فریمورک بودن Next است که این فریمورک بودن با اینجاد ساختار مناسب قابلیت های زیادی ایجاد کرده مانند (Server Side Rendering) SSR که مزیت اصلی Next  است و هم (Search Engine optimiztion) SEO را بهبود می دهد. هم جابه‌جایی بین صفحات و فچ کردن داده ها را سریعتر می‌کند.
<br/>
دیگر امکانات Next که در React نیست:
<br/>
* سیستم روتینگ built-in بدون نیاز لایبراری مجزا
* جدا سازی کد و ایمپورت پویا (code-splitting - dynamic imports) 
* بخش API Routes برای ارتباط با سرور ها
* بهینه سازی فایل های استاتیک مانند عکس ها
</div>

[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org