# کتابخانه lodash
## مقدمه
برای اینکه یک برنامه نویس حرفه ای شوید، صرفا تونایی انجام یک کار مهم نیست، بلکه سرعت و کیفیت انجام آن کار هم موضوعیت پیدا میکند. اگر یک برنامه نویس جاوااسکریپت هستید و سعی در حرفه ای شدن دارید، پس جای درستی آمدید.
اگر بخواهیم یک ویژگی خیلی مهم و بارز کتابخانه lodash را نام ببریم، باید بگوییم که این کتابخانه، دوست بسیار خوب برنامه نویسان جاوااسکریپت است. زیرا کار های مختلفی که در پروژه های مختلف نیاز است تا روی آرایه ها و آبجکت ها، اعداد و رشته ها، تاریخ ها و ... انجام شود، همگی در این کتابخانه جمع آوری شده است. در ادامه بعضی از توابع مهم و پرکاربرد lodash را بررسی میکنیم:

## پیشنیاز
برای فهم بهتر مطالب این آموزش نیاز است با مفاهیم پایه‌ای و اصلی HTML, CSS و javascript به خوبی آشنا باشید.
در غیر این صورت بسیار لازم است تا با مراجعه به لینک‌های زیر آن‌ها را مطالعه کنید.
* https://www.w3schools.com/html/
* https://www.w3schools.com/css/
* https://www.w3schools.com/js/

## راه‌اندازی 
برای کار با این کتابخانه ابتدا به چگونگی دسترسی به آن می‌پردازیم. 
### راه‌اندازی در browser
به سایت https://lodash.com رفته و آخرین نسخه‌ی lodash.min.js را دانلود می‌کنیم. ما در اینجا از CDN Copies استفاده کرده‌ایم که به شرح زیر است.
```
<script type = "text/JavaScript" 
   src = "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js">
</script>
```

### راه‌اندازی در Node.js
اگر Node.js و npm را در دستگاه خود نصب دارید با اجرای دستور زیر می‌توانید lodash را دریافت کنید.
```
npm install lodash
```
برای فراخوانی lodash در Node.js هم بسته به اینکه تا چه مقدار به این کتابخانه نیاز دارید می‌توان از روش‌های زیر استفاده کرد.
```
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
```

در لینک زیر documentation همه‌ی توابع کتابخانه lodash آمده است. اما در اینجا، برخی از توابع پرکاربرد آن را بررسی می‌کنیم:
* https://lodash.com/docs/4.17.15 

## توابع آرایه

### تابع concat
یکی از کارهای رایجی که در کار با آرایه‌ها به آن بر می‌خورید ادغام کردن چند آرایه با یکدیگر یا concatenation است، که lodash این امکان را می‌دهد تا آرایه‌هایی با ظاهرهایی متفاوت را به راحتی ادغام کنید.

```
var array = [1,2,3];
var concated_array = _.concat(array, 4 , [5,6], [[7]]);

// concated_array : [1,2,3,4,5,6,[7]]
```

### تابع indexOf
اکثر زبان‌های برنامه‌نویسی سطح بالا این امکان را دارند، اما استفاده از indexOf(array, value, [fromIndex=0])._ به برنامه‌نویس این امکان را می‌دهد تا شروع نقطه‌ی جستجو را مشخص کند.
در مثال زیر می‌توانیم جایگاه حرف d را بعد از اولین حرف d پیدا کنیم.
```
_.indexOf(['b','a','d','b','a','d','a','k'],'d',3);
// => 5
```

### تابع remove
این متد امکان استفاده از تابع برای حذف عناصری با ویژگی مشخص را از یک آرایه به کاربر می‌دهد. در مثال زیر می‌توان اعداد زوج را از آرایه حذف کرد، همچنین عناصر حذف شده هم در آرایه جدید ذخیره می‌شوند.


```
var array = [1, 2, 3, 4];
var odd_array = _.remove(array, function(n) {
  return n % 2 == 1;
});

// array: [2, 4]
// array: [1, 3]
```

### تابع join
این تابع آرایه‌ای از رشته‌ها را به عنوان ورودی گرفته و با قرار دادن separator بین عناصر ورودی و متصل کردن آن‌ها به یکدیگر، رشته تولید شده را خروجی می‌دهد.
```
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```


## توابع Collection

### تابع countBy
این متد یک آرایه یا یک آبجکت iterable را به عنوان ورودی گرفته و با شمارش عناصر با تابع مد نظر یک آبجکت key-value خروجی می‌دهد.

```
_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }
 
_.countBy(['apple', 'banana', 'coconut','carrot'], 'length');
// => { '5': 1, '6': 2, '7':1 }
```
اگر به جای تعداد عناصر خود آن‌ها را به عنوان value در آبجکت خواستید می‌توانید از متد groupBy استفاده کنید.

### تابع sampleSize
برای نمونه گیری از آبجکت‌های iterable یا آرایه از ایت متد استفاده می‌کنیم.
در واقع با مشخص کردن تعداد نمونه‌ها به همان تعداد عضو دلخواه از آرایه زیر انتخاب می‌شود.
```
_.sampleSize([1, 2, 3, 4, 5, 6], 3);
// => [2, 6, 5]
```
در واقع با مشخص کردن تعداد نمونه‌ها به همان تعداد عضو دلخواه از آرایه‌ی بالا انتخاب می‌شود.

