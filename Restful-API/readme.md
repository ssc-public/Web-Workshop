<h1 dir = "RTL">
    معرفی Function View
</h1>

<p dir = "RTL">
    Function View یک تابع است که یک HttpRequest (به همراه تعدادی ورودی دلخواه دیگر) را در ورودی می گیرد و یک HttpResponse در خروجی می دهد.
</p>

<h2 dir = "RTL">
    یک Function View نمونه:
</h2>

<p dir = "RTL">
    کد زیر زمان کنونی را در قالب HTML خروجی می دهد.
</p>

``` bash
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
```

<p dir = "RTL">
    Response می تواند HTML یا یک تصویر یا یک متن json یا ... باشد.
</p>

<p dir = "RTL">
    در این نوع View برای محدود کردن نوع HTTP methods باید از decorator زیر استفاده کینم.
</p>

``` bash
from django.views.decorators.http import require_http_methods
@require_http_methods(["GET", "POST"])
def my_view(request):
    # I can assume now that only GET or POST requests make it this far
    # ...
    pass
```

<h1 dir = "RTL">
    معرفی Class-based Views
</h1>

<p dir = "RTL">
    در اینجا دیگر نیازی نیست برای Http methods مختلف از if استفاده کنیم و می   توانیم برای هر کدام یک تابع جداگانه داشته باشیم.
</p>

``` bash
from django.http import HttpResponse

def my_view(request):
    if request.method == 'GET':
        # <view logic>
        return HttpResponse('result')
```

``` bash
from django.http import HttpResponse
from django.views import View

class MyView(View):
    def get(self, request):
        # <view logic>
        return HttpResponse('result')
```

<p dir = "RTL">
    دو کد بالا باهم معادل اند.
</p>

<p dir = "RTL">
    نحوه استفاده از این دو کمی باهم متفاوت است که در زیر این تفاوت را می بینید.
</p>

``` bash
# urls.py
from django.urls import path
from myapp.views import MyView

urlpatterns = [
    path('1/', ClassBasedView.as_view()),
    path('2/', FunctionView),
]
```

<p dir = "RTL">
    استفاده از class based امکانات داشتن کلاس مانند داشتن method ها و attribute ها را به ما می دهد.
</p>

<h1 dir = "RTL">
    معرفی APIView
</h1>

<p dir = "RTL">
    از اینجا به بعد با امکانات REST Framework آشنا خواهیم شد.
</p>

<p dir = "RTL">
    کلاس APIView یک subclass از View خود جنگو است.
</p>

<p dir = "RTL">
    تفاوت ها:
</p>
   
<ul dir = "RTL">
    <li>به جای HttpRequest یک Request که در Rest framework وجود دارد را ورودی می گیرد.</li>
    <li>به جای HttpResponse یک Response که در Rest framework وجود دارد را ورودی می گیرد.</li>
    <li>یکسری attribute خاص دارد که کلی امکانات آماده به ما می دهند.</li>
</ul>

<p dir = "RTL">
    یک نمونه:
</p>

``` bash
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

class ListUsers(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)
]
```

<p dir = "RTL">
    در زیر کلیه policy attributes اشاره شده را می بینید.
</p>

<ul>
    <li>renderer_classes</li>
    <li>parser_classes</li>
    <li>authentication_classes</li>
    <li>throttle_classes</li>
    <li>permission_classes</li>
    <li>content_negotiation_class</li>
</ul>

<h2 dir = "RTL">
    معرفی اجمالی Authentication
</h2>

<p dir = "RTL">
    وظیفه این بخش این است که تشخیص دهد request دریافتی را چه کسی فرستاده است.
</p>

<p dir = "RTL">
    این عمل در اولین مراحل پردازش request  دریافتی انجام می شود و پس از این مرحله request.user حاوی نتیجه این بخش(user ای که این request را فرستاده است) می باشد.
</p>

<p dir = "RTL">
    در صورتی که نتوانیم تشخیص دهیم این request را چه کسی فرستاده است request.user مقدار UNAUTHENTICATED_USER را خواهد گرفت.
</p>

<p dir = "RTL">
    نحوه set کردن Authentication class در APIView:
</p>

``` bash
class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
        }
        return Response(content)
```

<p dir = "RTL">
    می توان با تغیراتی در settings.py یک دیفالت برای Authentication class ها معرفی کرد.
</p>

