# GraphQL Core

<p dir="rtl" style="position:right;">
در این بخش با  یکسری مفاهیم و کلید واژه های اصلی 
graphql 
 به طور مختصر و مفید آشنا میشویم . 
</p>

- [GraphQL Core](#graphql-core)
  - [Fields](#fields)
  - [Arguments](#arguments)
  - [Aliases](#aliases)
  - [Fragments](#fragments)
  - [Operations](#operations)
  - [Variables](#variables)
  - [Directives](#directives)
  - [Mutations](#mutations)
  - [Subscription](#subscription)
  - [Schema](#schema)
  - [Types](#types)
    - [Query, Mutation and Subscription Types](#query-mutation-and-subscription-types)
    - [Scalar Types](#scalar-types)
    - [Enumeration types](#enumeration-types)
    - [Lists And Null](#lists-and-null)
    - [Interface](#interface)
    - [Union types](#union-types)
    - [Input Types](#input-types)
<br>

## Fields
<p dir="rtl" style="position:right;">
فیلد ها در 
graphql
به طور کلی تمام چیز هایی در یک operation هستند که میخوام از سمت سرور یا کاربر دریافت کنیم. در اصل بعد از پردازش هر operation به جای فیلد ها مقادیر مورد نظر آنها بنابر شمای داده ای که طراحی کرده ایم قرار میگیرند.<br/>
به عنوان مثال فرض کنید که میخواهیم یک سرویس ایمیل را با graphql پیاده سازی کنیم. هنگامی که کاربر با یک آیدی مشخص (مثلا ۱۱۱۱۱۱۱) وارد پنل کاربری خود میشود, ما به نام , سن و آدرس ایمیل کاربر نیاز داریم تا آنها به کاربر نشان دهیم. بنابراین query مربوطه به شکل زیر خواهد بود که در آن تمامی کلید واژه های user , name , age , email همان فیلد هایی هستند که ما به سرور میفرستیم تا مقادیر آنها را برگرداند.  
</p>

```graphql
{
    user(id: "1111111") {
        name
        age
        mailAddress
    }
}
``` 
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش در سرور به شکل زیر به فرمت JSON بازگردانده میشود :
</p>

```graphql
{
    "user": {
        "name": "ali",
        "age": 22,
        "mailAddress": "ali64@gmail.com"
    }
}
``` 
<p dir="rtl" style="position:right;">
از آنجایی که graphql یک زبان پرسش (query language) میباشد. اساسا شالوده زبان انتخاب یکسری فیلد از یکسری آبجکت میباشد. تمامی فیلد ها و آبجکت ها در این زبان دارای تایپ مخصوص به خود هستند. به عنوان مثال در سرویس ایمیل میخواهیم نام تمامی کاربران را با یک query دریافت کنیم :
</p>

```graphql
{
    user {
        name
    }
}
``` 
<p dir="rtl" style="position:right;">
هنگامی که قطعه کد بالا به سمت سرور میرود و در آنجا پردازش میشود, مراحل زیر طی میشود :
</p>
<ul dir="rtl">
1 : اجرا از آبجکت ریشه (root) شروع میشود.<br>
2 : فیلد user از آن آبجکت ریشه (root) انتخاب میشود.<br>
3 : مرحله دوم یک آبجکت از نوع user به ما میدهد, از آن آبجکت فیلد name انتخاب میشود.<br>
</ul>
<p dir="rtl" style="position:right;">
در تمامی مراحل بالا هر فیلد و آبجکتی که بدست میاید نوع و type مخصوص به خود را دارد.
</p>

## Arguments
<p dir="rtl" style="position:right;">
یکی از نقاط قوت graphql امکان استفاده از آرگومان ها در operation به صورت گسترده است. در REST تنها میتوان یک مجموعه از آرگومان ها را منتقل کرد, در حالی که در graphql میتوان روی تمامی فیلد ها چندین مدل آرگومان و پارامتر تعریف کرد. <br/>
به عنوان مثال در همان سرویس ایمیل بخش قبلی اگر بخواهیم نام , ادرس ایمیل و شماره تلفن تمامی کاربران مردی  که به کاربر با آیدی ۱۱۱۱۱۱۱ از سرویس جیمل گوگل ایمیل فرستاده اند را به اون نشان دهیم.
</p>

```graphql
{
    user(id: "1111111") {
       recievedMails (sex: MALE, service: "gmail.com"){
           name
           phoneNumber
           mailAddress
       }
    }
}
``` 
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش در سرور به شکل زیر بازگردانده میشود :
</p>

```graphql
{
    "user": {
        "recievedMails": [
            {
                "name": "ali",
                "phoneNumber": "09123126754",
                "mailAddress": "ali64@gmail.com"
            },
            {
                "name": "hossein",
                "phoneNumber": "09123123475",
                "mailAddress": "hossein85@gmail.com"
            },
            {
                "name": "kami",
                "phoneNumber": "09125878944",
                "mailAddress": "kamiko@gmail.com"
            }
        ]
    }
}
``` 

<p dir="rtl" style="position:right;">
همان طور که در مثال بالا مشهود است آرگومان ها نیز همانند فیلد ها میتوانند با توجه به طراحی سیستم type های متنوع ای داشته باشند.
</p>

## Aliases
<p dir="rtl" style="position:right;">
اگر بخواهیم در مثال سرویس ایمیل برای یک کاربر با آیدی ۱۱۱۱۱۱۱ نام تمامی اشخاصی که در لیست تماس او قرار دارند و از سرویس جیمیل و یاهو استفاده میکنند را به اون نشان دهیم. بدین منظور query زیر را مینویسیم اما با ارسال این query به خطا برمیخوریم.
</p>

```graphql
{
    user(id: "1111111") {
       contactList{
           user(service: "gmail.com") {
               name
           }
           user(service: "yahoo.com") {
               name
           }
       }
    }
}
``` 
<p dir="rtl" style="position:right;">
برای فهمیدن علت خطا باید ببینیم وقتی که دو فرد با نام یکسان ولی سرویس های متفاوت ایمیل در لیست تماس فرد وجود داشته باشند و query بالا پردازش بشود به چه چیزی در سمت سرور تبدیل میشود.
</p>

```graphql
{
    "user": {
        "contactList": [
            "user": {
                "name": "ali"
            },
            "user": {
                "name": "ali"
            }
        ]
    }
}
``` 
<p dir="rtl" style="position:right;">
با کمی دقت متوجه خواهیم شد از آنجایی که داده های متفاوت در یک فیلد ریخنه خواهند شد به اصطلاح به conflict برمیخوریم و qraphql به ما ارور میدهد. برای مشکلات اینچنینی در graphql از نام مستعار یا aliases استفاده میکنیم. مثال بالا به شکل درست با استفاده از aliases به شکل زیر تبدیل خواهد شد. 
</p>

```graphql
{
    user(id: "1111111") {
       contactList{
           gmailUsers: user(service: "gmail.com") {
               name
           }
           yahooUsers: user(service: "yahoo.com") {
               name
           }
       }
    }
}
``` 
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش در سرور به شکل زیر بازگردانده میشود :
</p>


```graphql
{
    "user": {
        "contactList": [
            "gmailUsers": [
                {
                    "name": "ali"
                }
            ],
            "yahooUsers": [
                {
                    "name": "ali"
                }
            ]
        ]
    }
}
``` 

## Fragments
<p dir="rtl" style="position:right;">
برای ماکرو نویسی در graphql از fragment ها استفاده میکنیم. استفاده از fragment ها علاوه بر افزایش خوانایی کد, حجم کد را نسبتا کاهش و احتمال اشتباهات برنامه نویس را نیز کاهش میدهد.</br>
به عنوان مثال در همان سرویس ایمیل اگر بخواهیم نام , ادرس ایمیل و شماره تلفن افرادی که از سرویس جیمیل و یاهو استفاده میکنند را از سرور بگیریم ,  query ای به شکل زیر مینویسیم:
</p>

```graphql
{
    gmailUsers: user(service: "gmail.com") {
        ...dataFrag
    }
    yahooUsers: user(service: "yahoo.com") {
       ...dataFrag
    }
}

fragment dataFrag on user {
    name
    phoneNumber
    mailAddress
}
```

<p dir="rtl" style="position:right;">
query بالا بعد از پردازش در سرور به شکل زیر بازگردانده میشود :
</p>


```graphql
{
    "gmailUsers":[
            {
                "name": "ali",
                "phoneNumber": "09123126754",
                "mailAddress": "ali64@gmail.com"
            },
            {
                "name": "hossein",
                "phoneNumber": "09123123475",
                "mailAddress": "hossein85@gmail.com"
            },
            {
                "name": "kami",
                "phoneNumber": "09125878944",
                "mailAddress": "kamiko@gmail.com"
            }
    ], 
    "yahooUsers":[
            {
                "name": "karim",
                "phoneNumber": "09185626454",
                "mailAddress": "kar123@yahoo.com"
            },
            {
                "name": "bagher",
                "phoneNumber": "09126454378",
                "mailAddress": "bagher2468@yahoo.com"
            },
            {
                "name": "sara",
                "phoneNumber": "09129342412",
                "mailAddress": "sara.sh@yahoo.com"
            }
    ]
}
```  
><p dir="rtl" style="position:right;">میتوان در fragment ها از variable ها نیز استفاده نمود. به عنوان مثال همان query بالا اما این بار فقط بخواهیم سه نفر اول هر گروه را نشان دهیم: </p>

```graphql
query makeContact($first = Int 3){
    gmailUsers: user(service: "gmail.com") {
        ...dataFrag
    }
    yahooUsers: user(service: "yahoo.com") {
       ...dataFrag
    }
}

fragment dataFrag on user (first: $first) {
    name
    phoneNumber
    mailAddress
}
```

## Operations
<p dir="rtl" style="position:right;">
به صورت کلی در graphql سه مدل عملیات شامل query , mutataion و subscription داریم که به آنها operation type هم گفته میشود. operation type ها هنگام استفاده میتوانند نامی دلخواه بگیرند. اگر برای یک عملیات در graphql نه نامش را مشخص کنیم و نه type ش را, به صورت پیش فرض آن operation از نوع query در نظر گرفته میشود. operation ها همانند توابع در سایر زبان های برنامه نویسی عمل میکنند و یکسری فیلد ورودی و یک خروجی دارند که تایپ فیلد خروجی وابسته به ساختار خود operation دارد.<br/>
به عنوان مثال نمونه ای از operation از نوع query به شکل زیر تعریف میشود:
</p>

```graphql
query giveUser($key: ID!) {
    user(id: key) {
        name
        age
        mailAddress
    }
}
``` 
<p dir="rtl" style="position:right;">
در مثال بالا giveUser یک operation name و query یک operation type میباشد همچنبن ورودی یک variable به نام key و خروجی از تایپ User میباشد.
</p>

## Variables
<p dir="rtl" style="position:right;">
در بسیاری از مواقع در انواع operation های graphql نیاز به آرگومان های پویا داریم به عنوان مثال در یک فروشگاه اینترنتی اگر بخواهیم روی جستجوی کاربر فیلتر قیمت را قرار دهیم به طوری که در یک بازه قیمت بتواند جا به جا شود نیاز به ارسال رقم قیمت به صورت آرگومان پویا داریم.<br/>
<b>تعریف متغیر در operation :</b><br/>
برای تعریف متغیر بایستی در ابتدای تعریف operation توی پرانتز عبارت (name: type$) را بیاوریم که name معادل با اسم متغیر و type معادل با تایپ متغیر میباشد.<br/>
به عنوان مثال query زیر را درنظر بگیرید:

```graphql
query giveUser($id: String!) {
    user(id: $id) {
        name
        age
        mailAddress
    }
}
``` 
><p dir="rtl" style="position:right;"><b>default variable :</b><br> اگر بخواهیم یک مقدار پیشفرض برای متغیر درنظر بگیریم, آن را در تعریف به صورت زیر میاوریم : <br><div style="text-align:center;"> ($name: type = value) </div></p>

```graphql
query giveUser($id: String!, $age: Int! = 20) {
    user(id: $id, age: $age) {
        name
        age
        mailAddress
    }
}
``` 

## Directives
<p dir="rtl" style="position:right;">
اگر بخواهیم در graphql ساختار operation ها را تحت شرایطی به صورت پویا تغییر دهیم از directive ها استفاده میکنیم. در اینجا به ۲ مدل از directive های مهم اشاره میکنیم :<br>
</p>

* @include(if: Boolean)

<p dir="rtl" style="position:right;">
اگر مقدار عبارت boolean برابر با true باشد, field موردنظر به همراه تمامی subfield هایش در operation قرار میگیرند.
</p>

* @skip(if: Boolean)

<p dir="rtl" style="position:right;">
اگر مقدار عبارت boolean برابر با false باشد, field موردنظر به همراه تمامی subfield هایش در operation قرار میگیرند.<br/>
به عنوان مثال قطعه کد زیر را درنظر بگیرید.
</p>

```graphql
query giveUser($showAge : Boolean!) {
    user() {
        name
        age @include(if: showAge)
        mailAddress 
    }
}
{
    "showAge": false
}
``` 
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش در سرور به شکل زیر بازگردانده میشود:
</p>

```graphql
{
    "giveUser": [
        {
            "name": "ali",
            "age": 22
        },
        {    "name": "hossein",
             "age": 30
        },
        { 
            "name": "reza",
            "age": 26
        }
    ]
}
```

<p dir="rtl" style="position:right;">
حال اگر مقدار متغیر showAge در مثال بالا برابر با true شود, حاصل پردازش query به شکل زیر تغییر میکند:
</p>

```graphql
{
    "giveUser": [
        {
            "name": "ali",
            "age": 22,
            "mailAddress": "ali123@gmail.com"
        },
        {    "name": "hossein",
             "age": 30,
             "mailAddress": "hossein85@yahoo.com"
        },
        { 
            "name": "reza",
            "age": 26,
            "mailAddress": "rez2080@gmail.com"
        }
    ]
}
```

## Mutations
<p dir="rtl" style="position:right;">
mutation یکی از operation های graphql میباشد که هدف استفاده از آن درج, حذف و آپدیت داده های موجود در پایگاه داده میباشد. تفاوت عمده بین mutation و query این است که فیلد های query هنگام اجرا به صورت موازی (parrallel) اجرا میشوند, در حالی که فیلد های mutation به صورت سری اجرا میشوند.<br/>
مثالی از درج یک کاربر در پایگاه داده:
</p>

```graphql
mutation {
    addUser (id: "1111111", name:"Ali", sex: MALE, age: 21, mailAddress: "ali64@gmail.com", phoneNumber: "09122912391"){
        name
        sex
        age
        mailAddress
        phoneNumber
    }
}
```
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش به یک آبجکت user به شکل زیر تبدیل شده و   به پایگاه داده اضافه میشود:
</p>

```graphql
{
    "addUser":{
        "name": "Ali",
        "sex": MALE,
        "age": 21,
        "mailAddress": "ali64@gmail.com",
        "phoneNumber": 09122912391
    }
}
```

<p dir="rtl" style="position:right;">
مثالی از حذف یک کاربر در پایگاه داده:
</p>

```graphql
mutation {
    deleteUser (id: "1111111"){
        name
    }
}
```
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش به یک آبجکت user به شکل زیر تبدیل شده و  پایگاه داده با آن را حذف میکند:
</p>

```graphql
{
    "deleteUser":{
        "name": "Ali"
    }
}
```

<p dir="rtl" style="position:right;">
مثالی از آپدیت آدرس ایمیل و شماره تلفن یک کاربر در پایگاه داده:
</p>

```graphql
mutation {
    updateUser (id: "1111111", mailAddress: "ali_changed@gmail.com",phoneNumber: "09100002391"){
        mailAddress
        phoneNumber
    }
}
```
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش به یک آبجکت user به شکل زیر تبدیل شده و  پایگاه داده با آن آپدیت میشود:
</p>

```graphql
{
    "updateUser":{
        "mailAddress": "ali_changed@gmail.com",
        "phoneNumber": "09100002391"
    }
}
```

## Subscription
<p dir="rtl" style="position:right;">
در operation های Query و Mutation, یک درخواست از طرف کاربر به سمت سرور فرستاده میشود و بلافاصله سرور آن را پردازش کرده و پاسخی به کاربر میدهد. در subscription  بعد از فرستاده شدن درخواست به سمت سرور, آن درخواست اجرا نمیشود تا زمانی که یک اتفاق (event) خاصی در سرور رخ بدهد. (به اصلاح درخواست listen میکند) این کار هنگامی انجام پذیر است که یک ارتباط دوطرفه (bi-directional) میان سرور و کاربر برقرار باشد و کاربر با فرستادن یک subscription به سمت سرور و اعلام رویداد موردنظر, پاسخی را پس از رخ دادن آن رویداد دریافت کند.

## Schema
<p dir="rtl" style="position:right;">
یکی از مهم ترین و اولیه ترین اجزای یک graphql , شمای طراحی آبجکت ها میباشد. شما در graphql در واقع بک نقشه است که graphql هنگام پردازش operation ها طی میکند تا مقادیر مورد انتظار از فیلد های داده شده را بدست آورد. به عنوان نمونه در مثال سرویس ایمیل وقتی میخواهیم آبجکت user را بسازیم به صورت زیر عمل میکنیم:
</p>

```graphql
type User {
    name: String!
    age: Int
    sex: Gender!
    mailAddress: String!
    phoneNumber: String
    recievedMails: [Mail]
    contacts: [User]
}
```
<p dir="rtl" style="position:right;">
طبق مثال بالا هنگام مشخص کردن هر فیلد بایستی type آن را تنظیم کرد و هر تایپ با <b> حرف بزرگ </b> شروع میشود.<br> graphql یکسری type های از پیش تعریف شده دارد.(همانند Int و String در مثال بالا) همچنین type های Mail و User جزو type های آبجکت هایی میباشند که خودمان تولید کرده ایم.<br/>
** میتوان در طراحی آبجکت ها از آرگومان ها نیز بهره مند شد, به عنوان مثال در سرویس ایمیل برای آبجکت mail به صورت زیر عمل میکنیم:
</p>

```graphql
type Mail {
    from: String!
    to: String!
    date (format: DateFormat) : Date!
    title: String
    content (status: ContentStatus = UNREAD) : String
    attachment(size: Int!, sizeUnit: SizeUnit = MB): File
}
```
<p dir="rtl" style="position:right;">
توجه کنید که در مثال بالا هم از آرگومان هم به صورت ساده و هم به صورت  default (با مقدار دهی اولیه) استفاده شده است. <br>
</p>

## Types

<p dir="rtl" style="position:right;">
در ادامه با انواع  type های موجود در graphql آشنا خواهیم شد:
</p>

 - [Query, Mutation and Subscription Types](#query-and-mutation-and-subscription-types)
 - [Scalar Types](#scalar-types)
 - [Enumeration types](#enumeration-types)
 - [Lists And Null](#lists-and-null)
 - [Interface](#interface)
 - [Union types](#union-types)
 - [Input Types](#input-types)

### Query, Mutation and Subscription Types
<p dir="rtl" style="position:right;">
تایپ های Query و Mutation و Subscription از تایپ های بسیار مهم در graphql هستند. به طوری که هر graphql حتما تایپ Query را دارد و ممکن است که تایپ های Mutation و Subscription هم داشته باشد. چرا که برای ارتباط سرور و کاربر با  یک دیگر حتما به فیلد های این تایپ ها نیاز داریم. اگر مثلا فیلدی در یک query قرار داشته باشد هنگام پردازش آن query میبایست تایپ فیلد های مورد استفاده در تایپ Query نیز حضور داشته باشند. به عنوان مثال در سرویس ایمیل برای دریافت کلیه user ها و mail ها بایستی ابتدا بنویسیم :
</p>

```graphql
type Query {
    user: User
    mail: Mail
}
```
<p dir="rtl" style="position:right;">
سپس میتوانیم query مورد نظر را بنویسیم:
</p>

```graphql
query giveAllUsersAndMails {
    user
    mail
}
```
<p dir="rtl" style="position:right;">
دقت کنید از دید graphql فیلد های موجود در تایپ های Query و Mutation و Subscription فرقی با مابقی فیلد ها در مابقی تایپ ها ندارند و با همه فیلد ها رفتار یکسانی صورت میگیرد.
</p>

### Scalar Types
<p dir="rtl" style="position:right;">
برخی تایپ های موجود در graphql هستند که هیچ sub-field ای نمیتوانند داشته باشند و توسط هیچ تایپ دیگری نمیتوانند توصیف شوند. scalar های پیش فرض در graphql عبارت اند از:<br>
</p>

|Scalar  |Description  |
|---------|---------|
|Int     |      عدد صحیح ۳۲ بیتی علامتدار   |
|Float     |     double-precision عدد اعشاری به فرمت    |
|String     |    UTF-8 رشته به فرمت     |
|Boolean     |    true یا false       |
|ID     |     .یک رشته ۶۴ بیتی که به عنوان کلید یکتا برای یک تایپ یا فیلد استفاده میشود     |

<br>
<p dir="rtl" style="position:right;">
میتوان در qraphql یک scalar های دلخواه تعریف کرد, اما باید توجه داشت که تعریف آن به گونه ای باشد که بتوان آن را serialized, deserialized و validate کرد.
</p>


### Enumeration types
<p dir="rtl" style="position:right;">
enum ها نوعی از scalar ها هستند که فقط توانایی ذخیره چند مقدار محدود و از پیش تعیین شده را در خود دارند و در هر لحظه فقط میتوانند یکی از مقادیرشان را اتخاذ کنند. کاربرد enum  در graphql بسیار شبیه به سایر زبان های برنامه نویسی است فقط با این تفاوت که qraphql فیلد های enum را به integer تبدیل نمیکند و هنگام ارسال query تنها ماهیت رشته ای فیلد های آن منتقل میشود.<br>
به عنوان مثال در سرویس ایمیل میخواهیم پروتکل ارسال ایمیل را با MailProtocol نشان دهیم . مینویسیم:
</p>

```graphql
enum MailProtocol {
    POP3
    IMAP
    SMTP
}
```
<p dir="rtl" style="position:right;">
توجه داشته باشید که معمولا تمام مقادیر enum را با حروف بزرگ مینویسند.

### Lists And Null
<p dir="rtl" style="position:right;">
معنا و مفهوم تایپ null در graphql به همان بسیار شبیه به سایر زبان های برنامه نویسی است. برای اینکه مشخص کنیم فیلدی در شمای یا operation ها قابلیت null شدن را داشته باشد, از علامت ! استفاده میکنیم.<br> به عنوان مثال در سرویس ایمیل user را به شکل زیر تعریف میکنیم:
</p>

```graphql
type User {
    id: ID!
    name: String!
    age: Int
    sex: Gender!
    mailAddress: String!
    phoneNumber: String
}
```
<p dir="rtl" style="position:right;">
در مثال بالا هر کدام از فیلد های id, name, sex و mailAddress نمیتوانند مقدار null را بگیرند.<br><br>برای تعریف آرایه در graphql تنها کافی است تایپی که میخواهیم یک لیست یا آرایه از آن داشته باشیم, درون پرانتز قرار دهیم. به عنوان مثال در مورد زیر فیلد recievedMails یک آرایه از تایپ Mail است. :
</p>

```graphql
recievedMails: [Mail]
```
> <p dir="rtl" style="position:right;"> ! (non-null) با آرایه ها میتوانند ترکیب شوند به عنوان مثال موارد زیر را در نظر بگیرید:</p>
```graphql
recievedMails: [Mail!]
```
<p dir="rtl" style="position:right;">
در مثال بالا recievedMails آرایه ای از تایپ Mail است به طوری که هیچ یک از مقادیرش نمیتواند null باشد.
</p>

```graphql
recievedMails: [Mail]!
```
<p dir="rtl" style="position:right;">
در مثال بالا recievedMails آرایه ای از تایپ Mail است به طوری که هیچگاه خودش نمیتواند مقدار null را بگیرد.
</p>

```graphql
recievedMails: [Mail!]!
```
<p dir="rtl" style="position:right;">
در مثال بالا recievedMails آرایه ای از تایپ Mail است به طوری که هیچگاه خودش و مقادیر درونش نمیتواند مقدار null را بگیرد. <br>
با توجه به مطالب گفته شده به جدول زیر نگاه کنید:
</p>

|Field/Values| null | [] | [ mail1, mail2 ] | [ mail1, mail2, null ] |
|---------|---------|---------|---------|---------|
|recievedMails: [Mail] | Valid | Valid | Valid | Valid |
|recievedMails: [Mail!] | Valid | Valid | Valid | Error|
|recievedMails: [Mail]! | Error | Valid | Valid | Valid |
|recievedMails: [Mail!]! | Error | Valid | Valid | Error|
<br>

### Interface
<p dir="rtl" style="position:right;">
interface یک تایپ انتزاعی میباشد. به طوری که به تنهایی غیرقابل استفاده است و هیچ آبجکتی نمیتوان از آن ساخت. برای استفاده میبایست به وسیله سایر تایپ ها پیاده سازی (implement) شود. به عنوان مثال interface ای به نام Shape به شکل زیر تعریف میکنیم:
</p>

```graphql
interface Shape{
    id: ID!
    innerColor: COLOR
    borderWidth: Int!
    borderColor: COLOR
    innerText: String
}
```
<p dir="rtl" style="position:right;">
حال ۲ تایپ Circle و Triangle را به شکل زیر تعریف میکنیم که تایپ Shape را implement میکنند.

```graphql
type Triangle implements Shape{
    id: ID!
    innerColor: COLOR
    borderWidth: Int!
    borderColor: COLOR
    innerText: String
    firstEdgeLength(unit: LengthUnit = CM) : Int!
    secondEdgeLength(unit: LengthUnit = CM) : Int!
    thirdEdgeLength(unit: LengthUnit = CM) : Int!
}
```

```graphql
type Circle implements Shape{
    id: ID!
    innerColor: COLOR
    borderWidth: Int!
    borderColor: COLOR
    innerText: String
    radius(unit: LengthUnit = CM) : Int!
    centralAngle(unit: DegreeUnit = RADIAN) : Float!
}
```
<p dir="rtl" style="position:right;">
در مثال بالا تمامی فیلد هایی که در تایپ Shape قرار گرفته اند, در تمامی تایپ هایی که آن را implement میکنند آمده است. هر آبجکت از تایپ Shape فقط میتواند Circle باشد یا اینکه Triangle باشد. تایپ های Circle و Triangle دارای فیلد هایی هستند که در تایپ Shape نیست و به وسیله همان ها از سایر تایپ ها متمایز میشوند.<br>
حال فرض کنید میخواهیم id تمامی Shape ها را بگیریم و اگر داده ای از نوع Circle بود, شعاع آن زا نیز دریافت کنیم. بدین منظور query زیر را مینویسیم:
</p>

```graphql
query getCircleRadius{
    shape {
        id
        radius
    }
}
```

<p dir="rtl" style="position:right;">
با پردازش query بالا graphql به ما خطا میدهد. زیرا فیلد radius در تایپ Shape نیست حتی اگر منظورمان یک آبجکت از نوع Circle باشد.<br>
برای حل مشکلات اینچنینی میتوان از inline fragments استفاده نمود. به عنوان مثال query بالا را میتوان به شکل زیر نوشت:
</p>

```graphql
query getCircleRadius{
    shape {
        id
        ... on Circle {
            radius
        }
    }
}
```
<p dir="rtl" style="position:right;">
query بالا بعد از پردازش به شکل زیر داده ها را برمیگرداند:
</p>

```graphql
{
    "shape": [
        {
            "id": "1111111"
        },
        {
            "id": "8512321",
            "radius": 42
        }
    ]
}
```
### Union types
<p dir="rtl" style="position:right;">
union در graphql به مفهموم اجتماع گیری چند تایپ با یک دیگر بدون درنظر گرفتن فیلد های آن تایپ ها است. عملکرد union بسیار شبیه به interface است با این تفاوت که در interface میبایستی سایر تایپ ها فیلد های مشترک با آن تایپ داشته باشند. در حالی که union نیاز به تنظیم کردن هیچ فیلد دیگری ندارد. <br>
به عنوان مثال میتوان مثال بخش interface را به صورت زیر نوشت:

```graphql
union Shape = Circle | Triangle

type Triangle implements Shape{
    id: ID!
    innerColor: COLOR
    borderWidth: Int!
    borderColor: COLOR
    innerText: String
    firstEdgeLength(unit: LengthUnit = CM) : Int!
    secondEdgeLength(unit: LengthUnit = CM) : Int!
    thirdEdgeLength(unit: LengthUnit = CM) : Int!
}

type Circle implements Shape{
    id: ID!
    innerColor: COLOR
    borderWidth: Int!
    borderColor: COLOR
    innerText: String
    radius(unit: LengthUnit = CM) : Int!
    centralAngle(unit: DegreeUnit = RADIAN) : Float!
}
```
<p dir="rtl" style="position:right;">
حال فرض کنید که میخواهیم یک query جستجو به ازای فیلد innerText برای تمامی Shape ها داشته باشیم, آن را به این صورت مینویسیم:
</p>

```graphql
query searchShape(innerText: "holo"){
    __typename
    ... on Circle {
        radius
        centralAngle
    }
    ... on Triangle {
        firstEdgeLength
        secondEdgeLength
        thirdEdgeLength
    }
}
```

<p dir="rtl" style="position:right;">
عبارت typename__ در بالا یک meta field میباشد به این معنی که جای آن تایپ آبجکت مورد نظر میاید. همچنین query بالا یک union برمیگرداند که برابر با Circle | Triangle میباشد و مشخص نیست که دقیقا Circle است یا Triangle. بنابراین ما در query ها اگر چند نوع تایپ مختلف برگردانده شود, به صورت union برگردانده میشود و برای تمایز بایستی با typename__ این تمایز را مشخص کرد. query بالا بعد از پردازش به صورت زیر دادگان را برمیگرداند.
</p>

```graphql
{
    "searchShape": [
        {
            "__typename": "Circle",
            "radius": 12,
            "centralAngle": 3.2            
        },
        {
            "__typename": "Triangle",
            "firstEdgeLength": 42,
            "secondEdgeLength": 23,
            "thirdEdgeLength": 50
        }

    ]
}
```
### Input Types
<p dir="rtl" style="position:right;">
در graphql به طور کلی میتوان دو مدل تایپ input و output داشت. output تایپ خروجی از operation های graphql و input تایپ های ورودی به آرگومان های فیلد های موجود در  operation هستند. در graphql به جز تایپ های scalar و enum برای مابقی تایپ هایی که در شما تعریف میکنیم, میبایست برای ورودی  دادن به عنوان آرگومان برای operation در تایپ input آورده شوند. <br>
به عنوان مثال در همان سرویس ایمیل میخواهیم یک کاربری که حساب کاربری اش را حذف کرده, از لیست تماس سایر کاربران حذف کنیم. بدین منظور یک mutation به صورت زیر مینویسیم:
</p>

```graphql
mutation deleteUser($deletedUser: User!){
    user {
        deleteFromContact(user: deletedUser) {
            contact
        }
    }
}
```
<p dir="rtl" style="position:right;">
حین پردازش query بالا graphql به ما خطا میدهد زیرا فیلد user میبایست ابتدا در تایپ input آورده شود. بنابراین query درست به صورت زیر باید باشد :
</p>

```graphql
input UserInput {
    user: User!
}

mutation deleteUser($deletedUser: UserInput!){
    user {
        deleteFromContact(user: deletedUser) {
            contact
        }
    }
}
```
><p dir="rtl" style="position:right;">در تایپ input فیلد ها نمیتواند با آرگومان همراه باشند.</p>
