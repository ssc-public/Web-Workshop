<div dir="rtl">

#آشنایی به زبان ساده#
اولین نکته که باید مورد توجه قرار بگیره اینه که داکر هم مثل بقیه تکنولوژی ها تا وقتی که ازش دوریم خیلی سخت به نظر میاد اما وقتی شروع به کار کردن و مطالعه میکنیم ، میبینیم که چقدر ابزار کاربردی و راحتی است.

#داکر چه مشکلی رو حل میکنه؟#
مشخصا داکر مشکلات زیادی را حل میکند اما یکی از مهم ترین آن ها improve consistency (بهبود ثبات یا استقرار ) میباشد

وقتی گروهی از افراد روی یک پروژه کار میکنند ، میتونه تفاوت هایی در سیستم عامل ها و تنظیمات وجود داشته باشه که باعث بروز یک سری از مشکلات بشه و همچنین ممکنه در بالا آوردن اپلیکیشن روی کامپیوتر خودمون و محیط production (عملیاتی ) هم تناقضاتی وجود داشته باشه .

تمامی اینها شما رو از حل کردن مشکلات اصلی که در حقیقت build کردن پروژه تون هست دور میکنه.

##چگونه حل میکنه؟
داکر یه چیزی داره به عنوان container که مانند ماشین های مجازی لینوکس هستند با این تفاوت که اونها خیلی کارآمد تر هستند و منابع کمتری مصرف میکنند و اپلیکیشن شما رو در یک محیط (container) ایزوله و پایدار اجرا میکنه.

کانتینر (container) که اپلیکیشن شما رو داخل خودش داره متونه روی ویندوز ، مک او اس و لینوکس اجرا بشه و همین قضیه مشکل دولوپر های مختلف با سیستم های عامل متفاوت را حل میکند.

قابلیت docker برای ساحت و نگهداری محیطی استوار باعث portable شدن اپلیکیشن شما میشه.


![docker-pic](https://lamtakam.com/img/uploaded_images/1/1540452189.png)

![vmware-pic](https://lamtakam.com/img/uploaded_images/1/1540452647.png)


#اما این container ها رو باید از کجا پیدا کرد ؟#
داکر یه جایی داره که شما میتونید خیلی از این container ها رو اونجا پیدا کنید و ازشون استفاده کنید به نام docker hub که در زیر آدرس اون رو قرار میدم . البته توجه داشته باشید که داکر به آی پی ایران سرویس نمیده و برای نصب کردن و استفاده از docker hub باید از وی پی ان استفاده کنید.

https://hub.docker.com

تا زمانی که شما container مورد نظر خودتون رو بسازید میتونید از اینجا موارد مشابه ای رو پیدا کنید و سرعت ساخت اپلیکیشنتون رو بالاتر ببرید.

نمونه هایی از container هایی که میتونید از داکر هاب دانلود و استفاده کنید را در زیر نمایش میدهیم

Node.js , MySQL , Ubunto

#نصب داکر!
:یکی از راحت ترین روش های نصب استفاده از اسکریپت ارائه شده توسط خود داکره

<div dir="ltr">

    curl -sSL https://get.docker.com/ | sh    

</div>

پس از آن میتوانید برای اینکه بتونید بدون استفاده از دسترسی superuser (sudo) از داکر استفاده کنید، user خودتون رو به گروه داکر اضافه کنید:


<div dir="ltr">

    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker 
    
</div>

برای اطمینان یک بار logout کنید و سپس دوباره وارد شید تا دسترسی ها آپدیت شن.

حال برای تست کردن میتوانید دستور زیر را اجرا کنید:

<div dir="ltr">

    docker run hello-world
    
</div>

که خروجی مشابه زیره:

<div dir="ltr">

    // Unable to find image 'hello-world:latest' locally
    // latest: Pulling from library/hello-world
    // ca4f61b1923c: Pull complete
    // Digest: sha256:ca0eeb6fb05351dfc8759c20733c91def84cb8007aa89a5bf606bc8b315b9fc7
    // Status: Downloaded newer image for hello-world:latest
    // Hello from Docker!   
    // This message shows that your installation appears to be working correctly.
    
</div>


##چگونه باید اپلیکیشن خودمون رو به یک container اضافه کنیم ؟

زمانی که شما container مورد نظر خودتون رو پیدا کردید قطعا میخواهید اون رو customize کنید و dependency های خودتون رو بهش اضافه کنید . اینجا جاییه که Dockerfile میاد سر کار.

داکر فایل (Dockerfile) به طور خلاصه توضیح میده که شما از داکر میخواین چطور برای بار اول container اتون رو بالا بیاره

به عنوان مثال یک نمونه از Dockerfile رو در زیر براتون قرار میدم.

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
این Dockerfile هر وقت که یک instance ازش ساخته بشه اجرا میشه . هنوز برای ساخت یک container شما نیازمند docker image هستید . هر وقت شما یک Image بسازید متوانید از روی اون به هر تعدادی که دلتون میخواد container بسازید.

در حقیقت شما از داکر هاب ایمیج های داکری آماده را دانلود میکنید که میتوانید به کمک آن ها هر تعداد container ای که لازم دارید را بسازید . همچنین میتوانید تنظیمات شخصی خود را بر روی کانتینری که ساخته اید اعمال کنید و دوباره از آن container یک Image جدید بسازید تا برای ساخت کانتینر هر بار نیازمند انجام تنظیمات قبلی نباشید و container های خودتون رو بر اساس Image جدیدی که ساخته اید ، تولید کنید


##مثال

برای آشنایی بیشتر یک image برای راه اندازی یک پروژه جنگو میسازیم:
برای ساخت یک image ابتدا لازم است تا یک Dockerfile بسازیم و درون آن با نوشتن دستوراتی چگونگی ساهتن image را به docker نشان دهیم. در واقع image دلخواه خود را برای docker توصیف میکنیم.

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
وقتی تعداد کانتینر هامون زیاد میشه باید از ابزاری به اسم docker-compose استفاده کنیم.

میتونید به راحتی نصبش کنید:
```$bash
    sudo apt install docker-compose
```

حالا یک فایل به نام docker-compose.yml میسازیم با محتوای زیر:
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


حالا کافیه بقیه تنظیمات پروژه رو انجام بدیم.
 فایل requirements.txt در دایرکتوری روت پروژه جنگو :
 ```
Django==1.11.5
mysqlclient==1.3.12
django-mysql==2.2.0
... (whatever else your app requires) ...
```

my_app_dir/settings.py :
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

و در آخر:
```
    # building images from Dockerfiles
    docker-compose build

    # running your containers
    docker-compose up -d
```

و برای migrate کردن دیتابیس درحالی که کانتینر ها در حال کار کردن هستند به صورت زیر میتونید دستور migrate رو درون کانتینر در حال اجرا، اجرا کنید.
```dockerfile
    
    docker-compose run web python manage.py migrate

```



</div>
