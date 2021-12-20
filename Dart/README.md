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
</div>


# فهرست

# توضیحات کلی

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
کامپایلرها می‌تواند از این روش هم استفاده کند. 

## نصب و استفاده

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

## آموزش دارت

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


## چند نمونه کد
## بررسی یک پروژه نمونه‌
# ابزارها

# منابع
