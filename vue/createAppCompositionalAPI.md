<div dir="rtl">

# راهنمای ایجاد برنامه تک صفحه‌ای Vue

در این بخش به ایجاد اولیه یک برنامه تک صفحه‌ای Vue بر روی ماشین محلی خود می‌پردازیم (Single Page Application). پروژه
ایجاد شده از یک ابزار راه اندازی ساخت مبتنی بر Vite استفاده خواهد کرد و به ما امکان می‌دهد از کامپوننت‌های تک فایلی Vue
استفاده کنیم (SFCs).

## پیش نیازها

اطمینان حاصل کنید که شما یک نسخه به‌روز از Node.js را بصورت نصب شده دارید و دایرکتوری فعلی شما همان جایی است که قصد
ایجاد یک پروژه جدید را دارید.

## ایجاد یک پروژه جدید

دستور زیر را در خط فرمان خود اجرا کنید (بدون علامت `$`):

```sh
npm create vue@latest
```

این دستور ابزار رسمی ایجاد اولیه پروژه Vue به نام create-vue را نصب و اجرا خواهد کرد. شما با گزینه‌هایی برای قابلیت‌های
اختیاری مختلف مانند پشتیبانی از TypeScript و تست نویسی روبرو خواهید شد:
</div>

- ✔ Project name: … `<your-project-name>`
- ✔ Add TypeScript? … No / Yes
- ✔ Add JSX Support? … No / Yes
- ✔ Add Vue Router for Single Page Application development? … No / Yes
- ✔ Add Pinia for state management? … No / Yes
- ✔ Add Vitest for Unit testing? … No / Yes
- ✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
- ✔ Add ESLint for code quality? … No / Yes
- ✔ Add Prettier for code formatting? … No / Yes

<div dir="rtl">
این گزینه‌ها به شما اجازه می‌دهند تا پروژه‌ای را شکل دهید که دقیقا با نیازهای توسعه‌ی شما مطابقت دارد. اگر در مورد یک گزینه مطمئن نیستید، فعلاً با زدن enter برای انتخاب No آن را نادیده بگیرید.

## راه‌اندازی dev server

پروژه‌ی خود را با دستورات زیر راه‌اندازی کنید:
</div>


```bash
cd your-project-name
npm install
npm run dev
```
<div dir="rtl">
حالا شما باید اولین پروژه Vue خود را بصورت اجرا شده داشته باشید!
</div>