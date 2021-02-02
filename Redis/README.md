<p align="center">
    <img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/redis_logo.svg" alt="Redis Logo">
</p>

<p align="center">
    تحقیق پایانی برنامه سازی وب، دانشگاه صنعتی شریف
    <br/>
    ارائه دهنده درس: جناب آقای امید جعفری نژاد
    <br/>
    نویسندگان: آرین احدی نیا، محمد جعفری، پوریا ممتاز اصفهانی
</p>

<div dir="rtl">

## ردیس چیست؟

ردیس یک انبار در حافظه داده ساختار (in-memory data structure store) است که میتواند به عنوان پایگاه داده یا حافظه نهان (cache) یا کارگزار پیام (message broker) استفاده شود.
ردیس داده ساختار هایی را از قبیل رشته (strings)، هش (hashes)، لیست (lists)، مجموعه (sets)، مجموعه مرتب (sorted sets)، بیتمپ (bitmaps)، جریان ها (streams) و ... ارائه میدهد.
ردیس، مجموعه ای از امکانات دخلی از قبیل تکرر (replication)، اسکیریپ نویسی لوآ (Lua scripting)، تخلیه LRU و ... را ارائه میدهد.

ردیس در خانواده پایگاه داده های کلید-مقدار (key-value) قرار میگیرد.
از آنجایی که ردیس رویه کلید-مقداری دارد. اغلب به عنوان یک داده ساختار معرفی میشود.

## متن باز

