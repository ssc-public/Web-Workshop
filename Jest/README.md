<div align="center">
<img src="./images/jest.png" alt="Jest" width="200px">
</div>
<div dir="rtl">

# فریمورک Jest

##### نویسنده: فروزان ایرجی

## مقدمه

<div dir="rtl">
  Jest یک <a href="https://github.com/jestjs/jest">فریمورک متن باز</a> برای تست کدهای جاوااسکریپت است که توسط شرکت متا ساخته شده است. از این فریمورک برای نوشتن unit test های جاوااسکریپت و تست کردن کامپوننت‌های React استفاده می‌شود. همچنین با کمک این فریمورک می‌توان کدهای Vue.js, AngularJS, Node.js را نیز تست کرد.
  <br/>
  <a href="https://jestjs.io/">وب‌سایت رسمی Jest</a>
  <br/>
  <a href="https://devhints.io/jest">چیت‌شیت Jest</a>
</div>


## عناوین مطالب

- مزایای استفاده از Jest
- نحوه‌ی نصب
- مفاهیم اولیه‌ی ‌Jest
- مراحل تست پروژه‌ی ‌Node.js


## مزایای استفاده از Jest
- نصب راحت آن با کمک npm یا yarn
- اجرای سریع و جدای(ایزوله) تست‌کیس‌ها
- کنترل تست‌ها از طریق ‌CLI
- دارای مستندات کامل با مثال و کامیونیتی قوی

## نحوه‌ی نصب
قبل از انجام مراحل زیر از نصب JDK و Node.js روی سیستم‌تان اطمینان حاصل فرمایید.

۱. نصب Selenium Web Driver:
<div dir="ltr">
  
```
npm install selenium-webdriver
```
</div>
۲. نصب Jest:

- با استفاده از npm:
<div dir="ltr">
  
```
npm install --save-dev jest
```
</div>

- با استفاده از yarn:
<div dir="ltr">
  
```
yarn add --dev jest
```
</div>


## مفاهیم اولیه‌ی Jest

<div dir="rtl">
  <b>- Mock:</b> توابع ماک پیاده‌سازی تابع اصلی (تابعی که می‌خواهیم تست کنیم) را حذف می‌کنند و با استفاده از آن‌ها می‌توان به راحتی پارامترها و مقادیر بازگشتی تابع را کنترل کرد.
</div>
نحوه ساخت و صدا زدن تابع ماک:
<div dir="ltr">
  
```
const mockFunction = jest.fn();
mockFunction();
```
</div>

<div dir="rtl">
  <b>- Spy:</b> این مورد برای track کردن function callها است و مشخص می‌کند که آیا تابع مورد نظر به تعداد بار درستی و با پارامترهای درستی صدا زده شده است یا نه.
</div>
مثالی از spy:
<div dir="ltr">
  
```
export const moduleName = {
  methodToBeTest: () => {
    // method implementation
  }
};

const spy = jest.spyOn(moduleName, 'methodToBeTest');

// mock the method implementation
spy.mockImplementation(() => {
  // mock implementation
});

```
</div>


## مراحل تست پروژه‌ی ‌Node.js

۱. ساخت پروژه‌ی Node.js
<div dir="ltr">
  
```
npm init -y
```
</div>

۲. اضافه کردن Jest به پروژه

<div dir="ltr">
  
```
npm install --save-dev jest
```
</div>
بعد از نصب Jest باید تغییر زیر را در package.json اعمال کنیم:
<div dir="ltr">
  
```
"scripts": {
    "test": "jest"
},
```
</div>

۳. نوشتن تست برای تابع مورد نظر در فایلی جدا

۴. ران کردن تست
<div dir="ltr">
  
```
npm test
```
</div>





## منابع
<div>
  - <a href="https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/">Jest Testing: A Helpful, Introductory Tutorial</a><br/>
  - <a href="https://www.lambdatest.com/jest">Jest Tutorial: Complete Guide to Jest Testing</a>
</div>


