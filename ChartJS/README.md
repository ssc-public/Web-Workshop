<p align="center">
    <img src="https://www.chartjs.org/media/logo-title.svg" alt="Chart.js logo">
    <br/>
برنامه سازی وب، دانشگاه صنعتی شریف
    <br/>
ارائه دهنده درس: جناب آقای امید جعفری نژاد
    <br/>
نویسندگان: آرین احدی نیا، محمد جعفری
</p>

<div dir="rtl">

## مقدمه 
Chart.js یک کتابخانه متن باز برای بصری سازی و نمایش داده ها در صفحات HTML به کمک JavaScript است. در این مقاله Chart.js را معرفی میکنیم و استفاده دقیق و اصولی از آن را کمک مثال های متنوع با اتکا بر مستندات Chart.js بیان می کنیم. ابتدا برای بدست آوردن کلیت یک مثال ساده را مطرح کنیم. سپس در ادامه به سمت اصول و منطق این کتابخانه میرویم.

## تصاویر 
کدهایی که منجر به خروجی های نمایش داده شده در تصاویر این مقاله هستند، در پوشه examples قرار داده شده اند.

## یک مثال ساده 
ابتدا باید این کتابخانه را به مستند HTML مورد نظر اضافه کنیم. راه های مختلقی برای اینکار وجود دارد، به عنوان مثال در این مورد از CDNJS استفاده می کنیم:

<div dir="ltr">

```
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
```

</div>

در ادامه به تفصیل به روش های مختلف نصب و اضافه کردن Chart.js به پروژه های خواهیم پرداخت.

المان های مربوط به نمودار های این کتابخانه با برچسب canvas در HTML مشخض میشوند. بنابرین به سادگی میتوانیم با استفاده از برچسب canvas، این المان را به صفحه HTML اضافه کنیم.

<div dir="ltr">

```
<canvas id="myChart></canvas>
```

</div>

سپس با استفاده از یک بلوک از کد های JS میتوانیم محتوای این نمودار را کنترل کنیم. به عنوان مثال:

<div dir="ltr">

```
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    options: {}
});
```

</div>

خروجی کد های فوق برابر خواهد بود با: (مثال 1)
<img title="Example 1" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex1/ex1.png" alt="Example 1">

## نصب و ادغام 
برای نصب و ادغام و استفاده از Chart.js راه های متعددی وجود دارد. این راه ها را در ادامه به تفصیل توضیح خواهیم داد، پیش از آن میخواهیم نحوه انتخاب ساخت مناسب این کتابخانه را بیان کنیم.

### ساخت های کتابخانه 
دو ساخت (build) برای این کتابخانه وجود دارد: stand-alone و bundled. انتخاب ساخت درست، بستگی به استفاده از moment.js دارد.

#### stand-alone:
این ساخت تمامی ویژگی های استاندارد این کتابخانه را دارد، تنها نکته این نسخه این است که اگر از ویژگی های مربوط به محور زمانی میخواهید استفاده کنید، باید کتابخانه moment.js را به صورت جداگانه اضافه کنید.
فایل های مربوط به این ساخت عبارتند از:

<div dir="ltr">

```
dist/Chart.js
dist/Chart.min.js
```

</div>

#### bundled:
این ساخت شامل تمامی ویژگی های stand-alone به همراه کتابخانه moment.js است. بنابرین با استفاده از این ساخت برای استفاده از ویژگی های محور زمانی نیازی به اضافه کردن جداگانه moment.js نیست.
فایل های مربوط به این ساخت عبارتند از:

<div dir="ltr">

```
dist/Chart.bundle.js
dist/Chart.bundle.min.js
```

</div>

#### انتخاب ساخت مناسب 
اگر از ویژگی های محور زمانی استفاده نمیکنید، استفاده از stan-alone توصیه میشود. اگر از این ویژگی استفاده میکنید میتوانید از ساخت bundled استفاده کنید. اما توجه کنید که اگر به دلیل دیگری از کتابخانه moment.js استفاده میکنید، بهتر است که از همان ساخت stand-alone استفاده کنید چرا که در صورت استفاده از bundled در حقیقت دوبار moment.js به پروژه اضافه میشود و این موضوع می تواند موجب افزایش زمان بارگیری صفحه و بار شبکه بشود. لازم به ذکر است که کتابخانه moment.js در ساخت bundled به صورت خصوصی به پروژه اضافه خواهد شد و از moment.js که توسط ساخت bundled به پروژه اضافه شده است، نمی توان برای منظور دیگری استفاده کرد.

### رویکرد اول: npm 

<div dir="ltr">

```
npm install chart.js --save
```

</div>

### رویکرد دوم: Bower 

<div dir="ltr">

```
bower install chart.js --save
```

</div>

### رویکرد سوم: CDNJS 
فایل های ساخت (built files) این کتابخانه در آدرس زیر موجود است.
<div dir="ltr">

```
https://cdnjs.com/libraries/Chart.js
```

</div>

### رویکرد چهارم: jsDeliver 
فایل های ساخت (built files) این کتابخانه در آدرس زیر موجود است.
<div dir="ltr">

```
https://www.jsdelivr.com/package/npm/chart.js?path=dist
```

