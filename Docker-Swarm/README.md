<div dir="rtl">

# Docker Swarm

<p align=center><img src="./assets/logo.png" /></p>

### فهرست
  - [داکرسوارم چیست](#داکرسوارم-چیست)
  - [مزایا و ویژگی ها](#مزایا-و-ویژگی-ها)
  - [مفاهیم کلیدی](#مفاهیم-کلیدی)
  - [کار با یک کلاستر آزمایشی سوارم](#کار-با-یک-کلاستر-آزمایشی-سوارم)
    - [ایجاد کردن کلاستر سوارم](#ایجاد-کردن-کلاستر-سوارم)    
    - [اضافه کردن نود به کلاستر](#اضافه-کردن-نود-به-کلاستر)    
    - [دیپلوی کردن یک سرویس در کلاستر](#دیپلوی-کردن-یک-سرویس-در-کلاستر)
    - [مدیریت کردن کلاستر و سرویس ها](#مدیریت-کردن-کلاستر-و-سرویس-ها)  
        - [بررسی وضعیت و مشخصات یک سرویس](#بررسی-وضعیت-و-مشخصات-یک-سرویس)
        - [اضافه کردن instance های یک سرویس](#اضافه-کردن-instance-های-یک-سرویس)
        - [پاک کردن یک سرویس از روی کلاستر](#پاک-کردن-یک-سرویس-از-روی-کلاستر)
        - [اعمال rolling update بر روی یک سرویس](#اعمال-rolling-update-بر-روی-یک-سرویس)
  
  
  
## داکرسوارم چیست
[داکر](https://docker.io) یک پلتفرم برای ساختن، اجرا کردن و مدیریت‌ کردن container ها بر روی سرورها یا cloud ها است که مانند Virtual Machine ها امکان ایزوله سازی را برای ما فراهم می‌کند. 

[داکرسوارم](https://docs.docker.com/engine/swarm)، درواقع مجموعه‌ای از ماشین‌هاست (سرور‌های فیزیکی یا Virtual Machine ها) که همگی داکر را اصطلاحا در حالت swarm mode بر روی خود نصب دارند و یک کلاستر واحد را تشکیل می‌دهند. این کلاستر از تعدادی manager (یا مستر‌های کلاستر) و تعدادی worker (یا مینیون‌های کلاستر) تشکیل شده است که وظیفه manager‌ها مدیریت کلاستر و وظیفه workerها اجرای سرویس‌های موردنظرما است. یک نود در کلاستر می‌تواند manger باشد، می‌تواند worker باشد یا اینکه هم manager باشد و هم worker باشد. هنگامی که یک سرویس را در کلاستر سوارم ایجاد می کنیم، وضعیتی که انتظار داریم آن سرویس به آن برسد و آن را حفظ کند را تعریف می‌کنیم. برای مثال ویژگی‌هایی مثل تعداد replica‌ها (مثلا می‌خواهیم ۳ نسخه از سرویس روی ۳ نود مختلف اجرا شود) ، مقدار منابع موردنیاز و در دسترس(مثل CPU و RAM) و پورت‌هایی که می‌خواهیم expose بکند را مشخص می‌کنیم. از اینجا به بعد، managerهای داکرسوارم، سعی می‌کنند همواره سرویس ما در state و و ضعیتی که تعریف کرده ایم باقی بماند؛ مثلا اگر یکی از نود‌های کلاستر از مدار خارج بشود، manager ها یک replica دیگر از سرویس بر روی یک نود دیگر بالا می‌آورند.

یکی از مزایای مهم داکرسوارم نسبت به اجرای کانتینرهای مستقل روی داکر در حالت معمولی این است که می‌توان سرویس را بدون down-time تغییر داد، یعنی بدون نیاز به restart کردن دستی سرویس می‌توان آن را update کرد. داکر تغییر جدید را روی replica‌های سرویس به ترتیب اعمال می‌کند، یعنی پس از update کردن یک replica، به سراغ بعدی می‌رود و درنتیجه کل عملیات بدون نیاز به restart کردن کل کلاستر انجام می‌شود.

زمانی که داکر در حالت swarm mode اجرا می‌شود، هم‌چنان می‌توان کانتینر‌های مستقل را هم روی آن اجرا کرد؛ با این تفاوت که هر نودی می‌تواند کانتینر‌های مستقل را اجرا کند اما فقط manager‌های کلاستر سوارم می‌توانند سرویس‌های سوارم را اجرا کنند. 


## مزایا و ویژگی ها

-   **یکپارچه شدن مدیریت کلاستر سوارم با Docker Engine :** ایجاد و مدیریت کردن کلاستر سوارم و دیپلوی کردن سرویس ها روی آن با همان Docker CLI انجام می شود و هیچ ابزار orchestration اضافه ای برای کار با سوارم نیاز نیست.
-   **طراحی غیرمتمرکز:** تفاوت‌هایی که بین نود‌های مختلف (manger و worker) وجود دارد، در زمان اجرا (runtime) هندل می‌شود و این باعث می‌شود که تمام نود‌های مختلف را از روی یک image واحد بتوان ساخت.
-   **مدل Declarative برای تعریف سرویس‌ها و اپلیکیشن‌ها:** داکر به ما این امکان را می‌دهد که با استفاده از یک روش declarative وضعیت و state مورد نظر سرویس خود را مشخص کنیم.
-   **امکان افزایش یا کاهش تعداد replica ها (scaling):** برای هر سرویس می‌توان در هر زمان تعداد instance های در حال اجرا را افزایش یا کاهش داد؛ در‌نتیجه manager سوارم به‌صورت خودکار instance های جدیدی را اضافه یا برخی از instance های قبلی را حذف می‌کند.
-   **نگه داشتن همیشگی سرویس‌ها در وضعیت تعریف شده:** نود manager به طور پیوسته وضعیت کلاستر را بررسی می‌کند و اگر تفاوتی بین state تعریف شده و state حال حاضر یک سرویس مشاهده کند، تلاش می‌کند تا این تفاوت را از بین ببرد و همواره سرویس را در همان state تعریف شده نگه دارد. برای مثال، اگر تعریف کرده باشیم که از یک سرویس، ۱۰تا replica موجود باشد اما به دلیل down شدن یکی از سرور‌ها، ۲تا از این replica ها از کار افتاده باشند، manager این ۲تا instance را روی نود سالم دیگری بالا خواهد آورد تا state تعریف شده برای این سرویس حفظ شود.
-   **شناسایی سرویس یا Service discovery :** نود‌های manger کلاستر سوارم، به هر سرویس یک نام DNS یکتا می‌دهند و بین containerهای در‌حال اجرای این سرویس در هنگام کوئری لودبالانس می‌کنند.
-   **توزیع بار یا Load balancing:** داکر‌سوارم به ما این امکان را می‌دهد که پورت‌های یک سرویس‌ را expose کرد تا بتوان از یک load balancer برای توزیع بار بین containerهای مختلف استفاده کرد. هم‌چنین، سوارم به ما این قابلیت را می‌دهد که مشخص کنیم چگونه containerهای مختلف را بین نود‌های مختلف توزیع کند.
-   **امنیت بالا:** به صورت پیش‌فرض، هر نود از TLS authentication و encryption استفاده می‌کند تا تمامی ارتباطات بین خودش و نود‌های دیگر را با امنیت حداکثری فراهم کند.
-   **قابلیت آپدیت به ترتیب container‌ها یا Rolling updates:** داکرسوارم به ما این امکان را می‌دهد که بتوانیم container‌های یک سرویس را با فاصله از هم آپدیت کنیم و این دیلی زمانی بین آپدیت یک container تا آپدیت container بعدی هم قابل تنظیم است. درنتیجه بدون نیاز به down-time می‌توانیم تغییرات مختلف را روی سرویس خود اعمال کنیم. هم‌چنین، در صورت بروز مشکل در اعمال کردن تغییرات جدید، امکان برگشتن به ورژن قبلی (roll back) وجود دارد.


## مفاهیم کلیدی

### نودها (Nodes)
<p align=center><img src="./assets/swarm-diagram.png" /></p>
  
  یک نود به معنای یک instance یا نمونه از Docker engine است که در کلاستر swarm حضور دارد. مثلا زمانی که روی یک کامپیوتر Docker نصب می‌کنیم و آن را درحالت swarm mode قرار می‌دهیم، این کامپیوتر یک نود از کلاستر سوارم ما خواهد بود. بر روی یک سرور فیزیکی می‌توان یک یا بیشتر از یک نود داشت اما در محیط production معمولا نود‌های کلاستر سوارم برروی سرور‌های فیزیکی متفاوتی قرار دارند.

برای اینکه یک اپلیکیشن را روی کلاستر سوارم دیپلوی کنیم، تعریف سرویس خود را به یک نود manager می‌دهیم. این سرویس به یک‌سری task شکسته می‌شود و این نود این task ها را به نود‌های worker برای اجرا می‌فرستد.

نود‌های manager کلاستر هم‌چنین وظیفه orchestration و مدیریت کردن کلاستر را برعهده دارند تا سرویس‌های تعریف شده روی کلاستر سوارم همواره در state خواسته شده قرار داشته باشند. نود‌های manger بین خود، یک لیدر انتخاب می‌کنند که وظیفه orchestration برعهده نود لیدر است.

نود‌های worker هم در طرف مقابل task هایی که نود‌های manager به آن‌ها می‌فرستند را دریافت و اجرا می‌کنند. به صورت پیش‌فرض، نود‌های manager به عنوان worker هم عمل می‌کنند؛ یعنی سرویس‌ها روی آن‌ها هم اجرا می‌شوند. اما می‌توان کلاستر را به گونه‌ای کانفیگ کرد که نود‌های manager فقط وظیفه مدیریت‌کردن کلاستر را برعهده داشته باشند و به اصطلاح manager-only باشند. یک agent روی هر نود worker قرار دارد که پیوسته وضعیت task هایی که به آن نود assign شده است را به اطلاع نود‌ manager می‌رساند و بدین‌ترتیب manager می‌تواند state هر worker را مدیریت و نگه‌داری کند.


### سرویس‌ها و taskها
**سرویس(Service)**، تعریف کار‌ها و taskهایی است که باید روی نود‌های manager یا worker اجرا شود و درواقع محل اصلی تعامل کاربر با کلاستر سوارم است. در زمان ایجاد کردن یک سرویس جدید، کاربر مشخص می‌کند که از چه image استفاده شود و چه دستورات و command هایی داخل containerهای ساخته شده اجرا شوند.

در سرویس‌هایی که **replication** دارند، manager بسته به تعداد replicaهای خواسته شده توسط کاربر در تعریف سرویس، تسک‌هایی را به نود‌های worker کلاستر assign می‌کند.

برای سرویس‌های **global**، سوارم بر روی تمام نود‌های کلاستر یک task از سرویس را اجرا می‌کند.

یک **task** ، از یک container داکر و دستورات و commandهایی که باید داخل آن container اجرا شوند تشکیل می‌شود. task ، کوچکترین واحد اتمی scheduling در سوارم محسوب می‌شود. نود‌های manager بسته به اینکه تعداد replica ها چقدر است، تسک‌هایی را به نود‌های worker تخصیص می‌دهند. لحظه ای که یک task به یک نود اختصاص داده شد، دیگر نمی‌تواند به نود دیگری انتقال یابد؛ یا روی نود اجرا می‌شود یا fail می‌شود.


### تعادل‌بار (Load balancing)
سوارم از **ingress load balancing** برای در‌دسترس قراردادن سرویس‌هایی که می‌خواهیم از خارج از کلاستر سوارم دیده شوند استفاده می‌کند. بدین منظور، هم امکان این وجود دارد که manager سوارم به صورت اتوماتیک یک **PublishedPort** در رنج 30000-32767 به سرویس‌ موردنظر ما assign کند و هم امکان این وجود دارد که یک پورت مشخص به آن تخصیص دهیم.

با چنین مکانیزمی، سرویس ما به راحتی از طریق پورت مشخص شده (PublishedPort) بر روی هر یک از نود‌های کلاستر سوارم در دسترس است؛ حتی اگر روی آن نود هیچ container از آن سرویس وجود نداشته باشد. درواقع تمام نود‌های کلاستر توانایی route کردن ترافیک ورودی به یک instance از سرویس ما را دارند.

در حالت swarm به صورت خودکار به هر سرویس یک DNS اختصاص داده می‌شود و manager سوارم براساس نام DNS هر سرویس، ریکوئست‌های درون کلاستر را بین سرویس‌های مختلف پخش می‌کند که در واقع یک load balancing داخلی برای کلاستر محسوب می‌شود.


## کار با یک کلاستر آزمایشی سوارم

در این بخش می‌خواهیم اصول اولیه و لازم برای بالا آوردن و سپس دیپلوی کردن یک سرویس روی داکر‌سوارم را بررسی کنیم. به صورت جزئی‌تر، این بخش از ۴ مرحله زیر تشکیل می‌شود که به ترتیب هرمورد را در ادامه بررسی خواهیم کرد.

  - [ایجاد کردن کلاستر سوارم](#ایجاد-کردن-کلاستر-سوارم)    
  - [اضافه کردن نود به کلاستر](#اضافه-کردن-نود-به-کلاستر)    
  - [دیپلوی کردن یک سرویس در کلاستر](#دیپلوی-کردن-یک-سرویس-در-کلاستر)
  - [مدیریت کردن کلاستر و سرویس ها](#مدیریت-کردن-کلاستر-و-سرویس-ها)  
    
در ادامه آموزش، فرض می‌کنیم که سه host لینوکسی داریم که بر روی همه آن‌ها Docker نصب شده است و در یک شبکه قرار دارند (می‌توانند روی شبکه باهم ارتباط برقرار کنند). این host ها می‌توانند کامپیوتر‌ها یا سرور‌های فیزیکی و یا ماشین‌های مجازی (Virtual Machine) باشند. 

یکی از این ۳ ماشین (host) نود manager کلاستر سوارم (به نام manager1)و ۲ ماشین دیگر نود‌های worker کلاستر سوارم (به نام‌های worker1 و worker2) خواهند بود.

**نکته:** بخش زیادی از آموزش‌ها تنها با استفاده از یک نود و درواقع یک کلاستر سوارم تک‌نوده هم قابل اجراست و نیازی به ۳ ماشین مجزا نیست. ایجاد کردن یک کلاستر سوارم و دیپلوی کردن سرویس در آن با یک نود هم قابل اجراست.

برای نصب داکر روی هاست‌های لینوکسی می‌توانید از [Linux install instructions](https://docs.docker.com/engine/install/)  و برای نصب بر‌روی سیستم‌های مک و ویندوز از [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/) و  [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/) استفاده کنید.

تمام نود‌های کلاستر سوارم نیاز دارند که به manager متصل شوند، بنابراین لازم است که از یک IP ثابت برای manager استفاده کنیم. برای بدست آوردن این IP می‌توان از دستور `ifconfig` در لینوکس یا مک استفاده کرد. در ادامه IP نود manager را `192.168.99.100` درنظر می‌گیریم.

### ایجاد کردن کلاستر سوارم
بعد از آماده سازی hostها، نصب داکر روی تمام آن‌ها و اطمینان از وجود شبکه بین نود‌ها، حال آماده ایجاد کردن کلاستر سوارم هستیم.

1.  برای ایجاد کلاستر سوارم، نیاز داریم تا دستور زیر را بر روی ماشینی که قرار است نقش manager را داشته باشد اجرا کنیم. اگر یک سرور مجزا یا Virtual Machine است می‌توانیم با استفاده از ssh به آن متصل شویم. دستور زیر کلاستر سوارم را ایجاد می‌کند:

<div dir="ltr">

```
docker swarm init --advertise-addr <MANAGER-IP>
```

</div>


**نکته:** در کلاستر تک‌ نود سوارم، دیگر نیازی به دادن `advertise-addr--` نیست.

برای مثال با اجرا کردن دستور زیر خواهیم داشت:

<div dir="ltr">

```
$ docker swarm init --advertise-addr 192.168.99.100
Swarm initialized: current node (dxn1zf6l61qsb1josjja83ngz) is now a manager.

To add a worker to this swarm, run the following command:
    docker swarm join \
    --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \ 
    192.168.99.100:2377
To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

</div>

همانطور که مشاهده می‌کنیم خروجی دستور بالا حاوی دستورات لازم برای اضافه کردن نود‌های manager و worker جدید به کلاستر است. 

2. با اجرای دستور `docker info` می‌توانیم وضعیت فعلی کلاستر سوارم را مشاهده کنیم:

<div dir="ltr">

```
$ docker info
  
Containers: 2
Running: 0
Paused: 0
Stopped: 2
  ...snip...
Swarm: active
  NodeID: dxn1zf6l61qsb1josjja83ngz
  Is Manager: true
  Managers: 1
  Nodes: 1
  ...snip...
```

</div>

3. برای مشاهده اطلاعات نود‌های کلاستر هم می‌توان از دستور `docker node ls` استفاده کرد:

<div dir="ltr">

```
$ docker node ls
  
ID                            HOSTNAME  STATUS  AVAILABILITY  MANAGER  STATUS
dxn1zf6l61qsb1josjja83ngz  *  manager1  Ready   Active        Leader
```

</div>

علامت * بعد از `node ID` نشان می‌دهد که ما در حال حاضر به این نود متصل هستیم.


### اضافه کردن نود به کلاستر
بعد از اینکه در مرحله قبل کلاستر سوارم را ایجاد کردیم، حال بایستی نود‌های worker را به کلاستر اضافه کنیم.

1.  لازم است در ابتدا به ماشینی که می‌خواهیم نود worker را روی آن بالا بیاوریم متصل شویم (می‌توانیم از ssh برای اتصال به آن استفاده کنیم). اسم این ماشین را `worker1` درنظر می‌گیریم.  
2.  در مرحله [ایجاد کلاستر](#ایجاد-کردن-کلاستر-سوارم)، دستور `docker swarm init` دستورات لازم برای اضافه کردن نود‌های manager و worker بعدی را به ما داده بود. دستوری که برای اضافه کردن نود worker بود را روی `worker1` اجرا می‌کنیم:

<div dir="ltr">

```
$ docker swarm join \
  --token  SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
  192.168.99.100:2377
  
This node joined a swarm as a worker.
```

</div>

در صورتی که دستور join شدن نود worker را از مرحله قبلی نداریم، می‌توانیم با اجرا کردن دستور زیر روی یکی از نود‌های منیجر دوباره دستور لازم را بدست آوریم:

<div dir="ltr">

 ```
$ docker swarm join-token worker

To add a worker to this swarm, run the following command:
    docker swarm join \
    --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
    192.168.99.100:2377
```

</div>

3.  برای اضافه کردن worker بعدی کافیست همان دستور قبلی را روی ماشین دیگر هم اجرا کنیم.
4.  حال اگر روی نود manager دستور `docker node ls` را اجرا کنیم می‌بینیم که نود‌های `worker1` و `worker2` به کلاستر سوارم اضافه شده اند:

<div dir="ltr">

 ```
$ docker node ls

ID                           HOSTNAME  STATUS  AVAILABILITY  MANAGER STATUS
03g1y59jwfg7cf99w4lt0f662    worker2   Ready   Active
9j68exjopxe7wfl6yuxml7a7j    worker1   Ready   Active
dxn1zf6l61qsb1josjja83ngz *  manager1  Ready   Active        Leader
```

</div>

ستون `MANAGER` نود‌های manager کلاستر را مشخص می‌کنند. خالی بودن مقدار این ستون‌ها برای `worker1` و `worker2` نشان‌ دهنده worker بودن آنان است.

**نکته:** دستورات مدیریتی کلاستر مثل `docker node ls` فقط بر روی نود‌های manager قابل اجرا هستند.


### دیپلوی کردن یک سرویس در کلاستر


پس از [ایجاد کردن کلاستر](#ایجاد-کردن-کلاستر-سوارم) و [اضافه کردن نود‌های worker به کلاستر](#اضافه-کردن-نود-به-کلاستر) حال نوبت دیپلوی کردن یک سرویس در کلاستر است.

1.  ابتدا لازم است که به manager دسترسی داشته باشیم. بدین منظور به ماشین `manager1` با ssh متصل می‌شویم.    
2.  دستور زیر را اجرا می‌کنیم:

<div dir="ltr">

```
$ docker service create --replicas 1 --name helloworld alpine ping docker.com

9uk4639qpg7npwf3fn2aasksr
```

</div>

-   قسمت `docker service create` یک سرویس جدید ایجاد می‌کند.    
-   قسمت `name--` اسم سرویس را `helloworld` می‌گذارد.
-   قسمت `replicas--` تعداد instance هایی که از سرویس‌مان می‌خواهیم را مشخص می‌کند.
-   قسمت `alpine ping docker.com` سرویس ما را یک لینوکس Alpine تعریف می‌کند (یعنی image ما لینوکس Alpine خواهد بود) که دستور `ping docker.com` در آن اجرا می‌شود. 

3.  با اجرای دستور `docker service ls` می‌توانیم لیستی از سرویس‌های درحال اجرا را مشاهده کنیم:

<div dir="ltr">

```
$ docker service ls

ID            NAME        SCALE  IMAGE   COMMAND
9uk4639qpg7n  helloworld  1/1    alpine  ping docker.com
```

</div>



### مدیریت کردن کلاستر و سرویس ها

#### بررسی وضعیت و مشخصات یک سرویس
حال که در [مرحله قبل ](#دیپلوی-کردن-یک-سرویس-در-کلاستر) یک سرویس را در کلاستر دیپلوی کردیم، می‌توانیم با استفاده از Docker CLI اطلاعات سرویس‌های درحال اجرا در کلاستر سوارم را بررسی کنیم.

1.  ابتدا لازم است که به نود manager برای اجرای دستورات دسترسی باشیم؛ بدین منظور به `manager1` از طریق ssh متصل می‌شویم.
2. برای دیدن مشخصات یک سرویس می‌توان از دستور `<docker service inspect --pretty <SERVICE-ID` استفاده کرد. در مرحله قبل سرویسی با نام `helloworld` ساختیم، با اجرای دستور زیر مشخصات آن را مشاهده می‌کنیم:

 <div dir="ltr">

```
[manager1]$ docker service inspect --pretty helloworld

ID:		9uk4639qpg7npwf3fn2aasksr
Name:		helloworld
Service Mode:	REPLICATED
 Replicas:	1
Placement:
UpdateConfig:
 Parallelism:	1
ContainerSpec:
 Image:		alpine
 Args:	        ping docker.com
Resources:
Endpoint Mode:  vip
```

</div>

**نکته:** اگر دستور فوق را بدون `pretty--` اجرا کنیم، خروجی در فرمت `json` خواهد بود:

<div dir="ltr">

```
[manager1]$ docker service inspect helloworld
[
{
    "ID": "9uk4639qpg7npwf3fn2aasksr",
    "Version": {
        "Index": 418
    },
    "CreatedAt": "2021-12-24T23:45:17.455555812Z",
    "UpdatedAt": "2021-12-24T23:45:17.455555812Z",
    "Spec": {
        "Name": "helloworld",
        "TaskTemplate": {
            "ContainerSpec": {
                "Image": "alpine",
                "Args": [
                    "ping",
                    "docker.com"
                ]
            },
            "Resources": {
                "Limits": {},
                "Reservations": {}
            },
            "RestartPolicy": {
                "Condition": "any",
                "MaxAttempts": 0
            },
            "Placement": {}
        },
        "Mode": {
            "Replicated": {
                "Replicas": 1
            }
        },
        "UpdateConfig": {
            "Parallelism": 1
        },
        "EndpointSpec": {
            "Mode": "vip"
        }
    },
    "Endpoint": {
        "Spec": {}
    }
}
]
```

</div>

3.  با اجرا کردن `<docker service ps <SERVICE-ID` می‌توانیم مشاهده کنیم که سرویس ما روی چه نود‌هایی درحال اجرا است:

<div dir="ltr">

```
[manager1]$ docker service ps helloworld

NAME                                    IMAGE   NODE     DESIRED STATE  CURRENT STATE           ERROR               PORTS
helloworld.1.8p1vev3fq5zm0mi8g0as41w35  alpine  worker2  Running        Running 3 minutes
```

</div>

همانطور که مشخص است یک instance از سرویس `helloworld` بر روی `worker2` درحال اجرا است.

**نکته:** ممکن است که یک سرویس بر روی manager اجرا شود. به صورت پیش‌فرض نود‌های manager مانند worker ها هم عمل می‌کنند و تسک‌ها روی آن‌ها هم می‌توانند اجرا شوند.

4.  برای دیدن مشخصات container مربوطه می‌توانیم روی نودی که task درحال اجرا است دستور `docker ps` را اجرا کنیم. به عنوان مثال، در مرحله قبل دیدیم که container سرویس ما روی `worker2` درحال اجراست. پس به `worker2` از طریق ssh متصل می‌شویم و دستور `docker ps` را اجرا می‌کنیم.

<div dir="ltr">

```
[worker2]$ docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
e609dde94e47        alpine:latest       "ping docker.com"   3 minutes ago       Up 3 minutes                            helloworld.1.8p1vev3fq5zm0mi8g0as41w35
```

</div>

#### اضافه کردن instance های یک سرویس
بعد از [دیپلوی کردن یک سرویس در کلاستر](#دیپلوی-کردن-یک-سرویس-در-کلاستر)، می‌توان با استفاده از Docker CLI تعداد instance های آن را افزایش یا کاهش داد. یه container های یک سرویس که بر روی نود‌های کلاستر درحال اجرا هستند task گفته می‌شود.

1.  با استفاده از دستور زیر می‌توان state یک سرویس را تغییر داد:
    
<div dir="ltr">

```
$ docker service scale <SERVICE-ID>=<NUMBER-OF-TASKS>
```

</div> 

برای مثال دستور زیر تعداد instance های سرویس `helloworld` را به ۵ افزایش می‌دهد:

<div dir="ltr">

```
$ docker service scale helloworld=5

helloworld scaled to 5
```

</div> 

2.  با اجرای دستور `<docker service ps <SERVICE-ID` می‌توانیم مشاهده کنیم که سرویس ما آپدیت شده است:
    
<div dir="ltr">

```
$ docker service ps helloworld

NAME                                    IMAGE   NODE      DESIRED STATE  CURRENT STATE
helloworld.1.8p1vev3fq5zm0mi8g0as41w35  alpine  worker2   Running        Running 7 minutes
helloworld.2.c7a7tcdq5s0uk3qr88mf8xco6  alpine  worker1   Running        Running 24 seconds
helloworld.3.6crl09vdcalvtfehfh69ogfb1  alpine  worker1   Running        Running 24 seconds
helloworld.4.auky6trawmdlcne8ad8phb0f1  alpine  manager1  Running        Running 24 seconds
helloworld.5.ba19kca06l18zujfwxyc5lkyn  alpine  worker2   Running        Running 24 seconds
```

</div> 

مشاهده می‌کنیم که ۴ تسک جدید ایجاد شده شده است تا state سرویس به state که ما می‌خواستیم برسد. هم‌چنین مشاهده می‌کنیم که تسک‌ها بین تمام نود‌های کلاستر پخش شده اند.

3.  با اجرا کردن دستور `docker ps` روی هرکدام از نود‌ها می‌توانیم اطلاعات container های روی آن را مشاهده کنیم. برای مثال با اجرای این دستور روی نود `maanger1` خواهیم داشت:

<div dir="ltr">

```
$ docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
528d68040f95        alpine:latest       "ping docker.com"   About a minute ago   Up About a minute                       helloworld.4.auky6trawmdlcne8ad8phb0f1
```

</div> 


#### پاک کردن یک سرویس از روی کلاستر

1.  برای پاک کردن سرویس لازم است که به نود manager دسترسی داشته باشیم. بدین منظور به `‍manager1` از طریق ssh متصل می‌شویم.
2.  برای پاک کردن یک سرویس از دستور `<docker service rm <SERVICE-ID` استفاده می‌کنیم:

<div dir="ltr">

```
$ docker service rm helloworld

helloworld
```

</div>

3.  برای اطمینان از پاک شدن سرویس دستور `<docker service inspect <SERVICE-ID` را اجرا می‌کنیم:

<div dir="ltr">

```
$ docker service inspect helloworld
[]
Error: no such service: helloworld
```

</div>

  
#### اعمال rolling update بر روی یک سرویس
  
در این مرحله، می‌خواهیم یک سرویس Redis 3.0.6 دیپلوی کنیم و سپس آن را به Redis 3.0.7 با استفاده از مکانیزم rolling updates آپگرید کنیم.
  
1.  ابتدا لازم است که به نود manager دسترسی داشته باشیم. بدین منظور به `‍manager1` از طریق ssh متصل می‌شویم.
2.  حال سرویس Redis 3.0.6 را با استفاده از کامند زیر روی کلاستر دیپلوی می‌کنیم. هم‌چنین به آن کانفیگ ۱۰ ثانیه update delay را می‌دهیم:
  
<div dir="ltr">

```
$ docker service create \
  --replicas 3 \
  --name redis \
  --update-delay 10s \
  redis:3.0.6

0u6a4s31ybk7yw2wyvtikmu50
```

</div>
  
بنابراین تنظیمات مربوط به rolling updates در زمان دیپلوی به سرویس داده می‌شود. 
  
کانفیگ `update-delay--`فاصله زمانی بین آپدیت تسک‌های مختلف یک سرویس است. این فاصله زمانی را می‌توان به صورت ثانیه (s)، دقیقه (m) و یا ساعت (h) بیان کرد. بنابراین `10m30s` یک دیلی ۱۰ دقیقه و ۳۰ ثانیه ای را مشخص می‌کند.   
به صورت پیش‌فرض scheduler در هر لحظه یک task را آپدیت می‌کند. اما می‌توان با استفاده از کانفیگ `update-parallelism--` حداکثر تعداد تسک‌هایی که scheduler به صورت همزمان آپدیت می‌کند را مشخص کرد.   
به صورت پیش‌فرض، وقتی پس از آپدیت یک تسک state آن به `RUNNING` می‌رسد، scheduler تسک بعدی را آپدیت می‌کند تا زمانی که تمام تسک‌ها آپدیت شوند. اما اگر در طول آپدیت یک تسک، آن تسک `FAILED` شود، scheduler آپدیت را متوقف می‌کند. این رفتار scheduler را می‌توان با کانفیگ `update-failure-action--` برای کامند‌های `docker service create` یا `docker service update` تنظیم کرد.   
  
3.  وضعیت سرویس redis دیپلوی شده بدین صورت است:
  
<div dir="ltr">

```
$ docker service inspect --pretty redis

ID:             0u6a4s31ybk7yw2wyvtikmu50
Name:           redis
Service Mode:   Replicated
 Replicas:      3
Placement:
 Strategy:	    Spread
UpdateConfig:
 Parallelism:   1
 Delay:         10s
ContainerSpec:
 Image:         redis:3.0.6
Resources:
Endpoint Mode:  vip
```

</div>
  
4.  حال می‌توانیم با استفاده از کامند زیر سرویس خود را آپدیت کنیم:
  
<div dir="ltr">

```
$ docker service update --image redis:3.0.7 redis

redis
```

</div>  

فرآیند آپدیت کردن یک سرویس بدین شکل است:
  - متوقف کردن اجرای اولین تسک
  - schedule کردن آپدیت تسک متوقف شده
  - اجرا کردن container تسک آپدیت شده
  - اگر تسک به `RUNNING` رسید، پس از مدت delay مشخص شده، سراغ تسک بعدی می‌رود
  - اگر هرجایی در طول آپدیت یک تسک `FAILED` شد، فرآیند آپدیت متوقف می‌شود
  
5.  با استفاده از کامند `docker service inspect --pretty redis` می‌توان مشاهده کرد که image سرویس آپدیت شده است:
  
<div dir="ltr">
  
```
$ docker service inspect --pretty redis

ID:             0u6a4s31ybk7yw2wyvtikmu50
Name:           redis
Service Mode:   Replicated
 Replicas:      3
Placement:
 Strategy:	    Spread
UpdateConfig:
 Parallelism:   1
 Delay:         10s
ContainerSpec:
 Image:         redis:3.0.7
Resources:
Endpoint Mode:  vip
```

</div>
  
و اگر آپدیت متوقف شده باشد خروجی دستور بالا بدین شکل خواهد بود:
  
  
<div dir="ltr">
  
```
$ docker service inspect --pretty redis

ID:             0u6a4s31ybk7yw2wyvtikmu50
Name:           redis
...snip...
Update status:
 State:      paused
 Started:    11 seconds ago
 Message:    update paused due to failure or early termination of task 9p7ith557h8ndf0ui9s0q951b
...snip...
```

</div>
  
6.  برای مشاهده کردن وضعیت rolling update هم می‌توان از کامند `<docker service ps <SERVICE-ID` استفاده کرد:
    
<div dir="ltr">
  
```
$ docker service ps redis

NAME                                   IMAGE        NODE       DESIRED STATE  CURRENT STATE            ERROR
redis.1.dos1zffgeofhagnve8w864fco      redis:3.0.7  worker1    Running        Running 37 seconds
 \_ redis.1.88rdo6pa52ki8oqx6dogf04fh  redis:3.0.6  worker2    Shutdown       Shutdown 56 seconds ago
redis.2.9l3i4j85517skba5o7tn5m8g0      redis:3.0.7  worker2    Running        Running About a minute
 \_ redis.2.66k185wilg8ele7ntu8f6nj6i  redis:3.0.6  worker1    Shutdown       Shutdown 2 minutes ago
redis.3.egiuiqpzrdbxks3wxgn8qib1g      redis:3.0.7  worker1    Running        Running 48 seconds
 \_ redis.3.ctzktfddb2tepkr45qcmqln04  redis:3.0.6  mmanager1  Shutdown       Shutdown 2 minutes ago
```

</div>

قبل از اینکه Swarm تمام تسک‌ها را آپدیت کند، می‌توان مشاهده کرد که تعدادی از آنها redis:3.0.6 و تعدادی redis:3.0.7 را اجرا می‌کنند. خروجی بالا بلافاصله پس از آپدیت شدن تمام تسک‌هاست. 

</div>
