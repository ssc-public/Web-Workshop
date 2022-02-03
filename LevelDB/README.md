<div dir='rtl'>
    <div align="center">
        <div style="font-size:40px">
            <b>
            به نام خدا
            </b>
        </div>
        <p> <b style="font-size:16px">نویسندگان:</b> محمد نامدار، امیرمحمد محمدی، سجاد فقفور مغربی
        </p>
        <img src="./resources/leveldb_Logo.png" alt="Sharif Web Programming Workshop">
    </div>

# مفاهیم اولیه

## پایگاه داده

پایگاه داده مجموعه ای سازمان یافته از اطلاعات یا داده های ساختار یافته است که در یک سیستم کامپیوتری ذخیره می شود. یک پایگاه داده معمولاً توسط یک سیستم مدیریت پایگاه داده (DBMS) کنترل می شود. با هم، داده ها و DBMS، همراه با برنامه های کاربردی مرتبط با آنها، به عنوان یک سیستم پایگاه داده نامیده می شوند که اغلب به یک پایگاه داده خلاصه می شود.

داده‌های موجود در رایج‌ترین انواع پایگاه‌های داده که امروزه در حال کار هستند، معمولاً در ردیف‌ها و ستون‌ها در مجموعه‌ای از جداول مدل‌سازی می‌شوند تا پردازش و پرس و جوی داده‌ها کارآمد باشد. سپس داده ها را می توان به راحتی در دسترس، مدیریت، اصلاح، به روز رسانی، کنترل و سازماندهی کرد. اکثر پایگاه های داده از زبان پرس و جو ساخت یافته (SQL) برای نوشتن و جست و جوی داده ها استفاده می کنند.

## پایگاه داده NoSql

NoSQL یا پایگاه داده غیررابطه ای اجازه می دهد تا داده های بدون ساختار و نیمه ساختار یافته ذخیره و دستکاری شوند (برخلاف یک پایگاه داده رابطه ای، که تعریف می کند چگونه تمام داده های درج شده در پایگاه داده باید ترکیب شوند). پایگاه داده های NoSQL با رایج شدن و پیچیده تر شدن برنامه های کاربردی وب محبوبیت پیدا کردند.

<img src="./resources/nosql.png" alt="Sharif Web Programming Workshop">

leveldb یک پایگاه داده NoSql است. دقت شود NoSql به معنای Not-Only Sql است.

## Bigtable

طبق صفحه ویکی‌پدیا leveldb این دیتابیس مبتنی بر Google's **Bigtable** database system
است.

با توجه به اینکه leveldb
از Bigtable متاثر است خوب است در ابتدا کمی با آن آشنا شویم.

Cloud Bigtable یک جدول sparse
است که می تواند به میلیاردها سطر و هزاران ستون مقیاس شود و کاربر را قادر می سازد تا ترابایت ها یا حتی پتابایت ها داده را ذخیره کنید. یک مقدار در هر ردیف نمایه می شود. این مقدار به عنوان کلید ردیف شناخته می شود. Bigtable برای ذخیره مقادیر بسیار زیاد داده های با یک کلید و همینطور با تأخیر بسیار کم ایده آل است.
از توان خواندن و نوشتن بالا با تاخیر کم پشتیبانی می کند.
همینطور برای Map-Reduce ایده آل است.

##

# تاریخچه

LevelDB یک کاتبخانه ~~منبع آزاد~~ متن باز (open-source) برای ذخیره و دسترسی به اطلاعات است که توسط Google توسعه یافته و __نگهداری میشود__، درواقع LevelDB یک پایگاه داده کامل نیست بلکه کتابخانه است که روش ذخیره و بازیابی اطلاعات را روی سیستم شما مشخص میکند.  

در سال 2004 شرکت Google اقدام به توسعه .... به نام Cloud Bigtable کرد که الهام بخش توسعه LevelDB شد.    
[Bigtable](https://cloud.google.com/bigtable, "Google Cloud Bigtable") یک پایگاه داده NoSQL با سرعت بالا و مقیاس پذیر است که با زیان C++ نوشته شده و به طور خاص برای دخیره و تحلیل داده های حجیم بهینه شده است و به عنوان زیرساخت در اغلب سرویس های گوگل مثل Google map، Google Drive و ... استفاده میشود.   
[Sanjay Ghemawat](https://research.google/people/SanjayGhemawat/) و [Jeffrey Dean](https://research.google/people/jeff/) ایده اصلی خود برای توسعه LevelDB را از Bigtable گرفتند اما تصمیم داشتند برخلاف آن که در مالکیت گوگل بود و متن باز نبود، پایگاه داده خود را متن باز و تحت مجوز [BSD](https://github.com/google/leveldb/blob/main/LICENSE, "BSD licenses") بسازند. توسعه LevelDB از سال 2011 آغاز و با زبان C++ نوشته شد

# ساختار

# عملکرد (Performance)

# روش نصب و راه اندازی

# LevelDB با NodeJS

# LeveDB با GO

# references

<div dir="ltr">

- [What is Database?](<https://www.oracle.com/database/what-is-database/#:~:text=A%20database%20is%20an%20organized,database%20management%20system%20(DBMS).&text=Most%20databases%20use%20structured%20query,for%20writing%20and%20querying%20data.>)

- [BIGTABLE :: About inspirations of LEVELDB](https://cloud.google.com/bigtable/docs/overview)

</div>
