#### تهیه کنندگان: امیرمحمد جزایری، مانی ابراهیمی، امیرمحمد شاهرضایی

# موضوع: Tailwind CSS

---

## مقدمه

ابزار Tailwind CSS یک فریم‌ورک **Utility-First** برای طراحی رابط کاربری است که با ارائهٔ مجموعه‌ای از کلاس‌های کوچک و تک‌وظیفه‌ای به شما اجازه می‌دهد بدون نوشتن CSS سفارشی زیاد، رابط‌های واکنش‌گرا، قابل سفارشی‌سازی و بهینه بسازید. برخلاف فریم‌ورک‌های مبتنی بر کامپوننت (مثل Bootstrap) که کامپوننت‌های از پیش‌ساخته‌ای ارائه می‌دهند، Tailwind به شما «آجرهای کوچک» می‌دهد تا هر طرحی را دقیقاً بسازید؛ همین فلسفه باعث انعطاف‌پذیری بالا و کاهش نیاز به override کردن استایل‌ها می‌شود.

---

## فلسفه و قابلیت‌های کلیدی Tailwind

### قابلیت Utility-First و ترکیب در markup

فلسفهٔ اصلی Tailwind این است که استایل‌ها را به قطعات کوچک تقسیم کند تا توسعه‌دهنده با ترکیب آن‌ها در HTML/JSX/Blade بتواند UI دلخواه را بسازد. هر کلاس تنها یک کار انجام می‌دهد: `p-4` برای padding، `text-sm` برای اندازهٔ متن، `bg-slate-200` برای پس‌زمینه و غیره. این مدل باعث می‌شود تغییرات ظاهر بسیار سریع و قابل ردیابی باشند و همچنین نگهداری در پروژه‌های بزرگ آسان‌تر شود.

### Variants: responsive، state و dark

