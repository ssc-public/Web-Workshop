<div dir = "rtl">

# راهنمای API Composition در Vue.js

API Composition در Vue.js یک روش قدرتمند برای سازماندهی و استفاده مجدد از منطق کامپوننت‌ها ارائه می‌دهد. با استفاده از
توابع API که import شده‌اند، توسعه دهندگان می‌توانند منطق کامپوننت‌ها را به شکل مؤثرتری تعریف کنند. در کامپوننت‌های فایل
تکی (SFCs)، اغلب از API Composition به همراه ویژگی `<script setup>` استفاده می‌شود، که به Vue اجازه می‌دهد تبدیل‌های
زمان کامپایل را انجام دهد. این امر منجر به کاهش کدهای قالبی می‌شود، زیرا importها و متغیرها/توابع تعریف شده در سطح
بالای `<script setup>` به طور مستقیم در تمپلیت قابل استفاده هستند.

## نمونه استفاده

در اینجا نحوه استفاده از API Composition و `<script setup>` در یک کامپوننت Vue آورده شده است:

</div>

<script setup>
import { ref, onMounted } from 'vue'

// تعریف یک state واکنش‌گرا const count = ref(0)

// تابعی برای تغییر state و راه‌اندازی به‌روزرسانی‌ها function increment() { count.value++ }

// هوک‌های چرخه حیات onMounted(() => { console.log(`تعداد اولیه ${count.value} است.`)
})
</script>


<template>
  <button @click="increment">تعداد: {{ count }}</button>
</template>






