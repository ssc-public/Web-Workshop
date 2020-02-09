<div dir="rtl">

#Introduction   

تعریف :  `RESTful API‍‍` واسطی میان اپلیکیشن و برنامه `Application Program Interface`است که با استفاده از ریکوست های `HTTP` میتواند داده ای ایجاد کند ‌‍‍`POST` یا ویرایش کند `PUT` یا حذف کند `DELETE` یا ان را بخواند `GET`

ابزار پیشنهادی ما : `Django REST framework` :یک ابزار قدرتمند و انعطاف پذیر برای ساختن API های وب
  
  
#Requirements


<div dir="ltr">
Python (3.5, 3.6, 3.7, 3.8)

Django (1.11, 2.0, 2.1, 2.2, 3.0)
</div>


#Installation 


با استفاده از `pip`:
<div dir="ltr">

    pip install djangorestframework

</div>
یا با clone از git :
<div dir="ltr">

    git clone https://github.com/encode/django-rest-framework

</div>

سپس برای تکمیل فرایند به settings.py رفته و `'rest_framework'` را به  INSTALLED_APPS اضافه کنید.

<div dir="ltr">

    INSTALLED_APPS = [
    ...
    'rest_framework',
    ]

</div>
<hr/>

اکنون میخواهیم به بررسی عناصر مهم بپردازیم:



#Requests


کلاس `Request`  در Rest Framework از کلاس HttpRequest های استاندارد extend میکند.

موارد بسیار کاربردی:

<div dir="ltr">


    request.data 
</div>
این عبارت محتوای تجزیه شده (parsed) ریکوست را برمیگرداند.
 
