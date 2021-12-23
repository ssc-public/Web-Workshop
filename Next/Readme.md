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

</div>

[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org