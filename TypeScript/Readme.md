<h2 dir="rtl">مقدمه</h2>
<p dir="rtl">
تایپ‌اسکریپت (TypeScript) یک زبان برنامه‌نویسی چندسکویی، متن باز و کامپایلری است که توسط شرکت مایکروسافت توسعه داده شده و پشتیبانی می‌شود. تایپ‌اسکریپت یکی از زیرمجموعه‌های زبان جاوااسکریپت است که به شما کمک می‌کند تا کدهای خود را به روش ساده‌تری نوشته و سپس با کامپایل‌ کردن آن‌ها خروجی استاندارد کد جاوااسکریپت را به دست آورید.
</p>

<h2 dir="rtl">چرا تایپ اسکریپت</h2>
<p dir="rtl">
مزایای استفاده از زبان تایپ‌اسکریپت زمانی برای ما آشکارتر می‌شود که در پروژه‌های بزرگ ملزم به استفاده از جاوااسکریپت باشیم. تایپ‌اسکریپت به عنوان یک مجموعه جامع‌تر نسبت به زبان جاوااسکریپت ارائه شده و هدف آن کدنویسی آسان با کم‌ترین میزان خطا و استفاده از ویژگی‌های پیشرفته‌ی زبان‌های شی‌گرا، جهت نوشتن برنامه‌های سمت سرور و سمت کاربر است.
تایپ‌اسکریپت با کتابخانه‌های محبوب جاوااسکریپت مانند ReactJS سازگار است و پس از کامپایل، می‌توانید اطمینان حاصل کنید که خروجی نهایی کد شما با انواع مرورگرها سازگار خواهد بود.
</p>

<h2 dir="rtl">شروع کار با تایپ اسکریپت</h2>

<p dir="rtl">
ابتدا نیاز است Node.js را از طریق <a href="https://nodejs.org">این لینک</a> دانلود کرده و مراحل نصب را انجام دهید. و یا در لینوکس از دستور زیر استفاده کنید:
</p>

```bash
sudo apt install nodejs
```

<p dir="rtl">
سپس با استفاده از دستورات زیر بسته به نیاز خود تایپ‌اسکریپت را بر روی پروژه خود نصب کنید:
</p>

<details dir="rtl"><summary dir="rtl">نصب با npm</summary>
<p>
	
```bash
npm install -g typescript
```
	
</p>
</details>
<details dir="rtl"><summary dir="rtl">نصب با yarn</summary>
<p>
	
```bash
yarn add typescript
```
	
</p>
</details>
<details dir="rtl"><summary dir="rtl">راه‌اندازی پروژه React با تایپ‌اسکریپت</summary>
<p>
	
```bash
npx create-react-app my-app --template typescript
yarn create react-app my-app --template typescript
```
	
</p>
</details>

<h2 dir="rtl">مشخص کردن نوع متغیرها در تایپ‌اسکریپت</h2>
<p dir="rtl">
	انواع اصلی در TypeScript عبارتند از: String, Number, Boolean, Null, Undefined, Symbol و Void. در این زبان تمامی اعداد (صحیح و اعشاری و…) از نوع number هستند. کلاس‌ها، آرایه‌ها، توابع و آبجکت‌ها نیز انواع فرعی در این زبان هستند.
در این زبان 2 روش با نام‌های Type Annotation و Type Inference برای تعیین نوع متغیرها وجود دارد که در ادامه به آن‌ها می‌پردازیم.
</p>

<h2 dir="rtl">Type Annotation</h2>
<p dir="rtl">
	در این روش، برنامه‌نویس در ابتدا از نوع داده‌ی مورد نظر آگاه است بنابراین می‌تواند به طور مستقیم نوع متغیر را مشخص ‌کند.
همه اعداد توی جاوااسکریپت از نوع داده‌ای number هستن. تایپ‌اسکریپت علاوه بر اعداد decimal و hexadecimal، از اعداد binary (اعداد مبنای 2) و octal (اعداد مبنای 8) هم پشتیبانی میکنه.
</p>

```js
//number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

```js
//string
let name: string = "John Doe";
let sentence: string = `Hello, my name is ${ name }.
```

```js
//boolean
let isValid: boolean = true;
```

```js
//array
let listNumbers: number[] = [1,2,3];
let list: Array<number> = [1, 2, 3];
```

‍‍‍```js
//builtin types
let data: Date = new Date();
```

```js
//object literal
let point: {x:number, y:number} = {
          x: 10, 
          y: 15
};
```

```js
//classes
class Door{
	//some code here  
}
let door: Door = new Door();
```

```js
//function
const printIndex: (i: number) =˃ void = (i: number) =˃ {
	console.log(i);
};
```

<p dir="rtl">
	Null و Undefined به تنهایی کاربرد خاصی ندارن. این نوع‌ها، زیرنوع (sub type) همه نوع‌های دیگه هستن.
</p>

```js
//undefined
//null
let x: number;
x = 10; // ok
x = undefined; // ok
x = null; // ok 
x = "Hi"; // error
let nothing : undefined = undefined;
let nothing : null = null;
```

<h2 dir="rtl">استنتاج تایپ</h2>
<p dir="rtl">
	در این روش، نوع داده توسط برنامه‌نویس تعیین نمی‌شود و این تایپ اسکریپت است که وظیفه‌ی تعیین نوع متغیرها را بر عهده دارد. به این صورت که بنا بر مقداری که به متغیر اختصاص داده می‌شود، نوع آن توسط تایپ اسکریپت به آن متغیر اختصاص داده خواهد شد.
برای نمونه در مثال زیر نوع داده‌ای که به متغیر color اختصاص داده می‌شود، از نوع string خواهد بود.
</p>

```js
let color = “blue;”
```

<h2 dir="rtl">تعریف کلاس در تایپ اسکریپت</h2>
<p dir="rtl">
	برای اعلان کلاس ها در تایپ اسکریپت از عبارت کلیدی class استفاده می شود. سینتکس این کار در زیر آمده است.
</p>

```js
class Greeter {  
   greeting: string;   
  constructor(message: string) {    
     this.greeting = message;   
  }  
   greet() {     
    return "Hello, " + this.greeting;     
} }
let greeter = new Greeter("world");
```

<p dir="rtl">در تعریف کلاس موارد زیر باید لحاظ شود</p>

<ul dir="rtl">
	<li>Fields: به متغیری گفته می شود که در یک کلاس اعلان می شود. فیلدها بیانگر داده های مربوط به اشیاء هستند.</li>
	<li>Constructors: مسئول تخصیص حافظه به اشیاء کلاس هستند.</li>
	<li>Functions: بیانگر کارهایی هستند که یک شیء انجام می دهد. در بعضی مواقع به Function ها متد نیز گفته می شود.</li>
</ul>

<h2 dir="rtl"></h2>
<p dir="rtl">
</p>

<h2 dir="rtl"></h2>
<p dir="rtl">
</p>
