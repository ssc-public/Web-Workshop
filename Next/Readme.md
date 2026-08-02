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

برای ساخت پروژه Typescript نیز از <span style="color:#1232b3">typescript--</span> استفاده کنید:

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
<br/>

### بررسی فایل‌ها و دایرکتوری‌های ایجاد شده
<br/>


**فولدر public:**
<br/>
این دایرکتوری حاوی فایل‌های static است. به طور مثال اگر فایل img.png در این دایرکتوری وجود داشته باشد، برای دسترسی به آن در کد، می‌توانید به صورت زیر عمل کنید:



<div dir="ltr">

``` js
import Image from 'next/image'

function Avatar() {
  return <Image src="/img.png"/>
}

export default Avatar
```
</div>

فایل‌های موجود در این دایرکتوری از طریق browser قابل دسترسی هستند. به طور مثال میتوانید از http://localhost:3000/img.png این فایل را مشاهده کنید.
<br/>
<br/>

**فولدر styles:**
<br/>
فایل‌های css در این دایرکتوری قرار می‌گیرند. 
<br/>
globals.css بر روی همه‌ی صفحات و اجزاء اعمال می‌شود، این فایل در ```pages/_app.js``` استفاده شده است.
<br/>
سایر فایل‌های css باید به صورت 

<div dir="ltr">

```
[name].module.css
```
</div>

نام‌گذاری شود. (next از [CSS Modules][CSS-Modules] پشتیبانی می‌کند)
<br/>

**فولدر pages:**
<br/>
هر page یک component ری‌اکت است که باید در دایرکتوری pages قرار بگیرد. نام‌گذاری فایل‌ها مهم است زیرا در routing استفاده می‌شود.(این موضوع در بخش routing بیشتر توضیح داده شده است.)
<br/>
به طور مثال اگر فایل pages/about.js را بسازید میتوانید محتوای آن را در /about مشاهده کنید. همچنین فایل index.js به عنوان صفحه نخست وبسایت شما نمایش داده می‌شود.
<br/>
زمانی که از Next.js استفاده می‌کنید، ممکن است بخواهید کامپوننت App را دوباره بنویسید تا مواردی مانند persisting state یا global layouts را اعمال کنید. این کار را می‌توانید در فایل _app.js انجام دهید. 
<br/>
به طور مثال در کد زیر یک Layout دلخواه بر روی همه‌ی صفحات اعمال می‌شود:

<div dir="ltr">

``` js
import Layout from "../components/layouts/"

const MyApp = ({ Component, pageProps, auth }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
```
</div>
<br/>

## Routing
همان‌طور که اشاره شد Next.js سیستم routing بر اساس فایل را پیاده‌سازی کرده است. بدین صورت که با اضافه کردن یک فایل در دایرکتوری pages، به صورت اتوماتیک به عنوان route قابل دسترسی خواهد بود.

### انواع روش‌های routing

1. index routes
 
برای route کردن هر دایرکتوری کافی است از index.js استفاده کنیم.
 
- pages/index.js &#8594; /
- pages/blog/index.js &#8594; /blog

2. nested routes  
 
برای داشتن مسیرهای تودرتو می‌توان با ایجاد دایرکتوری‌های مختلف این کار را انجام داد.
 
- pages/blog/first.js &#8594; /blog/first
- pages/user/login/verify.js &#8594; /user/login/verify

3. dynamic routes  
 
در موارد مختلف نیاز داریم تا یک مسیر پویا داشته باشیم. به طور مثال فرض کنید بخواهیم پست‌های مختلف یک بلاگ را در صفحات مختلف نمایش دهیم. برای این کار می‌توانیم به صورت زیر عمل کنیم:
 
- pages/posts/[id].js &#8594; <span dir="rtl"> با /posts/1 و posts/first و موارد مشابه دیگر تطابق خواهد داشت. </span>

