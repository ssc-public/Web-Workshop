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

در صورتی که از سیستم‌عامل Ubuntu استفاده می‌کنید برای این که بتوانید پکیج‌ها را به صورت global نصب کنید، باید کاربر super user باشید:

<div dir="ltr">

    sudo su

</div>
# راه‌اندازی پروژه

مزیت استفاده از پکیج `create-react-app` این است که ما هر بار نیاز به configure کردن پروژه React از ابتدا نداریم و این پکیج به صورت اتوماتیک configuration خاصی از پروژه را می‌سازد.

<div dir="ltr">

    create-react-app <app-name>

</div>

ساختار پروژه‌ای که با استفاده از این پکیج ساخته می‌شود به شکل زیر است:
<div dir='ltr'>

```bash
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

این ساختار بسته به نوع پروژه ممکن است مناسب نباشد و برای دسترسی راحت‌تر به فایل‌ها هنگام انجام پروژه، می‌توان ساختار‌هایی را در نظر گرفت مانند:

<div dir="ltr">

```bash
src
├── components
├── assets
|   ├── images
|   ├── audios
|   └── videos
├── lib
|   ├── api
|   ├── utils
|   └── validation
├── views
├── App.js
├── App.css
├── App.test.js
├── index.js
├── index.css
└── serviceWorker.js
```
</div>

و 

<div dir='ltr'>

```bash
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


## package.json
package.json فایلی است که برای ذخیره meta-dataها، لیست dependencyها، تعریف script و... از آن استفاده می‌شود.

## node-modules
این فولدر شامل پکیج‌هایی است که با استفاده از دستور `npm i` یا `npm install` نصب شده‌اند. 

## serviceWorker.js
Service Worker یک اسکریپت است که مرورگر شما به صورت مستقل از صفحه وب در background اجرا می‌کند و ویژگی‌هایی مثل push notification، background sync و ... را اضافه کرده است. 

برای آشنایی بیش‌تر می‌توانید[این لینک][8] را نگاه کنید.

## manifest.json
اطلاعات وب اپلیکیشن مثل نام، نویسنده، آیکون‌های برنامه، توضیحات و... در این فایل ذخیره می‌شود. 

برای آشنایی بیش‌تر می‌توانید[این لینک][8] را نگاه کنید.

## gitignore.
آدرس یا نام فایل‌هایی که قرار نیست روی گیت آپلود شوند، در این فایل قرار می‌گیرد.

## env. 
//TODO: add description with example

# What is React?!
این که واقعا React چیه، داره چیکار‌میکنه و چرا باید ازش استفاده کنیم سوالایی هستند که نمیشه به راحتی به اونا جواب داد اما اگه شاید یبار تلاش کنیم React رو تعریف کنیم بتونیم راحت تر باهاش کنار بیایم

حقیقت ماجرا اینه که توی فرمای html زیاد پیش میاد که بخوایم از یه ساختار ساده چندین بار جاهای مختلف استفاده کنیم و این که بخوایم هردفعه عین اون کدارو دوباره بنویسیم به نظر درست نمیاد
 
 اینجاست که پای جاوا اسکریپت به میدون باز میشه چون اگه ما بتونیم یک المان رو فقط یکبار داخل جاوا اسکریپت پیاده سازی کنیم میتونیم بارها و بارها از اون استفاده کنیم

خب این که خیلی خوبه پس مشکلش کجاست؟؟؟

این راه حل درسته که راه حل خوبی به نظر میاد اما چنتا مشکلم داره:

اول این که  المانای شبه هم لزوما صددرصد هم شبیه هم نیستن و اگه قرار باشه ما هربار که میخوایم اون المان رو استفاده کنیم مجبور باشیم یه بخشای کوچیکی ازش رو تغییر بدیم این ممکنه خیل برای ما مشکل ساز بشه
<div dir="ltr">

```javascript
<div>
    <h1 id="subject">موضوع</h1>
    <p id="content">مطلب</p>
</div>
```

</div>

دوما این که همیشه هم المانای ما مثل مثال بالا ساده نیستن و میتونن از چندین تگ تو در توی پیچیده تشکیل بشن که اگه قرار باشه یه object درخت مانند زیادی تو در تو بشه، دیگه کار باهاش اصلا آسون نیست

البته به غیر از مسئله استفاده دوباره از کدها یه مشکل دیگه هم بود که جاوا اسکریپت اونو برای ما حل کرده بود اونم چیزی نبود بجز مطلب پویا

خب الان این همه توضیح دادم که چی؟

هدف من از این حرفا این بود که نشون بدم که درسته که جاوا اسکریپت راه حل این مشکلات ما بود اما همیشه هم راه حل آسونی نبود. در نهایت شاید یه نفر تو این شرایط با خودش بگه کاش یه چیزی بود که همه اینا بود!!!

