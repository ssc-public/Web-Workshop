<div dir="rtl">

# NextJs
## مقدمه
توصیه میشه اول با کتابخونه‌ی [ReactJs][React-research] آشنا بشید، چون NextJs یک فریمورک (ساختاری با هدف ساده و بهتر کردن کار‌ها) روی این کتابخونه است.
<br/>
به طور خلاصه React یک کتابخونه javascript برای کد های frontend هست، که هدفش بهبود دادن ساخت user interface هاست و اینکارو با فیچر هایی مثل کامپوننت ها و هوک و ... انجام میده، Next هم یک فریمورک بر اساس React هست که کارش اسکیل پذیر کردن و راحت کردن کار برای پروژه های سنگینِ Reactی است.
<br/>
به  همین دلیل Next خودش را یک فریمورک React برای پروداکشن
می داند، زیرا فیچر های متعددی دارد که ساخت اپ های React توسعه پذیر را ساده کرده و بهبود می‌بخشد.
<img src="./images/whats_nextjs_academind.png" style="display: block;padding:5px; auto;padding-top:10px; width: 90%; margin-left: auto;margin-right: auto;">

## راه اندازی اولیه
برای ایجاد پروژه نیازمند [node.js][node.js] خواهید بود.
<br/>
پس از نصب node به سادگی می‌توانید با دستورات زیر پروژه Next خود را بسازید:
<div dir="ltr">

```
npx create-next-app@latest
# or
yarn create next-app
```
</div>
برای ساخت پروژه Typescript نیز از <span style="color:yellow">typescript--</span> استفاده کنید:

<div dir="ltr">

```
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```
</div>
پس از ساخت پروژه می‌توانید با دستورات زیر صفحه دیفالت ایجاد شده را مشاهده کرده و از صحت نصب اطمینان حاصل کنید:
<div dir="ltr">

```
npx run dev
# or
yarn dev
# then visit http://localhost:3000
```
</div>

## تفاوت های React و Next
ابتدا لازم است تفاوت کتابخانه (library) و فریمورک (framework) را بررسی کنیم:
<br/>
کتابخانه: یک کتابخانه عموماً مجموعه ای از توابع و کلاس‌هاست که با استفاده از آنها کاری را انجام می دهیم و پس از استفاده کنترل ادامه کار با خروجی آن تابع در هدایت خودمان است. ما در کدمان از کتابخانه استفاده می کنیم.
<br/>
فریمورک: یک فریمورک ساختار و فلو را شکل کلی می دهد و ما از جاهای خالی که برایمان در نظر گرفته برای پیاده سازی استفاده می‌کنیم. در اینجا فریمورک است که از کد ما استفاده می‌کند.
<br/>
 فریمورک قوانین و محدودیت های راه را تایین می کند و لایبراری وسیله است که در مسیر به کمک‌مان می‌آید.
در واقع فریمورک اسکلت را مشخص می کند و با استفاده از لایبراری می توانیم دور این اسکلت را پر کنیم.
<br/>
<br/>
تفاوت اصلی React و Next ، لایبراری بودن React و فریمورک بودن Next است که این فریمورک بودن با اینجاد ساختار مناسب قابلیت های زیادی ایجاد کرده مانند (Server Side Rendering) SSR که مزیت اصلی Next  است و هم (Search Engine optimiztion) SEO را بهبود می دهد. هم جابه‌جایی بین صفحات و فچ کردن داده ها را سریعتر می‌کند.
<br/>
دیگر امکانات Next که در React نیست:
<br/>
* سیستم روتینگ built-in بدون نیاز لایبراری مجزا
* جدا سازی کد و ایمپورت پویا (code-splitting - dynamic imports) 
* بخش API Routes برای ارتباط با سرور ها
* بهینه سازی فایل های استاتیک مانند عکس ها

## فچ کردن داده‌ها
دو روش برای پیش رندر کردن (pre-rendering) در Next داریم و بر اساس هر کدام توابعی برای گرفتن داده ها در اختیار ماست:
* static generation: در این روش در هنگام بیلد شدن page ساخته می‌شود.
    * getStaticProps: هنگامی که محتویات صفحه به داده های خارجی وابسته است.
    * getStaticPaths: هنگامی که مسیر url  صفحه به داده های خارجی وابسته است.‌<br/>(معمولا با استفاده از  dynamic routing)
