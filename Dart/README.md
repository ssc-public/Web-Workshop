<div dir='rtl'>
<div align="center" style="font-size:40px">
 <b>
 به نام خدا
 </b>
</div>

<div align="left" style="font-size:1rem">
    <b>
    مشارکت کنندکان
    </b>

سجاد فقفور مغربی،
 امیر محمد محمدی
 ،محمد نامدار
</div>

<p align=center>

![dart logo](https://www.scottbrady91.com/img/logos/dart.svg)

</p>

# توضیحات کلی
دارت یک زبان متن باز بهینه سازی شده برای کلاینت به هدف توسعه برنامه های سریع در پلتفرم های گوناگون است که توسط گوگل در سال 2013 توسعه داده شده است .
 
 هدف دارت ارائه کردن بهینه ترین زبان برای توسعه چند پلتفرمی است که دارای پلتفرم زمان اجرای انعطاف پذیر نیز باشد.
 دارت زبانی شی گرا و کلاس محور است و می تواند به کد ماشین یا جاوااسکریپت کامپایل شود. 
 دارت به طور مشخص برای برنامه نویسی سمت کلاینت و به گونه ای طراحی شده که دو ویژگی توسعه سریع و بهینه و نتیجه با کیفیت در گستره وسیعی از پلتفرم ها (مانند وب، موبایل و کامپیوتر های شخصی) را دارا باشد.
 
 
 دارت میتواند برنامه های Flutter را اجرا کند و برای بسیاری از موارد مورد نیاز در برنامه نویسی مانند آنالیز و تست ابزار های قدرتمندی ارائه می کند.
# تاریخچه
 دارت برای نخستین بار در سال 2012 کنفرانس 
 GOTO
 در دانمارک معرفی شد و نسخه اولیه آن یا
 Dart 1.0
 در نوامبر 2013 عرضه شد.
 
 در جولای 2014 زبان دارت توسط بنیاد 
 Ecma
 تایید شد.
 # زبان
 دارت یک زبان با ایمنی نوع (type safe) است. به این معنی که از تشخیص نوع ایستا استفاده می کند تا در هر لحظه اطمینان حاصل کند که مقداری که درون یک متغیر قرار می گیرد با نوع آن سازگاری دارد. همچنین نوع متغیر ها در دارت می تواند متغیر (flexible) هم باشد تا برای اهداف آموزشی یا برنامه هایی که به این نوع پویایی نیاز دارند هم قابل استفاده باشد.
 
  همچنین دارت دارای امنیت پوچ (null safety) است به این معنا که تنها متغیر هایی که از پیش معین شده اند می توانند دارای مقدار پوچ باشند و به این ترتیب زبان دارت شما را از خطای مقدار پوچ (null exceptions) .حفظ می کند
 # زمان اجرا
 فارغ از اینکه ار دارت به هدف اجرای برنامه در کدام پلتفرم استفاده می کنید، اجرای یک کد دارت به فضای زمان اجرای دارت (Dart runtime) نیاز دارد که عهده دار انجام موارد ذیل است:
 <li>
  مدیریت حافظه: حافظه ای که دیگر مورد استفاده قرار نمی گیرد توسط آشغال جمع کن دارت
  (garbage collector)
  آزاد می شود تا دوباره مورد استفاده قرار گیرد.
 </li>
 <li>
  مدیریت انواع: در مواردی که از نوع پویا 
  (dynamic type)
  برای متغیر ها استفاده شده است دارت زمان اجرا درستی انواع را در عملیات ها کنترل می کند.
 </li>
 <li>
  مدیریت ریسه ها: دارت زمان اجرا ریسه اصلی برنامه یا هر ریسه دیگری که در برنامه ایجاد شود را مدیریت می کند.
 </li>
# پیاده‌سازی و برنامه‌نویسی

</br>
</br>

## روش‌های اجرای کد دارت

<li> مستقل
</li>

کیت توسعه نرم‌افزار دارت (SDK) با یک Dart VM مستقل عرضه می‌شود که به کد دارت اجازه می‌دهد در یک محیط command line اجرا شود. ابزارهای این sdk شامل کامپایلر dart2js و مدیریت بسته به نام pub است. دارت با یک کتابخانه استاندارد عرضه می‌شود که به کاربران امکان می‌دهد برنامه‌های سیستمی کارآمدتری بنویسند.

<li> در سطح وب
</li>

دارت برای اجرا در مرورگرهای اصلی وب به یک کامپایلر جاوا اسکریپت متکی است.
به گفته سایت پروژه، دارت به گونه ای است که ابزارهای توسعه ای را برای ایجاد آسان، مناسب برای کاربردهای مدرن و کارایی بالا توسعه می دهد. دارت های کامپایل شده با جاوا اسکریپت با تمام مرورگرهای اصلی سازگار هستند و برای استفاده مرورگرها نیازی به دارت ندارند.


<li> Ahead-of-time compiled
</li>

کد دارت را می توان با AOT در کد ماشین (مجموعه دستورالعمل های بومی) کامپایل کرد.
این باعث می‌شود انعطاف پذیری دارت بالا برود.

<li> Native یا بومی
</li>
از ورژن ۲.۶ دارت با استفاده از 
dart2native
کامپایلر می‌شود از این روش هم استفاده کرد.. 

</br>

# نصب و استفاده

</br>
</br>

[اطلاعات لازم برای نصب دارت sdk](https://dart.dev/get-dart)

[برنامه نویسی دارت آنلاین](https://dartpad.dev/)

برای نصب دارت برای نمونه کامندهای لازم برای لینوکس در زیر قرار می‌گیرد:

<div dir='ltr'>

``` bash
sudo apt-get update
sudo apt-get install apt-transport-https
sudo sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
sudo sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'

```
</div>

<div dir="rtl">
در پایان کافی است دستور زیر را وارد کنید.
</div>

<br/>
<br/>

<div dir="ltr">

``` bash
sudo apt-get update
sudo apt-get install dart
```

</div>
<div dir="rtl">
حال می‌توانید با وارد کردن دستور 

<div dir="ltr">

``` sh
dart first.dart
```
</div>
<div dir="rtl">
کد فایل مدنظرتان را اجرا کنید. 
</br>
</br>

# آموزش دارت

</br>
</br>


هر برنامه دارای یک بخش `main` است
.
نمونه‌ای از ساده‌ترین کد دارت را در زیر مشاهده می‌کنید.
<div dir="ltr">

``` dart
void main(){
  print("Hello World");
}
```

<div dir="rtl">

در دارت عموما نیازی به تعریف دقیق تایپ متغیرها نیست. این به لطف `type inference`
ممکن شده است. 
به طور نمونه کد زیر را می‌توانید بررسی کنید.


<div dir="ltr">

``` dart
var name = 'sfmqrb';
var year = 1823;
var Cities = ['Tehran', 'Mashhad'];
var image = {
  'tags': ['Tehran'],
  'url': '//path/to/Tehran.jpg'
};
```


<div dir="rtl">

[برای مطالعه بیشتر](https://dart.dev/guides/language/language-tour#variables)

<br/>
<br/>

دستورات حلقه و کنترلی به شکلی زیر مورد استفاده قرار می‌گیرند.
همانطور معلوم است تفاوت چشم‌کیری با دیگر زبان‌های اصلی به چشم نمی‌خورد.
<div dir="ltr">

``` dart
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

for (final object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}
```

<div dir="rtl">


هرچند اجباری وجود ندارد ولی توصیه گوگل این است که تایپ خروجی توابع مشخص باشند.
برای نمونه به کد زیر توجه کنید. 

<div dir="ltr">

``` dart
int recurs(int n) {
  if (n == 0 || n == 1 || n == 2) return n;
  return recurs(n - 1) + recurs(n - 2) + recurs(n - 3);
}
var result = recurs(20);
```
<div dir="rtl">

مشابه `javascript` 
میتوان در اینجا هم از توابع یک خطی با استفاده از 
`<=`
استفاده کرد.


ایمپورت کردن در دارت بسیار ساده به شکل زیر انجام ‌میشود.

<div dir="ltr">

``` dart
// Importing core libraries
import 'dart:math';

// Importing libraries from external packages
import 'package:test/test.dart';

// Importing files
import 'path/to/my_other_file.dart';
```

<div dir="rtl">



برای استفاده از کلاس‌ها در دارت به گرامر زیر توجه کنید.

دقت شود که علامت سوال پس از متغیر حاکی از آن است که آن متغیر می‌تواند null باشد
.


<div dir="ltr">

``` dart
class Spacecraft {
  String name;
  DateTime? launchDate;

  // Read-only non-final property
  int? get launchYear => launchDate?.year;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  // Method.
  void describe() {
    print('Spacecraft: $name');
    // Type promotion doesn't work on getters.
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```



<div dir="rtl">

مشابه جاوااسکریپت میتوان برای خوانایی و بهبود قابلیت ها کد به سراغ async await بروید که نمونه‌ آن را در زیر ملاحظه می‌کنید.

<div dir="ltr">

``` dart
const oneSecond = Duration(seconds: 1);
// ···
Future<void> printWithDelay(String message) async {
  await Future.delayed(oneSecond);
  print(message);
}
```

<div dir="rtl">

کد بالا معادل کد پایین است.

<div dir="ltr">

``` dart
Future<void> printWithDelay(String message) {
  return Future.delayed(oneSecond).then((_) {
    print(message);
  });
}
```

<div dir="rtl">

</div>
<div dir="rtl">

در پایان در صورت علاقه‌مندی تعدادی نمونه کد در پوشه `easy-samples`
قرار گرفته است که می‌توان برای بررسی دقیق تر این زبان از آن استفاده کرد.
برای مطالعه بیشتر می‌توانید به لینک روبرو مراجعه کنید:
[link](https://dart.dev/samples)


## تمرین دارت
در پوشه `educational-samples` 
می‌توانید به بررسی عملی و گام به گام یک کد دارت بپردازید که توسط ما پیاده‌سازی شده است.

# چرا دارت ارزش استفاده دارد؟

دارت یک زبان برنامه نویسی بسیار منعطف است که می توانید کد را بنویسید و سپس آن را در هر جایی بدون هیچ محدودیتی اجرا کنید.
برنامه‌های موبایلی چند پلتفرمی هستند. بنابراین می توانند روی هر دو اندروید، iOS اجرا شوند. حتی می توان برنامه های وبی نوشته شود که کد آن بتواند در هر مرورگری اجرا شود. 

دارت علاوه بر اینکه یک زبان شی‌گرای قوی است برنامه نویسی functional در آن قابل دستیابی است. 
برنامه نویسی async با async/wait و Future در Dart سازگار و هماهنگ است.

یک ویژگی جالب دیگر دارت توجه به تایپ متغیرهاست که به گونه‌ای که در صورت دلخواه می‌توان متغیرها را با تایپشان مشخص کرد یا مثل جاوا اسکریپت از این مورد عبور کرد و به کامپایلر آن را حواله کرد

دارت می‌تواند  هم به شکل aot و هم به شکل jit کامپایل شود.
مورد اول باعث بهینه‌سازی بهتر می‌شود و مورد دوم موجب افزایش سرعت اجرا می‌شود. 


# ابزارها
## محیط DartPad
[DartPad](https://dart.dev/tools/dartpad) یک روش عالی و بدون نیاز به دانلود است برای یادگیری درستور زبان دارت و آزمایش و آشنایی با ویژگی های زبان دارت است که از کتابخانه های اصلی دارت پشتیبانی می کند، به جز کتابخانه های VM مانند dart: io.

## ویرایشگر ها و IDE ها
افزونه های دارت برای این IDE های پرکاربرد وجود دارد:
<li>Android Studio </li>
<li> Visual Studio Code</li>
<li> IntelliJ IDEA </li>
<br>
به علاوه افزونه های دارت به لطف انجمن برای ویرایشگر های زیر نیز در دسترس هستند:
<li>Emacs </li>
<li>Eclipse </li>
<li>Vim </li>

# منابع
برای بخش documentation از لینک های زیر استفاده شده است.
<div dir='ltr'>
https://dart.dev/guides
</div>
<div dir='ltr'>
https://dart.dev/overview
</div>
<div dir='ltr'>
https://dart.dev/codelabs
</div>
<div dir='ltr'>
https://www.youtube.com/watch?v=huawCRlo9H4&t=1810s
</div>


</br>
</br>

برای کدها از منبع روبرو استفاده شده است.
<div dir='ltr'>
https://dart.dev/samples
</div>
<div dir='ltr'>
https://www.youtube.com/watch?v=Ej_Pcr4uC2Q
</div>