</div>

### رویکرد پنجم: دانلود مستقیم [GitHub](https://github.com/chartjs/Chart.js/releases/tag/v2.9.4) 
میتوانید آخرین نسخه از Chart.js را به صورت مستقیم از صفحه GitHub این پروژه دانلود کنید. توجه کنید که در صورت استفاده از این روش باید پروژه را Build کنید تا فایل های dist برای استفاده بدست بیایند. لذا استفاده از روش جایگزین قویا توصیه میشود.

با روش های مختلف، جاوااسکیریپ خام و یا Module Loader های مختلف میتوانیم Chart.js را در پروژه ادغام کنیم.

### رویکرد اول: Script Tag 
<div dir="ltr">

```
<script src="path/to/chartjs/dist/Chart.js"></script>
```

</div>

### رویکرد دوم: Common JS 
<div dir="ltr">

```
var Chart = require('chart.js');
```

</div>

###رویکرد سوم: Bundler (مانند Webpack یا Rollup یا ...) 
<div dir="ltr">

```
import Chart from 'chart.js';
```

</div>

در صورتی که از این روش استفاده می کنید، به صورت خودکار moment.js اضافه خواهد شد. میتوانید با استفاده از externals برای Webpack و یا external برای Rollup، تنظیم کنید تا Moment.js اضافه نشود.
<br/><br/>

<div dir="ltr">

Webpack:
```
{
    externals: {
        moment: 'moment'
    }
}
```

</div>

<div dir="ltr">

Rollup:
```
{
    external: ['moment']
}
```

</div>

### سیاست امنیت محتوا 
در صورتی که از Content Security Policy (CSP) استفاده بکنید، Chart.js برای بارگیری CSS های مربوطه نیاز به تنظیمات بیشتر دارد. در این صورت باید در تنظیمات دسترسی `style-src 'unsafe-inline` داده شود. برای سیاست های بسته‌تر، زمانی که فقط `style-src self` مجاز شمرده میشود، لازم است که به صورت دستی CSS به پروژه اضافه شود:
<div dir="ltr">

```
<link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css">
```

</div>
اگر از این روش استفاده می کنید باید قبل از رسم اولین نمودار style injection را خاموش کنید:
<div dir="ltr">

```
Chart.platform.disableCSSInjection = true;
```

</div>

## انواع نمودار در Chart.js 
مدل های (type) اصلی نمودار در این کتابخانه عبارتند از:
- خطی (line)
- ستونی (bar)
- راداری (radar)
- دوناتی (doughnut) و دایره ای (pie)
- حلقوی (polar area)
- حبابی (bubble)
- نقطه ای (scatter)

در رابطه با هر کدام، توضیحاتی را مطرح خواهیم کرد و مثال هایی را برای فهم بهتر ارائه خواهیم داد.

### کلیت رسم نمودار 
برای رسم نمودار ها باید ابجکتی از محتویات و تنظمیات این نمودار بسازیم. این ابجکت سه فیلد اصلی باید داشته باشد. به عنوان مثال:

<div dir="ltr">

```
conf = {
    type: '...',
    data: {...},
    option: {...}
}
```

</div>

تنظیمات مربوط به نمودار در فیلد option و دیتای مربوط و تنظیمات مربوط در فیلد data قرار میگیرد. همانگونه که در مثال اول قابل مشاهده است، تنظیمات مربوط به رنگ دیتاها در فیلد دیتا قرار میگیرد.
<br/>
سپس می توانیم با پاس دادن این فیلد به کانستراکتور، نمودار مورد نظر را بسازیم.
<div dir="ltr">

```
let chart = new Chart(document.getElementById("chartID"), conf);
```

</div>
در ادامه صرفا ویژگی های مربوط به هر نمودار را بررسی می کنیم، سپس در انتها با استفاده از چند مثال، آموخته ها را به کار میبندیم.

### خطی (line) 

نمودار های خطی برای نمایش تعدادی نقاط که به هم از طریق خط مرتبط میشوند، است. این نمودار عموما برای نشان دادن تغییرات یا مقایسه استفاده میشود.

<div dir="ltr">

```
type: 'line'
```

</div>

در نمودار خطی، مانند سایر نمودار ها، شما می توانید مواردی را کنترل کنید تا نمودار به شکل دلخواه شما در بیاید.

#### تنظیمات عمومی Data
این موارد، مواردی هستند که برای ایجکت دیتا تعریف میشوند.

| نام فیلد | توضیحات                                                                         |
|----------|---------------------------------------------------------------------------------|
| label    | برچسب (label) دیتاست که در legend و tooltip نمایش داده میشود.                   |
| order    | الویت رسم دیتاست. توجه کنید که این الویت بر legend و tooltip نیز تاثیر میگذارد. |
| xAxisID  | شناسه محور X این این دیتاست بر روی آن نمودار میشود (برای نمودار های چند محوره)  |
| yAxisID  | شناسه محور Y این این دیتاست بر روی آن نمودار میشود (برای نمودار های چند محوره)  |

