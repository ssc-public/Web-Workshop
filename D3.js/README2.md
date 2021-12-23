## Data Binding

در این بخش می‌خواهیم یاد بگیریم که چگونه داده‌ها را به عناصر DOM متصل (bind) کنیم و بر اساس داده‌مان عناصر جدید بسازیم.

کتاب‌خانه D3 شامل توابع مهم زیر برای bind کردن داده‌هاست:

جدول TODO

### تابع ()data

تابع data برای متصل کردن آرایه‌ای از داده‌ها به عنصرِ DOM انتخاب‌شده استفاده می‌شود و بخش انتخاب شده را آپدیت و return کند. D3 با انواع داده‌هایی نظیر آرایه‌ها، CSV, TSV, JSON, XML و … کار می‌کند.

ما می‌توانیم دو نوع داده‌ی مختلف را به تابع data ورودی دهیم: یک آرایه‌ای از اعداد/آبجکت‌ها یا یک function of data (TODO link)

مثال پیش رو نشان می‌دهد که چگونه یک آرایه را در عنصر موجود در DOM با استفاده از تابع data جایگزین کنیم:

```
<p>D3 Tutorials</p>

<script>
        var myData = ["Hello World!"];
     
        var p = d3.select("body")
            .selectAll("p")
            .data(myData)
            .text(function (d) {
                return d;
            });
</script>
```

در مثال بالا، یک پاراگراف داریم:
```<p>D3 Tutorials</p>```

سپس یک آرایه به اسم myData ساختیم که می‌خواهیم آن را در عنصر <p> جایگزین کنیم. کد بالا این گونه کار می‌کند:

ابتدا
```d3.select("body")```
عنصر body را انتخاب می‌کند. سپس 
```selectAll("p")```
همه‌ی p های موجود را برمی‌گرداند. سپس 
```data(myData)```
آرایه‌ی myData را به عناصر انتخاب‌شده bind می‌کند. این جا یک p بیشتر نداریم. لذا اولین عنصر آرایه به اولین p بایند می‌شود.

سپس کد 
```text(function(d, i) { return d; })```
به ازای هر عنصر آرایه (d) مشخص می‌کند که چه خروجی‌ای روی عناصر p قرار بگیرد.
  
توجه داشته باشید که حتما باید آرایه‌ای از داده‌ها را به عنوان myData به تابع بدهید. اگر یک مقدار constant بدهید، کار نمی‌کند.

مثال بعدی نشان می‌دهد که چگونه داده‌ها را به چند عنصر متصل کنیم:
  
```
<p> </p>
<p> </p>
<p> </p>
<script>
    var myData = ["Hello World!", "Hello D3","Hello JavaScript"];
     
        var p = d3.select("body")
                .selectAll("p")
                .data(myData)
                .text(function (d, i) {
                    return d;
                });
</script>
```

در مثال بالا اولین عنصر p مقدار اولین عنصر آرایه را می‌گیرد. دومین p دومین مقدار را می‌گیرد و سومین p نیز سومین مقدار.

مثال دیگری را با هم ببینیم:

```
<body>
    <p>D3 Tutorials </p>

    <script>
        var myData = [1, 2, 3, 4, 5];
     
         var p = d3.select("body")
                   .selectAll("p")
                   .data(myData)
                   .text(function (d, i) {
                        return d;
                    });
    </script>
</body>
```

در این مثال آرایه ۵ عضو دارد ولی ما فقط یک p داریم. در این حالت اولین عنصر سر جای خودش قرار می‌گیرد و بقیه‌ی عناصر نادیده گرفته می‌شوند.
 
برای چنین مواردی که از تعداد داده‌ها در dataset و تعداد عناصر DOM آگاه نیستیم، D3 تابع enter را در اختیار ما قرار می‌دهد. در بخش بعدی این تابع را با هم بررسی می‌کنیم.


### تابع ()enter

در مثال بالا در مورد این صحبت کردیم که ممکن است که تناظر یک به یک میان عناصر و اعضای آرایه برقرار نشود و تعداد یکی از اعضای آرایه یا عناصر DOM بیشتر از دیگری باشد. حتی ممکن است هیچ عنصری در DOM انتخاب نشود.

تابع enter به صورت پویا placeholder هایی را برای داده‌ها می‌سازد. خروجی تابع enter می‌تواند توسط تابع append تغذیه شود. تابع append برای داده‌هایی که عنصری متناظر در DOM ندارند، عنصر DOM می‌سازد.

اگر در صورت عدم وجود تناظر یک به یک از enter استفاده نکنیم چه می‌شود؟ صرفا آپدیتی برای عناصری که وجود ندارند رخ نمی‌دهد. (هم‌چون مثال قبلی)