همچنین می‌توان از ... استفاده کرد که تنها ابتدای مسیر را بررسی خواهد کرد. به طور مثال pages/user/[...all].js با تمامی مسیرهایی که با /user/ شروع می‌شوند تطابق خواهد داشت.

**توجه:** موارد گفته شده نسبت به هم اولویت دارند. ترتیب اولویت با مثال:  
- pages/post/create.js &#8594; <span dir="rtl"> فقط با  /post/create تطابق دارد. </span>
- pages/post/[pid].js &#8594; <span dir="rtl"> با /post/1 و /post/abc و موارد مشابه تطابق دارد اما با /post/create تطابق ندارد.</span>
- pages/post/[...slug].js &#8594; <span dir="rtl">با /post/1/2 و /post/a/b/c و موارد مشابه تطابق دارد اما با /post/create و /post/abc تطابق ندارد. </span> 

### وصل کردن صفحات مختلف به یکدیگر
برای این‌کار می‌توان به صورت زیر عمل کرد:

<div dir="ltr">

``` js
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```
</div>

همچنین برای متصل کردن صفحات پویا می‌توان به صورت زیر عمل کرد:

<div dir="ltr">

``` js
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```
</div>

که در اینجا pathname نام صفحه در دایرکتوری pages است و query نیز شامل قسمت‌های پویای لینک می‌باشد.  

سوالی که در اینجا پیش می‌آید این است که چگونه در لینک‌های پویا پارامترها را از لینک بخوانیم. این کار را می‌توان به صورت زیر انجام داد.

<div dir="ltr">

``` js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { slug } = router.query

  return <p>Post: {slug}</p>
}

export default Post
```
</div>
در حقیقت userRouter().query شامل همه‌ی پارامترهای موجود در لینک است.

فرض کنید یک فایل به صورت pages/post/[pid].js داریم. در این صورت query مقادیر زیر را خواهد داشت:
- /post/abc &#8594; { "pid": "abc" }
- /post/abc?foo=bar &#8594; { "foo": "bar", "pid": "abc" }
- /post/abc?pid=123 &#8594; { "pid": "abc" }

همان‌طور که مشاهده می‌شود route parameters مقادیر query parameter را بازنویسی می‌کنند و اولویت بیشتری خواهند داشت.

اگر از ... در routing استفاده کرده باشیم، پارامتر مورد نظر به صورت لیست خواهد بود.  
به طور مثال برای فایل pages/post/[...slug].js  
- /post &#8594; { }
- /post/a &#8594; { "slug": ["a"] }
- /post/a/b &#8594; { "slug": ["a", "b"] }

## Pre-rendering
به صورت پیش‌فرض، Next.js هر page موجود در فولدر pages را pre-render می‌کند. در واقع Next.js به ازای هر page فایل HTMLای تولید می‌کند در صورتی که در ری‌اکت تنها یک فایل HTML داشتیم و بااستفاده از javascript در سمت کلاینت صفحات دیگر ساخته می‌شد.
هر HTML ساخته شده دارای کد جاوا اسکریپتی است و هنگامی که آن پیج load شود کد جاوا اسکریپت اجرا شده و باعث می‌شود که آن پیج interactive باشد.
<br/>
از آنجا که به ازای هر page (حتی صفحاتی که به صورت dynamic هستند) یک فایل HTML ساخته می‌شود باعث افزایش سرعت و همچنین SEO  و نتایج بهتر برای crawler ها و search engine ها مانند google و bing می‌شود.
<br/>
Next.js دو روش برای Pre-rendering در اختیار ما قرار می‌دهد که تفاوت آن‌ها در زمان ساخته شدن فایل HTML است. به توضیح کوتاهی در مورد هرکدام می‌پردازیم:

#### روش Static Generation

در این روش فایل HTML تنها یک بار در زمان ساخته شدن(build time) تولید می‌شود و به ازای هر ریکوئست از همان فایل HTML استفاده می‌شود. این روش توسط سازندگان Next.js پیشنهاد می‌شود.