#### تنظیمات مربوط به DataSet
برای هر دیتاست، میتوانید موارد زیر را کنترل کنید، توجه کنید منظور از دیتاست مجموعه از داده های به هم مرتبط است. شما میتوانید در یک نمودار خطی بیش از یک دیتاست داشته باشید.

| نام فیلد                  | نوع            | اسکیریپ پذیر | ایندکس پذیر | مقدار پیشفرض       |
|---------------------------|----------------|--------------|-------------|--------------------|
| backgroundColor           | Color          | بله          | خیر         | rgba(0, 0, 0, 0.1) |
| borderCapStyle            | string         | بله          | خیر         | butt               |
| borderColor               | Color          | بله          | خیر         | rgba(0, 0, 0, 0.1) |
| borderDash                | number[]       | بله          | خیر         | []                 |
| borderDashOffset          | number         | بله          | خیر         | 0                  |
| borderJoinStyle           | string         | بله          | خیر         | miter              |
| borderWidth               | number         | بله          | خیر         | 3                  |
| cubicInterpolationMode    | string         | بله          | خیر         | default            |
| clip                      | number|object  | خیر          | خیر         | borderWidth / 2    |
| fill                      | boolean|string | بله          | خیر         | TRUE               |
| hoverBackgroundColor      | Color          | بله          | خیر         | undefined          |
| hoverBorderCapStyle       | string         | بله          | خیر         | undefined          |
| hoverBorderColor          | Color          | بله          | خیر         | undefined          |
| hoverBorderDash           | number[]       | بله          | خیر         | undefined          |
| hoverBorderDashOffset     | number         | بله          | خیر         | undefined          |
| hoverBorderJoinStyle      | string         | بله          | خیر         | undefined          |
| hoverBorderWidth          | number         | بله          | خیر         | undefined          |
| label                     | string         | خیر          | خیر         | ''                 |
| lineTension               | number         | خیر          | خیر         | 0.4                |
| order                     | number         | خیر          | خیر         | 0                  |
| pointBackgroundColor      | Color          | بله          | بله         | rgba(0, 0, 0, 0.1) |
| pointBorderColor          | Color          | بله          | بله         | rgba(0, 0, 0, 0.1) |
| pointBorderWidth          | number         | بله          | بله         | 1                  |
| pointHitRadius            | number         | بله          | بله         | 1                  |
| pointHoverBackgroundColor | Color          | بله          | بله         | undefined          |
| pointHoverBorderColor     | Color          | بله          | بله         | undefined          |
| pointHoverBorderWidth     | number         | بله          | بله         | 1                  |
| pointHoverRadius          | number         | بله          | بله         | 4                  |
| pointRadius               | number         | بله          | بله         | 3                  |
| pointRotation             | number         | بله          | بله         | 0                  |
| pointStyle                | string|Image   | بله          | بله         | Circle             |
| showLine                  | boolean        | خیر          | خیر         | undefined          |
| spanGaps                  | boolean        | خیر          | خیر         | undefined          |
| steppedLine               | boolean|string | خیر          | خیر         | FALSE              |
| xAxisID                   | string         | خیر          | خیر         | first x axis       |
| yAxisID                   | string         | خیر          | خیر         | first y axis       |

#### تنظیمات ظاهر نقاط
میتوانید ظاهر هر نقطه را با تعریف موارد زیر، از حالت پیشفرض تغییر دهید. همچنین میتوانید مقادیر پیشفرض Chart.js را نیز از آدرس elements.point تغییر دهید. اگر مقادیر پیشفرض را تغییر دهید، تمامی نمودار هایی که بعد از تغییر خواهید کشید، تحت تاثیر قرار خواهد گرفت.

| نام فیلد             | توضیحات                                                                |
|----------------------|------------------------------------------------------------------------|
| pointBackgroundColor | رنگ پرکننده نقاط.                                                      |
| pointBorderColor     | رنگ مرز نقاط.                                                          |
| pointBorderWidth     | ضحامت مرز نقاط بر مبنای px.                                            |
| pointHitRadius       | سایر پیکسلی نقاط نمایش داده نشده برای واکنش نشان دادن به حرکات نشانگر. |
| pointRadius          | شعاع نقاط. اگر صفر باشد نقطه نمایش داده نخواهد شد.                     |
| pointRotation        | میزان دوران نقاط                                                       |
| pointStyle           | شکل نقاط                                                               |

#### فعل و انفعالات نقاط
با تغییر مقادیر زیر میتوانید بازخورد نقاط را نسبت به ماوس یا ... کنترل کنید.

| نام فیلد                  | توضیحات                                         |
|---------------------------|-------------------------------------------------|
| pointHoverBackgroundColor | رنگ پرکننده نقاط زمانی که نشانگر بر روی آن است. |
| pointHoverBorderColor     | رنگ مرز نقاط زمانی که نشانگر بر روی آن است.     |
| pointHoverBorderWidth     | ضخامت مرز نقاط زمانی که نشانگر بر روی آن است.   |
| pointHoverRadius          | شعاع نقاط زمانی که نشانگر بر روی آن است.        |

#### تنظیمات ظاهر خطوط
با مقدار دهی به موارد زیر میتوانید نحوه رفتار خطوط را کنترل کنید.