در مثال پیش رو آرایه‌ی ما ۶ عضو دارد. تابع enter، شش رفرنس placeholder می‌سازد و سپس تابع append شش عنصر span می‌سازد.

```
<body>
<script>
    var data = [4, 1, 6, 2, 8, 9];
    var body = d3.select("body")
                .selectAll("span")
                .data(data)
                .enter()
                .append("span")
                .text(function(d) { return d + " "; });
</script>
</body>
```

![image](https://user-images.githubusercontent.com/45296858/147223833-587889a5-0701-4d0b-93c1-e4587ed773c1.png)

ببینیم در مثال بالا چه اتفاقی می‌افتد:

ابتدا
```d3.select("body")```
عنصر body را انتخاب می‌کند. سپس 
```selectAll("span")```
همه‌ی spanها را انتخاب می‌کند. هیچ spanی وجود ندارد. پس یک آرایه‌ی خالی بر می‌گرداند. سپس با 
```data(data)```
آرایه را بایند می‌کنیم. آرایه ۶ عضو دارد. پس کد بعد از این، به ازای هر عنصر اجرا خواهد شد. (۶ بار)

سپس تابع
```enter()```
می‌آید span ها را چک می‌کند. به آن تعدادی که span متناظر وجود ندارد، اضافه می‌کند.

سپس
```append("span")```
آن span هایی که در بالا ساخته شد را درون body اضافه می‌کند.

در نهایت
```text(function(d) { return d + " "; });```
مقادیر d از آرایه را به همراه یک کاراکتر فاصله برمی‌گرداند و آن‌ها در spanها قرار می‌گیرند.

خب در مثال بعدی کمی کار پیچیده‌تری انجام می‌دهیم و می‌خواهیم بسته به زوج یا فرد بودن اعداد آرایه، رنگ spanها قرمز یا سبز شوند.

```
<body>
<script>
    var data = [4, 1, 6, 2, 8, 9];
    var body = d3.select("body")
                 .selectAll("span")
                 .data(data)
                 .enter().append("span")
                 .style('color', function(d) {
                     if (d % 2 === 0) {
                         return "green";
                     } else {
                         return "red";
                     }
                 })
                 .text(function(d) { return d + " "; });
</script>
</body>
```

![image](https://user-images.githubusercontent.com/45296858/147224187-aa5bbf1a-94b2-46e0-b12a-a5c823e59da1.png)

در مثال بالا تابع style روی هر عنصر DOM به ازای هر مقدار آرایه اجرا می‌شود و مقدار color را بسته به زوج یا فرد بودن عدد مشخص می‌کند.

یک مثال دیگر زده بشه. TODO


### تابع ()exit

تابع enter در صورت کمبود عناصر در DOM، عناصر جدیدی را اضافه می‌کرد. حال اگر عناصر DOM تعدادشان زیاد باشد و تعدادی از آن‌ها اضافه باشند، می‌توانیم از تابع exit استفاده کنیم. تابع exit عناصر اضافی را پردازش می‌کند و آن‌ها را مشخص می‌کند. تابع remove نیز عناصری که مشخص شده‌اند را حذف می‌کند. در مثال زیر می‌بینیم که ابتدا exit صدا زده می‌شود و سپس با remove آن‌ها حذف می‌شوند.

```
<body>
    <p>D3 Tutorials</p>
    <p></p>
    <p></p>
    <script>
    
    var myData = ["Hello World!"];

    var p = d3.select("body")
                .selectAll("p")
                .data(myData)
                .text(function (d, i) {
                    return d;
                })
                .exit()
                .remove();
    </script>
</body>
```

![image](https://user-images.githubusercontent.com/45296858/147225787-44cfd847-9731-4ddb-bddc-bce9db4529e4.png)

در مثال بالا ۳ تگ p داشتیم و آرایه تنها یک عضو داشت. پس ۲ عدد p اضافه هستند. با اجرای
```exit().remove()```
آن‌ها حذف می‌شوند.


### تابع ()datum

تابع datum() برای مصورسازی‌های ثابت (static) استفاده می‌شود که به آپدیت نیاز ندارند. این تابع داده را مستقیم به یک عنصر bind می‌کند.

```
<body>
    <p>D3 Tutorials</p>
    <script>

    d3.select("body")
        .select("p")
        .datum(100)
        .text(function (d, i) {
            return d;
        });
    </script>
</body>
```

برای کسب اطلاعات بیشتر در مورد اتصال داده‌ها به عناصر DOM، می‌توانید [این بخش از مستندات D3](https://github.com/d3/d3-selection/blob/master/README.md#joining-data) را مطالعه کنید.


## خواندن داده‌ها از فایل در D3

در بخش قبلی کار کردن با داده‌ها و متغیرهای محلی را یاد گرفتیم. در این بخش load کردن داده‌ها از نوع فایل‌های مختلف و bind کردن آن‌ها به عناصر DOM را یاد می‌گیریم.

کتاب‌خانه D3 توابعِ csv, json, tsv و xml را در اختیار ما قرار می‌دهد.

### تابع ()d3.csv

ما می‌توانیم یک فایل csv را با این تابع load کنیم.

```
Signature:
d3.csv(url[, row, callback]);
```

پارامتر اول آدرسِ فایل csv یا web api یا web serviceی است که csv بر می‌گرداند. پارامتر دوم و سوم اختیاری هستند. پارامتر دوم، یک تابع است که به شما اجازه می‌دهد شیوه‌ی نمایش داده‌ها را عوض کنید. پارامتر سوم، یک تابع callback است که هنگامی که load شدن داده‌ی شما به پایان می‌رسد اجرا می‌شود. دیتای load شده نیز به عنوان یک پارامتر به تابع callback ورودی داده می‌شود.

یک مثال را با هم بررسی می‌کنیم.

```
Name, Age
John, 30
Jane, 32
```

فرض کنید نوشته‌ی بالا را درون فایل csv به نام employees قرار دادیم. سپس کد زیر را اجرا می‌کنیم.

```
<script>
d3.csv("/data/employees.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Name);
        console.log(data[i].Age);
    }
});
</script>
```

نتیجه به این صورت خواهد بود:

![image](https://user-images.githubusercontent.com/45296858/147279472-13a563e6-c2fd-45f4-be0f-574fd3ec0e9e.png)

توجه کنید که سطر اول فایل csv چاپ نمی‌شود؛ زیرا آیتم‌های سطر اول نشان‌دهنده‌ی نام هر ستون هستند و به عنوان key در آرایه‌ی لود شده در نظر گرفته می‌شود.

اگر به جای حلقه‌ی for، صرفا یک بار کل data را چاپ کنیم، چه چیزی را مشاهده خواهیم کرد؟

```
d3.csv("/data/employees.csv", function(data) {
    console.log(data);
});
```

![image](https://user-images.githubusercontent.com/45296858/147279656-f3d53806-9e5c-48bd-a557-61e8e6cf080c.png)

خروجی به شکل بالا خواهد بود. تابع d3.csv() داده را به صورت یک object برمی‌گرداند. این object یک آرایه از objectهاست که هر کدام از آن‌ها نشان‌دهنده‌ی یک سطر از فایل csv است.

کدی که در بالا مشاهده کردیم
```
d3.csv("/data/employees.csv", function(data) { }
```
معادل کد زیر است:

```
d3.csv("/data/employees.csv")
  .get(function(data) {
        console.log(data);
  });
```

هم‌چنین می‌توانیم به جای d3.csv از d3.request() هم استفاده کنیم:

```
d3.request("/data/employees.csv")
  .mimeType("text/csv")
  .response(function (xhr) { return d3.csvParse(xhr.responseText); })
  .get(function(data) {
      console.log(data);
  });
```

با پارامتر یا تابع row می‌توانیم نمایش خروجی داده‌های لودشونده را عوض کنیم، در مثال زیر همه‌ی نام‌ها را upper case می‌کنیم.

```
d3.csv("/data/employees.csv")
  .row(function(d) {
        return {
            age: d.age,
            name: d.name.toUpperCase() // converting name to upper case 
        }; 
   })
  .get(function(data) {
      console.log(data);
  });
```

### تابع ()d3.json

داده‌ی json می‌تواند یک آبجکت تنها یا آرایه‌ای از json object ها باشد:

```
var nameObj = {
    "name": "John",
    "age": 30,
    "city": "New York"
};
```

```
var nameArray = [{
    "name": "John",
    "age": 30,
    "city": "New York"
},
{
    "name": "Jane",
    "age": 20,
    "city": "San Francisco"
}];
```

فایل json نیز مشابه csv کار می‌کند.

```
Signature:
d3.json(url, callback);
```

پارامتر اول آدرس فایل و پارامتر دوم، یک callback است که هنگامی که لود شدن فایل json به پایان می‌رسد، یک بار اجرا می‌شود. دیتای لود شده نیز به عنوان ورودی به تابع callback داده می‌شود.

یک مثال را بررسی کنیم. فرض کنید نوشته‌ی زیر را در فایل users.json قرار دادیم.

```
[{
    "name": "John",
    "age": 30,
    "city": "New York"
},
{
    "name": "Jane",
    "age": 20,
    "city": "San Francisco"
}];
```

```
d3.json("/data/users.json", function(data) {
    console.log(data);
});
```

خروجی به صورت زیر نمایش می‌یابد.

![image](https://user-images.githubusercontent.com/45296858/147280577-9674b431-a91d-47dc-8e5c-caa80ffc09c2.png)


