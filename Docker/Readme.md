<div dir = 'rtl'>

# داکر ( Docker )

داکر یک پلتفرم متن باز برای توسعه، جابجا کردن و اجرای اپلیکیشن هاست. داکر به شما اجازه میدهد تا اپلیکیشن خود را از زیرساخت (infrastructure) جدا کنید تا بتوانید سریع تر  نرم افزار خود را توسعه دهید. با داکر میتوانید زیرساخت خود را همانند اپلیکیشن خود مدیریت کنید.

## پلتفرم داکر
داکر این قابلیت را به ما میدهد تا یک اپلیکیشن را در یک محیط ایزوله به نام کانتینر ( Container ) اجرا کنیم. ایزوله بودن و امنیت کانینتر ها باعث میشود که بتوانیم تعداد زیادی کانتینر را روی هاست اجرا کنیم.
کانتینر ها سبک و سریع هستند زیرا نیازی ندارند که مانند ماشین های مجازی سربار Hypervisor را تحمل کنند و مستقیما روی هسته ( Kernel ) کامپیوتر سرویس دهنده اجرا میشوند. این به آن معناست که میتوان تعداد بیشتری کانتینر را روی یک ماشین نسبت به حالتی که از ماشین مجازی استفاده میکنیم اجرا کرد.
البته حتی این قابلیت را نیز داریم که از داکر درون ماشین مجازی نیز استفاده کنیم!

## موتور داکر ( Docker Engine )

انجین داکر یک اپلیکیشن سمت کلاینت و سرور است که قابلیت های زیر را داراست:
- یک سرور که نوعی نرم افزار با مدت زمان اجرای طولانی است که به آن پروسه Deamon  گفته میشود.
- یک REST API که واسط کاربری نرم افزار ها برای ارتباط و دادن دستورات به deamon است.
- یک کلاینت Command Line Interface (CLI)