| نام فیلد         | توضیحات                                                                                                                |
|------------------|------------------------------------------------------------------------------------------------------------------------|
| backgroundColor  | رنگ پر کننده خط                                                                                                        |
| borderCapStyle   | ظاهر انتهای خط                                                                                                         |
| borderColor      | رنگ خط                                                                                                                 |
| borderDash       | طول و فاصله گذاری خط تیره ها (در صورت نیاز)                                                                            |
| borderDashOffset | offset خط تیره ها                                                                                                      |
| borderJoinStyle  | ظاهر LineJoin                                                                                                          |
| borderWidth      | عرض خط بر مبنای پیکسل                                                                                                  |
| fill             | پر کردن زیر خط                                                                                                         |
| showLine         | تنظیم می کند که آیا خط برای این دیتاست رسم شود یا نشود.                                                                |
| spanGaps         | در صورت True بودن، موجب فاصله انداختن NaN و Null در خط میشود، در صورتی که False باشد، خط پیوستگی خود را حفظ خواهد کرد. |

همچنین دو مورد زیر را میتوانید برای کل نمودار در قسمت Data کنترل کنید.
| نام       | نوع     | مقدار پیشفرض | توضیحات                                           |
|-----------|---------|--------------|---------------------------------------------------|
| showLines | boolean | TRUE         | آیا خط واصل نقاط رسم شود یا نه.                   |
| spanGaps  | boolean | FALSE        | آیا NaN در خط واصل نقاط شکستگی ایجاد کند یا نکند. |

### ستونی (bar) 

<div dir="ltr">

```
type: 'bar'
```

</div>



### راداری (radar) 

<div dir="ltr">

```
type: 'radar'
```

</div>

نمودار های راداری اغلب برای مقایسه چند مجموعه داده مرتبط به هم به کار میروند.

#### داده ها
داده های هر Dataset در نمودار های راداری، آرایه ای از اعداد است.

#### مقادیر پیشفرض
میتوانیم مقادیر پیشفرض رسم این نوع نمودار را از آدرس

<div dir="ltr">

```
Chart.defaults.radar
```

</div>

تغییر دهیم. 

بعد از تغییر، نمودار های جدید با مقادیر پیشفرض جدید رسم میشوند، اما نمودار هایی که پیشتر تولید شده اند، بدون تغییر میمانند.

### دوناتی (doughnut) و دایره ای (pie) 

<div dir="ltr">

```
type: 'pie'
```

```
type: 'doughnut'
```

</div>

نمودار های دایره ای و دوناتی در ماهیت یک چیز هستند اما در نحوه نمایش تفاوت اندکی دارند. در این دو نوع نمودار قطاع یا کمان هایی از دایره برای نمایش مقدار نسبی هر داده نسبت به دیگر داده ها به کار میرود.

در این کتابخانه نمودار دوناتی، در واقع همان نمودار دایره ای است. تنها تفاوت این دو نوع این است که مقدار پیشفرض cutoutPercentage در نمودار دایره ای 0 و در نمودار دوناتی 50 تنظیم شده است.

اما توجه کنید که این دو نوع از یکدیگر جدا هسنند و با تغییر دادن مقادیر پیشفرض یکی دیگری تغییر نمیکند.

#### داده ها
داده های این دو نوع نمودار، آرایه ای از اعداد است. مثال:

<div dir="ltr">

```
data = {
    datasets: [{
        data: [10, 20, 30]
    }]
}
```

</div>

#### مقادیر پیشفرض
میتوانیم مقادیر پیشفرض رسم این نوع نمودار را از آدرس

<div dir="ltr">

```
Chart.defaults.pie
```

```
Chart.defaults.doughnut
```

</div>

تغییر دهیم. 

بعد از تغییر، نمودار های جدید با مقادیر پیشفرض جدید رسم میشوند، اما نمودار هایی که پیشتر تولید شده اند، بدون تغییر میمانند.

#### تنظیمات مربوط به Dataset ها
برای هر دیتاست، میتوانیم تنظیماتی را در نمودار های دایره ای و دوناتی کنترل کنیم، تنظیماتی اعم از نحوه نمایش، الویت رسم و نحوه پاسخگویی به وقایع (event). در جداول زیر این موارد را نام میبریم. توجه کنید که این تنظیمات میتوانند به صورت جداگانه برای هر Dataset  انجام شود.

| نام فیلد             | نوع      | اسکیریپ پذیر | ایندکس پذیر | مقدار پیشفرض       |
|----------------------|----------|--------------|-------------|--------------------|
| backgroundColor      | Color    | بله          | بله         | rgba(0, 0, 0, 0.1) |
| borderAlign          | string   | بله          | بله         | center             |
| borderColor          | Color    | بله          | بله         | #fff               |
| borderWidth          | number   | بله          | بله         | 2                  |
| data                 | number[] | خیر          | خیر         | required           |
| hoverBackgroundColor | Color    | بله          | بله         | undefined          |
| hoverBorderColor     | Color    | بله          | بله         | undefined          |
| hoverBorderWidth     | number   | بله          | بله         | undefined          |
| weight               | number   | خیر          | خیر         | 1                  |

