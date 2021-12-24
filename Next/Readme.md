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
<br/>

### بررسی فایل‌ها و دایرکتوری‌های ایجاد شده
<br/>

**public:**
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

**styles:**
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

**pages:**
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


## تفاوت های React و Next


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
- pages/posts/[id].js &#8594; با /posts/1 و posts/first و موارد مشابه دیگر تطابق خواهد داشت.

همچنین می‌توان از ... استفاده کرد که تنها ابتدای مسیر را بررسی خواهد کرد. به طور مثال pages/user/[...all].js با تمامی مسیرهایی که با /user/ شروع می‌شوند تطابق خواهد داشت.

**توجه:** موارد گفته شده نسبت به هم اولویت دارند. ترتیب اولویت با مثال:  
- pages/post/create.js &#8594; فقط با  /post/create تطابق دارد.
- pages/post/[pid].js &#8594; با /post/1 و /post/abc و موارد مشابه تطابق دارد اما با /post/create تطابق ندارد.
- pages/post/[...slug].js &#8594; با /post/1/2 و /post/a/b/c و موارد مشابه تطابق دارد اما با /post/create و /post/abc تطابق ندارد.  

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



</div>

[React-research]: https://github.com/mostafaghadimi/web_workshop/tree/master/React
[node.js]: https://nodejs.org
[CSS-Modules]: https://github.com/css-modules/css-modules