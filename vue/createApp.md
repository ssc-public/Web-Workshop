<div dir="rtl">
<h1>
    ساخت اپلیکیشن ویو
</h1>

<h2>
نصب
</h2>  

روش‌های مختلفی برای استفاده از ویو وجود دارد که در 
<a href="https://vuejs.org/guide/quick-start.html#quick-start">داک اصلی</a>
به آن اشاره شده است.
در این داکیومنت صرفا به نصب به کمک پکیج‌منیجر اشاره می‌کنیم.
<br>
در ابتدا باید مطمئن شوید که
<a href="https://nodejs.org/en/">
<code>node</code>
</a>
در سیستم شما نصب شده باشد.
> ورژن نود باید ۱۶ یا بیشتر باشد.

دستور زیر را وارد کنید:

<div dir="ltr">

```bash
> npm init vue@latest
```

</div>

پس از وارد کردن این دستور به شما آپشن‌هایی برای نصب نشان داده می‌شود. از آنجا که به آن‌ها نیاز نداریم
<code>No</code>
وارد کرده و ادامه می‌دهیم.


<div dir="ltr">

```bash
✔ Project name: <your-project-name>
✔ Add TypeScript? No
✔ Add JSX Support? No
✔ Add Vue Router for Single Page Application development? No
✔ Add Pinia for state management? No
✔ Add Vitest for Unit testing? No
✔ Add Cypress for both Unit and End-to-End testing? No
✔ Add ESLint for code quality? No
✔ Add Prettier for code formatting? No

Scaffolding project in ./<your-project-name>...
Done.
```

</div>


پس از تمام شدن دستورات باید وارد روت پروژه شوید و پکیج‌های مورد نیاز را به کمک دستورات زیر نصب کنید.

<div dir="ltr">

```bash
> cd <your-project-name>
> npm i
```

</div>


یا به کمک yarn:

<div dir="ltr">

```bash
> yarn install
```

</div>


شما موفق شدید پروژه ویو خود را بسازید. برای شروع سرور دولوپمنت می‌توانید دستور زیر را اجرا کنید:

<div dir="ltr">

```bash
> npm run dev
```

</div>

یا به کمک yarn:

<div dir="ltr">

```bash
> yarn dev
```

</div>


حال به نوشتن اپلیکیشن میپردازیم.
هر اپلیکیشن ویو به کمک تابع
<code>createApp</code>
انجام می‌شود.
ورودی این تابع یا کامپوننت ریشه (روت)
ریشه پروژه می‌باشد (که از فایل‌های <code>vue.</code> ایمپورت می‌شود)
یا آپشن‌های کامپوننت ریشه می‌باشد.

<div dir="ltr"> 

```javascript
import { createApp } from 'vue'

const app = createApp({ /* root component options */ })

// import the root component App from a single-file component.
import App from './App.vue'

const app2 = createApp(App)
```
</div>

در رابطه با کامپوننت روت باید این توضیح داده شود که تمامی اپلیکیشن ما در این کامپوننت قرار می‌گیرد.
در اپلیکیشن‌های واقعی تعداد زیادی کامپوننت وجود دارند که همگی در کامپوننت ریشه قرار می‌گیرند و صفحه مورد نظر را تشکیل می‌دهند.

ساخت اپلیکیشن به تنهایی برای نمایش در مرورگر کافی نیست. باید اپلیکیشن خود را در یکم المان دام در صفحه رندر کنیم تا نمایش بیابد.
برای این کار از تابع <code>mount</code>
از آبجک <code>app</code>
استفاده می‌کنیم.

<div dir="ltr">

```html
<div id="app"></div>
```

```javascript
app.mount('#app')
```
</div> 


در این صورت ویو اپلیکیشن شما را در <code>div#app</code>
رندر می‌کند و تمامی قواعد خود را بر روی آن اجرا می‌کند.

</div>