توضیحات بیشتر درباره موارد فوق را میتوانید در جداول زیر مشاهده کنید.

#### ظاهری
| نام فیلد        | توضیحات                                                                                         |
|-----------------|-------------------------------------------------------------------------------------------------|
| backgroundColor | رنگ زمینه قطاع.                                                                                 |
| borderColor     | زنگ مرز قطاع                                                                                    |
| borderWidth     | ضخامت مرز قطاع بر مبنای px.                                                                     |
| weight          | ضخامت نسبی دیتاست که مقدار دهی به آن باعث میشود دیتاست ها با یک ضخامت نسبی نسبت به هم چاپ شوند. |

#### پاسخ به وقایع
| نام فیلد             | توضیحات                                                    |
|----------------------|------------------------------------------------------------|
| hoverBackgroundColor | رنگ زمینه قطاع هنگامی که نشانگر بر روی آن است.             |
| hoverBorderColor     | رنگ مرز قطاع هنگامی که نشانگر بر روی آن است                |
| hoverBorderWidth     | ضخامت مرز قطاع هنگامی که نشانگر بر روی آن است بر مبنای px. |

#### تنظیمات پیکربندی
از موارد فوق میتوان به عنوان option استفاده کرد تا نمودار مطلوب را بدست آورد.

| نام فیلد                | نوع     | مقدار پیشفرض            | توضیحات                                                      |
|-------------------------|---------|-------------------------|--------------------------------------------------------------|
| cutoutPercentage        | number  | دایره ای: 0، دوناتی: 50 | درصد مساحت خالی میانی                                        |
| rotation                | number  | -0.5 * Math.PI          | زاویه شروع رسم اولین قطاع                                    |
| circumference           | number  | 2 * Math.PI             | زاویه کل قطاع ها، 2Pi برابر دایره کامل است.                  |
| animation.animateRotate | boolean | TRUE                    | در صورت درست بودن نمودار با انیمیشن دورانی نمایش داده میشود. |
| animation.animateScale  | boolean | FALSE                   | در صورت درست بودن، نمودار با انیمیشین از مرکز بزرگ میشود.    |

#### Border Alignment
دو مقدار مجاز برای borderAlign وجود دارد:

<div dir="ltr">

```
center
```

```
inner
```

</div>

در صورتی که گزینه center انتخاب شود، مرز قطاع های همجوار با یک دیگر همپوشانی خواهد داشت اما در صورتی که گزینه inner انتخاب شود، تضمین میشود که مرز ها با یک دیگر همپوشانی نخواهند داشت. توجه کنید که مقدار پیشفرض این تنظیم، center است.

### قطبی (polar area) 

<div dir="ltr">

```
type: 'polarArea'
```

</div>

نمودار قطبی از نظر ماهیت مانند نمودار دایره ای یا دوناتی است، با این تفاوت که فراوانی در نمودار دایره ای و دوناتی، شعاع قطاع ها برابر بود و زاویه مرکزی هر قطاع نمایانگر فراوانی نسبی آن داده بود. اما در نمودار قطبی، زاویه مرکزی قطاع ها برابر است و شعاع هر قطاع نشان میدهد که فراوانی آن داده به چه مقدار است. نکته حائز توجه و برتری نمودار قطبی نسبت به دایره ای و دوناتی این است که در نمودار قطبی فراوانی مطلق را نیز میتوان به صورت مستقیم نمایش داده اما در دایره ای و دوناتی تنها میتوان فراوانی نسبی را نمایش داد.

#### داده ها
داده های این نوع نمودار، آرایه ای از اعداد است. مثال:

<div dir="ltr">

```
data = {
    datasets: [{
        data: [10, 20, 30]
    }]
}
```

</div>

#### مقادیر پیشفرض
میتوانیم مقادیر پیشفرض رسم این نوع نمودار را از آدرس

<div dir="ltr">

```
Chart.defaults.polarArea
```

</div>

تغییر دهیم. 

بعد از تغییر، نمودار های جدید با مقادیر پیشفرض جدید رسم میشوند، اما نمودار هایی که پیشتر تولید شده اند، بدون تغییر میمانند.

مثال:

<div dir="ltr">

```
Chart.defaults.polarArea.animation.animateScale = false;
```

</div>

#### تنظیمات مربوط به Dataset ها
برای هر دیتاست، میتوانیم تنظیماتی را در نمودار های قطبی کنترل کنیم، تنظیماتی اعم از نحوه نمایش، الویت رسم و نحوه پاسخگویی به وقایع (event). در جداول زیر این موارد را نام میبریم. توجه کنید که این تنظیمات میتوانند به صورت جداگانه برای هر Dataset  انجام شود.

| نام فیلد             | نوع      | اسکیریپ پذیر | ایندکس پذیر | مقدار پیشفرض       |
|----------------------|----------|--------------|-------------|--------------------|
| backgroundColor      | Color    | بله          | بله         | rgba(0, 0, 0, 0.1) |
| borderAlign          | string   | بله          | بله         | center             |
| borderColor          | Color    | بله          | بله         | '#fff'             |
| borderWidth          | number   | بله          | بله         | 2                  |
| data                 | number[] | خیر          | خیر         | required           |
| hoverBackgroundColor | Color    | بله          | بله         | undefined          |
| hoverBorderColor     | Color    | بله          | بله         | undefined          |
| hoverBorderWidth     | number   | بله          | بله         | undefined          |