### تابع find
فرض کنید یک آرایه از آبجکت های مختلف با ویژگی های مختلف داریم و میخواهیم آبجکتی را پیدا کنیم تا ویژگی های خاص مورد نظر مارا داشته باشد. بدون استفاده از کتابخانه ی اضافی باید این کار را به صورت زیر انجام دهیم:
```
const fruits = [
   {name: "hendooneh", poosteh: "sabz", gooshteh: "ghermez", "gheymat": "arzoon"},
   {name: "kharbozeh", poosteh: "zard", gooshteh: "sabz", "gheymat": "arzoon"},
   {name: "kivi", poosteh: "ghahvehie", gooshteh: "sabz", "gheymat": "geroon"},
   {name: "anaar", poosteh: "ghermez", gooshteh: "ghermez", "gheymat": "geroon"},
]
const myFruits = fruits.filter(fruit => fruit.gooshteh === "sabz" && fruit.gheymat === "arzoon");
```
و با استفاده از lodash داریم:
```
const myFruits = _.find(fruits, {gooshteh: "sabz", "gheymat": "arzoon"});
```

### تابع keyBy
فرض کنید یک آرایه از میوه ها داریم و هر کدام از میوه ها یک id دارند که برای هر میوه یکتااست. ما میخواهیم زیاد از این id استفاده کنیم و نمیخواهیم هردفعه از تابع find و یا filter استفاده کنیم. یک تکنیک این است که برای هر میوه یک key در نظر بگیریم و هر دفعه خیلی سریع مثلا بگوییم fruits[id] را به من بده. برای این کار میتواینم از keyBy به راحتی استفاده کنیم:
```
let fruits = [
   {id: "2234", name: "hendooneh", poosteh: "sabz", gooshteh: "ghermez", "gheymat": "arzoon"},
   {id: "5234", name: "kharbozeh", poosteh: "zard", gooshteh: "sabz", "gheymat": "arzoon"},
   {id: "7234", name: "kivi", poosteh: "ghahvehie", gooshteh: "sabz", "gheymat": "geroon"},
   {id: "1983", name: "anaar", poosteh: "ghermez", gooshteh: "ghermez", "gheymat": "geroon"},
]
fruits = _.keyBy(fruits, "id");
const myFruit = fruits["5234"];
// myFruit: {id: "5234", name: "kharbozeh", poosteh: "zard", gooshteh: "sabz", "gheymat": "arzoon"}

```


### تابع shuffle
این تابع آرایه‌ای از اعداد در ورودی می‌گیرد و با روش [Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) آرایه را مخلوط می‌کند.
```
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```


## توابع مربوط به رشته

### تابع camelCase
این متد جالب رشته‌هایی که به فرم‌های متفاوتی نوشته‌شده‌اند را camelCase می‌کند.
```
_.camelCase('Get Text');
// => 'getText'
 
_.camelCase('--get-text--');
// => 'getText'
 
_.camelCase('__GET_TEXT__');
// => 'getText'
```

### تابع escape
گاهی نیاز داریم تا کاراکترهایی چون "&" ، ">" ، "'" را به رشته‌ای قابل فهم در HTML تبدیل کند.
```
_.escape('change & and < to HTML entities');
// => 'change &amp; and &lt; to HTML entities'
```
برای مشاهده‌ی لیست تمامی HTML entities ها به لینک زیر مراجعه کنید.
* https://oinam.github.io/entities/
### تابع truncate
این متد کارآمد در انتهای رشته‌ای طولانی (30 حرف به صورت پیشفرض) "..." قرار می‌دهد و با دریافت آرگومان‌هایی که در مثال زیر بررسی می‌شوند طول رشته و اینکه چه رشته‌ای در انتها قرار گیرد را مشخص می‌کند.
```
_.truncate('This is going to become a long loooooooooong text');
// => 'This is going to become a l...'
 
_.truncate('This is going to become a long loooooooooong text', {
  'length': 33,
  'omission': ' [...]'
});
// => 'This is going to become a long [...]'
```


## توابع Lang
این قسمت مربوط به type های مختلف می‌شود که به دو مورد از آن‌ها پرداخته و بقیه موارد که مشابه این دو هستند را می‌توانید در لینک زیر جستجو کنید.
* https://lodash.com/docs/4.17.15#castArray