اگر صفحه‌ای که نیاز داریم وابسته به دیتایی نباشد تنها کافی‌است در فولدر pages آن صفحه را ساخته تا در زمان build شدن HTML آن ساخته شود.

اما اگر صفحه ای که نیاز داریم وابسته به داده ای باشد می‌توان با نوشتن توابع  getStaticProps (برای استفاده از داده در محتویات صفحه) و getStaticPaths (برای استفاده از داده جهت تولید کردن dynamic paths) از داده خارجی استفاده کنیم. برای آشنایی با این توابع به قسمت <a href="#fetch">فچ کردن داده‌ها</a> مراجعه شود.

**چه زمانی از این روش استفاده کنیم؟**
برای جواب به این سوال باید بگوییم که بهتر است همیشه از این روش استفاده شود مگر اینکه داده ای که استفاده می‌کنیم به ازای هر ریکوئست متفاوت باشد. به عنوان مثال اگر صفحه‌ای داریم که به ازای هر user تنها کامنت‌هایی که آن شخص گذاشته است نمایش داده می‌شود و داده ها به ازای هر request متفاوت است دیگر این روش کارآمد نیست. در این صورت از روش دوم استفاده می‌کنیم.

#### روش Server-side Rendering

اگر صفحه‌ای که داریم از Server-side Rendering استفاده کند، فایل HTML آن به ازای هر request ساخته می‌شود. برای استفاده از این روش باید تابع getServersideProps پیاده‌سازی شود. این تابع به ازای هر ریکوئست در سمت سرور صدا زده می‌شود و از داده‌ی خروجی آن در page استفاده می‌شود. برای آشنایی بیشتر با این تابع به قسمت <a href="#fetch">فچ کردن داده‌ها</a> مراجعه شود.
## <div id="fetch">فچ کردن داده‌ها</div>
دو روش برای پیش رندر کردن (pre-rendering) در Next داریم و بر اساس هر کدام توابعی برای گرفتن داده ها در اختیار ماست:
 * static generation:<span dir="rtl"> در این روش در هنگام بیلد شدن page ساخته می‌شود.</span>
    * getStaticProps:<span dir="rtl"> هنگامی که محتویات صفحه به داده های خارجی وابسته است.</span>
    * getStaticPaths:<span dir="rtl"> هنگامی که مسیر url  صفحه به داده های خارجی وابسته است.‌<br/>(هنگام استفاده از  dynamic routing) </span>
 * SSR (server side rendering):<span dir="rtl"> در این روش با هر درخواست page ساخته می‌شود. </span>
    * getServerSideProps:<span dir="rtl"> با هر ریکوئست داده ها نیز گرفته می‌شوند. </span>

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


``` py
from flask import Flask
app = Flask(__name__)

dummy_users = [
    {"id": 1, "name": "Masih", "age": 20},
    {"id": 2, "name": "Amin", "age": 86},
    {"id": 3, "name": "Ali", "age": 9},
]


@app.route('/')
def index():
    return 'Server Works!'


@app.route('/users')
def get_users():
    return {'result': dummy_users}


@app.route('/users/<int:user_id>')
def get_user(user_id):
    matched = list(filter(lambda user: user["id"] == user_id, dummy_users))
    if len(matched) == 1:
        return {'result': matched.pop()}
    else:
        return {'result': None}
```
</div>
با اجرای دستور زیر سرور بکند شروع به کار می کند:
<div style="direction:ltr">

```
flask run
```
</div>
پس از راه اندازی سرور می توانید در http://localhost:5000/users و http://localhost:5000/users/id به داده های موجود دسترسی داشته باشید.
<br/>

## تابع getStaticProps (Static Generation)
 برای استفاده از تابع مورد نظر یک فولدر با نام users در فولدر pages پروژه نکست ایجاد کنید.