توضیحات مربوط به موارد فوق را میتوانید در جدوال زیر مشاهده کنید.

#### ظاهری
| نام فیلد        | توضیحات                     |
|-----------------|-----------------------------|
| backgroundColor | رنگ زمینه قطاع.             |
| borderColor     | رنگ مرز قطاع.               |
| borderWidth     | ضخامت مرز قطاع بر مبنای px. |

#### پاسخ به وقایع
| نام فیلد             | توضیحات                                                    |
|----------------------|------------------------------------------------------------|
| hoverBackgroundColor | رنگ زمینه قطاع هنگامی که نشانگر بر روی آن است.             |
| hoverBorderColor     | رنگ مرز قطاع هنگامی که نشانگر بر روی آن است                |
| hoverBorderWidth     | ضخامت مرز قطاع هنگامی که نشانگر بر روی آن است بر مبنای px. |

#### تنظیمات پیکربندی
از موارد فوق میتوان به عنوان option استفاده کرد تا نمودار مطلوب را بدست آورد.
| نام                     | نوع     | مقدار پیشفرض   | توضیحات                                                      |
|-------------------------|---------|----------------|--------------------------------------------------------------|
| startAngle              | number  | -0.5 * Math.PI | زاویه شروع رسم اولین قطاع                                    |
| animation.animateRotate | boolean | TRUE           | در صورت درست بودن نمودار با انیمیشن دورانی نمایش داده میشود. |
| animation.animateScale  | boolean | TRUE           | در صورت درست بودن، نمودار با انیمیشین از مرکز بزرگ میشود.    |

#### Border Alignment
دو مقدار مجاز برای borderAlign وجود دارد:

<div dir="ltr">

```
center
```

```
inner
```

</div>

در صورتی که گزینه center انتخاب شود، مرز قطاع های همجوار با یک دیگر همپوشانی خواهد داشت اما در صورتی که گزینه inner انتخاب شود، تضمین میشود که مرز ها با یک دیگر همپوشانی نخواهند داشت. توجه کنید که مقدار پیشفرض این تنظیم، center است.

### حبابی (bubble) 

<div dir="ltr">

```
type: 'bubble'
```

</div>

#### داده ها
این نوع نمودار به آرایه ای از نقاط به عنوان داده نیاز دارد. هر نقطه باید یک ابجکت شامل مختصه طولی و عرضی و شعاع هر حباب باشد.

<div dir="ltr">

```
{
    x: number,
    y: number,
    r: number
}
```

</div>

توجه کنید که مقدار شعاع یک مقدار مطلق بر حسب پیکسل است و نسبت به اندازه نمایش نمودار مقیاس بندی نمی شود.

#### مقادیر پیشفرض
میتوانیم مقادیر پیشفرض رسم این نوع نمودار را از آدرس

<div dir="ltr">

```
Chart.defaults.bubble
```

</div>

تغییر دهیم. 

بعد از تغییر، نمودار های جدید با مقادیر پیشفرض جدید رسم میشوند، اما نمودار هایی که پیشتر تولید شده اند، بدون تغییر میمانند.

#### تنظیمات مربوط به Dataset ها
برای هر دیتاست، میتوانیم تنظیماتی را در نمودار های حبابی کنترل کنیم، تنظیماتی اعم از نحوه نمایش، الویت رسم و نحوه پاسخگویی به وقایع (event). در جداول زیر این موارد را نام میبریم. توجه کنید که این تنظیمات میتوانند به صورت جداگانه برای هر Dataset  انجام شود.

| نام فیلد             | نوع فیلد | اسکیریپ پذیر | ایندکس پذیر | مقدار پیشفرض       |
|----------------------|----------|--------------|-------------|--------------------|
| backgroundColor      | Color    | بله          | بله         | rgba(0, 0, 0, 0.1) |
| borderColor          | Color    | بله          | بله         | rgba(0, 0, 0, 0.1) |
| borderWidth          | number   | بله          | بله         | 3                  |
| data                 | object[] | خیر          | خیر         | required           |
| hoverBackgroundColor | Color    | بله          | بله         | undefined          |
| hoverBorderColor     | Color    | بله          | بله         | undefined          |
| hoverBorderWidth     | number   | بله          | بله         | 1                  |
| hoverRadius          | number   | بله          | بله         | 4                  |
| hitRadius            | number   | بله          | بله         | 1                  |
| label                | string   | خیر          | خیر         | undefined          |
| order                | number   | خیر          | خیر         | 0                  |
| pointStyle           | string   | بله          | بله         | circle             |
| rotation             | number   | بله          | بله         | 0                  |
| radius               | number   | بله          | بله         | 3                  |

توضیحات مربوط به موارد فوق را میتوانید در جداول زیر مشاهده کنید.

#### عمومی
| نام فیلد | توضیحات                                                       |
|----------|---------------------------------------------------------------|
| label    | برچسب (label) دیتاست که در legend و tooltip نمایش داده میشود. |
| order    | الویت رسم دیتاست.                                             |