این که یه چیزی همه‌ی اینا باشه شاید اولش به نظر مسخره بیاد اما به زودی متوجه میشیم که جواب واقعا همینه

اتفاقی که داخل بدنه React میفته اینه که ما میایم و هر جزئی رو یک شیء در نظر میگیریم اما نه شیئی که از به هم اضافه کردن کلی المنت ساخته شده باشه بلکه اون شيء به کمک چند خط html ساخته شده

کد html چند خط قبل به کمک جاوا اسکریپت:
<div dir="ltr">

```javascript
let element =  document.createElement("div");
let subject = document.createElement("h1");
let content = document.getElementById("p");
subject.innerText = "موضوع";
subject.id = "subject";
content.innerText = "مطلب";
content.id = "content";
element.appendChild(subject);
element.appendChild(content);
```

</div>

تبدیل اون به تابع برای استفاده آسون تر:
<div dir="ltr">

```javascript
function elem(subject, content){
    let elementDivTag =  document.createElement("div");
    let subjectH1Tag = document.createElement("h1");
    let contentPTag = document.getElementById("p");
    subjectH1Tag.innerText = subject;
    subjectH1Tag.id = "subject";
    contentPTag.innerText = content;
    contentPTag.id = "content";
    elementDivTag.appendChild(subjectH1Tag);
    elementDivTag.appendChild(contentPTag);
    return elementDivTag;
}
```

</div>


همون کد به کمک React:
<div dir="ltr">

```javascript
function Comp(props) {
    const {subject, content} = props;
    
    return (
        <div>
            <h1 id="subject"> {subject} </h1>
            <p id="content"> {content} </p>
        </div>
    );
}
```

</div>

بازم همون کد به کمک React که درواقع یکم با کلاسای جاوااسکریپت ترکیب شده:
<div dir="ltr">

```javascript
class Comp extends React.Component {
    render() {
        const { subject, content } = this.props;
        
        return (
            <div>
                <h1 id="subject"> {subject} </h1>
                <p id="content"> {content} </p>
            </div>
        );
    }
}
```
</div>

با این که شاید همه چیز رو از دوتا کد آخر متوجه نشده باشید اما انگار که تو این دوتا کد نسبت به دوتا کد قبلی یه نظم عجیبی وجود داره و این نظم دقیقا از اونجایی میاد که ما میتونیم همزمان و در کنار هم از html و  هم از جاوا اسکریپت استفاده کنیم(که البته به این نوع کد `JSX` گفته میشه که قراره باهاش بیشتر آشناشیم) 

# JSX

 نه جاوا اسکریپته، نه کد HTML و نه String.
در واقع داخل ‍‍`{}` فضایی د اختیار ما قرار میگیرد که میتوانیم  فقط و فقط یک چیز را در آن قرار دهیم(آن یک چیز میتواند `null` یک `string` یک `root tag` و یا یک آرایه از همین ها باشد). به غیر از این شرط که حتما باید اجراء شود، میتوانیم از تمامی مزایای jsx داخل `{}` نیز بهره‌مند شویم.
* منظور از root tag، یک تگ بدون هیچ خواهر و یا برادر است که محتوای آن هیچ محدودیتی ندارد

<div dir="ltr">

```Javascript
<div id="root">
    <div>
        <p>علی</p>
    </div>
    <h4>محسن</h4>
    رضا
</div>
```
</div>

به عبارت دیگر داخل آن می‌تواند:

۱. اسم متغیر باشد. 

<div dir="ltr">

```Javascript
var tutorialName = "React";

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

۳. و کلی چیز های دیگر ...

<div dir="ltr">

```Javascript
const pooya = "پویا";
const condition = true;
const matn = <p dir="rtl"> { pooya } یک متن </p>;

<div>
    {
        condition ? (
            <p>متن اول</p>
        ) : (
            <p>متن دوم</p>
        )

    }
    یک فاصله
    {
        matn
    }
    {
        ["a", "b" ,"c"].map(element => <p> {element} </p>)
    }