در این فولدر فایل index.jsx بسازید و درون آن قطعه کد زیر را کپی کنید. (با توجه به سیستم روتینگ نکست این کد در ادرس http://localhost:3000/users  رندر خواهد شد)

<div style="direction:ltr">

``` js
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
  const responseJson = await res.json();

  const users = responseJson.result;

  return {
    props: {
      users,
    },
  };
}

export default User;
```
</div>
این تابع هنگام build شدن پروژه سمت <span style="font-weight: bold">سرور </span>
 کال می شود و می تواند یک آبجکت ورودی داشته باشد و یک آبجکت خروجی دارد.
خروجی props می‌تواند شامل یک آبجکت باشد که به عنوان ورودی کامپوننت این فایل مورد استفاده قرار می گیرد. 
<br/>
در این مرحله از کد build گرفته و سپس آنرا start کنید. مشاهده می کنید که داده های صفحه users شامل ۳ کاربر خواهد بود. حال اگر یک کاربر به این داده ها اضافه کنید (در لیست dummy_users یک دیکشنری مانند کاربران موجود اضافه کنید) و سرور Flask را ری استارت کنید (ctrl+C و ران کردن دوباره) و صفحه را رفرش کنید مشاهده می شود که تغییری در داده ها ایجاد نمی ‌شود و لازم است دوباره سرور نکست build بگیرید و آنرا اجرا کنید تا اسم اضافه شده نمایش داده شود.<br/>
به صورت خلاصه:

<div style="direction:ltr">

```
yarn run build
yarn run start
# or npm instead of yarn
# visit http://localhost:3000/users/
# add {"id": 4, "name": "New", "age": 32} to dummy_users list
# restart Flask: ctrl+C + run flask
# visit Flask server http://localhost:5000/users/ to see New user
# visit Next page http://localhost:3000/users/
# No user named New :)
# stop server and build and start again
yarn run build
yarn run start
# New user appears!
```
</div>
با توجه به نحوه عملکرد این تابع بهتر است زمانی از این تابع استفاده کنیم که داده های مورد استفاده کاربر قبل درخواست او و در زمان بیلد موجود است.
<br/>
همچنین در مواردی که داده برای SEO حائز اهمیت است و یا بهتر است کش شود نیز این روش توصیه می‌شود. این داده ها به صورت عمومی کش می‌شود و بر اساس هر کابر نیست.
<br/>
همچنین توجه داشته باشید که اگر پروژه در حالت developement (yarn run dev)
ران شود. این تابع با هر ریکوئست کال می‌شود و عملکردش با پروداکشن متفاوت است.

## تابع getStaticPaths (Static Generation)

در این قسمت route های پویا مد نظر هستند. به طور مثال وقتی چندین کاربر در یک وبسایت وجود دارد و لازم است که در زمان build  اطلاعات تمام این کاربران رندر شود، در این حالت از تابع getStaticPaths به همراه تابع getStaticProps  در فایل تک کاربر (pages/users/[id].js) استفاده می‌کنیم.
<br/>
برای رندر شدن تک تک کاربران در زمان build همه ی آنها در سمت سرور دریافت شده و برای هر id یک فایل ساخته می‌شود و تا build بعدی همان فایل ها سرو خواهد شد. (در صورت نیاز به آپدیت شدن فایل صفحات از ISR یا Increamental Static generation استفاده می‌شود)
<br/>
از همان فایل server.py استفاده می‌کنیم، این‌بار  تابع get_user نیز علاوه بر get_users  مورد استفاده خواهد بود. <br/>
کنار فایل index.js در فولدر  users که در فولدر pages پروژه نکست ایجاد کردیم. فایل [id].jsx بسازید و درون آن قطعه کد زیر را کپی کنید. (با توجه به سیستم روتینگ نکست این کد در ادرس http://localhost:3000/users/[1,2,3,...] رندر خواهد شد)
<br/>

<div style="direction:ltr">

``` js
function UserDetail({ user }) {
  return (
    <div>
      <h1> {user.name} </h1>
      <h4> Age: {user.age} </h4>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/users");
  const responseJson = await res.json();

  const users = responseJson.result;
  \\ notice id should be string
  const paths = users.map(user => ({
    params: { id: `${user.id}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/users/${params.id}`);
  const responseJson = await res.json();

  const user = responseJson.result;

  return {
    props: {
      user,
    },
  };
}

export default UserDetail;
```
</div>
در اینجا با همان عملکرد تابع getStaticProps رو به رو هستیم که برای هر id رخ می دهد. می توانید باز داده ای اضافه کنید و ببینید که بعد از build گرفتن تغییری روی داده های رندر شده ایجاد نمی‌شود و برای اعمال تغییر دوباره باید build گرفته و استارت کنیم. <br/>
در واقع کار اصلی تابع getStaticPaths یافتن id هایی است که باید برای آنها pre-rendering صورت گیرد.<br/>
خروجی تابع getStaticPaths  شامل دو کلید ضروری paths  و fallback  است، paths تعیین می‌کند کدام صفحات باید pre-reder شوند.

<div style="direction:ltr">

``` js
return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  }
```
</div>
کلید fallback مشخص می کند در صورتی که صفحه خواسته شده موجود نبود چه اتفاقی بیافتد به طور مثال دیدیم که در حالت fallback:false در صورتی که صفحه از زمان build وجود نداشته باشد حاصل ریکوئست 404 خواهد بود. اما اگر fallback:true باشد نکست ابتدا یک پیج خالی pre-render شده بر می‌گرداند که در زمان build ساخته شده، سپس در سمت سرور به صورت ایستا و با استفاده از getStaticProps فایل های مورد نیاز مسیر درخواست شده را می‌سازد. وقتی ساخت فایل ها تمام شد آنها به browser سمت کلاینت فرستاده شده و به صورت اتوماتیک رندر می‌شوند. همزمان این path به لیست صفحات pre-render شده اضافه می شود و در ریکوئست های بعدی با صفحاتی که در زمان build ساخته شدند تفاوتی نخواهد داشت.<br/>
در حالتی که fallback:true است. next تصور می‌کند که صفحه وجود دارد و فقط در زمان بیلد رندر نشده است و اگر صفحه واقعا نا موجود باشد بعد از کال شدن getStaticProps، خروجی 404  خواهد شد.<br/>
حالت دیگر برای fallback حالت fallback:blocking است، این حالت نیز مانند حالت fallback:true عمل می‌کند با این تفاوت که صفحه خالی در لحظه ریکوئست فرستاده نشده و کاربر باید صبر کند تا صفحه خواسته شده در صورت وجود رندر شود. در این حالت یکبار SSR (که در ادامه امده) انجام شده و پس از سرو شدن بار اول دفعات بعدی مانند fallback:true  موجود خواهد بود. 
<br/>
برای بررسی حالت fallback:true از قطعه کد مقابل به جای کد قبلی استفاده کنید:
<div style="direction:ltr">

``` js
import { useRouter } from "next/router";

function UserDetail({ user }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1> {user.name} </h1>
      <h4> Age: {user.age} </h4>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/users/${params.id}`);
  const responseJson = await res.json();

  const user = responseJson.result;

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
  };
}

