<div dir="rtl">
<h1>
    Vue
</h1>

# نویسندگان
- احسان موفق
- پوریا صفایی
- مریم عسگری نژاد
<h1>
مقدمه
</h1>
به صورت خلاصه <a href="https://vuejs.org/">Vue</a> یک فریم‌ورک برای توسعه اپلیکیشن‌های سمت مرورگر بوده و 
فرایند توسعه را سریع می‌کند.
از فریک‌ورک‌های مشابه می‌توان به <a href="https://reactjs.org/">ReactJS</a>
و <a href="https://angular.io/">Angular</a>
اشاره کرد.
یکی از قابلیت‌های مهمی که ویو و سایر این فریم‌ورک‌ها در اختیار ما قرار می‌دهند ری‌اکتیو بودن است. ری‌اکتیو بودن بدین معناست
که با تفییر متغیر‌ها در سطح کد نمایش آن‌ها نیز در مرورگر به روز شده و نسخه جدید
این متغیر‌ها نمایش داده شوند.

<h1>
پیش‌نیاز‌ها
</h1>
باید دانش ابتدایی نسبت به JavaScript HTML و CSS داشته باشید و بتوانید از آن‌ها استفاده کنید.

<h1>
شروع
</h1>
یکی از مهم‌ترین قسمت‌های طراحی اپلیکیشن‌های فرانت‌اند درک صحیح ماژولار بودن یک صفحه است. به شکل دیگر هر صفحه از
کامپوننت‌هایی تشکیل شده است. نحوه جدا سازی این کامپوننت‌ها به صورت کلی مشخص است به طور مثال برای هدر در html از تگ 
<code> head </code>
استفاده می‌شود.
حال در ویو می‌توان بخش‌های مختلف یک سایت را با کامپوننت‌هایی مشخص پیاده‌سازی کرد که هر کامپوننت کار مخصوص به 
خود را انجام می‌دهد.
<br>
همانطور که پیش‌تر گفته شد یکی از اصلی‌ترین قابلیت‌های ویو ری‌اکتیو بودن اپلیکیشن شماست. برای اینکه ویو توانایی انجام چنین کاری را داشته باشد
به یک المنت در صفحه html شما نیاز دارد
<br>
یک اپلیکیشن ویو به صورت ساده در کد‌های زیر خلاصه می‌شود.

<div dir="ltr">

```javascript
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```


```vue
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
</div>
برای توضیح می‌تواند گفت که قابلیت ری‌اکتیو بودن بر روی یک <code>div</code>
به 
<code>id=app</code>
اعمال می‌شود و تمامی اپ ویو ما در این بخش قرار دارد.
با کلیک بر روی دکمه عدد نشان داده شده در صفحه هر بار یک بار زیاد می‌شود 
که همین نشان بر ری‌اکتیو بودن این اپلیکیشن دارد.
<br>
نگران باقی جزئیات نباشید همه را به صورت کامل توضیح خواهیم داد.
<br>

<h1>
کامپوننت‌ها
</h1>
در ویو می‌توان کامپوننت‌ها را در فایل‌هایی با اکستنشن 
<code>vue</code>
نوشت به این کامپوننت‌ها
Single File Components گفته می‌شود.
فایل‌های ویو به سه قسمت تقسیم می‌شوند:

- template (محتوایی همانند فایل‌های html دارد)
- script (بخش لاجیکال کامپوننت را تشکیل می‌دهد)
- style (کد‌های استایل در این بخش قرار می‌گیرند)


<div dir="ltr">


<code>App.vue</code>


```vue
<template>
  <div class="font-weight-bold">
    hello {{ message }}
  </div>
</template>

<script>
export default {
  data: () => ({
    message: 'world!' 
  })
}
</script>

<style>
.font-weight-bold {
  font-weight: bold;
}
</style>
```
</div>


هر بخش را در جای خود به شکل کامل توضیح می‌دهیم.

بخش script کامپوننت‌ها را به دو شکل زیر نوشته می‌شوند.
در هر کامپوننت می‌توان از هر کدام استفاده کرد و نیازی نیست در کامپوننت‌های یک پروژه از فقط از یکی از آن‌ها استفاده کرد.
- composition-api
- options-api
<br>
در این مقاله ما به روش options-api
می‌پردازیم.

<h1>
بخش‌ها
</h1>

<div dir="ltr">

[creating a vue application](createApp.md)  
[template syntax](templateSyntax.md)  
[reactivity fundamentals](reactivityFundamentals.md)  
[computed properties](reactivityFundamentals.md)  
[class and style bindings](classAndStyleBindings.md)  
[conditional rendering](conditionalRendering.md)  
[list rendering](listRendering.md)  
[event handling](eventHandling.md)  
[form input bindings](forms.md)  
[lifecycle hooks](lifecycleHooks.md)  
[watchers](watchers.md)  
[template refs](template-refs.md)  
[component basics](component-basics.md)  

</div>

</div> 
