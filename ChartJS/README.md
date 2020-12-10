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

<div dir="ltr">

```
type: 'line'
```

</div>

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



### دوناتی (doughnut) و دایره ای (pie) 

<div dir="ltr">

```
type: 'pie'
```

```
type: 'doughnut'
```

</div>


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

| نام فیلد        | توضیحات                                                                                         |
|-----------------|-------------------------------------------------------------------------------------------------|
| backgroundColor | رنگ زمینه قطاع.                                                                                 |
| borderColor     | زنگ مرز قطاع                                                                                    |
| borderWidth     | ضخامت مرز قطاع بر مبنای px.                                                                     |
| weight          | ضخامت نسبی دیتاست که مقدار دهی به آن باعث میشود دیتاست ها با یک ضخامت نسبی نسبت به هم چاپ شوند. |

| نام فیلد             | توضیحات                                                    |
|----------------------|------------------------------------------------------------|
| hoverBackgroundColor | رنگ زمینه قطاع هنگامی که نشانگر بر روی آن است.             |
| hoverBorderColor     | رنگ مرز قطاع هنگامی که نشانگر بر روی آن است                |
| hoverBorderWidth     | ضخامت مرز قطاع هنگامی که نشانگر بر روی آن است بر مبنای px. |

| نام فیلد                | نوع     | مقدار پیشفرض            | توضیحات                                                      |
|-------------------------|---------|-------------------------|--------------------------------------------------------------|
| cutoutPercentage        | number  | دایره ای: 0، دوناتی: 50 | درصد مساحت خالی میانی                                        |
| rotation                | number  | -0.5 * Math.PI          | زاویه شروع رسم اولین قطاع                                    |
| circumference           | number  | 2 * Math.PI             | زاویه کل قطاع ها، 2Pi برابر دایره کامل است.                  |
| animation.animateRotate | boolean | TRUE                    | در صورت درست بودن نمودار با انیمیشن دورانی نمایش داده میشود. |
| animation.animateScale  | boolean | FALSE                   | در صورت درست بودن، نمودار با انیمیشین از مرکز بزرگ میشود.    |


### حلقوی (polar area) 

<div dir="ltr">

```
type: 'polarArea'
```

</div>

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

| نام فیلد        | توضیحات                     |
|-----------------|-----------------------------|
| backgroundColor | رنگ زمینه قطاع.             |
| borderColor     | رنگ مرز قطاع.               |
| borderWidth     | ضخامت مرز قطاع بر مبنای px. |

| نام فیلد             | توضیحات                                                    |
|----------------------|------------------------------------------------------------|
| hoverBackgroundColor | رنگ زمینه قطاع هنگامی که نشانگر بر روی آن است.             |
| hoverBorderColor     | رنگ مرز قطاع هنگامی که نشانگر بر روی آن است                |
| hoverBorderWidth     | ضخامت مرز قطاع هنگامی که نشانگر بر روی آن است بر مبنای px. |

| نام                     | نوع     | مقدار پیشفرض   | توضیحات                                                      |
|-------------------------|---------|----------------|--------------------------------------------------------------|
| startAngle              | number  | -0.5 * Math.PI | زاویه شروع رسم اولین قطاع                                    |
| animation.animateRotate | boolean | TRUE           | در صورت درست بودن نمودار با انیمیشن دورانی نمایش داده میشود. |
| animation.animateScale  | boolean | TRUE           | در صورت درست بودن، نمودار با انیمیشین از مرکز بزرگ میشود.    |

### حبابی (bubble) 

<div dir="ltr">

```
type: 'bubble'
```

</div>

#### داده ها: 
در این نمودار داده های باید آرایه ای از ابجکت ها باشد که 3 فیلد در آنها وجود داشته دارد. مختصه x و y و شعاع حباب مورد نظر

<div dir="ltr">

```
{
    x: number, // X value
    y: number, // Y value
    r: number  // Bubble radius
}
```

</div>

توجه کنید که x و y با توجه به اندازه نمایش نمودار مقیاس بندی میشوند ولی r یک عدد بر مبنای pixel است و مستقل از اندازه نمایش نمودار است.

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


| نام فیلد | توضیحات                                                       |
|----------|---------------------------------------------------------------|
| label    | برچسب (label) دیتاست که در legend و tooltip نمایش داده میشود. |
| order    | الویت رسم دیتاست.                                             |


| نام فیلد        | توضیحات                        |
|-----------------|--------------------------------|
| backgroundColor | رنگ زمینه حباب ها.             |
| borderColor     | رنگ مرز حباب ها.               |
| borderWidth     | ضخامت مرز حباب ها بر مبنای px. |
| pointStyle      | شکل حباب ها.                   |
| rotation        | دوران حباب ها (بر مینای درجه). |
| radius          | شعاع حباب ها.                  |


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
