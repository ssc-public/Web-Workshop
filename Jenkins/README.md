# Jenkins

## فهرست

- [Jenkins](#jenkins)
  - [فهرست](#فهرست)
  - [️نویسندگان](#️نویسندگان)
  - [پیشنیاز](#پیشنیاز)
  - [مقدمه](#مقدمه)
  - [نصب](#نصب)
  - [پروژه](#پروژه)
  - [پلاگین‌ها](#پلاگینها)
  - [نصب پلاگین](#نصب-پلاگین)
  - [پلاگین گیت](#پلاگین-گیت)
  - [اضافه کردن build](#اضافه-کردن-build)
  - [پایپ‌لاین](#پایپلاین)

## ️نویسندگان

- [محمدصادق سلیمی](https://github.com/SMSadegh19)
- [سید مهدی صادق شبیری](https://github.com/SmsS4)
- [علیرضا حسین‌پور](https://github.com/@doctorhoseinpour)

## پیشنیاز

<div dir="rtl">
- آشنایی با Docker
<br>
- آشنایی با ci/cd
</div>

## مقدمه

<div dir="rtl">
جنکینز یکی از ابزارهای متن باز برای پیاده سازی cicd است. 
به طور کلی برای انجام تست‌های و دیپلوی کردن پروژه به طور پیوسته و اتوماتیک است.
<br>

![](assets/8.jpg)

در واقع جنکینز نقش سروری را دارد که 
Continuous Integration 
در آن اتفاق می‌افتد.
<br>

</div>



## نصب

<div dir="rtl">
با استفاده از
<a href="https://www.jenkins.io/download"> سایت رسمی جنکینز </a>
 می‌توانید آن را دانلود کنید.  در این نوشته هدفمان این است که چرخه cicd را برای یک پروژه کوچک طراحی و انجام دهیم. برای کاملا اتوماتیک شدن از داکر برای نصب جنکینز استفاده می‌کنیم.
<br>
با دستور زیر جنکینز را می‌توانید اجرا کنید:

<div dir="ltr">
<code>
docker run --name jenkins -p 8080:8080 jenkins/jenkins
</code>
</div>

اگر به صفحه‌ی localhost:8080 بروید می‌توانید تنظیمات لازم را انجام دهید.  
در ابتدا باید کمی صبر کنید و با صفحه‌ی زیر مواجه می‌شوید:
![](assets/1.jpg)
و اگر در لاگ‌های داکر نگاه کنید به شما پسورد داده شده است:
![](assets/2.png)
بعد از مدتی جنکینز به صفحه زیر می‌رود:
![](assets/3.png)
که باید از پسوردی که در قسمت قبل به دست آوردید استفاده کنید
<br>
همچنین می‌توانید با دستور زیر وارد کانتینر شوید و پسورد را به دست آورید:
<br>
<code>
docker exec -it jenkins bash
<br>
cat /var/jenkins_home/secrets/initialAdminPassword
</code>

![](assets/4.png)
گزینه 
Select plugins to install
رو بزنید.
<br>
و تیک تمام گزینه‌ها را بردارید. (می‌توانید گزینه none را بزنید)
<br>
![](assets/5.png)
در این صفحه باید مشخصات ادمین را وارد کنید.
![](assets/6.png)
در این صفحه آدرس داشبورد را می‌توانید مشخص کنید
![](assets/7.png)
حالا می‌توانید وارد پنل خود شوید.

## پروژه
در ادامه قرار است که 
ci/cd 
را روی پروژه‌ی 
https://github.com/SmsS4/JenkinsProjectExample 
پیاده سازی کنیم.  

## پلاگین‌ها
جنکینز صد‌ها پلاگین دارد که قدرت زیادی به آن می‌دهد و جنکینز بدون پلاگین‌هاش تقریبا به هیچ دردی نمی‌خورد. مثلا اگر بخواهید یک پروژه NodeJS را build کنید باید پلاگین مربوط به آن را نصب کنید. در ادامه می‌خواهیم پلاگین گیت را نصب کنیم

##  نصب پلاگین
پلاگین گیت برای برقراری ارتباط با سرور‌های گیت (مثل گیت‌هاب) است.  
در این قسمت می‌خواهیم پلاگین گیت را به عنوان نمونه نصب کنیم.  
می‌توانید پلاگین‌هایی که در ادامه گفته می‌شود را از همان ابتدا موقع setup کردن اولیه
نصب کنید. اما برای اینکه بفهمید واقعا چه اتفاقی دارد می‌افتد دستی این پلاگین‌ها را نصب می‌کنیم.  

به http://localhost:8080/ بروید.  
سمت چپ صفحه روی گزینه Manage Jenkins کلیک کنید.

![](assets/9.png)

روی گزینه Manage Plugins کلیک کنید

![](assets/10.png)

روی گزینه Available کلیک کند.  
در قسمت سرچ git را جست و جو کنید.  
روی پلاگین git کلیک کنید.  
در آخر روی Install without restart کلیک کنید.  

![](assets/11.png)

## پلاگین گیت
حالا که پلاگین را نصب کردید می‌خواهیم پروژه‌ی گفته شده را به جنکینز اضافه کنیم.  
آدرس پروژه https://github.com/SmsS4/JenkinsProjectExample است که شما باید آن را فورک کنید و از پروژه فورک شده خود استفاده کنید.  
یعنی در طول آموزش باید به جای آدرس بالا از آدرس پروژه خود استفاده کنید.  

برای اضافه کردن پروژه جدید به جنکینز مراحل زیر را باید انجام دهید:

روی New item کلیک کنید  
![](assets/12.png)  
اسم پروژه را ورد کنید  
روی  Freestyle project کلیک کنید.  
روی ok کلیک کنید.  
![](assets/13.png) 
- در قسمت Source Code Management باید git را انتخاب کنید
- آدرس ریپازیتوری را انتخاب کنید
- در قسمت Credentials روی Add کلیک کنید تا یک Credentials جدید اضافه کنید. 
- از قسمت Kind گزینه مورد نظرتان را انتخاب کنید. مثلا اگر SSH Username with private key را انتخاب کنید، در قسمت private key باید ssh key را ادد کنید.  
- اگر نمی‌دانید چطوری ssh key بسازید و به گیت اضافه کنید [این لینک](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) را ببینید.
- دقت کنید که چون داریم از SSH key استفاده می‌کنیم آدرس ریپازیتوری باید به شکل git@github.com:SmsS4/JenkinsProjectExample.git باشد.
- از قسمت Credentials روی jenkins کلیک کنید.
![](assets/14.png) 
![](assets/15.png) 
![](assets/16.png) 
- در نهایت روی Save کلیک کنید.
- پروژه‌ی خود را می‌توانید در http://localhost:8080/job/JenkinsProjectExample/ ببینید.
  
![](assets/17.png) 

## اضافه کردن build
فرض کنید می‌خواهید پروژه‌ی JenkinsProejctExample را در جنکینز build کنید.  
این پروژه در زبان NodeJS نوشته شده است.  

منظور از build این است که بعد از تغییر در Repository می‌خواهیم پروژه ساخته شود، مثلا پیش‌نیاز‌های آن نصب شود. و سپس در ماحل بعدی تست‌های لازم روی آن انجام شود یا Deliver شود و سرور react بالا بیاد.


- پلاگین NodeJS را نصب کنید.
![](assets/30.png)
- به manage jenkins بروید.
- سپس روی Global Tool Configuration کلیک کنید.
![](assets/18.png)
- در قسمت NodeJS روی Add NodeJS کلیک کنید
![](assets/31.png)
- ورژن مورد نظر را انتخاب کنید
- اسم NodeJS مهم نیست چی باشد و صرفا در لاگ‌ها نشان داده می‌شود.
![](assets/38.png)
- روی Save کلیک کنید
![](assets/32.png)

حالا می‌توانید یک پروژه NodeJS را build کنید.  
برای اضافه کردن یک build job مراحل زیر را طی کنید:
- به پروژه خود بروید
![](assets/22.png)
- روی Configure کلیک کنید.
![](assets/30.png)
- در قسمت پایینی تنظیمات مربوط به build را می‌توانید ببینید
![](assets/23.png)
- در قسمت  Build Environment گزینه Provide Node & npm bin/ folder to PATH  را انتخاب کنید و سپس ورژن NodeJS را انتخاب کنید.
![](assets/33.png)
- در قسمت Build گزینه Execute Shell را انتخاب کنید
![](assets/25.png)
- در قسمت Command باید دستور زیر را وارد کنید:
```bash
echo "Start building..."
cd my-react-app
echo "Install dependencies"
npm install
```
دستور npm install وابستگی‌های پروژه را نصب می‌کند و چون پروژه در فولدر my-react-app قرار دارد باید داخل آن فولدر شویم.

![](assets/34.png)
- در نهایت save کنید.
- روی build now کلیک کنید تا build انجام شود.
![](assets/27.png)
- می‌توانید با کلیک کردن روی build ای که در حال انجام است و سپس Console output خروجی console هنگام build کردن را ببینید.
![](assets/35.png)
![](assets/36.png)
![](assets/37.png)

- بعد از مدتی وقتی build تمام شد تیک سبز آن را می‌توانید ببینید
![](assets/39.png)
![](assets/40.png)

- با دکمه سمت راست صفحه dashboard نیز می‌توانید پروژه را build کنید.
![](assets/41.png)


## پایپ‌لاین
حالا که یاد گرفتیم یک پروژه را build کنیم وقتشه که یک پایپ‌لاین به پروژه اضافه کنیم.  

برای این قسمت باید پلاگین Pipeline را نصب کنید.

![](assets/43.png)

پایپلاین تعدادی مرحله پشت هم است که قرار است به ترتیب انجام شوند.

![](assets/42.png)

برای مثال در عکس بالا پایپلاین ما شامل ۴ بخش است.  
ابتدا پروژه ساخته می‌شود.  
سپس deploy می‌شود.  
سپس تست‌های لازم انجام می‌شود.  
در نهایت منتشر می‌شود.  

در جنکینز با استفاده از فایل متنی‌ای که به آن JenkinsFile گفته می‌شود، می‌توان یک پایپ‌لاین تعریف کرد.  

در 
[این](https://github.com/hoto/jenkinsfile-examples)
لینک می‌توانید مثال‌های مختلفی از Jenkinsfile ببینید.

هر پایپ‌لاین از تعدادی مرحله کلی (مثلا تست کردن، build کردن و ...) ساخته می‌شود که به آن‌ها Stage گفته می‌شود.  
هر Stage از تعدادی Step یا مرحله تشکیل شده است.


برای ران کردن تست در NodeJS باید از دستور زیر استفاده کنید:
```
npm test
```
از آنجایی که این دستور از کاربر ورودی می‌گیرد باید آن را غیر فعال کنید. چون قرار است test در جنکینز انجام شود. برای همین باید مقدار CI را برابر True گذاشت
</div>

```
export CI=True
npm test
```

همانطور که قبلا گفته شده بود برای build کردن باید 
```
npm install
```

و برای بالا آوردن سرور react باید از
```
npm start
```
استفاده کیند.

صدا زده شود و React روی پورت ۳۰۰۰ بالا میاد. پس پایپلاین اولیه به شکل زیر می‌شود:
```
pipeline {
    agent any
    tools {nodejs "NodeJS"}
    stages {
        stage('Git') {
            steps {
                git 'https://github.com/SmsS4/JenkinsProjectExample'
            }
        }
        stage('Build') { 
            steps {
                sh '''
                    cd my-react-app
                    echo "Changed directory"
                    npm install
                '''
            }
        }
        stage('Test') {
            steps {
                sh 'export CI=True'
                sh 'cd my-react-app && npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cd my-react-app && npm run-script build'
            }
        }
    }
}
```

همانطور که گفته شد stages تعداد stage است که قرار است انجام شود. در فایل بالا فقط یک Stage وجود دارد که stepهای آن نیز نوشته شده است.

این فایل را باید داخل ریپازیتور گیت خود قرار دهید. بهتر است اسم آن را Jenkinsfile بذارید.

```
stage('Git') {
    steps {
        git 'https://github.com/SmsS4/JenkinsProjectExample'
    }
}
```
در این قسمت گفته می‌شود که از git ریپازیتوری را بگیرد.

```
stage('Build') { 
    steps {
        sh '''
            cd my-react-app
            echo "Changed directory"
            npm install
        '''
    }
}
```
در این قسمت مراحل build انجام می‌شود.

```
stage('Test') {
    steps {
        sh 'export CI=True'
        sh 'cd my-react-app && npm test'
    }
}
```
در این قسمت مراحل Test انجام می‌شود.

```
stage('Deploy') {
    steps {
          sh 'cd my-react-app && npm run-script build'
    }
}
```
در نهایت `npm start` صدا زده می‌شود و پروژه deploy می‌شود.


![](assets/44.png)

در Dashboard روی New Item کلیک کنید.

![](assets/45.png)

قسمت Pipeline را انتخاب کنید.

![](assets/46.png)

اگر می‌خواهید Jenkinsfile در ریپو باشد  
از قسمت Definition گزینه Piepline script from SCM را انتخاب کنید.  
از قسمت SCM گزینه git و آدرس و Credential مورد نظر را بدهید.  
ولی می‌توانید همانجا Jenkinsfile را بنویسید و از git نگیرید.
  
![](assets/47.png)

 مراحل پایپ‌لاین با توجه به Jenkinsfile که در ریپازیتوری قرار دادید اتفاق می‌افتد.

در قسمت Build Configuration اسم فایل جنکیز خود را (که احتمالا همان Jenkinsfile گذاشتید) وارد کنید.

![](assets/48.png)

حالا می‌توانید پایپ‌لاین خود را ببینید

![](assets/50.png)

روی Build Now کلیک کنید تا مراحل پایپ‌لاین انجام شوند.


![](assets/51.png)

همانطور که در عکس پایین می‌بینید تاریخچه پایپ‌لاین در سمت چپ و وسط قرار دارد.
![](assets/52.png)

اگر روی موارد سمت چپ کلیک کنید می‌توانید خروجی کنسول را ببینید.

![](assets/53.png)
![](assets/54.png)
![](assets/55.png)