خبر خوب اینکه ردیس یک پروژه متن باز است و شما می توانید به متن منبع این پروژه در GitHub دسترسی پیدا کنید.
[github.com/redis](https://github.com/redis)

## نصب ردیس

روش های مختلفی برای نصب ردیس وجود دارد. در این مقاله، ما به نصب ردیس در داکر، در لینوکس و در ویندوز اشاره می کنیم.
اگر شما یک توسعه دهنده هستید و میخواهید از ردیس برای اجرا و تست پروژه خود استفاده کنید، قویا استفاده از داکر را به شما توصیه می کنیم.

### نصب در لینوکس

برای نصب در لینوکس روش های متعددی وجود دارد. ما در اینجا یک روش نصب و ایمن‌سازی آن را برای سرور های ubuntu بیان می کنیم. هرچند که از این روش برای نصب در ubuntu lts نیز میتوانید استفاده کنید.

#### پیشنیاز ها

شما برای طی مراحل این نصب، به یک ubuntu server و دسترسی sudo نیاز دارید.

#### مراحل

1. با استفاده از دستور زیر، ردیس و dependencies هایش را نصب کنید.

<div dir="ltr">

```
$ sudo apt update
$ sudo apt install redis-server
```

</div>

2. با استفاده از دستور زیر فایل config ردیس را باز کنید.

<div dir="ltr">

```
$ sudo nano /etc/redis/redis.conf
```

</div>

یک فایل مشابه تصویر زیر باز خواهد شد. مقابل `supervised` عبارت `no` نوشته شده است. آن را به `systemd` تغییر دهید.
این تغییر اجازه میدهد که سیستم به بتواند به عنوان یک سرویس با ردیس برخورد کند.

<img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/ubuntu/ubuntu_1.png" alt="ubuntu_1">

3. برای اعمال تغییرات اعمال شده در مرحله قبل دستور زیر را اجرا کنید.

<div dir="ltr">

```
$ sudo systemctl restart redis.service
```

</div>

4. حال میتوانید با استفاده از دستور زیر به redis-cli وصل شوید.

<div dir="ltr">

```
$ redis-cli
```

</div>

5. برای تست می توانید از دستور `ping` استفاده کنید. پاسخ مورد انتظار در صورت اجرای مناسب، `PONG` خواهد بود.

<div dir="ltr">

```
> ping
PONG
```

</div>

6. با استفاده از دستور `exit` میتوانید خارج شوید.

<div dir="ltr">

```
> exit
```

</div>

7. در صورتی که تمایل به تنظیم رمزعبور برای ردیس دارید، این بخش را دنبال کنید.
تنظیم رمزعبور یکی از دو قابلیت امنیتی ردیس است که کاربران را ملزم می کند برای دسترسی به آن، با استفاده از رمز عبور احراز هویت کنند. رمز عبور از طریق فایل `config` ردیس تنظیم میشود. برای تنظیم رمز عبور، فایل `config` را با استفاده از دستور زیر باز کنید.

<div dir="ltr">

```
$ sudo nano /etc/redis/redis.conf
```

</div>

اسکرول کنید تا به بخش `SECURITY` برسید. در آنجا یک خط کامنت شده به شکل زیر وجود دارد.

<div dir="ltr">

```
# requirepass foobared
```

</div>

برای تنظیم رمزعبور، با حذف # آن را از حالت کامنت دربیاورید و عبارت foobared را با یک رمز عبور امن جایگزین کنید.

<img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/ubuntu/ubuntu_2.png" alt="ubuntu_2">

##### توجه

در همین قسمت، مطابق تصویر بالا نوشته شده است که به علت سرعت بالای ردیس، کاربران خارجی با بسامد 150k تلاش در ثانیه، میتوانند پسورد ها را تولید و امتحان کنند.
این موضوع خطر حمله جستوجوی کور را بالا می برد.
لذا توصیه میشود که از یک پسورد طولانی که ترکیب حروف و اعداد و نماد است استفاده کنید.
برای اینکار می توانید از نرم‌افزار های تولید رشته های تصادفی مانند `open ssl` استفاده کنید.

پس از تنظیم رمزعبور، تغییرات را ذخیره و فایل را ببندید و از دستور زیر برای اعمال تغییرات استفاده کنید.

<div dir="ltr">

```
$ sudo systemctl restart redis.service
```

</div>

اکنون ردیس تنها پس از احراز هویت با رمزعبور، کار خواهد کرد. مثال:

<div dir="ltr">

```
$ redis-cli
> set key 1
(error) NOAUTH Authentication required.
> auth 1234
OK
> set key 1
OK
quit
```

</div>

8. این یک قابلیت امنیتی برای تغییر نام دستورهای خطرناک است. در صورتی که تمایلی به انجام آن ندارید، می توانید این بخش را دنبال نکنید.
یک قابلیت امنیتی دیگر که ردیس فراهم می آورد. تغییر نام یا غیر فعال کردن دستوراتی است که اجرای آنها میتواند خطرناک باشد.
اجرای این دستورها میتواند اتفاقی یا باشد یا توسط بدخواهان خارجی اتفاق بیفتد.

به عنوان مثال دستور زیر میتواند پسورد تنظیم شده را آشکار کند.

<div dir="ltr">

```
> config get requirepass
1) "requirepass"
2) "1234"
```

</div>

دستورهای لیست زیر از جمله دستورهای خطرناک هستند. هر چند که این لیست، جامع نیست.

<div dir="ltr">

```
FLUSHDB
FLUSHALL
KEYS
PEXPIRE
DEL
CONFIG
SHUTDOWN
BGREWRITEAOF
BGSAVE
SAVE
SPOP
SREM
RENAME
DEBUG
```

</div>

لیست کامل دستورهای ردیس را میتوانید از لینک روبرو دریافت کنید.
[http://redis.io/commands](http://redis.io/commands)

فراخور نیاز هر پروژه، میتوانید نام دستورهای خطرناک را به یک نام دلخواه تغییر دهید یا به صورت کلی اجرای آن دستور را غیر فعال کنید.
مشابه تنظیم رمزعبور، این کار از بخش `SECURITY` فایل تنظیم انجام میشود. کافیست که فایل مورد نظر را با استفاده از دستور زیر باز کنید.

<div dir="ltr">

```
$ sudo nano /etc/redis/redis.conf
```

</div>

سپس در بخش امنیت، مشابه تصویر زیر به بخش تغییر نام دستورات بروید. آنجا میتوانید دستورات تغییر نام را مشابه تصویر بنویسید.
توجه کنید که برای غیر فعال کردن، کافی است که نام آن را به یک رشته خالی تغییر دهید.

<img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/ubuntu/ubuntu_3.png" alt="ubuntu_3">

### نصب در داکر

استفاده از این روش، به دلیل سادگی و سهولت قویا توصیه میشود. با طی مراحل زیر، میتوانید ردیس را در داکر خود نصب کنید.

#### پیشنیاز ها

1. command line
2. یک عدد داکر صحیح و سالم و در وضعیت running
3. کاربر با دسترسی admin در سیستم عامل (sudo و root در لینوکس)

#### مراحل

1. با استفاده از دستور زیر، یک کانینر ردیس با نام دلخواه باز کنید. در صورت لزوم میتوانید نسخه نصب را نیز مشخص کنید. در دستور زیر چون نسخه نصب را مشخص نکرده ایم، سیستم به صورت خودکار آخرین نسخه (latest) را نصب خواهد کرد.

<div dir="ltr">

```
docker run --name my-first-redis -d redis
```

</div>

در تصویر پایین، تصویر ترمینال پس از اجرای موفقیت آمیز این دستور قرار دارد.

2. دستور زیر را در ترمینال اجرا کنید تا مطابق تصویر، از صحت نصب و اجرای ردیس اطلاع پیدا کنید.

<div dir="ltr">

```
docker ps
```

</div>

<img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/docker/docker_1.png" alt="docker_1">

تمام شد! ردیس شما آماده است. میتوانید از طریق دستورات زیر به redis-cli در کامندلاین دسترسی پیدا کنید.

3. از دستور زیر برای باز کردن redis-cli استفاده کنید.

<div dir="ltr">

```
docker exec -it my-first-redis sh
redis-cli
```

</div>

4. میتوانید از دستور `ping` برای بررسی وجود اتصال مناسب استفاده کنید. در صورتی که اتصال برقرار باشد پاسخ `PONG` دریافت خواهد شد.

<img src="https://github.com/AryanAhadinia/web_workshop/blob/redis_article/Redis/public/docker/docker_2.png" alt="docker_2">

5. ممکن است که به هر دلیلی بخواهید ردیس با فایل کانفیگ دلخواه شما اجرا شود. این دلایل میتوانند دلایل امنیتی باشند که در مرحله 7 و 8 نصب در لینوکس توضیح دادیم.
برای اجرای ردیس با فایل کانفیگ دلخواه، کافی است ردیس را با دستور زیر اجرا کنید.

<div dir="ltr">

```
sudo docker run --name my-first-redis -v /myfirstredis/redis.conf:/path/to/redis/redis.conf -d redis
```

</div>

## نصب در ویندوز

نصب ردیس در ویندوز سرراست است و صرفا با دانلود فایل اجرایی نصب، صورت می گیرد. استفاده از آن نیز بسیار آسان استو کافی است که فایل redis-server.exe را اجرا کنید. در نهایت میتوانید با استفاده از دستور `ping`، صحت اتصال را بررسی کنید.

<div dir="ltr">

```
> ping
PONG
```

</div>


## پله پله تا دستور های ردیس

برای شروع، میتوانیم از دستور زیر، برای ذخییره مقدار "fido" در کلید "server:name" استفاده کنیم.

<div dir="ltr">

```
SET server:name "fido"
```

</div>

می توانیم برای دریافت مقدار ذخیره شده در یک کلید مانند "server:name" از دستور زیر استفاده کنیم.

<div dir="ltr">

```
GET server:name
    => fido
```

</div>

اگر برای دریافت مقدار یک کلید مقداردهی نشده درخواست کنیم، nil دریافت خواهیم کرد.

<div dir="ltr">

```
GET server:blabla
    => nil
```

</div>

برای اینکه بررسی کنیم آیا یک کلید مقدار دهی شده است یا خیر، میتوانیم از دستور زیر استفاده کنیم.

<div dir="ltr">

```
EXISTS server:name
    => 1
```

```
EXISTS server:blabla
    => 0
```

</div>

میتوانیم برای حذف یک کلید مقداردهی شده، از دستور زیر استفاده کنیم.

<div dir="ltr">

```
DEL server:name
```

</div>

مشابه اکثر زبان های برنامه نویسی، دستوری برای اضافه کردن به مقدار یک کلید عددی و کم کردن از کلید عددی، به طور خاص اضافه کردن یک واحد و کم کردن یک واحد در ردیس داریم. نکته حائز اهمیت، Thread Safe بودن این دستور ها است که جلوتر توضیح خواهیم داد.

اضافه کردن یک واحد:

<div dir="ltr">

```
INCR server:name
```

</div>

اضافه کردن به میزان دلخواه:

<div dir="ltr">

```
INCRBY server:name 100
```

</div>

کم کردن یک واحد:

<div dir="ltr">

```
DECR server:name
```

</div>

کم کردن به میزان دلخواه:

<div dir="ltr">

```
DECRBY server:name 100
```

</div>

با یک مثال این را توضیح می دهیم.

<div dir="ltr">

```
SET open_connections 0
INCR open_connctions
    => 1
INCR open_connctions
    => 2
INCR open_connctions
    => 3
INCRBY open_connctions 100
    => 103
DECRBY open_connctions 23
    => 80
```

</div>

شاید تصور کنید که مزیت استفاده از این دستور ها، تنها در سادگی نوشتار است. به عنوان مثال ممکن است دو قطعه کد زیر را معادل بدانید.

<div dir="ltr">

```
INCR open_connctions
```

```
x = GET connections
x = x + 1
SET connections x
```

</div>

در حالت تک کاربره، این دو دستور درواقع معدل یک دیگر عمل می کنند.
اما در صورتی که برنامه ما multi-client باشد. ممکن است همزمانی منجر به ایجاد نتیجه نامطلوب شود.
به عنوان مثال فرض کنید که دو کلایت A و B داریم.
کلاینت A می خواهد یک واحد به connections اضافه کند و کلاینت B میخواهد یک واحد کم کند.
از آنجایی که توابع INCR و DECR همزمانی را نمی پذیرند، این کار در صورت استفاده از این توابع بدون مشکل انجام خواهد شد.
اما اگر از قطعه کد دوم استقاده کنیم. هممانی اجرای Thread ها میتواند مشکل ساز شود.

<div dir="ltr">

```
SET c 1                         // c  == 1
A executes: x1 = GET c          // x1 == 1
B executes: x2 = GET c          // x2 == 1
A executes: x1 = x1 + 1         // x1 == 2
B executes: x2 = x2 - 1         // x2 == 0
A executes: SET c x1            // c  == 2
B executes: SET c x2            // c  == 0, Confilict: expected 1 got 0
```

</div>

توجه کنید که مثال فوق تنها یک ترتیب فرضی مشکل ساز بود.
برنامه های چند رشته ای بدون هیچ ترتیب خاصی اجرا میشوند.

ممکن است بخواهیم از ردیس به عنوان یک cache مدت دار استفاده کنیم یا به هر دلیل دیگری، بخواهیم که داده ای که در ردیس ذخیره می کنیم، پس از مدتی منقضی و از حافظه حذف شود.
در این صورت می توانیم از دستور های زیر استفاده کنیم.

برای اینکه زمان انقضا برا یک داده مربوط به یک کلید استفاده کنیم می توانیم از دستور EXPIRE استفاده کنیم. مقیاس زمانی این دستور ثانیه است.

<div dir="ltr">

```
SET temp 1
EXPIRE temp 10
```

</div>

اگر بخواهیم در زمان مقدار دهی نیز میتوانیم مستقیما این کار را به این صورت انجام دهیم.

<div dir="ltr">

```
SET temp 1 EX 10
```

</div>

اگر بخواهیم میتوانیم به جای EXPIRE از PEXPIRE برای زمان دهی در مقیاس میلی ثانیه استفاده کنیم.

<div dir="ltr">

```
SET temp 1
PEXPIRE temp 10000
```

</div>

با استفاده از دستور TTL میتوانیم زمان باقی مانده به منقضی شدن یک داده را استخراج کنیم.
از دستور PTTL نیز میتوانیم برای استحراج این مقدار در مبنای میلی ثانیه استفاده کنیم.

<div dir="ltr">

```
SET temp 1 EX 10
// after 2s
TTL temp                => 8
// after 9s
TTL temp                => -2
```

```
SET permant 2
TTL temp                => -1
```

</div>

عدد منفی دو به این معنی است که این کلید تعریف نشده است.
عدد منفی یک به این معنی است که این کلید منقضی نمیشود و در حال حاضر دائمی است.

توجه کنید که برای یک کلید، می توانیم یک کلید را از طریق دستور PERSIST دائمی کنیم.

<div dir="ltr">

```
SET temp 1 EX 10
PRESIST temp
TTL temp                => -1
```

</div>

## داده ساختار ها در ردیس

در ردیس داده ساختار های متعددی وجود دارد. چند مورد از این داده ساختار ها و دستورات مربوط به آن را به اختصار معرفی خواهیم کرد.

### لیست (list)

لیست یک توالی ترتیب دار از المان های است.
دستورات اصلی داده ساختار لیست عبارتند از:

با استفاده از این دستور به سر سمت راست لیست، عنصر اضافه میشود.
پاسخ این دستور طول لیست پس از عملیات خواهد بود.
<div dir="ltr">

```
RPUSH
```
```
> RPUSH mylist Aryan
1
> RPUSH mylist Avina
2
```
</div>

با استفاده از این دستور به سر سمت چپ لیست، عنصر اضافه میشود.
پاسخ این دستور طول لیست پس از عملیات خواهد بود.
<div dir="ltr">

```
LPUSH
```
```
> LPUSH mylist Hamid
1
```
</div>

توجه کنید که با اولین باری که یک تابع لیستی را بر روی یک کلید آزاد صدا کنید، مقدار آن کلید تعریف به عنوان لیست تعریف میشود.

با استفاده از این دستور میتوانیم طول لیست را دریافت کنیم.

<div dir="ltr">

```
LLEN
```
```
> RPUSH mylist Aryan
1
> RPUSH mylist Avina
2
> LLEN mylist
2
> LPUSH mylist Hamid
3
> LLEN mylist
3
```
</div>

با استفاده از این دستور میتوانیم عناصر قرار گرفته بین دو ایندکس را دریافت کنیم.
به عنوان ورودی این دستور دو عدد دریافت می شود که اولی به معنای شروع بازه و دومی به معنی پایان بازه میباشد.
هر دو ایندکس شروع و پایان در نتیجه نهایی قرار میگیرند.
توجه کنید که ایندکس گذاری در این داده ساختار نیز مشابه اکثر زبان های برنامه نویسی از صفر است.
بنابرین یک لیست n تایی از صفر تا n-1 ایندکس بندی میشود. همچنین مکمل دهم هر ایندکس نیز معادل همان ایندکس خواهد بود.
به عبارت دیگر عناصر متناظرا از 1- تا n- از انتهای لیست ایندکس بندی میشوند. بنابرین هر دو ایندکس n-1 و 1-، اشاره به عنصر آخر لیست دارند.
<div dir="ltr">

```
LRANGE
```
```
> RPUSH mylist Aryan
1
> RPUSH mylist Avina
2
> LPUSH mylist Sara
3
> LPUSH mylist Hamid
4
> LRANGE mylist 1 3
1) "Sara"
2) "Aryan"
3) "Avina"
> LRANGE mylist 0 2
1) "Hamid"
2) "Sara"
3) "Aryan"
> LRANGE mylist 0 3
1) "Hamid"
2) "Sara"
3) "Aryan"
4) "Avina"
> LRANGE mylist 0 -1
1) "Hamid"
2) "Sara"
3) "Aryan"
4) "Avina"
> LRANGE mylist 1 -2
1) "Sara"
2) "Aryan"
```
</div>

با استفاده از این دو دستور، عنصر سر راست یا جپ لیست حذف و برگردانده میشود.

<div dir="ltr">

```
RPOP
```
```
LPOP
```
```
> RPUSH mylist Aryan
1
> RPUSH mylist Avina
2
> LPUSH mylist Sara
3
> LPUSH mylist Hamid
4
> LRANGE mylist 0 -1
1) "Hamid"
2) "Sara"
3) "Aryan"
4) "Avina"
> LPOP mylist
Hamid
> RPOP mylist
Avina
> LRANGE mylist 0 -1
1) "Sara"
2) "Aryan"
```
</div>

در نهایت توجه شما را به variadic بودن دستورات PUSH جلب می کنم. به این صورت که همزمان چند عنصر را می توان با استفاده از این دستور به لیست اضافه کرد.

<div dir="ltr">

```
> RPUSH mylist Hamid Sara Aryan Avina
> LRANGE mylist 0 3
1) "Hamid"
2) "Sara"
3) "Aryan"
4) "Avina"
```
</div>

### مجموعه (Set)

یک داده ساختار معروف دیگر در ردیس، مجموعه است. مزیت مجموعه این است که با سرعت بسیار بالا می توان بررسی کرد که آیا
یک المان در آن وجود دارد یا خیر. توجه کنید که همانند تعریف ریاضی مجموعه، ترتیب خاصی در مجموعه حاکم نیست و المان ها به ترتیب شبه تصادفی در مجموعه قرار می گیرند.

دستورات مجموعه عبارتند از:

با استفاده از این دستور میتوانیم یک عنصر به مجموعه اضافه کنیم. مشابه لیست این دستور نیز میتواند چند ورودی همزمان دریافت کند.

<div dir="ltr">

```
SADD
```
```
> SADD airlines "Iran Air"
1
> SADD airlines "Lufthansa" "British Airways" "United Airliens"
4
```
</div>

با استفاده از دستور زیر می توانیم المانی را از لیست حذف کنیم. توجه کنید پاسخ این دستور صفر و یک است. اگر صفر باشد، یعنی اصلا این عنصر وجود نداشته و تغییری در لیست نیز ایجاد نشده است.
اگر یک باشد به این معنی است که آن المان وجود داشته و حذف شده است. توجه کنید که تکرر در مجموعه معنی ندارد و یک عنصر یا وجود دارد یا ندارد. یک عنصر نمی تواند دوبار در یک مجموعه باشد.

<div dir="ltr">

```
SREM
```
```
> SADD airlines "Iran Air" "Lufthansa" "British Airways" "United Airliens"
3
> SREM airlines "Lufthansa"
1
> SREM airliens "Lufthansa"
0
```
</div>

با استفاده از دستور زیر، میتوانیم وجود یا عدم وجود یک المان را در مجموعه بسنجیم.

<div dir="ltr">

```
SISMEMBER
```
```
> SADD airlines "Iran Air" "Lufthansa" "British Airways" "United Airliens"
3
> SISMEMBER airlines "Lufthansa"
1
> SISMEMBER airlines "Air France"
0
```
</div>

با استفاده از دستور زیر، می توانید تمام اعضای یک مجموعه را دریافت کنید. توجه کنید که ترتیب خاصی در برگرداندن اعضا وجود ندارد.

<div dir="ltr">

```
SMEMBERS
```
```
> SADD airlines "Iran Air" "Lufthansa" "British Airways" "United Airliens"
3
> SISMEMBERS airlines
1) Lufthansa
2) British Airways
3) Iran Air
4) United Airliens
```
</div>

با استفاده از دستور `SRANDMEMBER` میتوانید یک عنصر رندم را از مجموعه دریافت کنید. در صورتی که نیاز به چند عدد رندم دارید. میتوانید تعداد مورد نیاز را به عنوان پارامتر ورودی به این تابع بدهید.

<div dir="ltr">

```
SRANDMEMBER
```
```
> SADD airlines "Iran Air" "Lufthansa" "British Airways" "United Airliens"
3
> SRANDMEMBER airlines
"Lufthansa"
> SRANDMEMBER airlines 2
1) "British Airways"
2) "Iran Air"
```
</div>

در صورتی که میخواهید عناصر خروجی گرفته شده از دستور `SRANDMEMBER` حذف شود، میتوانید به جای این دستور از دستور زیر استفاده کنید.

<div dir="ltr">

```
SPOP
```
```
> SADD airlines "Iran Air" "Lufthansa" "British Airways" "United Airliens"
3
> SPOP airlines 2
1) "British Airways"
2) "Iran Air"
> SMEMBERS airlines
1) Lufthansa
```
</div>

### مجموعه مرتب (Sorted List)

مجموعه های مرتب مشابه مجموعه های عادی هستند. با این تفاوت که در تناظر با هر عنصر یک امتیاز عددی قرار می گیرد که مبنای مرتب‌سازی عناصر خواهد بود. این داده ساختار با `Z` مشخص می شود.
برای یادگیری این داده ساختار، کافی است که به دستورات لیست و مجموعه مسلط باشید.
مثال:

<div dir="ltr">

```
> ZADD hackers 1940 "Alan Kay"
1
> ZADD hackers 1906 "Grace Hopper"
1
> ZADD hackers 1953 "Richard Stallman"
1
> ZADD hackers 1965 "Yukihiro Matsumoto"
1
> ZADD hackers 1916 "Claude Shannon"
1
> ZADD hackers 1969 "Linus Torvalds"
1
> ZADD hackers 1957 "Sophie Wilson"
1
> ZADD hackers 1912 "Alan Turing"
1
> ZRANGE hackers 2 4
1) "Claude Shannon", 2) "Alan Kay", 3) "Richard Stallman"
```
</div>

### هش (Hash)

هش یک مپ بین کلید ها و مقادیر رشته ای یا عددی است.
با استفاده از دستور `HSET` میتوانیم به هر کلید یک مقدار نسبت بدهیم.
مقدار خروجی مشابه مجموعه است. اگر آن کلید قبلا مقدار دهی نشده باشد 1 و در غیر این صورت صفر خواهد بود.
<div dir="ltr">

```
HSET
```
```
> HSET user:1000 name "John Smith"
1
> HSET user:1000 email "john.smith@example.com"
1
> HSET user:1000 password "s3cret"
1
```
</div>

همچنین می توانیم با استفاده از دستور زیر مقدار نسبت داده شده به یک کلید را استخراج کنیم.

<div dir="ltr">

```
HGET
```
```
> HSET user:1000 name "John Smith"
1
> HSET user:1000 email "john.smith@example.com"
1
> HSET user:1000 password "s3cret"
1
> HGET user:1000 name
"John Smith"
```
</div>

همچنین می تونیم با استفاده از دستور زیر همزمان چند کلید را مقداردهی کنیم.

<div dir="ltr">

```
HMSET
```
```
> HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
OK
> HGET user:1002 name
"Mary Jones"
```
</div>

همچنین با استفاده از دستور زیر می توانیم که تمامی کلید های مقدار دهی شده ی یک هش را دریافت کنیم.

<div dir="ltr">

```
HGETALL
```
```
> HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
OK
> HGETALL user:1001
1) "name"
2) "Mary Jones"
3) "password"
4) "hidden"
5) "email"
6) "mjones@example.com"
```
</div>

توجه کنید که برای مقادیر عددی، دستورات INCR و ... به صورت atomic وجود دارند. لزوم استفاده از این دستورات را پیشتر توضیح دادیم.

<div dir="ltr">

```
HINCRBY
```
```
> HMSET user:1002 name "Aryan" sessions 1
OK
> HINCRBY user:1002 sessions 1
2
> HINCRBY user:1002 sessions 1
3
```
</div>

</div>