ابزار Tailwind به‌صورت ساده و ترکیبی اجازه می‌دهد حالات مختلف را با یک پیشوند مشخص کنید؛ مثلاً `md:hover:bg-blue-500` یعنی «در breakpoint معادل یا بالاتر از md، هنگام hover پس‌زمینه آبی شود». همین‌طور `dark:` برای حالت تاریک یا `focus:`/`active:` برای حالات تعاملی وجود دارند که همهٔ آن‌ها را می‌توان با هم ترکیب کرد.[](https://tailwindcss.com/docs/dark-mode?utm_source=chatgpt.com)

### Just-In-Time (JIT) و arbitrary values

کامپایلر JIT باعث می‌شود Tailwind در زمان توسعه تنها کلاس‌هایی را تولید کند که واقعاً در سورس آمده‌اند، نه همهٔ کلاس‌های ممکن. این رویکرد خروجی را کوچک نگه داشته و امکاناتی مثل arbitrary values (مثلاً `w-[37px]` یا `bg-[#1da1f2]`) را عملی و سریع می‌کند؛ همچنین توسعهٔ سریع و پروتوتایپ‌زدن را بسیار بهبود می‌بخشد.[](https://tailwindcss.com/docs/just-in-time-mode?utm_source=chatgpt.com)

### Theme، Tokens و `@apply`

ابزار Tailwind یک لایهٔ تم/توکن دارد که از طریق `tailwind.config` قابل گسترش است؛ می‌توانید رنگ‌ها، فضاها، تایپوگرافی و breakpoints را تعریف کنید. دستور `@apply` اجازه می‌دهد مجموعه‌ای از utilityها را داخل یک کلاس سفارشی در CSS تجمیع کنید تا هنگام نیاز به component-style از مزایای utility باز هم بهره ببرید.

### افزونه‌های رسمی

افزونه‌های رسمی مثل `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio` امکانات سطح‌بالا و آماده برای موارد پرکاربرد فراهم می‌کنند (فرم‌ها، متن محتوا/پرس، نسبت تصویر و …). این افزونه‌ها توسط تیم Tailwind نگهداری می‌شوند و ساده نصب و استفاده می‌گردند.[](https://v3.tailwindcss.com/docs/plugins?utm_source=chatgpt.com)

---

## روش‌های نصب (مرور کامل و نکات هر روش)

#### 1) نصب با Vite — روش پیشنهادی برای پروژه‌های مدرن

برای پروژه‌های React، Vue، Svelte یا هر پروژه‌ای که Vite دارد، نصب Tailwind به‌عنوان پلاگین Vite یکی از روان‌ترین روش‌هاست: با این روش Tailwind کاملاً با dev server و pipeline Vite ادغام می‌شود و معمولاً نیاز به PostCSS مجزا نخواهید داشت. روند کلی: ایجاد پروژه Vite، نصب `tailwindcss` و پلاگین Vite مربوط، ایمپورت `@import "tailwindcss"` در CSS و اجرا. مثال‌ها و جزئیات در مستندات رسمی آمده است.[](https://v3.tailwindcss.com/docs/guides/vite?utm_source=chatgpt.com)
نمونهٔ گام‌به‌گام (React + Vite):

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install tailwindcss @tailwindcss/vite
# vite.config.ts در:
# import tailwindcss from '@tailwindcss/vite'
# plugins: [ tailwindcss() ]
# src/style.css  سپس:
@import "tailwindcss";
# main.jsx در:
import './style.css';
npm run dev
```

نکات مهم: مسیرهای `content` را در `tailwind.config` طوری تنظیم کن که فایل‌های JSX/TSX/HTML/Blade/Svelte شما پوشش داده شوند تا کلاس‌های استفاده‌شده اسکن شوند.

#### 2) نصب به‌عنوان پلاگین PostCSS (مناسب برای Next.js و pipelineهای PostCSS)

اگر پروژه‌تان PostCSS دارد یا فریم‌ورکی مثل Next.js استفاده می‌کنید، نصب Tailwind به‌صورت plugin در PostCSS روال رایج و توصیه‌شده است. معمولاً `tailwindcss` و `@tailwindcss/postcss` را نصب و در `postcss.config.mjs` آن را ثبت می‌کنید، سپس `@import "tailwindcss"` را در CSS گلوبال اضافه می‌کنید.[](https://tailwindcss.com/docs/installation/using-postcss?utm_source=chatgpt.com)
نمونهٔ پیکربندی `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### ۳) فریم ورک Next.js — راهنمای رسمی

فریم ورک Next.js مستندات رسمی و نمونه‌های آماده (including example repos) دارد؛ برای نصب معمولاً از PostCSS route استفاده می‌کنند یا از قالب رسمی `create-next-app -e with-tailwindcss` برای scaffold خودکار استفاده می‌شود. توجه کن که اگر از App Router استفاده می‌کنی مسیر import فایل CSS گلوبال متفاوت (مثلاً `app/globals.css`) خواهد بود.[](https://tailwindcss.com/docs/guides/nextjs?utm_source=chatgpt.com)

### ۴) فریم ورک‌های SvelteKit، Nuxt، Laravel و دیگر فریم‌ورک‌ها

برای هر فریم‌ورک راهنمای رسمی وجود دارد. در Laravel امروزه Vite به‌عنوان ابزار build اصلی توصیه می‌شود و docs ترکیب Vite+Tailwind را پوشش می‌دهند. SvelteKit و Nuxt نیز از پلاگین/guide مخصوص برخوردارند تا فایل‌های template (svelte/nuxt/vue) به‌درستی در content اسکن شوند. نکتهٔ کلیدی در همهٔ موارد صحیح پوشش دادن مسیرهای template به `content` است.[](https://tailwindcss.com/docs/installation/framework-guides?utm_source=chatgpt.com)

### ۵) Create React App (CRA) و Webpack

در پروژه‌هایی که CRA دارند و دسترسی مستقیم به Webpack ندارید، معمولاً از CRACO یا eject کردن استفاده می‌کنند تا PostCSS/Tailwind را اضافه کنند. این مسیر نسبت به Vite پیچیده‌تر و پرخطاتر است، اما با CRACO می‌توان بدون eject پیکربندی‌ها را تغییر داد.

### ۶) CDN / Tailwind Play (برای پروتوتایپ و آموزش)

اگر می‌خواهی خیلی سریع امتحان کنی یا نمونه‌ای در سند یا اسلاید نمایش دهی، Play CDN روش سریع و بدون build است. کافی است `<script src="https://cdn.tailwindcss.com"></script>` را در `<head>` قرار دهی و بلافاصله کلاس‌ها کار می‌کنند. اما این روش برای production توصیه نمی‌شود چون فایل کامل Tailwind لود می‌شود و JIT/scan محلی شما را ندارد.[](https://v3.tailwindcss.com/docs/installation/play-cdn?utm_source=chatgpt.com)

---

## نمونهٔ پیکربندی کامل و مثال‌های مفید

#### نمونهٔ `tailwind.config.js` پایه

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue,svelte,html}"],
  darkMode: "class", // یا 'media' بر اساس نیاز
  theme: {
    extend: {
      colors: {
        brand: "#1da1f2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
```

#### استفادهٔ عملی — کارت ساده

```html
<div
  class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
>
  <div class="md:flex">
    <div class="p-8">
      <h1 class="text-xl font-semibold text-gray-900">عنوان کارت</h1>
      <p class="mt-2 text-gray-600">توضیحات مختصر کارت اینجا قرار می‌گیرد.</p>
      <button
        class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        عمل
      </button>
    </div>
  </div>
</div>
```

#### مثال dark mode

```html
<body class="bg-gray-50 dark:bg-gray-900">
  <div class="text-gray-900 dark:text-gray-100">متن...</div>
</body>
```

---

## نکات پیشرفته، خطاهای متداول و رفع آن‌ها

#### چرا کلاس جدید دیده نمی‌شود؟ (چک‌لیست سریع)

اول مطمئن می‌شویم فایل/کامپوننتی که کلاس در آن نوشته شده در `tailwind.config` داخل `content` درج شده است. اگر کلاس‌ها به‌صورت داینامیک ساخته می‌شوند (`className={`text-${size}`}`) Tailwind معمولاً آن‌ها را تشخیص نمی‌دهد؛ برای این موارد از `safelist` در کانفیگ استفاده کن یا از مجموعهٔ مقادیر صریح استفاده کن. اگر هنوز هم مشکل بود سرور dev را ری‌استارت کن و لاگ‌ها را بررسی کن. این‌ها معمول‌ترین دلایل هستند.

#### مشکل با arbitrary values (مثلاً `w-[50%]`)

ویژگی‌های arbitrary values تحت JIT پشتیبانی می‌شوند اما اگر از string‌سازی داینامیک در runtime استفاده می‌کنید ممکن است توسط اسکنر تشخیص داده نشوند؛ بنابراین یا از مقادیر صریح یا safelist استفاده کنید.

#### ناسازگاری نسخه‌ها (Node / PostCSS / Tailwind)

قبل از آپگرید Tailwind یا PostCSS، چک کن Node و نسخه‌های peer dependencyها با نسخهٔ جدید سازگار باشند؛ بسیاری از مشکلات runtime و build ناشی از mismatch نسخه‌ها است. همیشه release notes رسمی را برای breaking changes بخوانید.

#### بهترین روش‌ها (best practices)

برای پروژه‌های جدید از Vite + Tailwind-plugin استفاده کن چون ساده، سریع و کم‌پیکربندی است. برای پروژه‌های Next.js یا مواردی که PostCSS لازم است، از مسیر plugin-PostCSS استفاده کن. از `tailwind.config` برای تعریف توکن‌های طراحی استفاده کن (radii, spacing, colors) و از `@apply` برای تعریف component-level styles زمانی که لازم است. برای قابلیت نگهداری، یک Design Token قابل‌اعاده و مستند بسازید.

---

## مثال عملی

برای اجرا کردن پروژه روی ماشینِ لوکال کافی است پس از باز کردن پوشهٔ پروژه این دستورات را اجرا کنید:

```sh
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه (dev)
npm run dev
```

پس از اجرای `npm run dev`، Vite یک سرور توسعه راه می‌اندازد و معمولاً آدرس را در ترمینال نشان می‌دهد (`http://localhost:5173/`). صفحه را در مرورگر باز کن تا نمونهٔ رابط کاربری را ببینی.
برای ساختِ خروجی production:

```sh
npm run build
# و برای دیدن خروجی محلی:
npm run preview
```

#### ساختار فایل‌ها

پوشهٔ پروژه شامل فایل‌ها و پوشه‌های زیر است:

- فایل `package.json` — اسکریپت‌ها و وابستگی‌ها. اسکریپت‌های مهم: `dev`, `build`, `preview`.
- فایل `vite.config.js` — پیکربندی پایهٔ Vite (اینجا فقط پلاگین React ثبت شده).
- فایل `index.html` — سند اصلی که ریشهٔ اپ (`<div id="root"></div>`) را دارد.
- فایل `src/main.jsx` — ورودی React؛ اینجا استایل کلی (`./style.css`) ایمپورت می‌شود و `App` رندر می‌گردد.
- فایل `src/App.jsx` — کامپوننت اصلیِ UI که مثالی از کارت‌ها، فرم، شبکهٔ responsive و سوییچ Dark Mode را نشان می‌دهد.
- فایل `src/style.css` — فایل CSS اصلی؛ شامل دستورات Tailwind (`@tailwind base; @tailwind components; @tailwind utilities;`) و یک کلاس نمونه `.btn` که با `@apply` ساخته شده.
- فایل `tailwind.config.cjs` — کانفیگ Tailwind: مسیرهای اسکن (`content`)، حالت dark (`darkMode`)، توکن‌های سفارشی و پلاگین‌ها (`@tailwindcss/forms`, `@tailwindcss/typography`).
- فایل `postcss.config.cjs` — پیکربندی PostCSS که Tailwind و Autoprefixer را اضافه می‌کند.
- فایل `README.md` — راهنمای خلاصهٔ پروژه

#### ### نحوهٔ فراخوانی Tailwind

در `src/style.css` دستور پایهٔ Tailwind آمده:

```css
@import "tailwindcss";
```

این دستور باعث می‌شود که قواعد پایهٔ مرورگر (normalize-like)، کامپوننت‌های آماده (چنان‌که تعریف شده) و تمام utilityهای Tailwind در خروجی قرار بگیرند. PostCSS + Tailwind در هنگام build یا در حالت dev (Vite) اینها را پردازش می‌کنند و CSS نهایی را تولید می‌کنند.

#### تعریف یک کامپوننت با `@apply`

در `src/style.css` یک کلاس نمونهٔ `.btn` ساخته شده:

```css
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200;
}
```

دستور `@apply` به تو اجازه می‌دهد که مجموعه‌ای از utility‌ها را در یک کلاس CSS تجمیع کنی. مزیتش این است که اگر چند جا همان دکمه استفاده شود، می‌توانی یک کلاس خواناتر داشته باشی و در عین حال از مزیت‌های utility-first استفاده کنی.

#### dark mode

در `tailwind.config.cjs` مقدار `darkMode: 'class'` تنظیم شده؛ یعنی حالت تاریک با اضافه کردن کلاس `dark` به عنصر ریشه (یا هر پدر) فعال می‌شود. در `App.jsx` پیاده‌سازی ساده‌ای برای سوییچ حالت تاریک داریم: حالت `dark` با `useState` کنترل می‌شود و اگر فعال باشد، div ریشه یک کلاس `dark` می‌گیرد، لذا همهٔ utilityهایی که پیشوند `dark:` دارند اعمال خواهند شد. این روش ساده و قابل کنترل است (مناسب برای toggle دستی و برای ذخیرهٔ حالت کاربر در localStorage هم قابل امتداد است).

#### responsive و grid

در بخش کارت‌ها و لیست کارت‌ها از کلاس‌های responsive و grid استفاده شده: مثلاً `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` به‌صورت خودکار تعداد ستون‌ها را براساس اندازهٔ صفحه تغییر می‌دهد. این همان قدرت Tailwind در تعریف layout با کلاس‌های کوچک است.

#### pluginهای forms و typography

در `tailwind.config.cjs` دو پلاگین رسمی اضافه شده‌اند:

- `@tailwindcss/forms` برای بهبود استایل فرم‌ها (input، textarea و…)
- `@tailwindcss/typography` برای محتوای طولانی و مقاله‌ای (prose)  
   این پلاگین‌ها استایل‌های مفید و مناسب را به صورت آماده اضافه می‌کنند و خیلی از کارهای تنظیم فرم و متن را ساده می‌سازند.

#### کانفیگ Tailwind

- مسیرهای `content` در `tailwind.config.cjs` تعیین می‌کنند که Tailwind چه فایل‌هایی را برای پیدا کردن کلاس‌ها اسکن کند. اگر فایل جدیدی اضافه کردی (مثلاً `components/**/*.jsx` یا `views/**/*.html`)، حتماً مسیر را به `content` اضافه کن تا کلاس‌ها در خروجی تولید شوند.
- اگر می‌خواهی یک رنگ دلخواه اضافه کنی، در بخش `theme.extend.colors` در `tailwind.config.cjs` رنگ را تعریف کنید:

```css
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "#0ea5a4";
      }
    }
  }
}
```

سپس می‌توانی در JSX از `bg-brand` یا `text-brand` استفاده کنی.

#### تغییرات و توسعهٔ سریع (workflow)

- در حالت dev (با `npm run dev`) Vite و Tailwind JIT به‌صورت زنده تغییرات را بررسی می‌کنند و CSS فقط برای کلاس‌های استفاده‌شده تولید می‌شود. در نتیجه اکثر تغییرات در JSX/CSS فوراً در مرورگر منعکس می‌شود.
- اگر کلاس جدیدی تعریف کردی ولی در صفحه ظاهر نشد، ابتدا بررسی کن که فایل حاوی آن کلاس در `content` فهرست شده باشد؛ سپس اگر هنوز مشکل بود سرور dev را ری‌استارت کنید.

#### نتیجه نهایی در لایت مود

![[Pasted image 20250910031635.png]]

#### نتیجه نهایی در دارک مود

![[Pasted image 20250910031714.png]]

---

## تفاوت‌های کلیدی Tailwind CSS v4

ابزار Tailwind CSS نسخهٔ ۴ یک به‌روزرسانی ساختاری و عملکردی است که با بازنویسی هسته، ادغام بهتر با الگوهای مدرن CSS و بهبود toolchain، تجربهٔ توسعه را سریع‌تر و قابل‌انعطاف‌تر می‌کند. به‌دلیل برخی تغییرات بازشکن، ارتقاء باید با برنامه‌ریزی و تست انجام شود.

1. **بازنویسی موتور و بهبود عملکرد**  
   هستهٔ پردازش بازطراحی شده و زمان‌های بیلد و بازسازی افزایشی (incremental rebuilds) به‌طور محسوسی کاهش یافته است؛ این تغییر خصوصاً در پروژه‌های بزرگ محسوس است.
2. ویژگی **JIT به‌صورت پیش‌فرض و ذاتی**  
   تولید Just-In-Time (JIT) اکنون بخشی اساسی از موتور است؛ در نتیجه فقط کلاس‌های استفاده‌شده تولید می‌شوند و پشتیبانی از مقادیر arbitrary روان‌تر است.
3. **تمرکز بر الگوی CSS-first و متغیرهای تم**  
   نگاشت توکن‌های تم به متغیرهای CSS آسان‌تر شده و امکان استفادهٔ مستقیم از توکن‌های طراحی در CSS-native فراهم گردیده است که یکپارچگی با استانداردهای مدرن CSS را افزایش می‌دهد.
4. **یکپارچه‌سازی ابزارها و تغییر در CLI**  
   جریان toolchain و ابزار خط فرمان به‌روز شده‌اند؛ بعضی تنظیمات/اسکریپت‌های رایج ممکن است نیاز به اصلاح یا بازبینی داشته باشند.
5. **افزودن و بهبود برخی Utilityها**  
   مجموعه‌ای از utilityهای جدید و اصلاحاتی در رفتار برخی کلاس‌ها اضافه شده که موارد رایج طراحی را بهتر پشتیبانی می‌کنند.
6. **اتکا به قابلیت‌های مدرن CSS**  
   استفادهٔ گسترده‌تر از ویژگی‌های مدرن مثل CSS variables و توابع ترکیب رنگ، که مزایای عملکرد و انعطاف‌پذیری را افزایش می‌دهد؛ اما در صورت پشتیبانی از مرورگرهای خیلی قدیمی نیاز به بررسی وجود دارد.

---

## منابع و مراجع (مهم‌ترین صفحات رسمی)

مستندات نصب و راهنماهای فریم‌ورک Tailwind بهترین منبع هستند و برای جزئیات هر روش حتماً آن‌ها را ببینید: راهنمای نصب با Vite، نصب به‌عنوان PostCSS plugin، راهنمای Next.js، Play CDN، توضیحات JIT و صفحهٔ plugins.

---

## پرسش‌های متداول

**آیا Tailwind برای پروژهٔ کوچک مناسب است؟**
بله — از CDN برای پروتوتایپ سریع استفاده کن. برای production بهتر است از build pipeline استفاده کنی تا خروجی فقط شامل کلاس‌های مورد نیاز شود.
**آیا HTML شلوغ نمی‌شود؟**
در پروژه‌های بزرگ ممکن است کلاس‌های زیادی داخل markup ببینی؛ با `@apply`، کامپوننت‌های کوچک و تعریف کلاس‌های تجمیعی (مثلاً `btn` با `@apply`) می‌توان این را کنترل کرد و رفتارها را قابل‌مدیریت نگه داشت.
**آیا می‌توانم از Tailwind در کنار یک CSS write-up سنتی استفاده کنم؟**
بله؛ می‌توان CSS سفارشی داشت و Tailwind را برای قسمت‌های سریع و تکرارشونده استفاده کرد. فقط مراقب conflicting specificity باشید.

---

## جمع‌بندی

ابزار Tailwind CSS ترکیبی از سرعت توسعه، کنترل طراحی و بهینه‌سازی خروجی را ارائه می‌کند: فلسفهٔ utility-first، variants انعطاف‌پذیر، JIT برای خروجی کوچک و arbitrary values برای آزادی طراحی، همه باعث شده Tailwind یکی از انتخاب‌های رایج برای پروژه‌های مدرن باشد. برای نصب، اگر از Vite استفاده می‌کنید پلاگین Vite راهِ ساده و یکپارچه است؛ اگر پروژه مبتنی بر PostCSS یا Next.js است از مسیر PostCSS استفاده کنید؛ برای پروتوتایپ سریع Play CDN مناسب است اما برای production توصیه نمی‌شود. مسیرهای `content`، مدیریت کلاس‌های داینامیک و هماهنگی نسخه‌ها سه نکته کلیدی هستند که اگر رعایت شوند تجربهٔ کار با Tailwind بسیار روان خواهد بود.
