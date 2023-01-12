<div dir="rtl">
<h1>
    مقدمات پویایی اپلیکیشن
</h1>

همانطور که پیش‌تر اشاره شد یکی از مهم‌ترین
کارایی‌های ویو پویایی اپلیکیشن‌های نوشته شده با آن است
یعنی تغییر متغیری در برنامه منجر به تغییر <code>DOM</code>
شود.
<br>
همانطور که پیش‌تر گفته شده در ویو می‌توان به دو روش بخش 
<code>script</code>
را نوشت. ولی در این بخش ما به یک روش برای توضیح بسنده می‌کنیم:

<h2>
Options API
</h2>
برای تعریف متغیر‌های ری‌اکتیو یا پویا در بخش اسکریپت خود از
اتریبیوت
<code>data</code>
استفاده می‌کنیم:

<div dir="ltr">

```vue
<script>
export default {
  data() {
    return {
      count: 1
    }
  },
}
</script>
```
</div> 

همانطور که متوجه شدید <code>data</code>
یک تابع است که یک آبجکت را برمی‌گرداند این آبجکت خاصیت پویایی دارد و 
ویو متوجه هر تغییری در آن می‌شود و می‌تواند تغییرات خود را تمپلیت ایجاد کند.

>توجه کنید که <code>data</code> حتما باید یک تابع باشد در غیر اینصورت برای استفاده‌های 
> چند باره از یک کامپوننت به مشکل می‌خورید!

ویو به صورت اتوماتیک تمامی مقادیر ریترن شده از فانکشن دیتا را به <code>this</code>
که همان آبجکت کامپوننت ما بوده اضافه می‌کند؛ در این صورت می‌توان از آن‌ها در جای ‌جای کامپوننت استفاده کرد.
چه در بخش تمپلیت و چه در بخش اسکریپت.

<h5>
تابع‌ها
</h5>
هر کامپوننت نیازمندی‌هایی دارد که به کمک توابع تعریف شده می‌توان
آن‌ها را مرتفع کرد.
برای تعریف توابع در کامپوننت‌های ویو به شکل زیر عمل می‌کنیم:

<div dir="ltr">

```vue
<script>
export default {
  data() {
    return {
      count: 1
    }
  },
  methods: {
    increment() {
      this.count += 1
    }
  }
}
</script>
```
</div> 

تابع <code>increment</code>
در کامپوننت بالا تعریف شده است.
این تابع مقدار 
<code>count</code>
را یک واحد افزایش می‌دهد

> توجه کنید که برای تعریف توابع از <code>array functions</code>
> پرهیز کنید. زیرا در اینگونه توابع دیگر به <code>this</code> دسترسی ندارید.

</div>
