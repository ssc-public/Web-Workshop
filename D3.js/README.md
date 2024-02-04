<div dir='rtl' align='justify'>
<p align="center"><img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*1HC_tkU_Kt-VjAgCd7fdRA.png"/></p>
  
<p align="center">
    گردآوردندگان:  درسا قبادی - امیرحسین عزیزی  
</p>
 


  # عناوین

- [What is D3.js](#what-is-d3js)

- [Web Standards](#web-standards)
 
- [Install D3.js](#install-d3js)

- [Select DOM Element](#select-dom-element)

- [DOM Manipulation](#dom-manipulation)

- [Method Chaining](#method-chaining)

- [Function of Data](#function-of-data)

- [Event Handling](#event-handling)

- [Animation](#animation)

- [Data Binding](#data-binding)

- [Load Data from File](#load-data-from-file)

<!-- - [Scales](#scales) -->

- [Axes](#axes)

- [Create Bar Chart](#create-bar-chart)

- [Create Animated Bar Chart](#create-animated-bar-chart)

- [Resources](#resources)


  
# What is D3.js
اسم D3 مخفف Data-Driven Doccuments بوده و یک کتابخانه opensource برای JavaScript است و برای تصویر سازی دیتا در مرورگر با استفاده از SVG, HTML و CSS نوشته شده است.

با توجه به حجم عظیمی از دیتا که امروزه تولید می شود، ارتباط برقرار کردن و انتقال اطلاعات با آن مشکل شده است.
نمایش تصویری دیتا موثر ترین روش برای این هدف است. کتابخانه D3 ابزار های زیادی برای این کار را در اختیار ما قرار می دهد.

<br>


### ویژگی های مثبت D3 را می توان به صورت خلاصه چنین بیان کرد:
-	برای تجسم و به تصویر کشاندن داده ها از ابزار های استاندارد روز مانند HTML و CSS و SVG استفاده می کند. به همین علت کنترل کامل ویژگی های بصری در اختیار شما قرار دارد.

- کاملا مبتنی بر داده است. به عبارتی هم می تواند داده های استاتیک و پیشفرض را استفاده کند و هم از یک سرور داده ها را به صورت های مختلفی چون Array، Objects، Json یا XML بارگیری کرده و برای کشیدن نمودار ها یا دیگر داده های گرافیکی استفاده کند.

- یکی از قدرتمند ترین ابزار D3 تابع ```()transition``` است که برای یافتن ارتباطات و تعاملات داخلی داده های شما و همچنین پیدا کردن تناوب های داده های شما استفاده می شود

- کتابخانه D3  برای فهم و شهود بهتر، توابع انیمیشنی زیادی را معرفی می کند که از جمله آن ها می توان به ```()delay```، ```()ease``` یا ```()duration``` اشاره کرد.

<br>

### نمونه نمودار ها و تصویر سازی هایی که می توان با D3 انجام داد:
<br>

Bar Chart:

<p align="center"><img src="https://gist.githubusercontent.com/mbostock/4062085/raw/d422852a871bf88dffb4fcc5fd5ac913ec3cea3a/thumbnail.png"/></p>



Bubble Chart:


<p align="center"><img src="https://gist.githubusercontent.com/mbostock/4063269/raw/b0ae046c99cc70205a659e902d32740758c4dc8f/thumbnail.png"/></p>



Circle Packing:

<p align="center"><img src="https://gist.githubusercontent.com/mbostock/4063530/raw/3d8c87f265a03da8b76e24d0eb2512eee334dcbb/thumbnail.png"/></p>


Stream Graph:

<p align="center"><img src="https://gist.githubusercontent.com/mbostock/4060954/raw/381b350b27ca2df1864d02c3f08130fdcef4ab6a/preview.jpg"/></p>

در انتها با نحوه رسم Bar Chart آشنا می شویم.

<br>
<br>

# Web Standards

قبل از این که کار با D3 را شروع کنیم نیاز داریم با Web Standard ها آشنا باشیم.

موارد زیر در D3  به مقدار زیادی استفاده شده و به طور خلاصه به آن ها می پردازیم:

- HTML

- DOM

- CSS 

- SVG

- JavaScript

<br>

## HTML

HTML = HyperText Markup Language

برای ساختار بخشیدن به محتوای یک صفحه وب استفاده می شود. 

یک نمونه خیلی ساده از یک فایل HTML به شکل زیر است:

<div  dir='ltr'  align='justify'>

  ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

</body>
</html>
  ```
  </div>

<br>

  ## DOM 
  DOM = Document Object Model

وقتی که برای صفحه خود  کد HTML می نویسید، در مرورگر شما به یک ساختار سلسله مراتبی تبدیل می شود. هر تگ  HTML شما به یک element در DOM تبدیل شده که دارای ساختار سلسله مراتبی پدر-فرزندی است. وقتی که این ساختار شکل بگیرد، دستکاری کردن هر DOM element راحت تر می شود.

<br>

## CSS

CSS = Cascading Style Sheets

در حالی که HTML باعث اضافه شدن ساخنار به صفحه شما می شود، CSS باعث اضافه شدن style به صفحه شما شده و آن را زیبا تر می کند. در واقع CSS نحوه  render شدن اجزا را تعیین می کند.

<br>

## SVG

SVG = Scalable Vector Graphics

یک روش تولید تصویر با استفده از text است. در واقع یک راه برای render کردن تصویر روی صفحه شما است.

<br>

## JavaScript

یک زبان Scripting است که در سمت کلاینت اجرا شده و می تواند با HTML element ها یا DOM element ها ارتباط برقرار کند.



<br>
<br>

# Install D3.js

برای استفاده از D3  کار های زیر را انجام دهید:
- به وبسایت D3 مراجعه کنید.
- آخرین ورژن از d3 (d3.zip) را دانلود کنید.

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/d3js.png"/></p>

- حال فایلی که در مرحله قبل دانلود کردید را unzip کرده و در از فایل های ایجاد شده، دنبال فایل d3.min.js بگردید و آن را در دایرکتوری root پروژه خود قرار دهید.
- برای استفاده از آن، d3.miin.js را در فایل HTML خود include کنید:

<div  dir='ltr'  align='justify'>

  ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="../d3.min.js"></script>
</head>
<body>

<script>
    // write your d3 code here.. 
</script>
</body>
</html>
  ```
  </div>

<br>

<br>

# Select DOM Element

برای اینکه بتوانبم DOM element ها را دستکاری کنیم ابتدا باید بتوان آن ها را انتخاب کرد. کتابخانه D3 متد هایی برای این کار را دارد که به آن ها می پردازیم.

## d3.select(css-selector)

این متد اولین element را بر اساس css-selector ورودی، خروجی می دهد.

### Select Element By Name

به مثال زیر دقت کنید:

<div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<p>Second paragraph</p>

<script>
    d3.select("p").style("color", "green");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-1)

  </div>

در مثال بالا ```d3.select("p")``` اولین ```<p>``` را بر می گرداند، سپس  ```style("color","green").``` رنگ آن را تغییر می دهد، به عبارت دیگر color attribute آن را برابر با green قرار می دهد.

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/d3js-dom1.png"/></p>


### Select Element By ID

به مثال زیر دقت کنید:

<div  dir='ltr'  align='justify'>

  ```html
<p id="p1">First paragraph</p>
<p id="p2">Second paragraph</p>

<script>
    d3.select("#p2").style("color", "green");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-2)

  </div>

در مثال بالا متد ```d3.select("#p2")``` تنها element ای را انتخاب می کند که id آن برابر با p2 باشد. ادامه فرایند هم مثل مورد قبل است.

<br>

## d3.selectAll(css-selector)

این متد همه element هایی که شرایط css-selector مشخص شده را داشته باشند را بر می گرداند.

به مثال زیر دقت کنید:

<div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<p>Second paragraph</p>
<script>
    d3.selectAll("p").style("color", "green");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-3)

  </div>

  در مثال بالا ```d3.selectAll("p")``` همه ```<p>``` ها را خروجی می دهد و در ادامه رنگ آن ها به شکل مثال های قبل تغییر می کند.

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/d3js-dom3.png"/></p>

  ### Select All Elements by CSS Class Name

به مثال زیر دقت کنید:

<div  dir='ltr'  align='justify'>

  ```html
<style>
    .myclass{
        color:'red'
    }
</style>
<p class="myclass ">First paragraph</p>
<p>Second paragraph</p>
<p class="myclass ">Third paragraph</p>

<script>
    d3.selectAll(".myclass ").style('color','green');
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-4)

  </div>

  در مثال بالا ```d3.selectAll(".myclass")``` همه element هایی که  css class آن ها برابر با "myclass" باشد را بر می گرداند و در ادامه تغییر رنگ آن ها مشابه مثال های قبل است.

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/d3js-dom4.png"/></p>


### Select Nested Elements

متد های ```()d3.select``` و ```()d3.selectAll``` می توانند برای انتخاب element های تو در تو استفاده شوند:

<div  dir='ltr'  align='justify'>

  ```html
<table>
<tr>
    <td>
        One
    </td>
    <td>
        Two
    </td>
</tr>
<tr>
    <td>
        Three
    </td>
    <td>
        Four
    </td>
</tr>
</table>

<script>
    d3.select("tr").selectAll("td").style('background-color','yellow');
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-5)

  </div>

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/d3js-dom5.png"/></p>

در مثال بالا ```d3.select("tr)``` اولین تگ ```<tr>``` را انتخاب کرده، سپس ```selectAll("td")``` همه تگ های ```<td>``` موجود در آن را بر می گرداند. در نهایت متد ```()style.``` رنگ بکگراند آن ```<td>``` ها را به رنگ زرد در می آورد.

<br>
<br>


















# DOM Manipulation


در بخش های قبل یاد گرفتیم چگونه DOM elementها را با استفاده از D3 انتخاب کنیم. در این بخش یاد خواهیم گرفت چگونه DOM elementها را تغییر دهیم.

<div dir='rtl' align='right'>

کتابخانه D3 شیوه های تغییر DOM زیر را شامل می شود، که می توانید بعد از انتخاب کردن elementها با استفاده از ```()d3.select``` یا ```()d3.selectAll``` از آن ها استفاده کنید.
</div>

<br>

## text("content") 
از ```()d3.selection.text``` برای اضافه کردن یا تغییر دادن محتوای یک element انتخاب شده استفاده کنید:
<div  dir='ltr'  align='justify'>

  ```html
<div>
    <p></p>
</div>
<p></p>
<script>
    d3.select("p").text("This is paragraph.")
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-6)
  </div>

  در کد بالا ابتدا با استفاده از ```d3.select("p")``` اولین ```<p>``` را انتخاب کردیم، سپس```text("This is paragraph.").``` عبارت "This is Parapraph" را به پاراگراف انتخاب شده اضافه می کند.


توجه کنید که اگر از ```()d3.selectall``` استفاده می کردیم، عبارت را به همه عبارت های ```<p>``` اضافه می کرد.

<br>

## append("element name")
 از ```()d3.selection.append``` استفاده کنید تا یک DOM element جدید را ساخته و آن را به انتهای DOM element انتخاب شده استفاده کند.
 <div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<p>Second paragraph</p>

<script>
    d3.select("body").append("p");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-7)
  </div>

  در مثال بالا ```d3.select("body")``` یک body element را برمی گرداند و ```.append("p")``` یک ```<p>``` جدید را ساخته و آن را به انتهای ```<body>``` اضافه می کند.

  شما می توانید به شکل زیر با استفاده از ```()text``` متنی را اضافه کنید.

<div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<p>Second paragraph</p>

<script>
    d3.select("body").append("p").text("Third paragraph.");
</script>>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-8)
  </div>

  در مثال بالا D3 یک ```<p>``` جدید را با متن "Third paragraph" ساخته و آن را به انتهای تگ ```<body/>``` اضافه می کند.
<br>

## insert("element name")
با استفاده از ```()d3.selection.insert``` می توانید یک element جدید راساخته و آن را انتهای element انتخاب شده اضافه کنید.
<div  dir='ltr'  align='justify'>

  ```html
<div style="border:1px solid" >
    <p>First paragraph.</p>
</div>

<script>
    d3.select("div").insert("p").text("Second paragraph.");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-9)
  </div>

  در مثال بالا ```d3.select("div")``` آن div را انتخاب کرده سپس ```insert("p").``` یک ```<p>``` جدید را به انتهای آن اضافه می کند. ```insert("Second paragraph.")``` متن آن را تعیین می کند.

<br>

## remove()
از ```()d3.selection.remove``` برای پاک کردن DOM element های انتخاب شده می توانید استفاده کنید.

<div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<p>Second paragraph</p>

<script>
    d3.select("p").remove();
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-10)
  </div>

  در مثال بالا ```d3.select("p")``` اولین ```<p>```  را بر میگرداند و ```()remove.``` آن را پاک می کند.

<br>

## html("content")
 این متد بخش inner html را در element مشخص شده تعیین می کند.

 <div  dir='ltr'  align='justify'>

  ```html
<p>First paragraph</p>
<script>
    d3.select("p").html("<span>This is new inner html.</span>");
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-11)

  </div>

  در مثال بالا ```html(This was added in HTML ").``` عبارت inner html  را در ```<p>``` تغییر می دهد.

<br>

## attr("name", "value")
از این متد برای اضافه کردن attributeها به DOM elementهای مشخص شده می توانید استفاده کنید.

<div  dir='ltr'  align='justify'>

  ```html
<style>
    .error {
        color: red
    }
</style>
<body>
    <p>Error: This is dummy error.</p>
    <script>
        d3.select("p").attr("class","error");
    </script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-12)
  </div>

  در مثال بالا ```attr("class", "error").```، باعث اضافه شدن class attribute به ```<p>``` می شود.
  
  <br>

  ## property("name", "value")
در مواردی که نمی شوداز attr استفاده کرد، می توان از این متد استفاده کرد برای اضافه کردن attribute

<div  dir='ltr'  align='justify'>

  ```html
<p>D3</label><input type="checkbox" />
<p>jQuery</label><input type="checkbox" />

<script>
    d3.select("input").property("checked",true);
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-13)
  </div>

در مثال بالا```d3.select("input")``` اولین input را مشخص کرده سپس```property("checked", true)``` مقدار آن را به true تغییر می دهد.

<br>

## style("name", "value")
از این متد می توان برای تغییر استایل یک DOM استفاده کرد.

<div  dir='ltr'  align='justify'>

  ```html
<p>Error: This is dummy error.</p>
<script>
    d3.select("p").style("color", "red")
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-14)
  </div>

  در مثال بالا ```style("color", "red")``` با اضافه شدن رنگ فونت red به ```<p>``` می شود.

<br>

## classed("css class", bool)

 با استفاده از این متد می توان class attribute ها را مشخص کرد.

<div  dir='ltr'  align='justify'>

  ```html
<style>
    .error {
        color: red
    }
</style>
<body>
    <p>This is error.</p>

    <script>
        d3.select("p").classed('error', true);
    </script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-15)
  </div>

در مثال بالا ```classed('error', true)``` باعث اضافه شدن کلاس error به ```<p>``` می شود.
ورودی دوم بولین است که اگر true باشد باعث اضافه شدن class شده در غیر این صورت باعث حذف شدن آن می شود.

<br>
<br>

# Method Chaining

 در بخش های قبل تابع های خود را با استفاده از نقطه به هم وصل کردیم، به این کار "chain syntax" گفته می شود. اگر با JQuery آشنا باشید کد زیر برایتان آشناست:

<div  dir='ltr'  align='justify'>

  ```javascript
$("#myDiv").text("Some text").attr("style", "color:red")
  ```
  </div>

 کتابخانه D3 از تکنیک مشابهی برای chain  کردن متد ها استفاده می کند:

<div  dir='ltr'  align='justify'>

  ```javascript
d3.select("body").append("p").text("Hello World!");
  ```
  </div>

 خروجی متد اول به عنوان ورودی متد بعدی وارد آن می شود.



 ما می توانسیتیم D3 code خود را به شکل زیر بنویسیم:

 <div  dir='ltr'  align='justify'>

  ```javascript
var bodyElement = d3.select("body");

var paragraph = bodyElement.append("p");

paragraph.text("Hello World!");
  ```
  </div>


 اما استفاده از method chaining کد ما را کوتاه تر و تمیز تر می کند:

<div  dir='ltr'  align='justify'>

  ```javascript
d3.select("body").append("p").text("Hello World!");
  ```
  </div>


 در کد بالا ```d3.select("body")``` باعث انتخاب شده body element شده و یک رفرنس از آن را برمیگرداند و به متد بعدی می دهد که ```()append``` است.


 حال متد ```append("p")``` رفرنس body element را دریافت کرده و یک ```p>``` element> جدید را ساخته و آن را به element ای که دریافت کرده اضافه می کند و رفرنس این element جدید را به متد بعدی می دهد.


 متد ```text("Hello World!")``` آن paragraph element را از متد قبل دریافت کرده و متن را به آن اضافه می کند.


 دقت کنید می توان chained method ها را در یک فرمت خوانا تر نوشت:

<div  dir='ltr'  align='justify'>

  ```javascript
d3.select("body")
  .append("p")
  .text("Third paragraph");
  ```
  </div>

<br>
<br>

# Function of Data

 در قسمت DOM manipulation با تابع هایی آشنا شدیم . هر کدام از این تابع می توانند به عنوان پارامتر ورودی یک مقدار ثابت یا یک تابع بگیرند. این تابع، تابعی از دیتا است. برای مثال:

<div  dir='ltr'  align='justify'>

  ```javascript
.text(function(d) {
    return d;
});
  ```
  </div>

 در این تابع ورودی می توانیم هر منظقی برای دستکاری دیتا قرار دهیم. این ها anonymous function هستند، یعنی این تابع ها نامی ندارند.

 به غیر از پارامتر data یا (d) دو نوع پارامتر دیگر برای ما فراهم شده است:

<div  dir='ltr'  align='justify'>

  ```javascript
.text(function (d, i) {
    console.log(d); // the data element
    console.log(i); // the index element
    console.log(this); // the current DOM object

    return d;
});
  ```
  </div>


 به مثال زیر دقت کنید:

<div  dir='ltr'  align='justify'>

  ```html
<!doctype html>
<html>
<head>
    <script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
    <p></p>
    <p></p>
    <p></p>

    <script>
        var data = [100, 200, 300];
        var paragraph = d3.select("body")
                .selectAll("p")
                .data(data)
                .text(function (d, i) {
                    console.log("d: " + d);
                    console.log("i: " + i);
                    console.log("this: " + this);

                    return d;
                });
    </script>
</body>
</html>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-16)
  </div>

 در مثال بالا پارامتر "d" به شما data element را می دهد، "i" به شما ایندکس آن را در آرایه می دهد و ```this``` یک رفرنس به DOM element کنونی است که در اینجا یک paragraph element است.

<br>

## Dynamic Properties

همزمان با دستکاری  DOM element شاید بخواهیم ویژگی ها یا attribute های مشخصی را به آن اضافه کنیم.


تابع های دیتا برای مشخص کردن این ویژگی ها به شکل dynamic خوب هستند.

برای مثال اگر می خواهید رنگ پاراگرافتان بر اساس محتوای آن باشد می توانید آن را به صورت زیر انجام دهید:

<div  dir='ltr'  align='justify'>

  ```html
<p>Error: This is error.</p>
<p>Warning:This is warning.</p>

<script>
    d3.selectAll("p").style("color", function(d, i) {
            var text = this.innerText;
        
            if (text.indexOf("Error") >= 0) {
                return "red";
            } else if (text.indexOf("Warning") >= 0) {
                return "yellow";
            }
    });
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-17)
  </div>


در مثال بالا ```d3.selectAll("p")``` همه ```<p>``` را انتخاب کرده و متد ```()style``` به آن ها color attribute بر اساس خروجی تابع دیتا اضافه می کند.

منطق این تابع به این گونه است که هرگاه در element انتخاب شده کلمات کلیدی "Error" یا "Warning" باشد، رنگ قرمز را برمی گرداند در غیر این صورت رنگ زرد را بر می گرداند.

بنابراین تابع های دیتا در D3.js بسیار مهم هستند.


<br>
<br>


# Event Handling

کتابخانه D3 مانند دیگر کتابخانه ها انواع event ها را پشتیبانی می کند. ما می توانیم با استفاده از متد ```()d3.selection.on``` هر یک از DOM element ها را به یک event listener وصل کنیم.


سینتکس آن:

<div  dir='ltr'  align='justify'>

  ```javascript
d3.selection.on(type[, listener[, capture]]);
  ```
  </div>


متد ```()on``` یک event listener  را به همه DOM element های انتخاب شده اضافه می کند. اولین پارامتر event type است مانند "click" یا "mouseover". پارامتر دوم یک تابع است که در زمان اتفاق افتادن event اجرا می شود. 


مثال زیر کنترل کردن event های mouseover یا mouseout را نشان می دهد:

<div  dir='ltr'  align='justify'>

  ```html
<!doctype html>
<html>
<head>
    <style>
        div {
            height: 100px;
            width: 100px;
            background-color: steelblue;
            margin:5px;
        }
    </style>
    <script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
<div> </div>
<script>
    d3.selectAll("div")
      .on("mouseover", function(){
          d3.select(this)
            .style("background-color", "orange");

          // Get current event info
          console.log(d3.event);
          
          // Get x & y co-ordinates
          console.log(d3.mouse(this));
      })
      .on("mouseout", function(){
          d3.select(this)
            .style("background-color", "steelblue")
      });
</script>
</body>
</html>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-18)
  </div>


در مثال بالا دو div element داریم و با استفاده از متد ```selection.on(event)``` برای همه آن ها event های mouseover و mouseout را دریافت می کنیم و تابع های event listener رابه هرکدام اضافه می کنیم. که این تابع ها style را تغییر می دهند.

برای اطلاعات بیشتر در مورد Event handling می توانید [D3 documentation](https://github.com/d3/d3-selection/blob/master/README.md#handling-events) مربوط به آن را بخوانید.

<br>
<br>


# Animation

در این بخش ساختن animation ها را با استفاده از D3 یاد می گیریم.

کتابخانه D3 پروسه ساختن animationها را با استفاده از transitionها ساده می کند. transitionها از DOM selectionها با استفاده از متد ```()selection.transition``` ساخته می شوند.


این animation ها چیزی جز transition از یک فرم به فرم دیگر نیستند. در اینجا یک animation در واقع یک transition از حالت ابتدایی به حالت انتهایی یک DOM element است.

<br>

## transtion()

متد ```()d3.selection.transition``` نشان دهنده شروع transition است و سپس تابع های transition متفاوت می توانند به elementهای انتخاب شده اعمال شوند.

مثال زیر تغییر رنگ بک گراند یک div element را با استفاده از animation ها نشان می دهد:

<div  dir='ltr'  align='justify'>

  ```html
<!doctype html>
<html>
<head>
<style>
    #container {
        height: 100px;
        width: 100px;
        background-color: black;
    }
</style>
<script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
    <div id="container"></div>

    <script>
        d3.select("#container")
          .transition()
          .duration(1000)
          .style("background-color", "red");
    </script>
</body>
</html>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-19)
  </div>

در مثال بالا از تابع ```()transition``` برای ایجاد یک transition استفاده می کنیم که رنگ container' element' را از مشکی به قرمز تغییر می دهد. سپس تابع ```()duration``` را فراخواندیم تا مدت این تغییر را مشخص کنیم.


شما همچنین می توانید یک transition را ساخته و آن را در یک متغیر قرار داده سپس از آن برای اضافه کردن animation  به element های مختلف استفاده کنید.

<div  dir='ltr'  align='justify'>

  ```javascript
var t = d3.transition()
        .duration(500)

    d3.select("#container")
      .transition(t)
      .style("background-color", "red");
  ```
  </div>

<br>

## transition.ease()

تابع ```ease()``` برای مشخص و کنترل کردن جنبش یک transition استفاده می شود.

برای اطلاع از تابع های متفاوت ease می توانید به [اینجا](https://bl.ocks.org/d3noob/1ea51d03775b9650e8dfd03474e202fe) مراجه کنید.

<br>

## transition.delay()

تابع ```()delay``` مدت تاخیر را برای هر کدام از elementهایی که transition روی آن ها اعمال می شود را تعیین می کند. آن transition بعد از مدت مشخص شده شروع می شود.


در مثال زیر دو bar را animate می کنیم. اول، ارتفاع bar اول را از 20px به 100px تغییر می دهیم. سپس با تاخیر 2000 میلی ثانیه برای bar  دوم همین کار را انجام می دهیم.

<div  dir='ltr'  align='justify'>

  ```html
<body>
<script>
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);


    var bar1 = svg.append("rect")
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y", 20)
        .attr("height", 20)
        .attr("width", 10)

    var bar2 = svg.append("rect")
        .attr("fill", "blue")
        .attr("x", 120)
        .attr("y", 20)
        .attr("height", 20)
        .attr("width", 10)

    update();

function update() {
    bar1.transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("height",100)

    bar2.transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .delay(2000)
        .attr("height",100)
}
</script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-20)
  
  </div>

در کد بالا ابتدا دو مستطیل را به SVG اضافه کردیم. bar اول در مکان [20, 100] قرار گرفته و bar دوم در مکان [20, 120] قرار می گیرد که هر دو دارای ارتفاع 20px و عرض 10px هستند.

در تابع update ابتدا bar اول را با استفاده از linear ease ارتفاعش را به 100px افزایش می دهیم و مدت این animation را برابر با 2000ms قرار می دهیم. همین کار را برای bar دوم هم انجام می دهیم اما این بار با 2000ms تاخیر.

می توانید transition function های فراهم شده در D3 را در [D3 API Documentation](https://github.com/d3/d3/blob/master/API.md#transitions-d3-transition) ببینید.


<br>
<br>

# Data Binding

در این بخش یاد می گیرید چگونه دیتا را به DOM element ها وصل کنید و element های جدید را بر اساس دیتای خود بسازید.

کتابخانه D3 متد های زیر را برای Data Binding دارد.


<br>

## data()

تابع ```()data``` برای متصل کردن آرایه‌ای از داده‌ها به DOM element انتخاب‌شده استفاده می‌شود و بخش انتخاب شده را آپدیت و return می کند. D3 با انواع داده‌هایی نظیر آرایه‌ها، CSV, TSV, JSON, XML و … کار می‌ کند.

می توانید دو نوع مقدار را به تابع ```()data``` وارد کنید، آرایه ای از مقادیر و یا تابعی از دیتا که قبل تر با آن آشنا شدیم.

مثال زیر اتصال دیتا به شکل آرایه را به DOM element موجود با استفاده از تابع ```()data``` نشان می دهد:


<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-21)
  
  </div>

در مثال بالا یک آرایه دیتا به نام 'MyData' با استفاده از یک استرینگ "Hello World" ساختیم و می خواهیم آن را به ```<p>``` وصل کنیم.
نحوه کارکرد آن به شکل زیر است:

تابع ```d3.select("body")``` آن HTML Body element را انتخاب می کند.


تابع ```selectAll("p").``` آن paragraph element را انتخاب می کند.

تابع ```data(myData).``` آرایه دیتا 'MyData' را به موارد انتخاب شده توسط متد  های قبل وصل می کند.

تابع ```;text(function(d, i) { return d; }).``` دیتا را به صورت متنی به هر کدام از element های انتخاب شده اضافه می کند. در این مورد متن اولیه که 'D3 tutorial' بود با 'Hello World' جایگزین می شود.

به یاد داشته باشید که ورودی تابع ```()data``` باید آرایه باشد. اگر یک مقدار ثابت را به عنوان ورودی بدهید کاری نمی کند.


<div  dir='ltr'  align='justify'>

  ```html
<p> </p>
<script>
    var myData = 100;
     
        var p = d3.select("body")
                .selectAll("p")
                .data(myData)
                .text(function (d, i) {
                    return d;
                });
</script>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-22)
  
  </div>

در مثال بالا چیزی را نمایش نمی دهد چون تابع ```()data``` یک آرایه نیاز دارد.


مثال زیر وصل کردن دیتا را برای دستکاری کردن چند element نشان می دهد.

<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-23)
  
  </div>


  در مثال بالا سه ```<p>``` وجود دارد و آرایه دیتا myData نیز سه مقدار دارد. بنابراین تابع ```()data``` سه مقدار را به سه  ```<p>```  مشخص شده وصل می کند. سپس تابع ```()text``` آن ها را به صورت متن نمایش می دهد.


<br>


<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-24)
  
  </div>
  
در این مثال آرایه ۵ عضو دارد ولی ما فقط یک ```<p>``` داریم. در این حالت اولین عنصر سر جای خودش قرار می‌گیرد و بقیه‌ی عناصر نادیده گرفته می‌ شوند.

<br>

## enter()

در مثال بالا دیدیم که ممکن است که تناظر یک به یک میان element ها و اعضای آرایه برقرار نشود و تعداد یکی از اعضای آرایه یا عناصر DOM بیشتر از دیگری باشد.

تابع enter به صورت پویا placeholder هایی را برای داده‌ ها می ‌سازد. خروجی تابع enter می‌ تواند وارد تابع  append شود. تابع append برای داده‌هایی که element متناظر در DOM ندارند،  DOM element می‌سازد.

اگر تناظر وجود نداشت و ما از تابع enter استفاده نکردیم مانند مورد قبل عمل کرده و آن element هایی که وجود ندارند انجام نمی شود.

در مثال زیر آرایه‌ی ما شش عضو دارد. تابع enter، شش رفرنس placeholder می‌سازد و سپس تابع append شش  span element می‌سازد.

<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-25)
  
  </div>

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/data-binding3.png"/></p>
در این مثال همانند قبل یک آرایه با شش عضو به شکل [4,1,6,2,8,9] گرفتیم و برنامه ما به شکل زیر کار می کند:

تابع ```d3.select("body")``` بخش HTML body را انتخاب می کند.

تابع ```selectAll("span").``` چون تا الان هیچ span elementای وجود ندارد یک آرایه خالی برمی گرداند.

سپس با تابع ```data(data).``` آرایه دیتای خود را به ```()data``` می دهیم. 

تابع ```()enter.``` دنبال element های ```<span>``` می گردد. چون چیزی را پیدا نمی کند، یک span برای هر کدام از پنج عضو آرایه می سازد.

تابع ```append("span")``` آن span هایی که در مرحله قبل ساخته شد را به body اضافه می کند.

در نهایت تابع ```;text(function(d, i) { return d; }).``` هر کدام از اعداد درون آرایه را به شکل text به هرکدام از span های انتخاب شده اضافه کرده و آن ها را چاپ می کند.

<br>

حال منطق را به برنامه خود اضافه کرده و اعداد را اگر زوج بودند به رنگ سبز و در غیر این صورت به رنگ قرمز در می آوریم

<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-26)
  
  </div>

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/data-binding4.png"/></p>

  چیزی که اضافه کردیم تابع ```()style``` به همراه منطق خود است.

  تابع ```()style``` روی هر  DOM element به ازای هر مقدار آرایه اجرا می‌ شود و مقدار color را بسته به زوج یا فرد بودن عدد مشخص می‌ کند.

<br>

همانطور که گفتیم ورودی تابع ```()data``` می تواند یک تابع باشد:

<div  dir='ltr'  align='justify'>

  ```html
<body>
    <script>
        var matrix = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                        [13, 14, 15, 16]
                    ];

        var tr = d3.select("body")
            .append("table")  // adds <table>
            .selectAll("tr")  // selects all <tr>
            .data(matrix)      // joins matrix array 
            .enter()           // create placeholders for each row in the array
            .append("tr");// create <tr> in each placeholder

        var td = tr.selectAll("td")
            .data(function (d) {    // joins inner array of each row
                console.log(d);
                return d;
            })
            .enter()    // create placeholders for each element in an inner array
            .append("td") // creates <td> in each placeholder
            .text(function (d) {
                console.log(d);
                return d; // add value of each inner array as a text in <td>
            });
    </script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-27)
  
  </div>

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/data-binding7.png"/></p>


در مثال بالا تابع ```tr.selectAll("td)``` تعدادی ```<td>``` را به ازای انتخاب هر ```<tr>``` خروجی می دهد و گروه های متفاوت ```<tr><td></td></tr>``` ساخته می شوند. پارامتر d در تابع ```text(function(d))``` نشان دهنده یک element تکی از یک ردیف است که توسط تابع ```()data``` قبلی خروجی داده شده است.

<br>

## exit()

تابع ```()enter``` در صورت کمبود element ها در element، DOM های جدیدی را اضافه می‌کرد. حال اگر  DOM elemnt ها تعدادشان زیاد باشد و تعدادی از آن‌ها اضافه باشند، می‌ توانیم از تابع ```()exit``` استفاده کنیم. تابع exit عناصر اضافی را پردازش می‌ کند و آن‌ها را مشخص می‌ کند. تابع remove نیز element هایی که مشخص شده‌ اند را حذف می‌ کند. در مثال زیر می‌ بینیم که ابتدا ```()exit``` فرا خوانده  می‌ شود و سپس با ```()remove``` آن‌ها حذف می‌ شوند.

<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-28)
  
  </div>

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/data-binding1.png"/></p>

  در این مثال آرایه ما تنها یک عضو دارد در حالی که دو ```<p>``` داریم بنابراین ```()exit().remove.``` آن  ```<p>``` اضافه را حذف می کند.

  <br>

  ## datum()

تابع ```()datum``` برای visualization های static استفاده می شود که نیازی به update ندارند و مستقیم دیتا را به یک element وصل می کند.

<div  dir='ltr'  align='justify'>

  ```html
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
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-29)
  
  </div>

  برای اطلاعات بیشتر در مورد Data Joining در D3 به [اینجا](https://github.com/d3/d3-selection/blob/master/README.md#joining-data)
   مراجعه کنید.

   <br>
   <br>

   # Load Data from File

   در این بخش یاد می گیریم چگونه دیتا را از انواع مختلف فایل load کرده و آن ها را به DOM element ها وصل کنیم.

   کتابخانه D3 متد های متفاوتی را برای load کردن نوع های مختلف دیتا دارد:

   ## d3.csv()

   ما می توانیم یک csv file را با استفاده از این متد load کنیم:

<div  dir='ltr'  align='justify'>

  ```html
d3.csv(url[, row, callback]);
  ```  
  </div>

  در اینجا اولین پارامتر، url مربوط به فایل csv یا webapi یا webservice است که دیتا csv بر می گرداند. دومین پارامتر که اختیاری است، یک تابع conversion است که با آن می توانیم نمایش  آن دیتا را تغییر دهیم. سومین پارامتر که اختیاری است، یک تابع callback است که هرگاه فابل ما load شد اجرا می شود و به عنوان ورودی data object که parse شده است را دریاف می کند.

  <br>

  حال به نحوه load شدن یک فایل csv با محتویات زیر به نام employees.csv می پردازیم.
  <div  dir='ltr'  align='justify'>

  ```csv
Name, Age
John, 30
Jane, 32
  ```  
  </div>

  <br>

  <div  dir='ltr'  align='justify'>

  ```html
<script>
d3.csv("/data/employees.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Name);
        console.log(data[i].Age);
    }
});
</script>
  ```  
  </div>
  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/loading-csv-data.png"/></p>

  در مثال بالا تابع ```()d3.csv``` نام فایل را به عنوان ورودی دریافت می کند.و آن را به صورت آرایه ای از object ها load می کند. دقت کنید که اولین ردیف از فایل csv چاپ نشده است، این به این دلیل است که اولین ردیف از فایل های csv به عنوان نام ستون ها در نظر گرفته می شود. data objectای که load شده نام ستون ها را به را به عنوان object key دارد.

  حال اگر loop را با تابع ```()console.log``` جایگزین کنیم:

   <div  dir='ltr'  align='justify'>

  ```js
d3.csv("/data/employees.csv", function(data) {
    console.log(data);
});
  ```  
  </div>
  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/loading-csv-data2.png"/></p>

  تابع ```()d3.csv``` دیتا را به صورت یک object بر می گرداند. این object آرایه ای از object ها است که از فایل csv شما load شده است که هر کدام از آن ها نشان دهنده یک ردیف هستند.

  همچنین کد بالا معادل زیر است:

   <div  dir='ltr'  align='justify'>

  ```js
d3.csv("/data/employees.csv")
  .get(function(data) {
        console.log(data);
  });
  ```  
  </div>

  شما می توانید به جای ```()d3.csv``` از ```()d3.request``` استفاده کنید:

 <div  dir='ltr'  align='justify'>

  ```js
d3.request("/data/employees.csv")
  .mimeType("text/csv")
  .response(function (xhr) { return d3.csvParse(xhr.responseText); })
  .get(function(data) {
      console.log(data);
  });
  ```  
  </div>


  همچنین می توانید از پارامتر row برای تغییر نمایش دیتا اسنفاده کنید. برای مثال مورد زیر name ها را uppercase می کند:

 <div  dir='ltr'  align='justify'>

  ```js
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
  </div>

  <br>

  ## d3.json()

  دیتای  JSON می تواند یک object تکی یا آرایه ای از JSON object ها باشد:
  
  JSON object:

 <div  dir='ltr'  align='justify'>

  ```json
var nameObj = {
    "name": "John",
    "age": 30,
    "city": "New York"
};
  ```  
  </div>


  JSON Array:

 <div  dir='ltr'  align='justify'>

  ```json
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
  </div>

  تابع ```()d3.json``` یک فایل JSON را به عنوان ورودی گرفته و آن را به آرایه ای از object ها تبدیل می کند.

   <div  dir='ltr'  align='justify'>

  ```js
d3.json(url, callback);
  ```  
  </div>

  اولین پارامتر url یک فایل JSON است و دومین پارامتر یک تابع callback است که مانند تابع callback در ```()d3.csv``` عمل می کند.

  
  حال به نحوه load شدن یک فایل JSON با محتویات زیر به نام users.json می پردازیم.
  

  <div  dir='ltr'  align='justify'>

  ```json
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
  </div>

  حال این فایل را با استفاده از تابع ```d3.json``` دریافت  می کنیم:

  <div  dir='ltr'  align='justify'>

  ```js
d3.json("/data/users.json", function(data) {
    console.log(data);
});
  ```
  
  </div>
  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/loading-json-data.png"/></p>

  همانطور که می بینید آرایه ای از object ها با ویژگی های name, city, age ساخته شد.

  <br>

  ## d3.tsv()

  <div  dir='ltr'  align='justify'>

  ```
d3.tsv(url, callback);
  ```  
  </div>

اولین پارامتر url یک فایل tsv است و دومین پارامتر یک تابع callback است که مانند تابع callback در ```()d3.csv``` عمل می کند.


  حال به نحوه load شدن یک فایل tsv با محتویات زیر به نام employees.tsv می پردازیم.

  <div  dir='ltr'  align='justify'>

  ```tsv
Name    Age
John    30
Jane    32
  ```
  
  </div>


  حال این فایل را با استفاده از تابع ```()d3.tsv``` دریافت می کنیم:

<div  dir='ltr'  align='justify'>

  ```js
d3.tsv("/data/employees.tsv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Name);
        console.log(data[i].Age);
    }
});
  ```  
  </div>
  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/loading-tsv-data.png"/></p>

  <br>



  ## d3.xml

<div  dir='ltr'  align='justify'>

  ```
d3.xml(url, callback);
  ```  
  </div>

اولین پارامتر url یک فایل xml است و دومین پارامتر یک تابع callback است که مانند تابع callback در ```()d3.csv``` عمل می کند.


  حال به نحوه load شدن یک فایل xml با محتویات زیر به نام employees.xml می پردازیم.

  <div  dir='ltr'  align='justify'>

  ```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
<row>
    <Name>John</Name>
    <Age>30</Age>
</row>
<row>
    <Name>Jane</Name>
    <Age>32</Age>
</row>
</root>
  ```  
  </div>

  حال این فایل را با استفاده از تابع ```()d3.xml``` دریافت می کنیم:

  <div  dir='ltr'  align='justify'>

  ```js
d3.xml("/data/employees.xml", function(data) {
        console.log(data);
});
  ```
  </div>

  همچنین می توانید به شکل زیر این فایل را parse و traverse کنید:

   <div  dir='ltr'  align='justify'>

  ```js
d3.xml("\data\employees.xml", function(data) {
        console.log(xml.documentElement.getElementsByTagName("Name", "));
});
  ```  
  </div>

این کد همه تگ هایی که tag name آن ها برابر یا "Name" باشد را به شما می دهد.

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/loading-xml-data.png"/></p>

  <br>

  ## Bind Loaded Data

  برای ادامه این بخش با فایل JSON زیر کار می کنیم:

   <div  dir='ltr'  align='justify'>

  ```json
[{
    "name": "Jon",
    "age": 30,
    "location": "The Wall"
},
{
    "name": "Arya",
    "age": 12,
    "location": "Braavos"
},
{
    "name": "Cersei",
    "age": 42,
    "location": "Kings Landing"
},
{
    "name": "Tyrion",
    "age": 40,
    "location": "Kings Landing "
}]
  ```  
  </div>

  این یک آرایه از person object ها است که هر object دارای name, age, location است.
  
  حال آن را load کرده و به DOM element ها وصل می کنیم:
   <div  dir='ltr'  align='justify'>

  ```js
d3.json("/data/users.json", function(error, data) {
    
    d3.select("body")
        .selectAll("p")
        .data(data)
        .enter()
        .append("p")
        .text(function(d) {
            return d.name + ", " + d.location;
        });

});
  ```  
  </div>
  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/bind-loaded-data.png"/></p>


  در ابتدا فایل را با استفاده از تابع ```d3.json()``` لود کردیم. این تابع یک data object  برمی گرداند.

  با استفاده از تابع ```d3.select("body")``` آن body element را انتخاب کرده و آن را به تابع بعدی پاس می دهیم.

  تابع ```selectAll("p").``` همه تگ های ```<p>``` را انتخاب کرده و رفرنس آن ها را به تابع بعدی پاس می دهد.







  تابع ```data(data).``` مفادیر دیتا را از دیتاست ما به متد بعدی در این زنجیره پاس می دهد.

  تایع ```()enter.``` مقادیر دیتا را از تابع ```()data.``` گرفته و چون تعداد تگ های ```<p>``` ما کافی نیست ، این تابع placeholde reference های خالی را به element های جدید بر می گرداند. (همانطور که در بخش Data Binding  دیدیم)

تابع ```append("p")``` این رفرنس ها را دریافت کرده و element های جدید را به DOM اضافه می کند.
 
  درانتها نیز تابع ```()text.``` فراخوانده می شود و با توجه به تابعی کع به عنوان ورودی گرفته، یک concatenation از name , location از data object را چاپ می کند.

  <br>

  ## Error Handling

هنگامی که دیتا را load می کنیم، تابع مورد نظر یک argument  دیگر به نام "error" بر می گرداند که ما می توانیم از آن برای بررسی موفقیت آمیز بودن load شدن دیتا استفاده کنیم:

<div  dir='ltr'  align='justify'>

  ```js
d3.json("/data/users.json", function(error, data) {
    
    if (error) {
        return console.warn(error);
    }

    d3.select("body")
            .selectAll("p")
            .data(data)
            .enter()
            .append("p")
            .text(function(d) {
                return d.name + ", " + d.location;
            });
    });
  ```  
  </div>
  اگر مشکلی هنگام load کردن دیتا وجود داشته باشد D3  یک error object  برمی گرداند.


# Axes

 در این بخش با نحوه ایجاد محور ها در D3 آشنا می شویم.


نمودار های 2 بعدی، 2 محور دارند، یک محور افقی یا محور x و یک محور عمودی یا محور y.

کتابخانه D3 تابع های زیر را برای رسم محور ها فراهم می کند:

 - تابع ```()d3.axisTop``` : محور افقی بالا را رسم می کند.
 - تابع ```()d3.axisRight``` : محور عمودی راست را رسم می کند.
 - تابع ```()d3.axisBottom``` : محور افقی پایین را رسم می کند.
 - تابع ```()d3.axisLeft``` : محور عمودی چپ را رسم می کند.



حال نحوه اضافه شدن محور به نمودار را بررسی می کنیم:



<div  dir='ltr'  align='justify'>

  ```html
<body>
<script>
    var width = 400,
        height = 100;

    var data = [10, 15, 20, 25, 30];
    
    // Append SVG 
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    // Create scale
    var scale = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([0, width - 100]);

    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(scale);

    //Append group and insert axis
    svg.append("g")
       .call(x_axis);

</script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-46)
  </div>
  مثال بالا نتیجه پایین را می دهد:

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/x-axes.png"/></p>


در کد بالا با استفاده از ```;var width = 400, height = 100``` میزان طول و عرض SVG را مشخص کردیم. سپس با استفاده از ```;var data = [10, 15, 20, 25, 30]``` دیتاست خود را مشخص کردیم.
سپس SVG element خود را ساختیم. سپس یک linear scale ساخته و دامنه و بازه آن را مشخص کردیم. در نهایت با استفاده از ```()d3.axisBottom``` یک محور افقی را ایجاد کرده و scale ای که ساختیم را به آن می دهیم.

<br>

به شکل مشابهی می توان یک محور عمودی  رسم کرد:


<div  dir='ltr'  align='justify'>

  ```html
<body>
<script>
    var width = 400, height = 400;

    var data = [10, 15, 20, 25, 30];
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var scale = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([height/2, 0]);

    var y_axis = d3.axisLeft()
                  .scale(scale);

    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(y_axis);

</script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-47)
  </div>
  مثال بالا نتیجه پایین را می دهد:

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/y-axis.png"/></p>

<br>

حال به شکل زیر می توان هر دو محور را با هم رسم کرد:

<div  dir='ltr'  align='justify'>

  ```html
<body>
<script>
var width = 400, height = 100;

var data = [10, 15, 20, 25, 30];
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var xscale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width - 100]);

var yscale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height/2, 0]);

var x_axis = d3.axisBottom()
        .scale(xscale);

var y_axis = d3.axisLeft()
        .scale(yscale);

    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(y_axis);

var xAxisTranslate = height/2 + 10;

    svg.append("g")
            .attr("transform", "translate(50, " + xAxisTranslate  +")")
            .call(x_axis)

</script>
</body>
  ```
  [امتحان کردن کد](https://www.tutorialsteacher.com/codeeditor?cid=d3-48)
  </div>
  مثال بالا نتیجه پایین را می دهد:

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/axes-in-d3.png"/></p>

<br>

برای مطالعه بیشتر در مورد محور ها در D3 به [اینجا](https://github.com/d3/d3-axis) مراجعه کنید.


<br>
<br>

# Create Bar Chart

 در این بخش یاد می گیریم چگونه Bar chart را با استفاده از کتابخانه D3 بسازیم.

 در این بخش از دیتاست زیر استفاده می کنیم که ارزش یک کمپانی را در طول چند سال نشان می دهد:

 <div  dir='ltr'  align='justify'>

  ```csv
year,value
2011,45
2012,47
2013,52
2014,70
2015,75
2016,78
  ```  
  </div>

  قدم اول: با ساختن یک SVG element و قرار دادن Scale برای آن شروع می کنیم:

  <div  dir='ltr'  align='justify'>

  ```html
<body>
<svg width="600" height="500"></svg>
<script>

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;


    var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

</script>
</body>
  ```  
  </div>

  <br>

  قدم دوم: دیتای خود را از فایل csv لود کرده و محور ها را به SVG که در مرحله قبل ساختیم اضافه می کنیم:

<div  dir='ltr'  align='justify'>

  ```html
<body>
<svg width="600" height="500"></svg>
<script>

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;


    var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("XYZ.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         }).ticks(10))
         .append("text")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("value");
});
</script>
</body>
  ```  
  </div>

  <br>

  خروجی تا اینجا به شکل زیر است:

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/bar-chart2.png"/></p>

<br>

قدم سوم: میله ها (bars) هایی که به مقادیر دیتای ما وابسته هستند را می سازیم:

<div  dir='ltr'  align='justify'>

  ```html
<!doctype html>
<html>
<head>
    <style>
        .bar {
            fill: steelblue;
        }
    </style>
    <script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
<svg width="600" height="500"></svg>
<script>
var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("XYZ.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         }).ticks(10));


        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });
    });
</script>
</body>
</html>
  ```  
  </div>

  <br>

حال خروجی به شکل زیر است:

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/bar-chart3.png"/></p>

<br>

<br>

## Add Labels to Bar Chart

برای اضافه کردن label  باید به SVG خود text element هایی را اضافه کنیم.

برای اضافه کردن عنوان این گونه عمل می کنیم:

<div  dir='ltr'  align='justify'>

  ```js
svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "24px")
   .text("XYZ Foods Stock Price")
  ```  
  </div>

  <br>

  برای محور افقی، به شکل زیر text element را به x-axis group element اضافه می کنیم:

<div  dir='ltr'  align='justify'>

  ```js
g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xScale))
 .append("text")
 .attr("y", height - 250)
 .attr("x", width - 100)
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Year");
  ```  
  </div>

  <br>

  برای محور عمودی، به شکل زیر text element را به y-axis group element اضافه می کنیم:

<div  dir='ltr'  align='justify'>

  ```js
g.append("g")
 .call(d3.axisLeft(yScale)
 .tickFormat(function(d){
     return "$" + d;
 }).ticks(10))
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", "-5.1em")
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Stock Price");
  ```  
  </div>


  <br>
  <br>
  
  در نهایت همه کد ساختن یک Bar chart:

  <div  dir='ltr'  align='justify'>

  ```html
<!doctype html>
<html>
<head>
    <style>
        .bar {
            fill: steelblue;
        }
    </style>
    <script src="https://d3js.org/d3.v4.min.js"></script>
<body>
<svg width="600" height="500"></svg>
<script>

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("XYZ Foods Stock Price")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("XYZ.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Stock Price");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });
    });
</script>
</body>
</html>
  ```  
  </div>

  کد بالا، نمودار زیر را نتیجه می دهد:

  <p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/bar-chart-in-d3.png"/></p>

<br>
<br>


# Create Animated Bar Chart

حال می توان با استفاده از آنچه از قبل یاد گرفتیم، animation ها را به نموداری که در مرحله قبل ساختیم اضافه کنیم:

<div  dir='ltr'  align='justify'>

  ```js
<!doctype html>
<html>
<head>
    <style>
        .bar {
            fill: steelblue;
        }

        .highlight {
            fill: orange;
        }
</style>
    <script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
<svg width="600" height="500"></svg>
<script>

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("XYZ Foods Stock Price")

    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("xyz.csv", function(error, data) {
        if (error) {
            throw error;
        }

        x.domain(data.map(function(d) { return d.year; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(y).tickFormat(function(d){
             return "$" + d;
         }).ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Stock Price");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.year); })
         .attr("y", function(d) { return y(d.value); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .attr("height", function(d) { return height - y(d.value); });
    });
    
    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(d.value) - 10; })
          .attr("height", function(d) { return height - y(d.value) + 10; });

        g.append("text")
         .attr('class', 'val') 
         .attr('x', function() {
             return x(d.year);
         })
         .attr('y', function() {
             return y(d.value) - 15;
         })
         .text(function() {
             return [ '$' +d.value];  // Value of the text
         });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });

        d3.selectAll('.val')
          .remove()
    }

</script>
</body>
</html>
  ```  
  </div>

<br>

  نتیجه کد بالا:

<p align="center"><img src="https://www.tutorialsteacher.com/Content/images/d3js/bar-chart-animation.png"/></p>


<br>

<br>

# Resources
-   [tutorialsteacher.com](https://www.tutorialsteacher.com/d3js)

</div>