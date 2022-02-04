<div dir="rtl">

# Authors

<div dir="ltr">
AmirHossein Razlighi <br/>
Hooman Keshvari
</div>

# Introduction

در ابتدا ، به معرفی کوتاهی درباره ی Influx DB می پردازیم . این نوع از Database ، نوعی از پایگاه‌داده‌ است که اطلاحا به آن Time Series می گویند. یعنی برخلاف اکثر Database هایی که با آنها کار کرده ایم ، این پایگاه داده ، مقدار key را بصورت خودکار و از روی یک سری زمانی ، مقدار دهی میکند و ما میتوانیم مجموعه ای از value های مختلف را در آن ذخیره کنیم .
<br />
دلیل این کار ( استفاده از سری زمانی ) این است که سرهت query روی دیتابیس را به شدت بالا ببریم و بتوانیم در اموری مثل اپ های Real Time ، از آنها استفاده کنیم .
<br />
برای درک تفاوت بین دیتابیس Influx و دیتابیس ها Sql ی ، به جدول زیر توجه کنید . این ، مجموعه ای از اطلاعات یک سری سیاره است که در یک دیتابیس sql ذخیره شده است :<br/><br/>

<div dir="ltr" style="margin: auto; padding:0px"; align: center;>
 <img src="./Images/sql_db.png" width="1000", height="300">
</div>
<br />
حالا ، همین اطلاعات را در یک دیتابیس زمان محور ، مثلInflux  ذخیره میکنیم . اطلاعات بدین صورت خواهند بود :
<br/>

<div dir="ltr" style="margin: auto; padding:0px"; align: center;>
 <img src="./Images/influx_db.png" width="1000", height="310">
</div>

<br />

# Setting Up Influx Db in Docker

در این مقاله ، تصمیم داریم یک دیتابیس influx را در فضای داکر ، بالا آورده ، config کنیم و در نهایت ، از رابط آن استفاده کنیم و با Data کار کنیم .
به این منظور ، داکر را run میکنیم و دستور زیر را میزنیم :
<br />
<br />

<div dir="ltr">
    <code>
        docker pull influxdb
    </code>
</div>

حالاباید منتظر باشیم تا آخرین نسحه ی stable یا به اصطلاح همان latest version روی سیستم بارگزاری شود.
پس از آن ، برای ساختن یک container از روی image دانلود شده ، دستور زیر را میزنیم :
<br /> <br />

<div dir="ltr">
 <code>
 docekr run -d -e INFLUXDB_ADMIN_USER:admin -e INFLUXDB_ADMIN_PASSWORD:admin --name influxdb influxdb
 </code>
</div>

<br />
حالا ، یک داکر کانتینر با نام Influxdb و با یوزرنیم و پسورد admin  از روی image دانلود شده ، ساخته شد .
<br />
حالا کافی است که دستور زیر را بزنیم :
<br />
<br />

<div dir="ltr">
<code>
    docekr ps -a
</code>
</div>
و با این دستور ، تمامی کانتینر های شما ، به شما نمایش داده میشوند .  حالا کافی است چند حرف از ابتدای آیدی کانتینر خود را کپی کنید (یا نام کانتینر را کپی کنید ) و دستور زیر را بزنید : 
<br /><br />
<div dir="ltr">
<code>
    docekr exec -it influxdb bash
</code>
</div><br />
در نهایت ، کافی است در bash باز شده ،  دستور زیر را بزنید ( در تمامی مراحل توجه کنید که فلگ it مخفف interactive است) :

<br /><br />

<div dir="ltr">
<code>
    influx -host localhost -port 8086 -username admin -password admin
</code>
</div><br />

خوب است بدانید که پورت دیفالت مربوط به influx db ، همانطور که در بالا دیدید ، پورت 8086 است .
<br />
حالا ، ما وارد shell مربوط به influx db شده ایم و میتوانیم داده های خود را در آن ذخیره کنیم !

