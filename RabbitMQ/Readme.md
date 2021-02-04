<div dir='rtl' align='justify'>
<h2 align="center">RabbitMQ</h2>

  # Work Queues
  در قسمت قبل برنامه‌هایی نوشتیم تا پیام‌ها را به یک صف با نام مشخص ارسال کنیم و در برنامه‌ی دیگر این پیام‌ها را از این صف دریافت کنیم. در این قسمت میخواهیم یک
  Work Queue
  ایجاد کنیم که از آن برای پخش کردن کار ها و 
  request
  های ‌زمان‌بر بین چند 
  worker
  استفاده می‌شود.
  ایده اصلی پشت 
  Work Queues
  که با نام 
  Task Queues
  هم شناخته می‌شوند این است که از انجام بلافاصله‌ی یک کار زمان‌بر که حجم زیادی از 
  resource 
  های ما را مورداستفاده قرار می‌دهد و زمان زیادی باید منتظر بمانیم تا کامل شود خودداری کنید . در عوض ما برنامه ریزی می کنیم تا بعداً انجام شود. ما یک 
  task
  را به عنوان 
  message
  محصور می کنیم و آن را به یک صف می فرستیم. یک 
  worker process
  که در پس زمینه اجرا می شود 
  task
  ها را برمی‌دارد و در نهایت کار را انجام می دهد. هنگامی که تعداد زیادی 
  worker
  را اجرا می‌کنید؛ 
  task
  ها بین آن‌ها تقسیم می‌شود.

  این مفهوم به ویژه در برنامه های وب بسیار مفید است که انجام یک 
  task
  پیچیده در طی یک
  HTTP request
  کوتاه غیرممکن است.

  ## Preparation
  در قسمت قبلی پیامی حاوی
  "Hello World!"
  را ارسال کردیم. اکنون 
  string
  هایی را ارسال می‌کنیم که نشان‌دهنده‌ی کارهای پیچیده هستند. از آن‌جا که 
  task
  پیچیده‌ی واقعی مانند 
  resize
  کردن تصاویر یا 
  render 
  کردن یک فایل
  pdf
  نداریم، بنابراین با استفاده از 
  `setTimeout`
  آن را به‌صورت غیرواقعی ایجاد می‌کنیم و فقط وانمود کنیم که مشغول کار هستیم. ما تعداد نقاط داخل
  string
  را به عنوان پیچیدگی آن در نظر خواهیم گرفت. هر نقطه یک ثانیه کار را نشان می دهد. به عنوان مثال ، یک
  task
  با محتوای 
  `Heloo...`
  سه ثانیه طول خواهد کشید.

  ما برای ارسال پیام های قراردادی از 
  command line
  کد 
  send.js
  را از مثال قبلی، کمی اصلاح خواهیم کرد. این برنامه
  task 
  ها را به
  work queue
  ما اضافه می کند ، بنابراین بگذارید نام آن را 
  `new_task.js`
  بگذاریم :
  <div dir='ltr' align='justify'>

  ```javascript
  var queue = 'task_queue';
  var msg = process.argv.slice(2).join(' ') || "Hello World!";

  channel.assertQueue(queue, {
    durable: true
  });
  channel.sendToQueue(queue, Buffer.from(msg), {
    persistent: true
  });
  console.log(" [x] Sent '%s'", msg);
  ```
  </div>

  همچنین فایل 
  receive.js
  که در قسمت قبل استفاده کردیم نیاز به تغییراتی دارد. لازم است برای هر نقطه از  پیام، یک ثانیه صبر کنیم. این برنامه
  task
  ها را از صف برمیدارد و انجام می‌دهد پس آن را
  `worker.js`
  مینامیم: 
  <div dir='ltr' align='justify'>

  ```javascript
  var queue = 'task_queue';

  // This makes sure the queue is declared before attempting to consume from it
  channel.assertQueue(queue, {
    durable: true
  });

  channel.consume(queue, function(msg) {
    var secs = msg.content.toString().split('.').length - 1;

    console.log(" [x] Received %s", msg.content.toString());
    setTimeout(function() {
      console.log(" [x] Done");
    }, secs * 1000);
  }, {
    // automatic acknowledgment mode,
    // see https://www.rabbitmq.com/confirms.html for details
    noAck: true
  });
  ```
  </div>
  توجه داشته باشید که 
  fake task
  ما زمان اجرا را شبیه سازی می کند.

  برنامه‌ها را مانند قسمت قبل اجرا می‌کنیم:
  <div dir='ltr' align='justify'>

  ```bash
  # shell 1
  ./worker.js
  ```

  </div>
  <div dir='ltr' align='justify'>

  ```bash
  # shell 2
  ./new_task.js
  ```

  </div>

  ## Round-robin dispatching
  یکی از مزایای استفاده از 
  Task Queue
  توانایی موازی کاری آسان است. اگر تعداد زیادی کار همزمان داریم، می توانیم
  worker
  های بیشتری اضافه کنیم و از این طریق به راحتی کار های در مقیاس بالا را انجام دهیم.

  ابتدا سعی کنیم دو اسکریپت 
  `working.js`
    را همزمان اجرا کنیم. هر دو از صف پیام می گیرند ، اما دقیقاً چگونه؟ بیایید ببنیم.

  شما به سه کنسول باز نیاز دارید. دو تا از آن‌ها 
  `working.js`
  را اجرا می کنند. این کنسول ها دو مشتری ما خواهند بود
  -C1 و C2.
  <div dir='ltr' align='justify'>

  ```bash
  # shell 1
  ./worker.js
  # => [*] Waiting for messages. To exit press CTRL+C
  ```

  </div>
  <div dir='ltr' align='justify'>

  ```bash
  # shell 2
  ./worker.js
  # => [*] Waiting for messages. To exit press CTRL+C
  ```

  </div>
  در مورد سوم ، 
  task 
  های جدید ایجاد خواهیم کرد. پس از راه‌اندازی مصرف کنندگان ، می توانید چند پیام منتشر کنید:
  <div dir='ltr' align='justify'>

  ```bash
  # shell 3
  ./new_task.js First message.
  ./new_task.js Second message..
  ./new_task.js Third message...
  ./new_task.js Fourth message....
  ./new_task.js Fifth message.....
  ```

  </div>
  بیایید ببینیم چه چیزی به
  worker
  های ما تحویل داده می شود:
  <div dir='ltr' align='justify'>

  ```bash
  # shell 1
  ./worker.js
  # => [*] Waiting for messages. To exit press CTRL+C
  # => [x] Received 'First message.'
  # => [x] Received 'Third message...'
  # => [x] Received 'Fifth message.....'
  ```

  </div>

  <div dir='ltr' align='justify'>

  ```bash
  # shell 2
  ./worker.js
  # => [*] Waiting for messages. To exit press CTRL+C
  # => [x] Received 'Second message..'
  # => [x] Received 'Fourth message....'
  ```

  </div>

  به طور پیش فرض ، 
  RabbitMQ
  هر پیام را به ترتیب به 
  consumer
  بعدی ارسال می کند. به طور متوسط به هر 
  consumer
  به تعداد یکسان پیام می رسد. به این روش توزیع پیام ، 
  round-robin
  گفته می شود. این کار را با تعداد سه یا بیشتر 
  worker
  امتحان کنید.

  ## Message acknowledgment
  انجام یک 
  task
  ممکن است چند ثانیه طول بکشد. ممکن است از خود بپرسید که اگر یکی از 
  consumer
  کار طولانی را شروع کند و تنها با انجام قسمتی از آن بمیرد ، چه اتفاقی می افتد. با کد فعلی ما، یکبار که
  RabbitMQ
  پیامی را به 
  consumer
  می رساند ، بلافاصله آن را برای حذف علامت گذاری می کند. در این صورت ، اگر شما 
  worker
  ی را بکشید، پیامی را که فقط در حال پردازش بود از دست خواهید داد. همچنین تمام پیام هایی را که برای این 
  worker
  خاص ارسال شده‌اند اما هنوز مورد استفاده قرار نگرفته‌اند ، از دست خواهید داد.

  اما ما نمی خواهیم هیچ 
  task
  ی را از دست بدهیم. اگر
  worker
  ی بمیرد ، دوست داریم این کار به 
  worker
  دیگری تحویل داده شود.

  به منظور اطمینان از اینکه 
  message
  هرگز گم نشده است ، 
  RabbitMQ
  از تأیید پیام یا همان
  [message acknowledgments](https://www.rabbitmq.com/confirms.html)
  پشتیبانی می کند. یک 
  ack
  توسط مصرف کننده ارسال می شود تا به 
  RabbitMQ
  بگوید که پیام خاصی دریافت و پردازش شده و 
  RabbitMQ
  در حذف آن آزاد است.
      
  اگر 
  consumer
  بدون ارسال 
  ack
  بمیرد (کانالش بسته باشد ، اتصال بسته باشد یا اتصال 
  TCP
  قطع شده باشد) ، 
  RabbitMQ
  می فهمد که یک پیام به طور کامل پردازش نشده است و آن را دوباره در صف قرار می دهد. اگر همزمان 
  consumer
  های دیگری بصورت آنلاین وجود داشته باشند، سریعاً آن را به یک 
  consumer
  دیگر تحویل می دهد. از این طریق می توانید مطمئن باشید که هیچ پیامی از بین نمی رود ، حتی اگر 
  worker
  ها گاهی اوقات بمیرند.

  هیچ
  message timeout
  ی وجود ندارد.
  RabbitMQ
  با از کار افتادن 
  consumer
  پیام را دوباره ارسال می کند.


  تأییدیه های دستی یا همان
  Manual consumer acknowledgments
  در مثال های قبلی خاموش بوده است. وقت آن رسیده است که آن را با استفاده از گزینه
  `{noAck: false}`
  روشن کرده و پس از انجام هر 
  task
  یک
  acknowledgment
  مناسب را از سمت 
  worker
  ارسال کنیم.
  <div dir='ltr' align='justify'>

  ```javascript
  channel.consume(queue, function(msg) {
    var secs = msg.content.toString().split('.').length - 1;

    console.log(" [x] Received %s", msg.content.toString());
    setTimeout(function() {
      console.log(" [x] Done");
      channel.ack(msg);
    }, secs * 1000);
    }, {
      // manual acknowledgment mode,
      // see https://www.rabbitmq.com/confirms.html for details
      noAck: false
    });
  ```
  </div>

  با استفاده از این کد می توان اطمینان داشت که حتی اگر 
  worker
  ی را با استفاده از
  ‍ ‍`CTRL + C`
  در حین پردازش پیام بکشید ، چیزی از دست نخواهد رفت. به زودی پس از فوت کارگر ، کلیه پیام های تأیید نشده مجدداً ارسال می شوند.

  Acknowledgement
  باید در همان کانالی که پیام ارسال شده است تحویل داده شود. تلاش برای 
  acknowledge
  با استفاده از یک کانال متفاوت منجر به یک 
  channel-level protocol exception
  می شود. برای کسب اطلاعات بیشتر به [راهنمای سند در مورد 
  confirmations](https://www.rabbitmq.com/confirms.html)
  مراجعه کنید.

  ## Message durability
  ما یاد گرفته ایم که چگونه اطمینان حاصل کنیم حتی در صورت مرگ 
  consumer
  ، 
  task
  از دست نمی رود. اما اگر سرور 
  RabbitMQ
  متوقف شود ، 
  task
  های ما همچنان از بین می روند.

  وقتی 
  RabbitMQ
  کرش کند یا خراب شود ، صف ها و پیام ها را فراموش می کند ، مگر اینکه به او بگویید این کار را انجام ندهد. برای اطمینان از گم نشدن پیام ها دو مورد لازم است: ما باید صف و پیام ها را
  *durable*
  کنیم.

  ابتدا باید اطمینان حاصل کنیم که با راه اندازی مجدد 
  node  
  RabbitMQ
  صف ها از بین تخواهند رفت. برای انجام این کار ، باید آن را
  *durable*
  اعلام کنیم:
  <div dir='ltr' align='justify'>

  ```javascript
  channel.assertQueue('hello', {durable: true});
  ```
  </div>

  اگرچه این دستور به خودی خود صحیح است، اما در تنظیمات فعلی ما کارایی نخواهد داشت. این به این دلیل است که ما در حال حاضر یک صف به نام 
  ‍‍`hello`
  تعریف کردیم که 
  *durable*
  نیست. 
  RabbitMQ
  به شما امکان تعریف مجدد یک صف موجود با پارامترهای مختلف را نمی دهد و به هر برنامه ای که بخواهد این کار را انجام دهد خطا برمی گرداند. اما یک راه حل سریع وجود دارد - بیایید یک صف با نام متفاوت را تعریف کنیم، به عنوان مثال 
  `task_queue`:
  <div dir='ltr' align='justify'>

  ```javascript
  channel.assertQueue('task_queue', {durable: true});
  ```
  </div>

  این گزینه
  `durable`
  باید هم در کد 
  producer
  و هم در 
  consumer
  اعمال شود.

  در این مرحله مطمئن هستیم که صف 
  `task_queue`
  حتی در صورت شروع مجدد 
  RabbitMQ
  از بین نخواهد رفت. اکنون باید پیام های خود را به عنوان 
  *durable*
  علامت گذاری کنیم - با استفاده از گزینه 
  `persistent`
  در
  ‍`Channel.sendToQueue`:
  <div dir='ltr' align='justify'>

  ```javascript
  channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
  ```
  </div>
    

  ## Fair dispatch
  شاید متوجه شده باشید که 
  dispatching
  هنوز دقیقاً همانطور که می خواهیم کار نمی کند. به عنوان مثال در شرایطی که دو 
  worker
  کار می‌کنند ، وقتی همه 
  message
  های فرد سنگین و زمان‌بر و پیام های زوج پیام های سبک هستند ، یک کارگر دائماً مشغول و کارگر دیگر تقریبا در همه‌ی زمان‌ها بدون کار خواهد بود.
  RabbitMQ
  چیزی در این مورد نمی داند و همچنان پیام ها را به طور مساوی ارسال می کند.

  این اتفاق می افتد زیرا 
  RabbitMQ
  وقتی پیامی وارد صف می شود فقط پیام را ارسال می کند. تعداد پیامهای تأیید نشده برای یک مصرف کننده را بررسی نمی کند. فقط کورکورانه پیام 
  n
  ام را به
  n
  امین 
  consumer
  ارسال می کند.
  ![enter image description here](https://www.rabbitmq.com/img/tutorials/prefetch-count.png)
  برای مقابله با این مشکل می توانیم از تابع 
  `prefetch`
  با مقدار`1` استفاده کنیم. این به 
  RabbitMQ
  می گوید که همزمان بیش از یک پیام به یک کارگر ندهد. یا به عبارت دیگر، پیام جدیدی را برای کارگر ارسال نکند تا اینکه پیام قبلی را پردازش و تأیید کند. در عوض ، آن را به کارگر بعدی که هنوز مشغول نیست ارسال می کند.
    
  <div  dir='ltr'  align='justify'>

  ```javascript
  channel.prefetch(1);
  ```

  </div>

  ## Putting it all together
  کد نهایی
  `new_task.js`
  به صورت زیر می‌شود.
  <div  dir='ltr'  align='justify'>

  ```javascript
  #!/usr/bin/env node

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'task_queue';
      var msg = process.argv.slice(2).join(' ') || "Hello World!";

      channel.assertQueue(queue, {
        durable: true
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });
      console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function() {
      connection.close();
      process.exit(0)
    }, 500);
  });
  ```

  </div>

  و کد نهایی
  `worker.js`
  به‌صورت زیر می‌شود.
  <div  dir='ltr'  align='justify'>

  ```javascript
  #!/usr/bin/env node

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'task_queue';

      channel.assertQueue(queue, {
        durable: true
      });
      channel.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
      channel.consume(queue, function(msg) {
        var secs = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
          console.log(" [x] Done");
          channel.ack(msg);
        }, secs * 1000);
      }, {
        // manual acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: false
      });
    });
  });
  ```

  </div>



  # Routing
  در قسمت قبلی ما یک سیستم 
  logging
  ساده ایجاد کردیم. ما توانستیم 
  log 
  ها را برای بسیاری از 
  receiver
  ها ارسال کنیم.

  در این قسمت می خواهیم یک 
  feature
  به آن اضافه کنیم - ما می خواهیم اشتراک تنها در زیر مجموعه ای از پیام ها را امکان پذیر کنیم. به عنوان مثال ، ما می‌خواهیم فقط پیام های 
  critical error
  را در فایل ذخیره کنیم(برای صرفه جویی در فضای دیسک) ، در حالی که هنوز بتوانیم تمام پیام های 
  log
  را در کنسول چاپ کنیم.

  ## Bindings
  در مثال های قبلی 
  binding
  هایی را ایجاد کرده بودیم:
  <div  dir='ltr'  align='justify'>

  ```javascript
  channel.bindQueue(q.queue, exchange, '');
  ```
  </div>

  یک
  binding
  رابطه ای بین یک
  exchange
  و یک
  queue
  است. به راحتی می توان اینگونه تفسیر کرد: 
  queue
  مشخص‌شده به پیام های این 
  exchange
  علاقه مند است.

  پیوندها می توانند یک پارامتر کلید اتصال اضافی (
  string
  خالی در کد بالا) بگیرند. به این ترتیب می توانیم با یک کلید اتصال ایجاد کنیم:
  <div  dir='ltr'  align='justify'>

  ```javascript
  channel.bindQueue(queue_name, exchange_name, 'black');
  ```
  </div>

  معنی 
  binding key
  به نوع 
  exchange
    بستگی دارد. 
  ‍`fanout` exchange
  که قبلاً از آنها استفاده می کردیم ، مقدار
  binding key
  را نادیده میگیرند.

  ## Direct exchange
  سیستم
  logging
  ما در قسمت‌های قبل، همه پیام ها را برای همه 
  consumer
  ها ارسال می‌کند. ما می خواهیم این سیستم 
  logging
  را گسترش دهیم تا پیام‌ها بر اساس اهمیت‌شان فیلتر شوند. به عنوان مثال ممکن است بخواهیم اسکریپتی که پیام های 
  log
    را روی دیسک می نویسد فقط خطاهای 
    critical
    را دریافت کند و فضای دیسک را برای پیام های 
    warning
      یا 
      info
      تلف نکند.

  ما تا اینجا از یک 
  `fanout` exchange
  استفاده می کردیم ، که انعطاف زیادی به ما نمی دهد و فقط قادر به پخش بی فکر پیام هاست.

  در عوض از 
  `direct` exchange
  استفاده خواهیم کرد. الگوریتم مسیریابی در پشت 
  `direct` exchange
    ساده است - یک پیام به صف هایی می رود که 
  `binding key`
    آنها دقیقاً با 
    `routing key`
    پیام مطابقت دارد.

  برای نشان دادن این ، تنظیمات زیر را در نظر بگیرید:
  ![enter image description here](https://www.rabbitmq.com/img/tutorials/direct-exchange.png)

  در این تنظیمات ، می توان 
  `direct` exchange  
  `X`
  را با دو صف متصل به آن مشاهده کرد. صف اول با کلید اتصال 
  `orange`
    بسته می شود ، و دسته دوم دارای دو اتصال است ، یکی دارای کلید اتصال 
    `black`
    و دیگری با رنگ 
    `green`.

  در چنین تنظیماتی پیامی که با کلید 
  `orange`
    به 
  exchange
  ارسال می شود به صف 
  `Q1`
  هدایت می شود. پیام های دارای کلید مسیریابی 
  ` black`
    یا 
  ` green`
    به 
  `Q2`
    ارسال می شوند. همه پیام های دیگر کنار گذاشته می شوند و از دست می‌روند.

  ## Multiple bindings
  ![enter image description here](https://www.rabbitmq.com/img/tutorials/direct-exchange-multiple.png)

  اتصال صف های متعدد با 
  binding key
  کاملاً درست و کاربردی است. به عنوان مثال ما می توانیم یک اتصال بین 
  `X`
  و 
  `Q1`
  با کلید مسیریابی اتصال 
  `black`
    اضافه کنیم. در این صورت ، 
    `direct` exchange
    مانند 
  `fanout` exchange
    رفتار می کند و پیام را برای همه صف های مطابق پخش می کند. پیامی با کلید مسیریابی 
    `black`
      به 
    `Q1`
    و 
    `Q2`
      ارسال می شود.
  ## Emitting logs

  ما از این مدل برای سیستم 
  logging
  خود استفاده خواهیم کرد. به جای 
  fanout
  ما پیام ها را به یک 
  direct exchange
    ارسال خواهیم کرد. ما اهمیت پیام را به عنوان یک 
    routing key
    ارائه خواهیم داد. به این ترتیب اسکریپت دریافت کننده می تواند اهمیت مورد نظر برای دریافت پیام‌ها را انتخاب کند. ابتدا روی انتشار 
    log
    های مربوط تمرکز کنیم.

  مثل همیشه ، ابتدا باید یک 
  exchange
  ایجاد کنیم:
  <div  dir='ltr'  align='justify'>

  ```javascript
  var exchange = 'direct_logs';

  channel.assertExchange(exchange, 'direct', {
    durable: false
  });
  ```
  </div>

  و ما آماده‌ی ارسال پیام هستیم:
  <div  dir='ltr'  align='justify'>

  ```javascript
  var exchange = 'direct_logs';

  channel.assertExchange(exchange, 'direct', {
    durable: false
  });
  channel.publish(exchange, severity, Buffer.from(msg));
  ```
  </div>
  برای ساده سازی موارد، تصور خواهیم کرد که اهمیت 
  log
  می تواند یکی از مقادیر 
  info
    ، warning
    یا 
    error
    باشد.

  ## Subscribing
  دریافت پیام ها دقیقاً مانند قسمت‌های قبلی کار می کند ، به استثنای اینکه ما برای هر اهمیت مورد علاقه خود یک 
  exchange
  جدید ایجاد می کنیم.

  <div  dir='ltr'  align='justify'>

  ```javascript
  args.forEach(function(severity) {
    channel.bindQueue(q.queue, exchange, severity);
  });
  ```
  </div>

  ## Putting it all together

  ![enter image description here](https://www.rabbitmq.com/img/tutorials/python-four.png)

  کد نهایی
  `emit_log_direct.js`:
  <div  dir='ltr'  align='justify'>

  ```javascript
  #!/usr/bin/env node

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'direct_logs';
      var args = process.argv.slice(2);
      var msg = args.slice(1).join(' ') || 'Hello World!';
      var severity = (args.length > 0) ? args[0] : 'info';

      channel.assertExchange(exchange, 'direct', {
        durable: false
      });
      channel.publish(exchange, severity, Buffer.from(msg));
      console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function() { 
      connection.close(); 
      process.exit(0) 
    }, 500);
  });
  ```
  </div>

  کد نهایی
  `receive_logs_direct.js`:
  <div  dir='ltr'  align='justify'>

  ```javascript
  #!/usr/bin/env node

  var amqp = require('amqplib/callback_api');

  var args = process.argv.slice(2);

  if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
  }

  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'direct_logs';

      channel.assertExchange(exchange, 'direct', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
        }, function(error2, q) {
          if (error2) {
            throw error2;
          }
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        args.forEach(function(severity) {
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(q.queue, function(msg) {
          console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, {
          noAck: true
        });
      });
    });
  });
  ```
  </div> 

  اگر می خواهید فقط 
  log
  های  
  warning
  و 
  error
  را در یک فایل ذخیره کنید ، فقط یک کنسول را باز کنید و تایپ کنید:
  <div  dir='ltr'  align='justify'>

  ```bash
  # shell 2
  ./receive_logs_direct.js warning error > logs_from_rabbit.log
  ```
  </div>

  اگر می خواهید همه
  log
  های سیستم را در صفحه خود مشاهده کنید ، ترمینال جدیدی را باز کنید و تایپ کنید:
  <div  dir='ltr'  align='justify'>

  ```bash
  ./receive_logs_direct.js info warning error
  # => [*] Waiting for logs. To exit press CTRL+C
  ```
  </div>
  و به عنوان مثال، برای انتشار یک 
  log
  error
  ، فقط تایپ کنید:
  <div  dir='ltr'  align='justify'>

  ```bash
  ./emit_log_direct.js error "Run. Run. Or it will explode."
  # => [x] Sent 'error':'Run. Run. Or it will explode.'
  ```
  </div>

</div>
