<div dir="rtl">

# ثبت سراسری

می‌توانیم با استفاده از متد `.component()` یک کامپوننت را بصورت سراسری در اپلیکیشن Vue در دسترس قرار دهیم.

## نمونه کد:
<div dir="ltr">

```js
import {createApp} from 'vue'

const app = createApp({})

app.component('MyComponent', {
    // پیاده‌سازی کامپوننت
})
```
</div>
اگر از SFCها استفاده می‌کنید، با import کردن فایل‌های .vue می‌توانید کامپوننت‌ها را ثبت کنید.

<div dir="ltr">

```js

import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

</div>
متد .component() می‌تواند بصورت زنجیره‌ای استفاده شود.

<div dir="ltr">

```js

app.component('ComponentA', ComponentA)
    .component('ComponentB', ComponentB)
    .component('ComponentC', ComponentC)
```

</div>

کامپوننت‌هایی که بصورت سراسری ثبت شده‌اند در تمپلیت تمام کامپوننت‌های برنامه قابل استفاده اند. نمونه تمپلیت:

<div dir="ltr">

```html

<!-- این کامپوننت‌ها در تمام کامپوننت‌های دیگر برنامه قابل استفاده هستند -->

<ComponentA/>
<ComponentB/>
<ComponentC/>
```

</div>

<h1 dir="rtl">
ثبت محلی
</h1>

ثبت نام سراسری کامپوننت‌ها آسان است اما چند اشکال دارد:

ثبت کردن سراسری یک کامپوننت مانع build systemها می‌شود تا کامپوننت‌های استفاده نشده را شناسایی و حذف کنند (tree shaking)
. ثبت کردن سراسری باعث مبهم و نامشخص شدن روابط وابستگی در برنامه‌های بزرگ می‌شود. ثبت‌نام محلی دسترسی به کامپوننت‌های
ثبت‌شده را محدود به کامپوننت فعلی می‌کند. استفاده در script setup>:
<div dir="ltr">

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

</div>


<div dir="ltr">

```js

import ComponentA from './ComponentA.vue'

export default {
    components: {
        ComponentA
    },
    setup() {
        // ...
    }
}
```

</div>
<h1>
نحوه نام‌گذاری کامپوننت‌ها
</h1>

در این قسمت، ما از PascalCase برای ثبت‌نام کردن کامپوننت‌ها استفاده می‌کنیم. این روش به شناسایی بهتر کامپوننت‌ها در
تمپلیت کمک می‌کند و امکان استفاده از تگ‌ها در هر دو شکل PascalCase و kebab-case را فراهم می‌آورد.
</div>