# Simple Instructions in Influx

اولین چیزی که روی شل مشاهده میکنید ، چیزی شبیه به زیر است :

<br /><br />

<div dir="ltr">
<code>
    Connected To http://localhost:8086 version 1.8.0
    Influx DB Shell : version 1.8.0
</code>
</div><br />

که در همین ابتدا خوب است اشاره کنیم که همه چیز در influx db ، تحت پروتکل http رد و بدل میشود .
<br />

در همین حال ، میتوانید با دستور زیر ، لیست تمامی دیتابیس ها را مشاهده کنید :

<br /><br />

<div dir="ltr">
<code>
    show databases
</code>
</div><br />

در ابتدا ، اگر دیتابیسی نساخته باشیم ، لیست زیر نمایش داده میشود.

<br />
<div dir="ltr">
<code>
    name : databases<br/>
    name<br />
    ------ <br/>
    _internal
</code>
</div><br />

که نشان دهنده ی این است که فعلا ، فقط همان دیتابیس دیفالت سیستم ، یعنی \_internal وجود دارد .
<br />
حالا ، برای ساخت یک دیتابیس جدید ، از دستور زیر استفاده میکنیم ( مثلا نام دیتابیس خود را demo میگذاریم ) :
<br /><br />

<div dir="ltr">
<code>
    create database demo
</code>
</div><br />

حالا اگر یک show databases بزنیم ، میبینیم که زیر \_internal ، یک دیتابیس جدید به نام مورد نظر ما ( demo ) نوشته شده است .
<br />
حالا با دستور زیر میتوانیم وارد دیتابیشس مورد نظرمان بشویم :

<br />

<div dir="ltr">
<code>
    use [database name] <br/> ( e.g : use demo )
</code>
</div><br />
در دیتابیس های InfluxDB ، از مفهومی به نام measurments استفاده میشود . این مفهوم یعنی داده هایی که در دیتابیس ذخیره میکنیم .  این داده ها از آنجایی که فقط مقدار دهی value شان با ماست ، یک سری tag هم قبول میکنند که به آنها اضافه کنیم و همچنین یک نام که برای دسترسی به آن measurement از آن استفاده کنیم . مثلا در زیر ، یک داده با نام CPU را با تگ های host = server A , region = us_west  و با مقدار ( value ) برابر 0.64 ذخیره میکنیم :

<br />
<div dir="ltr">
<code>
    insert cpu, host=serverA, region=us_west,<br/> value= 0.64 
</code>
</div><br />

پس فرمت کلی insert کردن داخل دیتابیس به این صورت است :

<br />

<div dir="ltr">
<code>
    insert [measurement name], [tags] [fields = ...]
</code>
</div><br />
حالا میتوانیم برای کوئری زدن از دستورات sql ی استفاده کنیم ! ( و این از ویژگی های منحصر بفرد آن است ) : 
<br />
مثال :

<br />

<div dir="ltr">
<code>
    SELECT * FROM "cpu"
</code>
</div><br />
به doube quotation دور نام measurement توجه کنید !
حال ، بیایید و یک value دیگر را به این measurement اضافه کنیم !

<br />

<div dir="ltr">
<code>
    insert cpu, host= serverA, region= us_west, <br/>value= 1.64
</code>
</div><br />

حالا اگر دستور select \* را بزنیم ، چیزی شبیه زیر به نمایش در میاید :

<br />

<div dir="ltr">
<code>
    name: cpu <br/>
    time | host | region | value <br /> 
    -----------------------------------
    <br/>
    [time 2]     |     serverA  |  us_west | 0.64
    <br/>
    [time 1]     |     serverA   |  us_west  | 1.64
</code>
</div><br />

حالا بیایید کمی بیشتر داده در این دیتابیس ذخیره کنیم :

<br />

<div dir="ltr">
<code>
    insert temperature, machine=unit42, type=assembly external=25, internal=37