</div>
```

</div>

مطالب بیش‌تر در مورد JSX را می‌توانید از [این‌جا][7] بخوانید.

# VirtualDOM vs DOM
احتمال قبلا با مفهوم DOM آشنا شدید اما اگه نشدید برید تو این [لینک][103]
اگه لینک قبلی رو مطالعه کردید و یا با از قبل با مفهوم DOM آشنایید باید اینو بهتون بگم که توی React هم در پشت پرده برای ایجاد تغییرات در صفحه از همین توابع استفاده شده است اما با یک تفاوت مهم
اونم این که در React در زمانی که یک پارامتر کلیدی ( مثل props یا state که به زودی باهاشون آشنا میشید ) دستخوش تغییر بشند، واکنشی که react نشون میده اینه که به کمک state فعلی یک DOM مجازی (ٰٰٰVirtualDOM) میسازه و اونو با DOM فعلی مقایسه میکنه و تنها تفاوتهاشونو به کمک توابع موجود، در DOM تغییر میده و همین باعث میشه که React از سرعت نسبتا خوبی برخوردار باشه.

# Component

 Component به ما کمک می‌کند تا رابط کاربری را به اجزا مستقل و قابل استفاده مجدد تقسیم کنیم و در مورد هر کدام به صورت جداگانه تصمیم بگیریم و دسترسی داشته باشیم.

 Componentها به  دو صورت می‌توانند تعریف شوند:

 ۱. تابعی

 <div dir="ltr">

```Javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
</div>

 ۲. به ارث بردن از کلاس Component

 <div dir="ltr">

```Javascript
import {Component} from 'react'

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

</div>

> حرف اول اسم Component حتما باید بزرگ نوشته شود تا با تگ‌ها اشتباه گرفته نشود.

# Props

به componentها می‌توان یک object پاس داد که به آن `(Props (Properties` گفته می‌شود. در Componentهای اول با `{<props.<prop-name}` می‌توانیم به prop مورد نظر دسترسی پیدا کنیم. اما در component نوع دوم باید از ‍‍‍`{<this.props.<prop-name}` استفاده کنیم.

برای Type-Checking می‌توان نوع prop را با PropTypes مشخص کرد.

<div dir="ltr">

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
</div>

# State

# Life Cycle

# Event Handlers and Forms
تمام event هایی که برای تگ‌ها‌ی داخل فرم html تعریف شده، در React نیز برای این تگ ها تعریف شده است، فقط با این تفاوت که در اینجا نام آن ها باید به صورت  lowerCamelCase بکار برده شود

*  در حالت کلی در React تمام prop ها(attribute ها)ی یک element یا component به صورت lowerCamelCase در دسترس اند و میتوان آن‌ها را به کمک یک `{}` و یا در صورت امکان یک string مقدار دهی کرد

برای مقدار دهی آن‌ها باید از `{}` استفاده شود:
 
<div dir="ltr">

```javascript
import React, { Component } from 'react';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    setValueByTargetValueFunc(e) {
        this.setState({
            value: e.target.value
        })
    }
    
    render() {
        const { value } = this.state;

        return (
            <div>
                <input 
                    type="text" 
                    value={value}  
                    onChange={this.setValueByTargetValueFunc.bind(this)} 
                />
                <input 
                    type="text" 
                    value={value}          
                    onChange={this.setValueByTargetValueFunc.bind(this)} 
                />
                {
                    value
                }
            </div>
        );
    }
}

export default Comp;
```
</div>

در صورتی که بخواهیم از یک تابع چند بار استفاده کنیم برای این که نخواهیم هر بار عمل bind را انجام دهیم میتوانیم این کار را در همان ابتدا انجام دهیم

<div dir="ltr">

```javascript
import React, { Component } from 'react';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.setValueByTargetValue = function(e) {
            this.setState({
                value: e.target.value
            })
        }.bind(this)
    }

    render() {
        const { value } = this.state;

        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={this.setValueByTargetValue}
                />
                <input
                    type="text"
                    value={value}
                    onChange={this.setValueByTargetValue}
                />
                {
                    value
                }
            </div>
        );
    }
}

export default Comp;
```
</div>

در روشی دیگر نیز میتوان از arrow function ها نیز استفاده نمود زیرا در این نوع توابع this به صورت خودکار به تابع bind میشود.

<div dir="ltr">

```javascript
import React, { Component } from 'react';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }


    setStateByTargetValue = (state) => element => {
        this.setState({
            [state]: element.target.value,
        })
    };

    setValueByTargetValue = e => {
        this.setState({
            value: e.target.value
        })
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={this.setStateByTargetValue("value")}
                />
                <input
                    type="text"
                    value={value}
                    onChange={this.setValueByTargetValue}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => this.setState({value: e.target.value})}
                />
                {
                    value
                }
            </div>
        );
    }
}

export default Comp;
```

مثال های بیشتر از فرم ها را از [اینجا][100] مشاهده کنید.

</div>

در React فرم‌ها تفاوت عمده‌ای با فرم های عادی ندارند اما دو ویژگی جزئي در آن‌ها وجود دارد:
۱.استفاده از htmlFor به جای for برای label ها
۲.ویژگی دوم در گذشته نیز وجود داشت اما در React کار برد زیادی دارد و آن چیزی نیست بجز تابع preventDefault
* علت استفاده از این تابع نیز جلوگیری از reload شدن صفحه میباشد

<div dir="ltr">

```javascript
import React from "react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="input-text">
                    Name:
                </label>
                <input type="text" value={this.state.value} onChange={this.handleChange} id="input-text"/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