#### ظاهری
| نام فیلد        | توضیحات                        |
|-----------------|--------------------------------|
| backgroundColor | رنگ زمینه حباب ها.             |
| borderColor     | رنگ مرز حباب ها.               |
| borderWidth     | ضخامت مرز حباب ها بر مبنای px. |
| pointStyle      | شکل حباب ها.                   |
| rotation        | دوران حباب ها (بر مینای درجه). |
| radius          | شعاع حباب ها.                  |

#### پاسخ به وقایع
| نام فیلد             | توضیحات                                                    |
|----------------------|------------------------------------------------------------|
| hoverBackgroundColor | رنگ زمینه حباب ها هنگامی که نشانگر بر روی آن است.          |
| hoverBorderColor     | رنگ مرز حباب ها هنگامی که نشانگر بر روی آن است.            |
| hoverBorderWidth     | ضخامت مرز حباب ها هنگامی که نشانگر بر روی آن است.          |
| hoverRadius          | شعاع مازاد حباب ها حباب ها هنگامی که نشانگر بر روی آن است. |
| hitRadius            | شعاع اضافی حباب ها هنگامی که بر آن ضربه زده میشود.         |


### نقطه ای (scatter) 

<div dir="ltr">

```
type: 'scatter'
```

</div>

این نوع نمودار بر پایه نمودار خطی (line) پیاده اسازی شده است. بنابریین توضیح مجدد، تکرار مکررات است.


#### داده ها
داده ی مطلوب این نمودار، آرابه ای از نقاط است. هر نقطه ایجکتی است که دو مختصه طولی و عرضی را در خود ذخیره میکند.

<div dir="ltr">

```
{
    x: number,
    y: number
}
```

</div>

## مثال اول 

نمودار های مربوط به امتیاز بندی این دو بزرگوار زمین فوتبال را تحت نمودار راداری و نمودار ستونی رسم کنید.

<p align="center">
<img title="Example Messi vs Ronaldo" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex_messiVsRonaldo/image.png" alt="Example Messi vs Ronaldo">
</p>
نمودار راداری
<div dir="ltr">

```
<canvas id="myRadarChart"></canvas>
<script>
    let ctxRadar = document.getElementById('myRadarChart').getContext('2d');
    let confRadar = {
        type: 'radar',
        data: {
            labels: ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'],
            datasets: [{
                label: "Messi",
                data: [85, 92, 91, 95, 38, 65],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)"
            }, {
                label: "Ronaldo",
                data: [89, 93, 81, 89, 35, 77],
                fill: true,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                pointBackgroundColor: "rgb(54, 162, 235)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(54, 162, 235)"
            }]
        },
        options: {}
    }
    new Chart(ctxRadar, confRadar);
</script>
```

</div>

نمودار ستونی
<div dir="ltr">

```
<canvas id="myBarChart"></canvas>
<script>
    let ctxBar = document.getElementById("myBarChart")
    let confBar = {
        type: "bar",
        data: {
            labels: ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'],
            datasets: [{
                label: "Messi",
                data: [85, 92, 91, 95, 38, 65],
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255,99,132)",
                borderWidth: 1
            }, {
                label: "Ronaldo",
                data: [89, 93, 81, 89, 35, 77],
                fill: false,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1
            }]
        },
        options: {"scales": {"yAxes": [{"ticks": {"beginAtZero": true}}]}}
    }
    new Chart(ctxBar, confBar);
</script>
```

</div>

خروجی کد های فوق برابر خواهد بود با: (مثال مسی و رونالدو)

<p align="center">
<img title="Example Messi vs Ronaldo Plot" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex_messiVsRonaldo/ex_messiVsRonaldo.png" alt="Example Messi vs Ronaldo Plot">
</p>

همان طور که مشاهده می کنید، میتوانیم به یک نمودار چند dataset اضافه کنیم.

## مثال دوم 
جدول زیر تعداد فروش 10 خودروساز پرفروش سال 2019 در ایالات متحده است. نمودار های دایره ای، دوناتی و قطبی این داده ها را رسم کنید. (مثال خودرو)

| نام شرکت          | میزان فروش        |
| :---------------: | :---------------: |
| فورد              | 2284425           |
| تویوتا            | 2085206           |
| شورولت            | 1942039           |
| هوندا             | 1450985           |
| نیسان             | 1227973           |
| جیپ               | 923292            |
| رم                | 703023            |
| سوبارو            | 700117            |
| هیوندای           | 688771            |
| کیا               | 614613            |

نمودار دایره ای
<div dir="ltr">

```
<canvas id="myPieChart"></canvas>
<script>
    let ctxPie = document.getElementById("myPieChart");
    let confPie = {
        type: "pie",
        data: {
            labels: ["فورد", "تویوتا", "شورولت", "هوندا", "نیسان", "جیپ", "رم", "سوبارو", "هیوندای", "کیا"],
            datasets: [{
                label: "Brand",
                data: [2284425, 2085206, 1942039, 1450985, 1227973, 923292, 703023, 700117, 688771, 614613],
                backgroundColor: ["rgb(20,89,133)", "rgb(226,22,22)", "rgb(205,154,40)", "rgb(91,5,5)",
                    "rgb(139,210,62)", "rgb(150,36,221)", "rgb(207,90,36)", "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)", "rgb(255, 205, 86)",]
            }]
        },
        options: {
            legend: {
                labels: {
                    fontSize: 20,
                    fontFamily: "Adobe Arabic"
                }
            }
        }
    };
    new Chart(ctxPie, confPie);
</script>
```

