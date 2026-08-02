<h1>
گوش دادن به رویدادها:
</h1>

ما می‌توانیم از دستور v-on که معمولاً آن را با نماد @ نشان می‌ دهیم، برای گوش دادن به رویدادهای DOM و اجرای جاوا اسکریپت در هنگام راه‌اندازی استفاده کنیم. بصورت زیر از آن استفاده می کنیم:
   v-on:click="handler"یا با میانبر،  @click="handler" .

مقدار handler می تواند یکی از موارد زیر باشد:

هندلر ‌های درون خطی: جاوا اسکریپت درون‌خطی که هنگام راه‌اندازی رویداد اجرا می‌شود (شبیه به ویژگی Onclick بومی).

هندلر های متد: نام ویژگی یا مسیری که به متدی تعریف شده در کامپوننت اشاره می کند.

<h2>
هندلرهای درون خطی:
</h2>

هندلرهای درون خطی معمولاً در موارد ساده استفاده می شوند، به عنوان مثال:

```js
data() {
  return {
    count: 0
  }
}
```
```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<h2>
متد هندلرها:
</h2>

منطق بسیاری از هندلر‌های رویداد پیچیده‌تر خواهد بود، و احتمالاً با کنترل‌کننده‌های درون خطی امکان‌پذیر نیست. به همین دلیل است که v-on همچنین می‌تواند نام یا مسیر متدی را که می‌خواهید فراخوانی کنید، بپذیرد.

مثلا:
```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` inside methods points to the current active instance
    alert(`Hello ${this.name}!`)
    // `event` is the native DOM event
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

```html
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```

یک متد هندلر به طور خودکار شی DOM رویداد اصلی را دریافت می کند که آن را راه اندازی می کند - در مثال بالا، ما می توانیم به عنصر ارسال کننده رویداد از طریق event.target.tagName دسترسی داشته باشیم.

متد در مقابل تشخیص درون خطی:

کامپایلر تمپلیت با بررسی اینکه آیا مقدار رشته v-on یک شناسه معتبر جاوا اسکریپت یا مسیر دسترسی به پروپرتی است، متد هندلرها را شناسایی می کند. به عنوان مثال، foo ، foo.bar و foo['bar'] به عنوان متد هندلر در نظر گرفته می شوند، در حالی که foo() و count++ به عنوان هندلر های درون خطی در نظر گرفته می شوند.

روش های فراخوانی در هندلرهای درون خطی:

به جای اتصال مستقیم به نام متد، می‌توانیم متدها را در یک کنترلر درون خطی نیز فراخوانی کنیم. این به ما اجازه می دهد تا آرگومان های custom متد را به جای رویداد اصلی ارسال کنیم:
```js
methods: {
  say(message) {
    alert(message)
  }
}
```
```html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```


دسترسی به آرگومان رویداد در هندلر های درون خطی:

گاهی اوقات ما همچنین نیاز داریم که به رویداد DOM اصلی در یک هندلر درون خطی دسترسی داشته باشیم. می‌توانید با استفاده از متغیر $event خاص، آن را به یک متد ارسال کنید یا از یک arrow function درونی استفاده کنید:
```html
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```
```js
methods: {
  warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

فراخوانی event.preventDefault()  یا event.stopPropagation()  در ایونت هندلر یک نیاز بسیار رایج است. اگرچه ما می‌توانیم این کار را به راحتی در متد‌ها انجام دهیم، بهتر است که متد‌ها صرفاً در مورد منطق داده‌ها باشند تا اینکه با جزئیات رویداد DOM سروکار داشته باشند.

برای رفع این مشکل، Vue ، event modifier ها را برای v-on ارائه می کند. به یاد داشته باشید که modifierها پسوندهای دستوری هستند که با یک نقطه نشان داده می شوند.


•	.stop
•	.prevent
•	.self
•	.capture
•	.once
•	.passive

```vue
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>
```

```vue
<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>
```

```vue
<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>
```

```vue
<!-- just the modifier -->
<form @submit.prevent></form>
```

```vue
<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

<h2>
تغییر دهنده کلید :
</h2>
هنگام گوش دادن به رویدادهای صفحه کلید، اغلب باید کلیدهای خاصی را بررسی کنیم. Vue اجازه می دهد تا هنگام گوش دادن به رویدادهای کلیدی، modifier های کلیدی برای v-on یا @ اضافه کنید:

```vue
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
```

می‌توانید مستقیماً از هر نام کلید معتبری که از طریق KeyboardEvent.key در معرض دید قرار می‌گیرد، به‌عنوان اصلاح‌کننده با تبدیل آن‌ها به kebab-case  استفاده کنید.
```vue
<input @keyup.page-down="onPageDown" />
```
در مثال بالا، کنترل کننده تنها در صورتی فراخوانی می شود که $event.key برابر با 'PageDown' باشد.

نام مستعار کلیدی(key alias)
Vue نام مستعار را برای رایج ترین کلیدها ارائه می دهد:
•	.enter
•	.tab
•	.delete ("Backspace"همچنین)
•	.esc
•	.space
•	.up
•	.down
•	.left
•	.right

کلیدهای اصلاح کننده سیستم:

می‌توانید از اصلاح‌کننده‌های زیر برای فعال کردن keyboard even listener و mouse even listener فقط زمانی که کلید اصلاح ‌کننده مربوطه فشار داده شده است استفاده کنید:
•	.ctrl
•	.alt
•	.shift
•	.meta



اصلاح کننده های دکمه ماوس:

•	.left
•	.right
•	.middle


این اصلاح کننده ها کنترل کننده را به رویدادهایی که توسط یک دکمه خاص ماوس راه اندازی می شوند محدود می کنند.