</div>

#Single Page Application(SPA) and React Router
ری‌اکت یک ابزار قدرتمند برای ساخت SPA میباشد اما SPA به چه معناست؟

تفاوت عمده SPA ها با دیگر سایت ها در عدم load کردن دوباره صفحه است که این تجربه بهتری را برای کاربر به همراه دارد و در واقع صفحه وب شما مانند یک desktop application به نظر خواهد آمد.

اگر سایت شما زیاد بزرگ نباشد شاید بتوانید به سادگی آن را به صورت یک SPA پیاده سازی کنید اما وقتی کمی سایت بزرگتر شود و تعداد Component ها زیاد شود این باعث میشود که نتوان به سادگی همه‌ی آن ها را در کنار هم نشان داد.

برای چنین مواقعی ابزاری در React وجود دارد که این موضوع را برای ما حل خواهد کرد و آن هم react-router میباشد.

ما به کمک این ازار میتوانیم url های مختلف را به Component هایمان لینک کنیم که این کار به صورت زیر انجام میشود

<div dir="ltr">

```javascript
import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Main from "./Main";
import Home from "./Home";
import Posts from "./Posts";


class MainRoute extends Component {

    render() {
        return (
            <BrowserRouter>
                <div> صفحه ها </div>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/" component={Main} />
                <Route exact path="/home" component={Home} />
                <Route path="/home/posts" component={Posts} />
            </BrowserRouter>
        );
    }
}
```

</div>

در مثال های بالا به ازای هر url یک کامپوننت خاص render میشود که به کمک path آدرس آن مشخص شده است

* کلمه exact برای این است که component فقط با همان url نشان داده شود و در غیر این صورت کامپوننت برای url های مکمل نیز نشان داده خواهد شد
 
در مثال بالا همانطور که میبینید از BrowserRouter به عنوان پدر تام Route ها استفاده شده است و 
 باید این را بدانید که ‌BrowserRouter کافیست تنها پدر و یا یکی از اجداد یک Route باشد تا Route به درستی کارکند
بنابر این کافیست در ابتدا فقط یکبار پدر تمام Component ها را به کمک آن Wrap کنیم و سپس در هر جایی که بخواهیم میتوانیم از Route استفاده کنیم

#Higher Order Component(HOC)
گاهی اوقات ما یک Component را به کمک Component دیگری Wrap میکنیم و به کمک آن تعدادی prop به props آن اضافه خواهیم کرد به این Component که در نقش Wrapper ضاهر میشود، Higher Order Component یا به اختصار HOC گفته میشود.

* در حالت کلی HOC ها معمولا در نقش یک تابع ظاهر میشوند که Component اولیه را به عنوان ورودی میگیرند و آن را به صورت Wrap شده خروجی میدهند

یکی ازاین HOC ها withRouter میباشد که بعد از Wrap کردن Component یک field با نام history به props آن اضافه میکنند که آن field توابع مهمی را در اختیار ما قرا میده که به کمک آن ها میتوانیم با url در ارتباط باشیم.

به عنوان مثال تابع push یک url میگیرد و صفحه را به آدرس آن redirect میکند.

<div dir="ltr">

```javascript
import React, {Component} from "react";
import { withRouter } from "react-router";

class BrowserRouterChild extends Component {
    
    render() {
        return (
            <input type="text" value="redirect" onClick={() => this.props.history.push("/home")}/>
        );
    }
}

export default withRouter(BrowserRouterChild);

```

</div>

* فقط به این موضوع دقت کنید که از withRouter تنها در Component هایی میتوان استفاده کرد از قرزندان ویا نوادگان BrowserRouter باشند

توضیحات بیشتر در [اینجا][101] و [اینجا][102]

# Refs

</div>

[1]: https://nodejs.org/en/download/
[2]: https://github.com/pnpm/pnpm
[3]: https://dev.to/kris/how-to-set-up-a-react-project-from-scratch-4ob
[4]: https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32
[5]: https://codeburst.io/setting-up-a-react-project-from-scratch-d62f38ab6d97
[6]: https://github.com/mostafaghadimi/reactstarter
[7]: https://reactjs.org/docs/introducing-jsx.html
[8]: https://github.com/mostafaghadimi/PWA/blob/master/PWA.pdf
[100]: https://reactjs.org/docs/forms.html
[101]: https://reactjs.org/docs/higher-order-components.html
[102]: https://medium.com/javascript-scene/do-react-hooks-replace-higher-order-components-hocs-7ae4a08b7b58
[103]: https://www.w3schools.com/js/js_htmldom.asp
