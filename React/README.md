<div dir="rtl">

# پیش‌نیازها

قبل از خواندن مطالب، مطمین شوید که [node js][1]  را روی کامپیوتر خود نصب کرده‌اید.
    
<div dir="ltr">

    node --version
    
</div>


حال باید پکیج `create-react-app` را با استفاده از دستور زیر نصب کنید:

<div dir="ltr">

    npm i -g create-react-app

</div>

هم‌چنین نصب پکیج pnpm هم بسیار توصیه می‌شود، چون باعث سریع‌تر نصب شدن پکیج‌ها می‌شود و از فضای دیسک بسیار کم‌تری استفاده می‌کند که توضیحات آن را در [این لینک][2] می‌توانید بخوانید.

<div dir="ltr">

    npm i -g pnpm

</div>

# راه‌اندازی پروژه

مزیت استفاده از پکیج `create-react-app` این است که ما هر بار نیاز به configure کردن پروژه React از ابتدا نداریم و این پکیج به صورت اتوماتیک configuration خاصی از پروژه را می‌سازد.

<div dir="ltr">

    create-react-app <app-name>

</div>

ساختار پروژه‌ای که با استفاده از این پکیج ساخته می‌شود به شکل زیر است:
<div dir='ltr'>

```
app-name
├── public
|    ├── favicon.ico
|    ├── index.html
|    └── manifest.json
├── src
|   ├── App.js
|   ├── App.css
|   ├── App.test.js
|   ├── index.js
|   ├── index.css
|   └── serviceWorker.js
├── .env
├── .gitignore
├── package.json
└── package.lock.json
```
</div>

که در ادامه برای راحتی هر چه بیش‌تر کار و دسترسی راحت‌تر به فایل‌ها در صورت بزرگ‌شدن پروژه از ساختار زیر استفاده می‌کنیم:

<div dir='ltr'>

```
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── component
│   ├── index.js
│   ├── serviceWorker.js
│   └── static
│       ├── css
│       │   └── some-css.css
│       └── fonts
│           ├── some-fonts.eot
```
</div>

نمونه‌ای از ساختار بالا را می‌توانید در [این‌جا][6] مشاهده کنید.

‌‌‌**پی‌نوشت:** برای آشنایی با configure کردن پروژه بدون استفاده از پکیج create-react-app می‌توانید لینک‌های زیر را ببینید:

[لینک یک][3] | [لینک دو][4] | [لینک سه][5]


# اشنایی با فولدر/فایل‌های پروژه

//TODO:

## package.json

## node-modules

## index.html

## serviceWorker.js

## manifest.json

## gitignore.

## .env

# JSX

نه کد HTML هست و نه String. در واقع می‌توانیم داخل `{}` از بسیاری از قابلیت‌های جاوا اسکریپت استفاده کنیم. به عبارت دیگر داخل آن می‌تواند:

۱. اسم متغیر باشد. 

<div dir="ltr">

```Javascript
var tutorialName = "React"
...

<div>
    Let's say hello {tutorialName}!
</div>
```
</div>

۲. تابع صدا زده شود. 

<div dir="ltr">

```Javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```
</div>

مطالب بیش‌تر در مورد JSX را می‌توانید [این‌جا][7] بخوانید.

# Component

# Prop

# State

# Life Cycle

# Event Handlers and Forms

# Refs

</div>

[1]: https://nodejs.org/en/download/
[2]: https://github.com/pnpm/pnpm
[3]: https://dev.to/kris/how-to-set-up-a-react-project-from-scratch-4ob
[4]: https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32
[5]: https://codeburst.io/setting-up-a-react-project-from-scratch-d62f38ab6d97
[6]: https://github.com/mostafaghadimi/reactstarter
[7]: https://reactjs.org/docs/introducing-jsx.html