</code>
</div><br />
<div dir="ltr">
------------------------------------------------------------------------
</div>
<br/>
<div dir="ltr">
<code>
    insert stock, symbol=AAPL bid=127.46, ask=127.86
</code>
</div><br />
<div dir="ltr">
------------------------------------------------------------------------
</div>
<br/>
<div dir="ltr">
<code>
    show measurements
</code>
</div><br />

نتیجه مطابق زیر میشود :
<br/>
<div dir="ltr">
<code>
    cpu <br/>
    stock <br/>
    temperature
</code>
</div><br />

حالا ، مثلا stock را مشاهده میکنیم :
<br/>
<div dir="ltr">
<code>
    SELECT * FROM "stock"
</code>
</div><br />
نتیجه :
<br/>
<img src="./Images/stock_1.png">
همانطور که میبینید ، یک measurement میتواند دو یا چمد value با نام های مختلف داشته باشد و این ویژگی هم دست ما را در کار با داده ها باز میگذارد !
<br />
حال فرض کنید میخواهیم تمامی key های هر measurement را مشاهده کنیم . در اینجا میتوانیم از یک syntax خاص به نام FLUX استفاده کنیم . مثلا :
<br/>
<div dir="ltr">
<code>
    show tag keys
</code>
</div><br />
و نتیجه مطابق زیر است که در هر measurement ، نام تگ های مورد نظر را که تعریف شده اند ، نشان میدهد :
<br />
<img src="./Images/show_tag_keys.png" />
یا میتوانستیم تگ های یک measurement هاص را ببینیم . مثلا :
<br/>
<div dir="ltr">
<code>
    show tag keys from "cpu"
</code>
</div><br />
 و نتیجه ، تگ های host , region که مربوط به cpu هستند را نمایش میدهد.
 <br/>
 دستوری شبیه به این دستور هست که میتوانیم بجای tag ها ، field ها یا همان مقدار هایی که برای این measurement در نظر گرفته ایم را ببینیم :
 <br/>
<div dir="ltr">
<code>
    show field keys from "cpu"
</code>
</div><br />
و نتیجه مطابق زیر خواهد بود :
<img src="./Images/field_keys_cpu.png">
که همانطور که مشاهده میشود ، مقدار field با نام value را که تغریف کرده بودیم ، بعلاوه ی نوع data type آن که غدد اعشاری (float) است ، نمایش میدهد .
<br />
حالا بیایید کمی دستورات بیشتری استفاده کنیم تا داده هایمان را مدیریت کنیم:
 <br/>
<div dir="ltr">
<code>
    insert cpu,host=serverA,region=us_east value=0.64
</code>
</div><br />
<div dir="ltr">
------------------------------------------------------------------------
</div>
<div dir="ltr">
<code>
    show tag values from "cpu" with key in ("region")
</code>
</div><br />
و نتیجه مطابق زیر میشود ( نشان دادن مقادیر محتلف Tag مربوط به region در measurement با نام cpu ):

<img src="./Images/show_tag_cpu.png">
در INFLUXDB ، هر measurement یک سری policy دارد که برخی از آنها auto generate هستند و برخی دیگر را میتوان بنابر نیاز ، بصورت custom نوشت .
مثلا به retention policy توجه کنید . این یک policy است که نشان میدهد یک data به چه مدت توسط influx db نگهداری شود .
<div dir="ltr">
<code>
    show retention policies
</code>
</div><br />
نتیجه چیزی مطابق زیر خواهد بود :
<br />
<img src="./Images/ret_policies.png" >
همانطور که میبینید ، بصورت default ، مقدار duration در اینجا برابر 0 ثانیه است . به این معنی که داده ای که ذخیره میشود ، هیچگاه از بین نمیرود . گرچه بسیاری موارد ممکن است که نیاز باشد داده پس از مدتی ( مثلا یک هفته یا یک سال) از دیتابیس ما حذف شود .

</div>