</div>

نمودار دوناتی
<div dir="ltr">

```
<canvas id="myDoughnutChart"></canvas>
<script>
    let ctxDoughnut = document.getElementById("myDoughnutChart");
    let confDoughnut = {
        type: "doughnut",
        data: {
            labels: ["فورد", "تویوتا", "شورولت", "هوندا", "نیسان", "جیپ", "رم", "سوبارو", "هیوندای", "کیا"],
            datasets: [{
                label: "Brand",
                data: [2284425, 2085206, 1942039, 1450985, 1227973, 923292, 703023, 700117, 688771, 614613],
                backgroundColor: ["rgb(20,89,133)", "rgb(226,22,22)", "rgb(205,154,40)", "rgb(91,5,5)",
                    "rgb(139,210,62)", "rgb(150,36,221)", "rgb(207,90,36)", "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)", "rgb(255, 205, 86)",]
            }]
        },
        options: {
            legend: {
                labels: {
                    fontSize: 20,
                    fontFamily: "Adobe Arabic"
                }
            }
        }
    };
    new Chart(ctxDoughnut, confDoughnut);
</script>
```

</div>

نمودار قطبی
<div dir="ltr">

```
<canvas id="myPolarChart"></canvas>
<script>
    let ctxPolar = document.getElementById("myPolarChart");
    let confPolar = {
        type: "polarArea",
        data: {
            labels: ["فورد", "تویوتا", "شورولت", "هوندا", "نیسان", "جیپ", "رم", "سوبارو", "هیوندای", "کیا"],
            datasets: [{
                label: "Brand",
                data: [2284425, 2085206, 1942039, 1450985, 1227973, 923292, 703023, 700117, 688771, 614613],
                backgroundColor: ["rgb(20,89,133)", "rgb(226,22,22)", "rgb(205,154,40)", "rgb(91,5,5)",
                    "rgb(139,210,62)", "rgb(150,36,221)", "rgb(207,90,36)", "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)", "rgb(255, 205, 86)",]
            }]
        },
        options: {
            legend: {
                labels: {
                   fontSize: 20,
                    fontFamily: "Adobe Arabic"
                }
            }
        }
    };
    new Chart(ctxPolar, confPolar);
</script>
```

</div>

<p align="center">
<img title="Example Cars" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex_cars/ex_cars.png" alt="Example Cars">
</p>

همان طور که مشاهده می کنید، در این مثال font را نیز تغییر دادیم.

## مثال سوم
ایده مونته کارلو: یک ایده مناسب برای محاسبه انتگرال معین توابع، این است که بازه مورد نظر را یک مسطتیل در نظر بگیریم، سپس در این مستطیل تعداد زیادی نقطه تصادفی به صورت uniform بدست آوریم. احتمال اینکه نقطه مورد نظر زیر نمودار باشد، برابر نسبت مساحت زیر نمودار به مساحت کل مستطیل است. بنابرین اگر تعداد نقاطی که زیر نمودار است را بشماریم و نسبت آن را به تعداد کل نقاط محاسبه کنیم، با ضرب این مقدار در مساحت مستطیل میتوانیم انتگرال مورد نظر را به صورت تقریبی پیدا کنیم.
<br/>
ماموریت این است که یک نمودار مناسب برای استفاده از این ایده برای محاسبه انتگرال تابع مجذور در بازه 0 تا 4 رسم کنید. دقت کنید در این مثال از Scriptable بودن color استفاده کرده ایم.

<div dir="ltr">

```
<canvas id="chart"></canvas>
<script>
function getRandomizedPoints(xLowerBound, xUpperBound, yLowerBound, yUpperBound, count) {
    let points = [];
    for (let i = 0; i < count; i++) {
        points.push({
            x: (Math.random() * (xUpperBound - xLowerBound)) + xLowerBound,
            y: (Math.random() * (yUpperBound - yLowerBound)) + yLowerBound
        })
    }
    return points;
}

let ctx = document.getElementById("chart");
let conf = {
    type: "scatter",
    data: {
        datasets: [{
            data: getRandomizedPoints(0, 4, 0, 16, 20000),
            pointBackgroundColor: function (context) {
                let index = context.dataIndex;
                let value = context.dataset.data[index];
                if (value.y >= value.x ** 2) {
                    return 'red';
                } else {
                    return 'blue';
                }
            }
        }]
    }
}

new Chart(ctx, conf);
</script>
```

</div>

نتیجه

<p align="center">
<img title="Example Math" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex_math/ex_math.png" alt="Example Math">
</p>


## تنظیمات

### انیمیشن 

### چیدمان 

### حاشیه نویسی (legend) 

### عنوان گذاری 

### Tooltip

### المان ها 

## ویژگی های کلی 

</div>