export default UserDetail;
```
</div>
در اینجا از هوک useRouter استفاده می‌کنیم تا وقتی پیج در حال ساخته شدن است صفحه لودینگ به کاربر نشان دهیم.<br/>
همچنین لازم است که در تابع getStaticProps در صورت ناموجود بودن کاربر خروجی notFound:true برگردانیم تا صفحه 404 نمایش داده شود.
<br/>
در اینجا دو کاربر با id های 1,2 در زمان build ساخته می‌شوند و کاربر های دیگر در صورت وجود در حالتی که درخواست شوند ساخته خواهند شد.<br/>
برای اینکه مدت طول کشیدن ساخته شدن صفحات را شبیه سازی کنیم کد server.py را بصورت مقابل تغییر دهید:

<div style="direction:ltr">

``` py
import time
# ... 
# rest unchanged but better add more users to test their pages :)
# ...
@app.route('/users/<int:user_id>')
def get_user(user_id):
    time.sleep(1)
    matched = list(filter(lambda user: user["id"] == user_id, dummy_users))
    if len(matched) == 1:
        return {'result': matched.pop()}
    else:
        return {'result': None}
```
</div>
مشاهده می‌شود که صفحات بعد از مدتی loading... دیده شده و از آن به بعد مثل صفحات زمان build سریع اند.


## تابع getServerSideProps (Server-side Rendering)
این تابع مشابه getStaticProps است با این تفاوت که رندر با هر ریکوئست انجام می شود.
<br/>
برای دیدن عملکرد این تابع از server.py و همان فایل index در فولدر pages/users استفاده می کنیم.
<br/>
قطعه کد مقابل را در فایل index.jsx کپی کنید:
 
<div style="direction:ltr">

``` js
function User({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:5000/users");
  const responseJson = await res.json();

  const users = responseJson.result;

  return {
    props: {
      users,
    },
  };
}

export default User;
```
</div>
حال اگر مثل کاری که با تابع getStaticProps کردیم در اینجا نیز به dummy_users عضو جدید اضافه کنیم. بر خلاف آنجا با هر رفرش کردن عضو های جدید دیده می‌شوند.
<br/>
بر اساس شرایط و کاربرد های مختلف هر کدام از روش های مطرح شده می ‌تواند سودمند باشد و کارایی و SEO را  بهبود بخشد.

### استفاده از revalidate  در getStaticProps
در این بخش به ISR یا Increamental Static Regeneration می پردازیم، وقتی می‌خوام صفحه ساخته شده در زمان بیلد آپدیت شود از revalidate  در خروجی تابع getStaticProps استفاده می‌کنیم.
<br/>
برای دیدن نحوه عملکرد این تابع باز هم از server.py و فایل pages/users/index.js استفاده خواهیم کرد. قطعه کد مقابل را در فایل index.js کپی کنید:

<div style="direction:ltr">

``` js
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
  const responseJson = await res.json();

  console.log(`at getStaticProps time: ${new Date()}`);
  const users = responseJson.result;

  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}

