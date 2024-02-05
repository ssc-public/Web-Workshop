<div dir="rtl">

# راهنمای Vue.js

Vue.js یک فریم‌ورک پیشرفته برای ساخت رابط کاربری است. این راهنما شما را با ویژگی‌های کلیدی Vue.js آشنا می‌کند، از جمله Composition API و Options API، به همراه مباحثی مانند انیمیشن و کامپوننت‌های داخلی.

## شروع سریع

### الزامات

قبل از شروع، اطمینان حاصل کنید که با مفاهیم اصلی JavaScript و HTML آشنا هستید.

### ایجاد یک اپلیکیشن Vue

برای شروع سریع، Vue CLI را نصب کرده و یک پروژه جدید ایجاد کنید:

<div dir="ltr">

```bash
npm install -g @vue/cli
vue create my-project

Template Syntax

Vue از یک سینتکس تمپلیت قدرتمند برای تعریف رابط کاربری استفاده می‌کند:

html

<template>
  <div>{{ message }}</div>
</template>
```

</div>

مبانی Reactivity

Vue با استفاده از سیستم واکنش‌پذیر خود، داده‌های اپلیکیشن را به روز نگه می‌دارد.
پراپرتی‌های Computed

پراپرتی‌های computed را برای محاسبات پویا بر اساس وابستگی‌های واکنش‌پذیر تعریف کنید:

<div dir="ltr">

```js

computed: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
</div>

#Composition API

در مقابل Options API، Composition API اجازه می‌دهد تا منطق کامپوننت‌ها را بهتر سازماندهی و قابل استفاده مجدد کنیم.
استفاده از Composition API

<div dir="ltr">

```vue

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```
</div>

#کامپوننت‌های داخلی

Vue کامپوننت‌های داخلی مانند <Transition> و <KeepAlive> را ارائه می‌دهد برای بهبود تجربه کاربری و بهینه‌سازی عملکرد.
Transition

کامپوننت <Transition> برای اعمال انیمیشن‌های ورود و خروج استفاده می‌شود:

<div dir="ltr">

```html

<Transition>
  <p v-if="show">سلام</p>
</Transition>
```
</div>

#Transition Classes

کلاس‌های CSS مختلفی در زمان‌های مختلف انیمیشن اعمال می‌شوند:

<div dir="ltr">

```css

.v-enter-active, .v-leave-active {
  transition: opacity 0.5s;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
```
</div>

<h1>
نتیجه‌گیری
</h1>
Vue.js ابزارهای قدرتمندی را برای ساخت رابط کاربری داینامیک و واکنش‌پذیر ارائه می‌دهد. با استفاده از Composition API و کامپوننت‌های داخلی، می‌توانید اپلیکیشن‌های پیچیده‌تر و قابل نگهداری‌تری بسازید.

</div>