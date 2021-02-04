<div dir='rtl' align='justify'>
<h2 align="center">RabbitMQ</h2>
  
# پیشنیاز‌ها
این آموزش فرض می‌کند که 
``RabbitMQ``
نصب شده است و در 
``localhost``
بر روی پورت استاندارد
``5672``
در حال اجرا می‌باشد.
در غیر این صورت تغییرات لازم را خودتان اعمال کنید.

# کجا کمک بگیریم؟
اگر در این آموزش به مشکل برخوردید می‌توانید از طزیق
[mailing list](https://groups.google.com/forum/#!forum/rabbitmq-users)
و یا
[RabbitMQ community Slack](https://rabbitmq-slack.herokuapp.com/)
مشکلاتتان را با ما در میان بگذارید.



  # عناوین

- [Hello World](#Hello-World)
  - [Sending](#sending)
  - [Receiving](#receiving)
  - [Putting it all together](#putting-it-all-together)
- [Work Queues](#work-queues)
  - [Preparation](#preparation)
  - [Round-robin dispatching](#round-robin-dispatching)
  - [Message acknowledgment](#message-acknowledgment)
  - [Message durability](#message-durability)
  - [Fair dispatch](#fair-dispatch)
  - [Putting it all together](#putting-it-all-together-1)
- [Publish/Subscribe](#PublishSubscribe)
  - [Exchanges](#exchanges)
  - [Temporary queues](#temporary-queues)
  - [Bindings](#bindings)
  - [Putting it all together](#putting-it-all-together-2)
- [Routing](#routing)
  - [Bindings](#bindings-1)
  - [Direct exchange](#direct-exchange)
  - [Multiple bindings](#multiple-bindings)
  - [Emitting logs](#emitting-logs)
  - [Subscribing](#subscribing)
  - [Putting it all together](#putting-it-all-together-3)
  
  
  
  # Hello World
RabbitMQ
یک توزیع کننده‌ی پیام است که پیام‌ها را می‌گیرد و به جلو می‌فرستد.برای فهم بهتر می‌توانید انتقال یک پیام پستی را در نظر بگیرید که در آن فرد الف می‌خواهد یک پیام را برای فرد ب ارسال کند.فرد الف پیام را در صندوق پستی می‌گذارد و پست‌چی پیام را به فرد ب می‌رساند. در این‌جا 
RabbitMQ
نقش صندوق پست، اداره پست و پست‌چی را انجام می‌دهد.

فرق اصلی 
RabbitMQ
و اداره‌ی پست این است که به‌جای اینکه با کاغذها و نامه‌ها کار کند با داده‌ها و پیام‌های باینری کار می‌کند و آن‌ها را می‌گیرد، ذخیره می‌کند و در نهایت ارسال می‌کند.

بعضی از اصطلاحات مورد استفاده در 
RabbitMQ:

+ پیام (Message) داده‌ای است که قرار است ارسال شود.
+ تولید کردن (producing) چیزی جز ارسال پیام نیست. یک برنامه که پیام ارسال می‌کند یک تولیدکننده (producer) است.
<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/producer.png"/></p>

+ یک صف (queue) یک نام برای صندوق پستی است که در داخل 
RabbitMq
تعبیه شده‌است.همچنین جریان پیام‌هایی که از 
RabbitMq 
و برنامه‌ی شما می‌گذرد باید در یک صف ذخیره شوند. محدودیت صف را میزان فضای حافظه و دیسک سیستم میزبان مشخص می‌کند.
این صف‌ها اصولا یک بافر بزرگ از پیام‌ها می‌باشند.تولید‌کنندگان مختلف پیام‌های خود را در یک صف می‌گذارند و مصرف‌کنندگان 
(consumers)
مختلف آن‌ها را دریافت می‌کنند.
<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/queue.png"/></p>

+ مصرف‌کردن
(consuming)
مانند دریافت پیام می‌باشد.یک مصرف‌کننده
(consumer)
یک برنامه است که معمولا صبر می‌کند تا یک پیام را دریافت کند.
<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/consumer.png"/></p>


توجه شود که تولید‌کننده
(producer)
مصرف‌کننده،
(consumer)
و توزیع‌کننده
(broker)
می‌تواند داخل یک میزبان نباشد. همچنین یک اپلیکیشن می‌تواند هم تولید کننده و هم مصرف‌کننده باشد.

<div dir='ltr'>

**hello world**

</div>


(
با استفاده از 
amqp.node client
)

در این بخش از آموزش دو برنامه‌ی کوچک با استفاده از
javascript
می‌نویسم. یک تولید کننده
(producer)
که یک پیام را ارسال می‌کند. و یک مصرف‌کننده
(consumer)
که پیام را دریافت کرده و چاپ می‌کند.

در نمودار زیر
"p"
تولیدکننده و
"C"
مصرف‌کننده‌ی ما است. جعبه‌ی وسط نیز یک صف است که 
RabbitMQ
به عنوان بافر در پیش از مصرف‌کننده نگه می‌دارد.

<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/python-one.png"/></p>

> **کتابخانه‌ی 
> amqp.node clint**
> 
> RabbitMQ
> با پروتکل‌های مختلف کار می‌کند در این آموزش ما از 
> AMQP 0-9-1
> که یک پروتکل متن‌باز و همه‌منظوره برای ارسال پیام است، استفاده می‌کنیم.
>
> یک 
> client
> در
> [زبان‌های مختلفی](https://www.rabbitmq.com/devtools.html)
> برای
> RabbitMQ
> وجود دارد.
> ما در این آموزش از
> [amqp.node client](http://www.squaremobius.net/amqp.node/)
> استفاده می‌کنیم.

<div dir='ltr' align='justify'>

```bash
npm install amqplib
```
</div>

در این‌جا 
amqp.node
نصب شده است. حال ما می‌توانیم مقداری کد بنویسیم.

## sending

ما با استفاده از
``send.js``
فرستنده‌ی خود را صدا کرده و با استفاده از
``receive.js``
مصرف‌کننده را فرا می‌خوانیم. فرستنده در ابتدا به 
RabbitMQ
وصل خواهد می‌شود ، یک پیام را ارسال می‌کند و در نهایت خارج می‌شود.

در
[``send.js``](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/send.js)
ابتدا کتابخانه را اضافه می‌کنیم.

<div dir='ltr' align='justify'>

```javascript
#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
```

</div>

سپس به 
RabbitMQ server
وصل می‌شویم.

<div dir='ltr' align='justify'>

```javascript
amqp.connect('amqp://localhost', function(error0, connection) {});
```

</div>

سپس یک 
channel
می‌سازیم. در اینجا بسیاری از 
API
هایی که برای انجام کارها نیاز داریم تعبیه شده است.

<div dir='ltr' align='justify'>

```javascript
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {});
});
```

</div>

برای ارسال ما باید ابتدا یک صف تعریف کرده و سپس پیام را در صف قرار دهیم.

<div dir='ltr' align='justify'>

```javascript
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});
```

</div>

تعریف یک صف یک عمل خنثی است. این صف تنها در صورتی ساخته می‌شود که از قبل وجود نداشته باشد. محتوای پیام یک آرایه از بایت‌ها است پس بنابر این شما می‌توانی آنها را به هر صورت که بخواهید 
encode
کنید.

و در نهایت ما 
connection
را بسته و خارج می‌شویم.

<div dir='ltr' align='justify'>

```javascript
setTimeout(function() { 
  connection.close(); 
  process.exit(0) 
  }, 500);
```

</div>

[نسخه‌ی کامل برنامه در این‌جا قرار دارد.](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/send.js)


## receiving

در این‌جا مصرف‌کننده ما
(consmer)
به گوش می‌ایستد تا پیام‌ها را از 
RabbitMQ
بگیرد. پس در اینجا برخلاف ارسال کننده که فقط یک پیام را ارسال می‌کرد،در این جا ما به دریافت ادامه می‌دهیم تا هر پیامی که وجود دارد را دریاف کند و آن را چاپ کند.

<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/receiving.png"/></p>

کد
([``receive.js``](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/receive.js))
مانند
``send``
به کتابخانه‌ی یکسانی نیاز دارد.


<div dir='ltr' align='justify'>

```javascript
#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
```

</div>

تنظیمات اولیه مانند فرستنده است. ما یک 
connection
و
channel
باز می‌کنیم.
سپس یک صفی که قرار است از آن بخوانیم را تعریف می‌کنیم. توجه شود که این صف باید با صفی که در 
``sendToQueue``
استفاده کردیم هم‌نام باشد.

<div dir='ltr' align='justify'>

```javascript
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });
  });
});
```

</div>

توجه کنید که در اینجا نیز ما صف را تعریف کردیم. این به این دلیل است که ممکن است مصرف کننده 
(consumer)
پیش از تولید کننده
(publisher)
شروع به کار کند. ما با این کار می‌خواهیم اطمینان حاصل کنیم که صف قبل از تلاش برای گرفتن پیام از آن تعریف شده است.


در اینجا ما می‌خواهیم به سرور بگوییم که پیام را از صف به ما بدهد. از آنجا که سرور پیام را به صورت 
asynchronous
به سمت ما می‌فرستد ما یک 
callback
قرار داده‌ایم تا زمانی که 
RabbitMq
پیام را به سمت ما فرستاد اجرا شود.


<div dir='ltr' align='justify'>

```javascript
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(queue, function(msg) {
  console.log(" [x] Received %s", msg.content.toString());
}, {
    noAck: true
  });
```

</div>

[نسخه کامل را در این‌جا مشاهده کنید.](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/receive.js)

## putting it all together

حال می‌توانید هر دو کد را اجرا کنید. ابتدا ارسال کننده
(publisher)
را اجرا می‌کنیم.

<div dir='ltr' align='justify'>

```bash
node send.js
```

</div>

و سپس مصرف‌کننده
(consumer)
را اجرا می‌کنیم.

<div dir='ltr' align='justify'>

```bash
node receive.js
```

</div>

مصرف‌کننده
(consumer)
پیامی که به واسطه‌ی
RabbitMQ
از تولید‌کننده
(publisher)
گرفته است را چاپ می‌کند.


 **لیست‌کردن صف‌ها**

شاید شما بخواهید ببینید که
RabbitMQ
چند صف دارد و در هر صف چندین پیام وجود دارد شما این کار را با استفاده از
``rabbitmqctl``
می‌توانید انجام دهید

<div dir='ltr' align='justify'>

```bash
sudo rabbitmqctl list_queues
```

</div>



  # Work Queues
  در قسمت قبل برنامه‌هایی نوشتیم تا پیام‌ها را به یک صف با نام مشخص ارسال کنیم و در برنامه‌ی دیگر این پیام‌ها را از این صف دریافت کنیم. در این قسمت میخواهیم یک
  Work Queue
  ایجاد کنیم که از آن برای پخش کردن کارها و 
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
  های ما را مورداستفاده قرار می‌دهد و زمان زیادی باید منتظر بمانیم تا کامل شود خودداری کنید . در عوض ما برنامه‌ریزی می کنیم تااین کارها بعداً انجام شوند. ما یک 
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
  "!Hello World"
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
  را به عنوان پیچیدگی آن در نظر خواهیم گرفت. هر نقطه یک ثانیه کار را نشان می دهد. به عنوان مثال، یک
  task
  با محتوای 
  `...Hello`
  سه ثانیه طول خواهد کشید.

  برای ارسال پیام های قراردادی از 
  command line
  کد، 
  send.js
  از مثال قبلی را کمی اصلاح خواهیم کرد. این برنامه
  task 
  ها را به
  work queue
  ما اضافه می کند ، بنابراین نام آن را 
  `new_task.js`
  می‌گذاریم :
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
  `receive.js`
  که در قسمت قبل استفاده کردیم نیاز به تغییراتی دارد. لازم است برای هر نقطه از  پیام، یک ثانیه صبر کنیم. این برنامه
  task
  ها را از صف برمیدارد و انجام می‌دهد پس آن را
  `worker.js`
  می‌نامیم: 
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
  های بیشتری اضافه کنیم و از این طریق به راحتی کارهای در مقیاس بالا را انجام دهیم.

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


# Publish/Subscribe
در پیش‌تر ما یک
work queue
ساختیم. در آنجا فرض این بود که هر پیام دقیقا به یک 
worker
می‌رود. در این بخش ماجرا کمی متفاوت است. ما می‌خواهیم که یک پیام را به چندین مصرف‌کننده ارسال کنیم. به این الگو
publish/subscribe
می‌گویند.

برای مشخص شدن ماجرا فرض کنید که می‌خواهیم یک سیستم مدیریت لاگ‌ها بسازیم.
این سیستم از دو برنامه تشکیل شده است.
برنامه‌ی اول پیام‌های لاگ تولید کرده و دیگری این پیام‌ها را دریافت کرده و آن‌ها را چاپ می‌کند.

در این سیستم هر کپی از برنامه‌ی دریافت کننده‌ای که اجرا شود پیام‌ها را دریافت خواهد کرد.
با این روش می‌توانیم یک دریافت‌کننده اجرا کنیم که پیام‌هایی که دریافت می‌کند را در دیست ذخیره کند و یک دریافت‌کننده‌ی دیگر نیز اجرا کنیم که لاگ‌ها را بر روی صفحه،نمایش  دهد.

در اصل ما پیام را به همه‌ی دریافت کننده‌ها
broadcast
می‌کنیم.

## exchanges

پیش‌تر ما پیام‌ها را به صف می‌فرستادیم و از آن می‌گرفتیم. حال زمان آن رسیده است که مدل کامل انتقال پیام را در
Rabbit
معرفی کنیم.

چیز‌هایی که ما در قبل داشتیم عبارت بود از:

+ تولید کننده
(producer)
که یک برنامه بود که پیام‌ها را می‌فرستاد
+ یک صف
(queue)
که پیام ها در آن ذخیره می‌شد.
+ یک مصرف‌کننده
(consumer)
که یک برنامه بود که پیام‌ها را دریافت می‌کرد.


ایده‌ی اصلی پشت مدل پیام‌رسانی در 
RabbitMQ
این است که تولید‌کننده
(producer)
هرگز پیام را مستقیما به یک صف نمی‌فرستد.
حتی اغلب نمی‌داند که پیام به صفی منتقل شده است یا خیر.

در عوض تولید کننده تنها می‌تواند پیام‌ها را به یک
exchange
ارسال کند. یک
exchange
یک موجود بسیار ساده است.
از یک سو پیام‌ها را از فرستنده‌ها دریافت می‌کند. و از سمت دیگر آنها را در صف‌ها قرار می‌دهد.
یک
exchange
باید دقیقا بداند که با یک پیام که دریافت کرده چه کار باید بکند. آیا باید آن را به یک صف خاص اضافه کند؟
آیا باید آن را در چندین صف قرار دهد؟
و یا آن را دور بیاندازد.
این قواعد از روی نوع
exchange
مشخص می‌شود.

<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/exchanges.png"/></p>

چندین نوع برای
exchange
ها وجود دارد:
``direct``, ``topic``, ``headers``
و
``fanout``.
در این جا می‌خواهیم بر روی مورد آخر یعنی
fanout
تمرکز کنیم.
بیایید یک 
exchange
از این نوع بسازیم، و آن را 
``logs``
بنامیم:

<div dir='ltr' align='justify'>

```javascript
ch.assertExchange('logs', 'fanout', {durable: false})
```

</div>

exchange
از نوع
fanout
بسیار ساده عمل می‌کند.
پیام‌هایی که دریافت می‌کند را در تمام صف‌هایی که می‌شناسد
broadcast
می‌کند. و این دقیقا همان چیزی است که ما برای یک لاگ کننده
(logger)
نیاز داریم.


**لیست کردن exchange ها**

برای لیست کردن 
exchange
هایی که در سرور وجود دارد می‌توانید دستور زیر را اجرا کنید.

<div dir='ltr' align='justify'>

```bash
sudo rabbitmqctl list_exchanges
```

</div>

در این جا چندین
``amq.*`` exchange
و یک
default (unnamed) exchange
وجود خواهد داشت. آن‌ها به صورت پیش‌فرض ساخته شده‌اند.

**default exchange**
در بخش‌های قبلی از این آموزش ما چیزی در مورد 
exchange
ها نمی‌دانستیم اما هنوز می‌توانستیم که پیام‌ها را به صف‌ها بفرستیم.
این کار به واسطه‌ی 
default exchange
میسر شده بود. چیزی که با رشته‌ی خالی
(``""``)
مشخص می‌شود.

به یاد بیاورید که در پیش‌تر چگونه پیام را ارسال می‌کردیم.

<div dir='ltr' align='justify'>

```javascript
channel.sendToQueue('hello', Buffer.from('Hello World!'));
```

</div>

در این جا ما از 
default exchange
استفاده می‌کردیم. پیام ها به سمت یک صف که به وسیله‌ی نام آن در پارامتر اول مشخص شده بود مسیریابی می‌شد.

حال در عوض ما پیام‌هایمان را به سمت 
exchange
مشخصی می‌فرستیم.

<div dir='ltr' align='justify'>

```javascript
channel.publish('logs', '', Buffer.from('Hello World!'));
```

</div>

رشته‌ی خالی در پارامتر دوم این معنی را می‌دهد که ما نمی‌خواهیم پیام به صف خاصی منتقل شود.
بلکه می‌خواهیم پیام ها را در 
exchange
ای به نام
 'log'
 منتشر کنیم.


## temporary queues

اگر به‌یاد داشته باشید ما از صف‌هایی که نام‌های مشخصی داشتند استفاده می‌کردیم.
نام‌گذاری صف‌ها یک کار حیاتی بود زیرا ما نیاز داشتیم که 
worker
ها را به یک صف خاص وصل کنیم.
اسم‌گذاری صف زمانی مهم است که شما بخواهید یک صف را بین تولید کننده و مصرف کننده به اشتراک بگذارید.

اما اینجا ما با آن کار نیاز نداریم. ما می‌خواهیم تمام پیام‌ها را دریافت کنیم و و نه تنها زیرمجموعه‌ای از آن را.
همچنین ما به تنها به پیام‌هایی که اکنون در جریان اند علاقه‌مندیم و با پیام‌های گذشته کاری نداریم. برای این کار ما به دو چیز نیاز داریم.

اول اینکه هر وقت به 
rabbitMQ
متصل می‌شویم به یک صف خالی و تازه نیاز داریم. برای اینکار ما می‌توانیم یک صف با نام تصادفی بسازیم. ولی بهتر آن است که به سرور بگوییم که یک نام تصادفی برای ما انتخاب کند.
 
 و دوم اینکه صف ما باید وقتی که اتصال ما قطع شد به طور خودکار پاک شود.
 
 در
 [amqp.node client](http://www.squaremobius.net/amqp.node/)
وقتی که ما یک صف با نامی به صورت یک رشته خالی ذخیره می‌کنیم. خودش یک صف موقت با یک نام تصادفی می‌سازد.


<div dir='ltr' align='justify'>

```javascript
channel.assertQueue('', {
  exclusive: true
});
```

</div>

وقتی که متد بازمی‌گردد صف ایجاد شده یک نام تصادفی که توسط دارد.
به عنوان مثال این نام چیزی شبیه به
``amq.gen-JzTY20BRgKO-HjmUJj0wLg``
خواهد داشت.

وقتی که 
connection
ای که تعریف شده بود بسته شود. صف پاک خواهد شد زیرا به صورت
``exclusive``
تعریف شده است. شما می‌توانید بیشتر در مورد قید
``exclusive``
و دیگر ویژگی‌های صف در
[اینجا](https://www.rabbitmq.com/queues.html)
بخوانید.

## bindings

<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/bindings.png"/></p>

ما تا این جا یک
exchange
از نوع 
fanout
و یکه صف ساخت‌ایم. حال نیاز داریم تا به 
exchange
بگوییم که پیام‌ها را به صف مورد نظر ارسال کند. این رابطه بین 
exchange
و صف
binding
نامیده می‌شود.

<div dir='ltr' align='justify'>

```javascript
channel.bindQueue(queue_name, 'logs', '');
```

</div>

حال 
``logs`` exchange
پیام‌ها را به سمت صف ما ارسال خواهد کرد.

**لیست‌کردن bindings ها**

شما می‌توانید 
binding
های موجود را با دستور زیر مشاهده کنید.

<div dir='ltr' align='justify'>

```bash
rabbitmqctl list_bindings
```

</div>

## putting it all together

<p align="center"><img src="<p align="center"><img src="https://www.rabbitmq.com/img/tutorials/bindings.png"/></p>
"/></p>

برنامه‌ی تولید کننده
(producer)
که لاگ‌ها را تولید خواهد کرد.خیلی متفاوت از گذشته نخواهد بود.
تغییر اصلی این است که از این به بعد پیام‌ها را در 
``logs`` exchange
به جای 
default exchange
ارسال خواهد کرد.
در اینجا کد
``emit_log.js``
را مشاهده می‌کنید.

<div dir='ltr' align='justify'>

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
    var exchange = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0); 
  }, 500);
});
```

</div>

[کد emit_log.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/emit_log.js)

همانطور که می‌بینید بعد از ایجاد
connection
ما یک 
exchange
تعریف کرده‌ایم.
این کار به این دلیل ضروری است که ارسال پیام به یک
xchange
ناموجود، ممنوع است.

پیام‌ها ازدست خواهند رفت اگر صفی به 
exchange
متصل
(bind)
نشده باشد. اما این برای ما قابل قبول است. اگر مصرف‌کننده‌ای به لاگ‌ها گوش ندهد می‌توانیم بدون مشکل پیام‌ها را دوربیاندازیم.

کد
``receive_logs.js``
به صورت زیر است.

<div dir='ltr' align='justify'>

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
    var exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            console.log(" [x] %s", msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});
```

</div>

[کد recive_log.js](https://github.com/rabbitmq/rabbitmq-tutorials/blob/master/javascript-nodejs/src/receive_logs.js)

اگر می‌خواهید لاگ‌ها را ذخیره کنید تنها لازم است که یک کنسول باز کرده و تایپ‌ کنید:

<div dir='ltr' align='justify'>

```bash
./receive_logs.js > logs_from_rabbit.log
```

</div>

اگر می‌خواهید لاگ‌ها را برروی نمایش‌گر ببینید:

<div dir='ltr' align='justify'>

```bash
./receive_logs.js
```

</div>

البته برای تولید لاگ فراموش نشود که :

<div dir='ltr' align='justify'>

```bash
./emit_log.js
```

</div>

استفاده از
``rabbitmqctl list_bindings``
می‌تواند مشخص کند که
binding
مطابق انتظار ما انجام شده است یا خیر.
با اجرای دو بار
``receive_logs.js``
شما باید چیزی مثل این را مشاهده کنید.

<div dir='ltr' align='justify'>

```bash
sudo rabbitmqctl list_bindings
# => Listing bindings ...
# => logs    exchange        amq.gen-JzTY20BRgKO-HjmUJj0wLg  queue           []
# => logs    exchange        amq.gen-vso0PVvyiRIL2WoV3i48Yg  queue           []
# => ...done.
```

</div>


تفسیر این نتیجه سرراست است. داده از
exchange
مربوط به
``logs``
به سمت دو صفی که اسم آنها توسط سرور مشخص شده است می‌رود. این همان چیزی است که ما می‌خواستیم.





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