export default User;
```
</div>
در این حالت در هنگام build صفحه users با داده های اولیه ساخته می شود سپس اگر تغییری در dummy_users ایجاد کنید و server.py را ریستارت کنید، پس از مدتی اسامی جدید نیز قابل مشاهده خواهند بود.
<br/>
کلید revalidate باعث می‌شود با هر درخواست تابع getStaticProps تریگر شده و صفحه را از نو بسازد چون هزینه این عملیات بالاست عدد مقابل revalidate نشان می‌دهد پس از هر درخواست که getStaticProps را تریگر می‌کند چقدر صبر کنیم تا دوباره این تابع تریگر شود.
<br/>
به طور مثال اگر در t=0s یک درخواست به سرور بیاید صفحه شروع به ساخته شدن می‌کند پس از ساخته شدن به جای صفحه فعلی نمایش داده خواهد شد مثلا در t=5s صفحه آپدیت شده قابل دیدن خواهد بود حال اگر  تا t=10s هزار درخواست دیگر نیز بیاید پیج دوباره رندر نخواهد شد. و پس از t=10s مثلا در t=11s با درخواست بعدی دوباره باعث ساخت صفحه می‌شود.<br/>
برای مشاهده این قضیه می  توانید صفحه users را پشت هم به مدت 40-50 ثانیه رفرش کنید سپس اگر لاگ Flask را (همان جایی که flask run زدید) مشاهده کنید رکوئست های 
به سرور ۱۰ ثانیه یا بیشتر تفاوت دارند  
.
همچنین لاگ خود next  نیز بیانگر همین موضوع است.
</div>


[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org
[CSS-Modules]: https://github.com/css-modules/css-modules
[flask]: https://flask.palletsprojects.com/en/2.0.x/
[flask-doc]: https://medium.com/@onejohi/building-a-simple-rest-api-with-python-and-flask-b404371dc699