### تابع castArray
این متد تمامی type ها را به عنوان ورودی گرفته و به عنوان یک آرایه تک عضوی خروجی می‌دهد.
```
_.castArray(123);
// => [123]
 
_.castArray({ 'color': 'red' });
// => [{ 'a': 1 }]
 
_.castArray('123');
// => ['123']
 
_.castArray(null);
// => [null]
 
_.castArray(undefined);
// => [undefined]

```
### تابع isDate
این متد صرفا به عنوان نمونه آمده و هرگونه type دیگری که مد نظر هست را می‌توان به همین صورت پیاده‌سازی کرد.
```
var date = new Date;
var not_date = '2022/02/02';

_.isDate('date')
// => true

_.isDate(not_date)
// => false
```
### تابع cloneDeep
برای اینکه از یک آبجکت کپی بگیریم، راه های مختلفی داریم. بدون استفاده از هیچ تابع اضافی میتوانیم کد زیر را در به عنوان کپی در نظر بگیریم:
```
const myObj = {...};
const myCopyObj = JSON.parse(JSON.stringify(myObj));
```
ولی یک راه ساده تر در lodash وجود دارد:
```
const myObj = {...};
const myCopyObj = _.cloneDeep(myObj);
```


## توابع Object

### تابع assign
با استفاده از این تابع میتوانیم propertyهای مختلف را از آبجکت های مختلف استخراج کنیم و درون آبجکت مقصد بنویسیم. فرضا کنید دوتا آبجکت هندونه و خربزه را داریم و میخواهیم یک مخلوطی از این دورا درون یک آبجکت بریزیم:

```
const hendooneh = { poosteh: "sabz", mazeh: "shirin" };
const kharbozeh = { poosteh: "zard", tokhmeh: "sefid" };
let mix = {};
```
حالا باید تابع assign رو فراخوانی کنیم:
```
mix = _.assign(hendooneh, kharbozeh);
// mix = {mazeh: "shirin", poosteh: "zard", tokhmeh: "sefid"};
```
توجه کنید که اگر یک ویژگی بین آبجکت های ورودی مشترک باشد، ویژگی مربوط به آخرین ورودی وارد آبجکت ما میشود. اینجا هر دو آبجکت ویژگی `poosteh` وجود دارد. ولی چون آبجکت kharbozeh دیر تر وارد شده، بنابراین poostehی مخلوط ما هم زرد خواهد شد.:)

### تابع set
برای ایجاد کردن ویژگی های مختلف درون یک آبجکت که خودشان هم یک آبجکت باشند، کار سختی در پیش دارید. اما با استفاده از تابع set، به راحتی میتوانید این کار را انجام دهید و اگر رده های بالاتر آن چیزی که میخواهید بسازید وجود نداشته باشد، خود به خود ساخته میشود:
```
const fruit = { components: { poosteh: [] } };
_.set(fruit, "components.gooshteh[0]", "rang");
// fruit: { components: { poosteh: [], gooshteh: ["rang"] } 
```


## توابع Util

### تابع times

تابع زیر، پیاده سازی ریختن یک تاس شش وجهی است:
```
function taas() {
  const randomNumber = Math.floor(Math. random() * 6) + 1;
  return randomNumber;
}
```
فرض کنید میخواهیم این تابع را به تعداد معلومی بریزیم و نتایج آن را در یک آرایه ذخیره کنیم. اگر بخواهیم از lodash استفاده نکنیم، باید چیزی شبیه کد زیر را بنویسیم:
```
let result = [];
for(let i = 0; i < 5; i++) {
  result.push(taas());
}
```

ولی با استفاده از تابع times میتوانیم این کار را در یک خط انجام دهیم:
```
let result = _.times(5, taas);
```


## توابع کاربردی

### تابع debounce
فرض کنید میخواهیم یک فیلد ورودی برای جستجو بین محصولات یک فروشگاه داشته باشیم. با هربار تغییر ورودی، باید به صورت خودکار یک درخواست سمت بکند ارسال شود و نتیجه را نمایش دهد. چیزی شبیه به کد زیر:

```
const searchInput = document.getElementById("search-input");
function onInputChange(e) {
   const inputString = e.target.value;
   // make api call with inputString
}
searchInput.addEventListener("keyup", onInputChange);
```
فقط یک مشکلی وجود دارد. فرض کنید من میخواهم محصول هندونه را جستجو کنم. با نوشتن حرف اول ه، یک درخواست سمت سرور ارسال میشود ولی ممکن است به هر دلیلی نتایج از سمت سرور دیر بازگردد ولی من از این موضوع خبردار نیستم و حرف دوم ن را وارد میکنم. ولی نتیجه ی جستجو برای ورودی هن بلافاصله از سمت سرور برمیگردد. بعد هم نتایج درخواست اول از سمت سرور باز میگردد و در نهایت به من نمایش داده میشود. یعنی من ورودی هن را میخواستم ولی چیزی که به من نمایش داده شده، برای ورودی ه است که درست نیست. کتابخانه lodash یک تابع خوب برای این مشکل پیشنهاد میدهد:
```
const searchInput = document.getElementById("search-input");
function onInputChange(e) {
   const inputString = e.target.value;
   // make api call with inputString
}
searchInput.addEventListener("keyup", _.debounce(onInputChange, 500));
```
با نوشتن کد بالا، بعد از یکبار فراخوانی تابع onInputChange، اگر کاربر یک حرف دیگر را وارد کند و فاصله ی زمانی این دو ورودی کمتر از 500 میلی ثانیه باشد، فراخوانی اول کنسل میشود و با ورودی دوم فقط فراخوانی انجام میشود که مشکل مارا برطرف میکند