* SSR (server side rendering): در این روش با هر درخواست page ساخته می‌شود.
    * getServerSideProps: با هر ریکوئست داده ها نیز گرفته می‌شوند.

برای دیدن نحوه عملکرد این توابع ابتدا یک سرور بکند ساده برای گرفتن داده ها می سازیم.
<br/>
برای اینکار از [Flask][flask]
استفاده می کنیم. برای نصب flask و ایجاد venv کافیست دستورات زیر را اجرا کنید:
<div style="direction:ltr">

```
mkdir sandbox
cd sandbox
virtualenv .venv
source .venv/bin/activate
pip install Flask
touch server.py

export FLASK_ENV=development
export FLASK_APP=server.py
```
</div>
سپس کد زیر را در فایل server.py کپی کنید:
<div style="direction:ltr">

```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Server Works!'

@app.route('/users')
def get_users():
    return {'result': [
        {"id": 1, "name": "Masih"},
        {"id": 2, "name": "Amin"},
        {"id": 3, "name": "Ali"}
    ]}
```
</div>
با اجرای دستور زیر سرور بکند شروع به کار می کند:
<div style="direction:ltr">

```
flask run
```
</div>
پس از راه اندازی سرور می توانید در http://localhost:5000/users به داده های داده شده دسترسی داشته باشید.
<br/>

## تابع getStaticProps (Static Generation)
 برای استفاده از تابع مورد نظر یک فولدر با نام users در فولدر pages پروژه نکست ایجاد کنید.
در این فولدر فایل index.jsx بسازید و درون آن قطعه کد زیر را کپی کنید. (با توجه به سیستم روتینگ نکست این کد در ادرس http://localhost:3000/users  رندر خواهد شد)

<div style="direction:ltr">

```
function User({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:5000/users");
  console.log(res);
  const responseJson = await res.json()

  const users = responseJson.result

  return {
    props: {
      users,
    },
  };
}

export default User;
```
</div>
این تابع هنگام build شدن پروژه کال می شود و می تواند یک آبجکت ورودی داشته باشد و یک آبجکت خروجی دارد.
خروجی props می‌تواند شامل یک آبجکت باشد که به عنوان ورودی کامپوننت این فایل مورد استفاده قرار می گیرد. 
<br/>
در این مرحله از کد build گرفته و سپس آنرا start کنید. مشاهده می کنید که داده های صفحه users شامل ۳ اسم خواهد بود. حال اگر یک اسم به این داده ها اضافه کنید و سرور Flask را ری استارت کنید (ctrl+C و ران کردن دوباره) و صفحه را رفرش کنید مشاهده می شود که تغییری در داده ها ایجاد نمی ‌شود و لازم است دوباره سرور نکست بیلد بگیرید و آنرا اجرا کنید تا اسم اضافه شده نمایش داده شود.<br/>
به صورت خلاصه:

<div style="direction:ltr">

```
yarn run build
yarn run start
# or npm instead of yarn
# visit http://localhost:3000/users/
# add {"id": 4, "name": "New"} to get_users() result list
# restart Flask: ctrl+C + run flask
# visit Flask server http://localhost:5000/users/ to see New user
# visit Next page http://localhost:3000/users/
# No user named New :)
# stop server and do these again
yarn run build
yarn run start
# or npm instead of yarn
# New user appears!
```
</div>
با توجه به نحوه عملکرد این تابع بهتر است زمانی از این تابع استفاده کنیم که داده های مورد استفاده کاربر قبل درخواست او و در زمان بیلد موجود است.
<br/>
همچنین در مواردی که داده برای SEO حائز اهمیت است و یا بهتر است کش شود نیز این روش توصیه می‌شود. این داده ها به صورت عمومی کش می‌شود و بر اساس هر کابر نیست.

</div>


[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org
[flask]: https://flask.palletsprojects.com/en/2.0.x/
[flask-doc]: https://medium.com/@onejohi/building-a-simple-rest-api-with-python-and-flask-b404371dc699