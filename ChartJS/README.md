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
Chart.js یک کتابخانه متن باز JavaScript برای بصری سازی و نمایش داده ها در صفحات HTML وب به کمک JavaScript است. در این مقاله Chart.js را معرفی میکنیم و استفاده دقیق و اصولی از آن را کمک مثال هی متنوع با سندیت بر مستندات Chart.js بیان می کنیم. سعی میکنیم ابتدا برای بدست آوردن کلیت یک مثال ساده را مطرح کنیم. سپس در ادامه به سمت اصول این کتابخانه میرویم.

## تصاویر 
کدهایی که منجر به خروجی های نمایش داده شده در این مقاله هستند، در پوشه examples قرار داده شده اند.

## یک مثال ساده 
ابتدا باید این کتابخانه را به مستند HTML مورد نظر اضافه کنیم. راه های مختلقی برای اینکار وجود دارد، به عنوان مثال:

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
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
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

خروجی کد های فوق برابر خواهد بود با:
<img title="Example 1" src="https://github.com/AryanAhadinia/web_workshop/blob/master/ChartJS/examples/ex1/ex1.png" alt="Example 1">

</div>