<div dir="ltr">

     
    state={
         profile:{
                ...
                city:'Tehran'
         }
    }
    .
    .
    .
    fetch(`http://127.0.0.1:8000/api/profiles/${this.props.username}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.profile)
        }).then(response => response.json())
            .catch(error => console.log(error))

</div> 
 حال اگر در back end خود و در جایی که api ها را هندل میکنیم request.data['city'] را فراخوانی کنیم به سادگی میتوان به ان دست یافت .
 
<div dir="ltr">


    request.user 
</div> 

این عبارت یک instance ای را از `django.contrib.auth.models.User` برمیگرداند.

که در مواقع مورد نیاز میتوان از ان برای فهمیدن اینکه چه کسی ریکوستی زده استفاده کرد.


<div dir="ltr">


    request.method 
</div> 

که مشخص میکند method ریکوست  ..put | post |delete |etc  است 

در قسمت های بعد مثال هایی از این کاربرد ها را خواهیم دید.



#Responses


<div dir="ltr">


    from rest_framework.response import Response
    Response(data, status=None, template_name=None, headers=None, content_type=None)
</div>

برای ساختن ریسپانس از این کلاس استفاده میشود که باید به صورت بالا آن را ایمپورت کرد.

چگونه ریسپانس بسازیم ؟
<div dir="ltr">


    Response(data, status=None, template_name=None, headers=None, content_type=None)
    example:
    return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)
</div>

همانطور که در خط اول مشخص است برای ساختن instance ای از کلاس Response میتوان یک سری ورودی ها به ان داد . از جمله دیتا و status و هدر ها و  content-type و ... که از میان این ارگومان ها ما پرکاربرد ترین آن ها یعنی دیتا و status را بررسی میکنیم.

دیتا یا میتواند به صورت string باشد یا میتواند به صورت دیتای سریالایز شده باشد .
یعنی همانطور که در مثال بالا دیده میشود instance ای از مدل x را باید به عنوان ورودی Xserializer داد
در ادامه بیشتر با serializer ها آشنا خواهیم شد.

و  اما status ها :

لازم است بدانید که status ها انواع مختلفی دارند ه به تناسب موضوع میتوان از آن ها استفاده کرد.
برای مثال اگر کاربر درخواستی برای user ای که در سیستم وجود ندارد زده بود میتوان از status.HTTP_404_NOT_FOUND استفاده کرد . یا مثلا اگر درخواست برای ایجاد یک ابجکتی بود از status.HTTP_201_CREATED میتوان استفاده کرد .
در زیر تنوعی از پرکاربرد ترین status ها را مشاهده میکنید که بر حسب نیازتان میتوانید از مناسب ترین آن ها استفاده کنید 


<div dir="ltr">


    status.HTTP_200_OK
    status.HTTP_400_BAD_REQUEST
    status.HTTP_502_BAD_GATEWAY
    status.HTTP_401_UNAUTHORIZED
    status.HTTP_403_FORBIDDEN
    ...
</div>
 
 
 
#Serializer


سوال : serializer چیست ؟

سریالایزر ها به داده های پیچیده مانند queryset ها و instance های مدل ها اجازه میدهند که به سادگی به json یا xml تبدیل بشوند.

همچنین serializer ها امکان deserialize کردن را نیز فراهم میکنند. یعنی میتوان به کمک ان ها میتوان دیتای parse شده را به داده های پیچیده تر ذکر شده در خط قبل تبدیل کرد.

در یک کلام serializer ها به ما اجازه ی کنترل کردن حرفه ای خروجی ریسپانس ها را میدهند.

معمولا به ازای هر modelclass در models.py یک serializer نیز تعریف میشود.

در زیر نمونه ای ازمدل و serializer آن دیده میشود:

 <div dir="ltr">
 
       class Channel(models.Model):
            channelId = models.CharField(max_length=16, blank=False, null=False, unique=True, primary_key=True)
            owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name='owningChannels')
            followers = models.ManyToManyField(User, blank=True, related_name='followings')
            description = models.TextField(default='Description')

            def __str__(self):
                return self.channelId
 
 </div>
 
  <div dir="ltr">
  
       from rest_framework import serializers
        
       class ChannelSerializer(serializers.ModelSerializer):
            owner = UserSerializer(many=False)
            followers = UserSerializer(many=True)

            class Meta:
                model = Channel
                fields = ('channelId', 'owner', 'description', 'followers')
 
 </div>
 
حال به تحلیل آن میپردازیم:

مدل Channel دارای ۴ فیلد است که هر کدام ویژگی خاص دارند که جلوتر به شرح آن ها میپردازیم.

 همانطور که مشاهده میکنید برای ساختن serializer ابتدا باید ان را از ‍‍`rest_framework` ایمپورت کرد.
 
 دقت کنید که باید در subclass Meta  فیلد هایی را که میخواهیم بعد از سریالایز کردن داده در ان موجود باشند را در یک تاپل مشخص کنیم. یعنی چه؟
 
 همانطور که در بالا گفتیم به هنگام ریسپانس دادن میتوان از دیتای سریالایز شده استفاده کرد .
 و شما میتوانید انتخاب کنید کدام فیلد ها رد ریسپانس حضور داشته باشند مثلا در مثال بالا اگر 'owner' را در fields قرار نمیدادیم در ریسپانس خروجی اثری از ان دیده نمیشد .
 این بسیار مفید و کاربردی است زیرا در بعضی جاها ما نیاز داریم بعضی از اطلاعات کاربران را در ریسپانس هایمان نفرستیم.
 
دقت کنید که در subclass meta  باید مشخص کنید که این سریالایزر مربوط به کدام مدل است.

اخرین نکته ی باقی مانده مربوط به دو خط قبل از تعریف subclass meta است .

در بخش بعدی انواع فیلد ها را توضیح خواهیم داد و در انجا فلسفه ی قرار دادن آن UserSerializer ها را بیان خواهیم کرد.
 
 ‍
 
#Serializer fields


هر فیلد در serializer نه تنها مسوول validate داده است بلکه داده را به یک فرمت ثابتی نیز normalize میکند.
همچنین انچه که بدیهی ست این است که این فیلد ها برای تبدیل کردن primitive value ها به dataType های داخلی استفاده میشوند.

هر فیلد تعدادی آرگومان را به عنوان ورودی می گیرد.
در زیر به شرح برخی از این آرگومان ها میپردازیم:


  <div dir="ltr">
  
       required: آیا این فیلد باید حتما مقدار بگیرد یا نه
       default: در صورت اینکه مقداری به صورت مشخص برای این فیلد تعیین نشود مقدار دیفالت را داراست
       allow_null: میتواند نال باشد یا نه
       write_only: سطح دسترسی را تعیین میکند
       max_length: حداکثر میتواند چند کاراکتر داشته باشد
       related_name: در قسمت بعد بیشتر توضیح داده میشود
       on_delete: به هنگام پاک کردن هر چیزی مربوط به این فیلد از بقیه مدل ها نیز باید حزف شود
       ...
 
 </div>
 
فیلد ها نیز انواع گوناگونی دارند که به اختصار چندی از آن ها را در ادامه بیان میکنیم:


  <div dir="ltr">
  
       Numeric fields:
            IntegerField
       String fields:
            CharField
            EmailField
       Date and time fields:
            DateField
       File upload fields:
            ImageField
            FileField
       Choice selection fields:
            ChoiceField
       ...
            ..
        
 
 </div>
 

#Serializer relations


میدانیم که مدل ها سه نوع رابطه میتوانند با هم داشته باشند که برای یادآوری از هر کدام مثالی ذکر میکنیم:


 <div dir="ltr">
  
  
      class BookId(models.Model):
            id = models.CharField(max_length=10, blank=True)


      class Book(models.Model):
             title = models.CharField(blank=False, unique=True, max_length=36)
             description = models.TextField(max_length=256, blank=True)
             no = models.OneToOneField(BookId, null=True, blank=True, on_delete=models.CASCADE)


      class Hero(models.Model):
             name = models.CharField(max_length=30)
             book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='hero')


      class Publisher(models.Model):
            name = models.CharField(max_length=36)
            books = models.ManyToManyField(Book, related_name='publisher')
        
 
 </div>


در مدل های بالا بین publisher و book یه رابطه ی manyToMany هست به این معنی که ممکنه یه کتاب چند ناشر و یه ناشر چن کتاب داشته باشه .

همچنین بین Hero و book یه رابطه ی oneToMany هست یعنی ممکنه به ازای یه کتاب چن تا قهرمان داشته باشیم ولی یه قهرمان در چنتا کناب نیس.

و همچنین یه رابطه ی oneToOne داریم بین Book و BookId که نشون میده هر کتاب دارای یه ایدی منحصر به فرد هست.

تا اینجا دیدیم که روابط مختلفی میتونه بن مدل هامون باشه .

در یه رابطه ی  manyToMany مثلا در مثال بالا بین ناشر و کتاب مشکلی ایجاد میشه که برای حل اون راه حلی ارایه میدیم:

وقتی میخوایم کتاب های یه instance از ناشر رو پیدا کنیم به طور دیفالت یه آرایه از آیدی کتاب ها در serializer گذاشته میشه ولی اگه بخوایم خود ابجکت کتاب رو قرار بده از خط زیر استفاده میکنیم همون کاری که در قسمت اول serializer ها اون بالا انجام دادیم:

<div dir="ltr">

    book = BookSerializer(many=True)
    
    book = BookSerializer(many=False) // if it was oneToOneField
</div>

و اینطوری به سادگی میتونیم بهشون دسترسی داشته باشیم.

مطلب آخر در این قسمت تحلیلی در باره ی related_name هست .


<div dir="ltr">

       class Publisher(models.Model):
            name = models.CharField(max_length=36)
            books = models.ManyToManyField(Book, related_name='publishers')
</div>

در داده ی سریالایز شده از instance ای از کلاس Publisher میتوان با .books به لیست کتاب های ان دست یافت ولی چطور میتوان از ان کتاب به لیست ناشر های آن رسید؟ 

از طریق اسمی که در related_name برای ان انتخاب کردیم 
یعنی :


<div dir="ltr">

    book.publishers

</div>
    
</div>