``` bash
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

<p dir = "RTL">
    شما برای Authentication class می توانید از مقادیر آماده زیر استفاده کنید و یا در صورت لزوم یک Authentication class برای پروژه تان طراحی کنید.
</p>

<ul>
    <li>TokenAuthentication</li>
    <li>SessionAuthentication</li>
    <li>RemoteUserAuthentication</li>
    <li>Custom authentication</li>
</ul>

<p dir = "RTL">
    برای آشنایی کمی درباره مورد اول توضیح خواهیم داد.
</p>

<h3 dir = "RTL">
    معرفی اجمالی TokenAuthentication
</h3>

<p dir = "RTL">
    در این روش از token-based HTTP Authentication استفاده می شود.برای استفاده از  این روش در ابتدا باید'rest_framework.authtoken' را به INSTALLED_APPS اضافه کنید. سپس باید migration انجام دهید.
</p>

<p dir = "RTL">
    از این پس برای register کردن یک user جدید باید token هم برایش بسازید.
</p>

``` bash
from rest_framework.authtoken.models import Token

token = Token.objects.create(user=...)
```

<p dir = "RTL">
    حال باید یک صفحه لاگین داشته باشیم که توکن کاربر هارا به آن ها بدهد:
</p>

``` bash
from rest_framework.authtoken import views

urlpatterns += [
    url(r'^api-token-auth/', views.obtain_auth_token)
]
```

<p dir = "RTL">
    حال اگر username و password کاربر را به url گفته شده POST کنید در جواب json ای حاوی توکن شخصیتان را دریافت می کنید.
</p>

``` bash
{ 'token' : '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' }
```

<p dir = "RTL">
    در سمت کلاینت باید توکن دریافتی هنگام لاگین را در header مربوط به Authorization قرار دهد.
</p>

``` bash
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

<h2 dir = "RTL">
    معرفی اجمالی Permissions
</h2>

<p dir = "RTL">
    این قسمت از نتایج قسمت قبل استفاده می کند و تشخیص می دهند کهuser فرستنده request آیا به درخواست مورد نظرش دسترسی دارد یا خیر
</p>

<p dir = "RTL">
    نحوه set کردن Permission class در APIView:
</p>

``` bash
class ExampleView(APIView):
    permission_classes = [IsAuthenticated,...]
```

<p dir = "RTL">
    در صورتی جواب داده می شود که همه permission class ها برقرار باشند.
</p>


<p dir = "RTL">
    لیستی از permission class های آماده را در زیر می بینید.
</p>

<ul>
    <li>AllowAny</li>
    <li>IsAuthenticated</li>
    <li>IsAdminUser</li>
    <li>IsAuthenticatedOrReadOnly</li>
    <li>DjangoModelPermissions</li>
    <li>DjangoModelPermissionsOrAnonReadOnly</li>
    <li>DjangoObjectPermissions</li>
</ul>

<p dir = "RTL">
    در صورتی که هیچ کدام از موارد بالا برای کار شما کافی نباشند باید کلاس BasePermission را override کرده و دو متود زیر را implement کنید
</p>

``` bash
class CustomerAccessPermission(permissions.BasePermission):
    message = 'Adding customers not allowed.'

    def has_permission(self, request, view):
         ...

    def has_object_permission(self, request, view, obj):
        ...
```

<h3 dir = "RTL">
    معرفی IsAuthenticated
</h3>

<p dir = "RTL">
   اگر user مورد نظر شناسایی شده باشد(مثلا توکن داشته باشد) دسترسی به همه موارد دارد و در غیر این صورت به هیچ چیز دسترسی ندارد
</p>

<h3 dir = "RTL">
    معرفی IsAuthenticatedOrReadOnly
</h3>

<p dir = "RTL">
   اگر user مورد نظر شناسایی شده باشد(مثلا توکن داشته باشد) دسترسی به همه موارد دارد و در غیر این صورت فقط دسترسی های از نوع خواندن دارد.
</p>



<h1 dir = "RTL">
    استفاده از Rest framework در قالب Functional Based Views
</h1>

<p dir = "RTL">
    شما می توانید مثلا از APIView به شیوه زیر نیز استفاده کنید.
</p>

``` bash
@renderer_classes(...)
@parser_classes(...)
@authentication_classes(...)
@throttle_classes(...)
@permission_classes(...)
@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})
]
```