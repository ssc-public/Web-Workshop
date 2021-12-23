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
<br/>

### بررسی فایل‌ها و دایرکتوری‌های ایجاد شده
<br/>

**public:**
<br/>
این دایرکتوری حاوی فایل‌های static است. به طور مثال اگر فایل img.png در این دایرکتوری وجود داشته باشد، برای دسترسی به آن در کد، می‌توانید به صورت زیر عمل کنید:

<div dir="ltr">

``` js
import Image from 'next/image'

function Avatar() {
  return <Image src="/img.png"/>
}

export default Avatar
```
</div>
فایل‌های موجود در این دایرکتوری از طریق browser قابل دسترسی هستند. به طور مثال میتوانید از http://localhost:3000/img.png این فایل را مشاهده کنید.
<br/>
<br/>

**styles:**
<br/>
فایل‌های css در این دایرکتوری قرار می‌گیرند. 
<br/>
globals.css بر روی همه‌ی صفحات و اجزاء اعمال می‌شود، این فایل در ```pages/_app.js``` استفاده شده است.
<br/>
سایر فایل‌های css باید به صورت 
<div dir="ltr">

```
[name].module.css
```
</div>

نام‌گذاری شود. (next از [CSS Modules][CSS-Modules] پشتیبانی می‌کند)
<br/>

**pages:**
<br/>
هر page یک component ری‌اکت است که باید در دایرکتوری pages قرار بگیرد. نام‌گذاری فایل‌ها مهم است زیرا در routing استفاده می‌شود.(این موضوع در بخش routing بیشتر توضیح داده شده است.)
<br/>
به طور مثال اگر فایل pages/about.js را بسازید میتوانید محتوای آن را در /about مشاهده کنید. همچنین فایل index.js به عنوان صفحه نخست وبسایت شما نمایش داده می‌شود.
<br/>
زمانی که از Next.js استفاده می‌کنید، ممکن است بخواهید کامپوننت App را دوباره بنویسید تا مواردی مانند persisting state یا global layouts را اعمال کنید. این کار را می‌توانید در فایل _app.js انجام دهید. 
<br/>
به طور مثال در کد زیر یک Layout دلخواه بر روی همه‌ی صفحات اعمال می‌شود:

<div dir="ltr">

``` js
import Layout from "../components/layouts/"

const MyApp = ({ Component, pageProps, auth }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
```
</div>
<br/>


## تفاوت های React و Next

</div>

[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org
[CSS-Modules]: https://github.com/css-modules/css-modules