![enter image description here](https://docs.docker.com/engine/images/engine-components-flow.png)

CLI از REST API داکر برای کنترل و یا ارتباط با Deamon به وسیله نوشتن اسکریپت و یا دستورات مستقیم CLI استفاده میکند.

Deamon در واقع وظیفه ساخت و مدیریت Object های داکر را دارد. این Object ها شامل Image ها، Container ها، Network ها و Volume ها میشوند.

## کارایی داکر
##### تولید سریع و باثبات اپلیکیشن
سناریو زیر را در نظر بگیرید:
- توسعه دهندگان یک پروژه کد های خود را به صورت local روی کامپیوتر خود مینویسند و توسط کانتینر های داکر آن ها را با یکدیگر به اشتراک میگذارند.
- آن ها از داکر استفاده میکنند و اپلیکیشن خود را به یک محیط تست push میکنند و آن را تست میکنند.
- وقتی باگی در نرم افزار پیدا شود آن ها باگ را در محیط local یعنی روی کامپیوتر خود تصحیح میکنند و دوباره به محیط تست میفرستند.
- هنگامی که تست ها با موفقیت انجام شد برای رساندن اپلیکیشن به مشتریان تنها کافیست Image آپدیت شده خود را به محیط اصلی یعنی Production بفرستیم.
- 
دلیل اینکه میتوانیم روی محیط اول یعنی کامپیوتر خود کد بزنیم و سپس روی محیط دوم تست کنیم و سپس کد را به محیط سوم برای استفاده اصلی بفرستیم این است که زیرساخت همه این محیط ها یکسان است و توسط داکر فراهم میشود.

##### گسترش پذیری و ریسپانسیو بودن

کانتینر داکر میتواند روی محیط local شخص توسعه دهنده، روی ماشین مجازی یا ماشین فیزیکی درون یک دیتا سنتر، روی فضای ابری و یا ترکیبی از این محیط ها اجرا شود.

همچنین به وسیله داکر میتوانن در زمان بسیار کمی یعنی تقریبا به صورت real-time اپلیکیشن را به بخش ها کوچکتری تقسیم کرد و یا هر بخش آن را گسترش داد.

##### انجام کار بیشتر روی سخت افزار یکسان
داکر سبک و سریع است. و نسبت به ماشین های مجازی که برپایه Hupervisor ها کار میکنند به شدت کارا و کم هزینه است. داکر برای نرم افزار هایی که زیرساخت فشرده و سنگینی دارند نیز بسیار عالیست.




## معماری داکر
داکر از یک معماری کلاینت-سرور استفاده میکند. کلاینت داکر با Deamon در ارتباط است که ساخت و اجرا و پخش کردن کانتینر های داکر را بر عهده دارد. بخش کلاینت و سرور ( Deamon ) داکر میتوانند روی یک کامپیوتر باشند یا به صورت Remote  روی سیستم های مجزا با یکدیگر در ارتباط باشند. در هر صورت ارتباط میان این دو همانطور که قبلا توضیح داده شد توسط یک REST API انجام میشود.
![enter image description here](https://docs.docker.com/engine/images/architecture.svg)

###   (Dockerd) Deamon داکر 

به API request های داکر 
گوش میدهد و Object های داکر را مدیریت میکند. 
همچنین یک Deamon میتواند با Deamon های دیگر نیز برای مدیریت سرویس های داکر در ارتباط باشد.

### کلاینت داکر ( Docker )
دستورات را توسط REST API به Deamon میدهد و میتواند به طور همزمان با بیش از یک Deamon در ارتباط باشد.

### رجیستری های داکر
یک رجیستری داکر Image های داکر را در خود نگهداری میکند. 
[Docker Hub](https://hub.docker.com/) یک رجیستری پابلیک است که داکر به صورت پیش فرض از آن استفاده میکند.

## آبجکت های داکر ( Docker Objects )
وقتی که از داکر استفاده میکنید، درواقع در حال استفاده، ساخت و یا تغییر این آبجکت ها هستید.
### Images
به Image به چشم یک نقشه‌ی اولیه برای ساخت container نگاه کنید. در Image تمامی زیرساخت های مورد نیاز تعیین و چیده می‌شوند سپس می‌توان بر روی آن Image یک Container ساخت.
یک Image در واقع یک Read-Only Template حاوی دستوراتی برای ساخت یک کانتینر داکر است. معمولا استفاده ما از Image ها به اینصورت است که با تغییر یک Image، Image دیگری را که برای ما مناسب تر است میسازیم. مثلا میتوانیم Image ای بسازیم که برپایه Image اوبونتو است اما یک سرور Apache نیز روی آن نصب میشود.
شما میتوانید از Image های آماده استفاده کنید و یا Image مناسب خود را بسازید.
برای ساختن Image جدید کافی است یک Dockerfile ساده بسازید که در آن دستوراتی نشان دهنده چگونگی ساختن و اجرا کردن Image موجود است.
وقتی که Dockerfile خود را تغییر میدهیم و Image جدیدی میسازیم، تنها بخش های جدید دوباره ساخته میشوند و این یکی از دلایل عمده سرعت و عملکرد بهتر داکر نسبت به بقیه فناوری های شبیه سازی ( Virtualization ) است.
به عبارتی image های داکر به صورت لایه لایه روی هم ساخته می‌شوند. به عنوان مثال یک image مختص Debian وجود دارد، بر روی آن یک image مختص زبان PHP اضافه می‌شود و ... 
مثال هایی از Dockerfile برای Nginx+NodeJS در پوشه‌ی مربوطه موجود است.

برای مشاهده‌ی Imageهای موجود می‌توانید از دستور زیر استفاده کنید:

<div dir = 'ltr'>

    docker images

</div>

و برای Pullکردن یک Image می‌توانید از دستور زیر استفاده کنید:

<div dir = 'ltr'>

    docker pull NAME

</div>

هم‌چنین، برای پاک‌کردن یک Image از  دستور زیر می‌توانید استفاده کنید، فقط باید توجه داشته‌باشید که ابتدا باید Containerهایی که از روی آن Image ساخته‌شده‌اند را پاک کنید:

<div dir = 'ltr'>

    docker rmi IMAGE

</div>

### Containers

Container یک Instance قابل اجرای  یک Image است. میتوان یک کانتینر را به وسیله Docker API  یا CLI ساخت، 
اجرا، حذف و یا متوقف کرد.

معمولا کانتینر ها از دیگر کانتینر های به خوبی ایزوله میشوند. شما میتوانید میزان ایزوله بودن کانتینر ها را در مواردی مانند network آنها، حافظه مورد استفاده آنها و سیستم های پایه ای مورد استفاده آنها تنظیم کنید.

یک کانتینر در واقع با Image آن و همه تنظیماتی که در زمان اجرای آن انجام میدهید تعریف میشود. هنگامی که کانتینر حذف میشود هر تغییری فایلی که در آن به وجود آمده و راهی به بیرون از کانتینر ندارد از بین میرود.


برای مشاهده‌ی لیست Containerهای فعال می‌توانید از دستور زیر استفاده کنید:

<div dir = 'ltr'>

    docker ps

</div>

و برای مشاهده‌ی تمام containerها می‌توانید از دستور زیر استفاده کنید:

<div dir = 'ltr'>

    docker ps -all

</div>

برای پاک‌کردن یک Container از دستور زیر می‌توانید استفاده کنید:

<div dir = 'ltr'>

    docker rm CONTAINER

</div>


### Container ها و Virtual machine ها
یک کانتینر به صورت native روی لینوکس اجرا میشود و به صورت مشترک با سیستم عامل از کرنل استفاده میکند. کانتیر یک پروسه مجزا را اجرا میکند و مانند یک پروسه معمولی حجم کمی از RAM  را میگیرد.
در مقابل، VM یک سیستم عامل کامل مجازی guest را با دسترسی مجازی و شبیه سازی شده به منابع اصلی سیستم  را توسط یک hypervisor اجرا میکند. VM ها مقدار بسیار زیادی سربار نسبت به حجم پروسه مورد نیاز ما برای سیستم ایجاد میکنند.
![enter image description here](https://docs.docker.com/images/Container@2x.png) ![enter image description here](https://docs.docker.com/images/VM@2x.png)


## مزیت‌های داکر
۱ - سادگی: نصب داکر بسیار ساده است. من می‌توانم Image خود را به شما بدهم، شما آن را اجرا کنید و دقیقا همان چیزی که من run کرده‌ام را اجرا کنید.

۲- همکاری (collaboration): چند توسعه‌گر می‌توانند روی یک داکر کار کنند و نگران تفاوت‌ها و وابستگی‌ها(dependencies) و مسائل دیگر نباشند.

۳- انعطاف‌پذیری (flexibility): شما می‌تواند داکر خود را هر چیزی که خودتان می‌خواهید بسازید.

۴- جامعیت (totality): وقتی من یک برنامه را run می‌کنم و آن را به شما می‌دهم، داکر تمام مواردی را که برای اجرای برنامه به همراه ورژنی که من از آن استفاده کرده‌ام را به شما می‌دهد.


## نصب داکر روی لینوکس

یکی از راحت ترین روش های نصب استفاده از اسکریپت ارائه شده توسط خود داکر است

<div dir = 'ltr'>

    curl -sSL https://get.docker.com/ | sh    

</div>

پس از آن میتوانید برای اینکه بتوانید بدون استفاده از دسترسی superuser (sudo) از داکر استفاده کنید، user خود را به گروه داکر اضافه کنید:

<div dir="ltr">

    sudo usermod -aG docker $USER
    
</div>

برای اطمینان یک بار logout کنید و سپس دوباره وارد شوید   تا دسترسی ها آپدیت شوند و یا اگر از اوبونتو استفاده میکنید با انجام دستور زیر این کار را انجام دهید:
<div dir="ltr">
       
    newgrp docker

</div>


حال برای تست کردن میتوانید دستور زیر را اجرا کنید:

<div dir="ltr">

    docker run hello-world
    
</div>

که خروجی مشابه زیر میدهد:

<div dir="ltr">

    // Unable to find image 'hello-world:latest' locally
    // latest: Pulling from library/hello-world
    // ca4f61b1923c: Pull complete
    // Digest: sha256:ca0eeb6fb05351dfc8759c20733c91def84cb8007aa89a5bf606bc8b315b9fc7
    // Status: Downloaded newer image for hello-world:latest
    // Hello from Docker!   
    // This message shows that your installation appears to be working correctly.
    
</div>

## نصب داکر ورژن دسکتاپ روی مک و ویندوز
داکر یک ورژن دسکتاپ برای مک و ویندوز دارد که کار را برای مدیریت container ها و app های مختلف بسیار آسان تر می‌کند که می‌توانید آن را برای سیستم عامل خود از این لینک دانلود کنید:
<div dir="ltr">
    
    https://docker.com/products/docker-desktop
    
</div>

## چگونه باید اپلیکیشن خودمون رو به یک Container اضافه کنیم (چگونه Image خودمون رو بسازیم)؟


زمانی که شما container مورد نظر خودتان رو پیدا کردید قطعا میخواهید آن را customize کنید و dependency های خودتان رو به 
آن اضافه کنید . اینجا جاییست که Dockerfile مورد استفاده قرار میگیرد.

داکرفایل مشخص میکند که کانتینر شما چگونه باشد، یعنی از چه Image ای به عنوان پایه استفاده کند و چه تغییراتی روی آن اعمال کند و هنگام اجرا چه دستوراتی را اجرا کند.

در زیر یک داکرفایل نمونه به همراه توضیحات آن آمده است:

<div dir="ltr">

```dockerfile
    # Use the official Node.js runtime as a base image
    FROM node:alpine

    # Set the directory of my web application to /app
    WORKDIR /app

    # Copy over my project’s directory into the container /app folder
     Add . /app

    # Install all the dependencies for my web application
     RUN yarn install

    # Make the port 3000 accessible outside of Docker
     EXPOSE 3000

    # Execute the command yarn start
     CMD ["yarn", "start"]  

```
</div>

از روی این داکرفایل یک Image جدید ساخته شده و اجرا میشود. میتوان از روی یک Image که در اینجا بصورت داکر فایل است هر تعدادی Container ساخت.

با ساختن یک Image که تنظیمات شخصی خود را روی آن اعمال میکنیم، میتوانیم هر بار این کانتینر با تنظیمات شخصی سازی شده را بدون دوباره کاری اجرا کنیم.

در واقع Dockerfile شامل چند خط می‌باشد که هر خط شامل یک INSTRUCTION که تمامی حروف آن بزرگ و یک 
می‌باشد.
دستور FROM باید به یک OS و یا یک IMAGE دیگر اشاره کند. تمامی داکرفایل‌ها باید با دستور FROM شروع شوند.
دستور RUN دستوری که به عنوان ARGUMENT به آن داده می‌شود را اجرا می‌کند.
دستور COPY فایل‌ها را لوکال‌سیستم به IMAGE کپی می‌کند.



## مثال دیگر (آشنایی با docker-compose)


برای آشنایی بیشتر یک image برای راه اندازی یک پروژه جنگو میسازیم:
برای ساخت یک image ابتدا لازم است تا یک Dockerfile بسازیم و درون آن با نوشتن دستوراتی چگونگی ساختن image را به docker نشان دهیم. در واقع image دلخواه خود را برای docker توصیف میکنیم.

<div dir="ltr">

    FROM python:3.6
    ENV PYTHONUNBUFFERED 1
    RUN mkdir /my_app_dir
    WORKDIR /my_app_dir
    ADD requirements.txt /my_app_dir/
    RUN pip install — upgrade pip && pip install -r requirements.txt
    ADD . /my_app_dir/
    
</div>

در خط دوم با کلید واژه ENV میتوایم Environment Variable ها را برای app جنگو خود set کنیم. در واقع با این دستور درون کانتینر خود مقدار Environment Variable ای با نام PYTHONUNBUFFERED را برابر ۱ قرار میدهیم.

از آنجایی که به یک دیتابیس هم نیاز داریم میتونیم از یک image آماده mysql استفاده کنیم.
وقتی تعداد کانتینر ها زیاد میشود باید از ابزاری به اسم docker-compose استفاده کنیم.

این ابزار به راحتی قابل نصب است:
<div dir="ltr">

```$bash
    sudo apt install docker-compose
```
</div>
حال یک فایل به نام docker-compose.yml میسازیم با محتوای زیر:

<div dir="ltr">

```docker-compose
version: '3'

services:
  db:
     # Use the official mysql version 5.7 as a base image
    image: mysql:5.7

    # Mapping port 3306 inside container to port 3306 in our os network
    ports:
      - '3306:3306'

    # Setting environment variables
    environment:
       MYSQL_DATABASE: 'my-app-db'
       MYSQL_USER: 'root'
       MYSQL_PASSWORD: 'password'
       MYSQL_ROOT_PASSWORD: 'password'

  web:
    # Choosing the directory containing our Dockerfile
    build: .

    # Running this command every time we run our container
    command: python manage.py runserver 0.0.0.0:8000

    # Mounting current directory into container's /my_app_dir directory
    volumes:
      - .:/my_app_dir
    ports:
      - "8000:8000"

    # web Container will run after db
    depends_on:
      - db
```
</div>

درواقع هر کدام از سرویس هایی که درون docker-compose.yml تعریف میکنیم نشان دهنده یک کانتینر است که به وسیله این فایل میتوانیم آنها را به یکدیگر متصل کرده و فایل ها و شبکه های آن ها را با هم به اشتراک بگذاریم.

حال کافیست بقیه تنظیمات پروژه را انجام دهیم.
 فایل requirements.txt در دایرکتوری root پروژه جنگو :
 <div dir="ltr">

 ```
Django==1.11.5
mysqlclient==1.3.12
django-mysql==2.2.0
... (whatever else your app requires) ...
```
</div>

فایل my_app_dir/settings.py :
<div dir="ltr">

```
...
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'my-app-db',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': 3306,
    }
}
...
```
</div>

و در آخر:

<div dir="ltr">

```
    # building images from Dockerfiles
    docker-compose build

    # running your containers
    docker-compose up -d
```
</div>

و برای migrate کردن دیتابیس درحالی که کانتینر ها در حال کار کردن هستند به صورت زیر میتونید دستور migrate را درون کانتینر در حال اجرا، اجرا کنید.
<div dir="ltr">

```dockerfile
    docker-compose run web python manage.py migrate
```
</div>

</div>
