<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>WebSocket: ارتباط دوسویه در وب</h1>

<p>WebSocket یک تکنولوژی ارتباط دوسویه در وب است که این امکان را فراهم می‌کند تا اطلاعات به صورت تعاملی و به صورت زنده بین مرورگر و سرور منتقل شوند. این فناوری مبتنی بر پروتکل TCP است و به وب امکان ارتباطات سریع و به روزرسانی به موقع را می‌دهد.</p>

<h2>مزایا و ویژگی‌های WebSocket</h2>

<p>WebSocket یک فناوری متن باز است که در تبادل داده بین مرورگر و سرور برای ایجاد ارتباطات زنده و به روزرسانی به موقع بسیار موثر است. مزایا و ویژگی‌های این تکنولوژی عبارتند از:</p>

<ol>
    <li><strong>ارتباط دوسویه:</strong> WebSocket امکان برقراری ارتباط دوسویه (bidirectional) را بین مرورگر و سرور فراهم می‌کند. این به برنامه‌ها اجازه می‌دهد به صورت فوری اطلاعات را تبادل کنند.</li>
    <li><strong>کارایی بالا:</strong> این تکنولوژی بر پروتکل TCP استوار است و ارتباطات WebSocket کارایی بالایی دارد، که موجب افزایش سرعت ارتباطات می‌شود.</li>
    <li><strong>کاهش هدر رفت اطلاعات:</strong> در مقایسه با روش‌های سنتی مانند HTTP Polling، WebSocket با کاهش تعداد درخواست‌های شبکه، هدر رفت اطلاعات را کاهش می‌دهد.</li>
    <li><strong>استفاده آسان:</strong> WebSocket از نظر پیاده‌سازی نسبت به روش‌های دیگر ساده‌تر است و این امکان را فراهم می‌کند که توسعه‌دهندگان به راحتی از آن استفاده کنند.</li>
    <li><strong>قابلیت انعطاف‌پذیری:</strong> WebSocket قابلیت ارتقاء و افزودن ویژگی‌های جدید را دارد، که این امکان را به توسعه‌دهندگان می‌دهد تا برنامه‌های پویا و پیشرفته را پیاده‌سازی کنند.</li>
</ol>

<h2>نحوه استفاده از WebSocket در HTML</h2>

<p>برای استفاده از WebSocket در HTML، می‌توانید از API مرورگر استفاده کنید. در ادامه یک نمونه کد HTML جهت برقراری ارتباط WebSocket آورده شده است:</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;WebSocket Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    // برقراری اتصال به سرور با استفاده از WebSocket
    const socket = new WebSocket('ws://example.com/socket');

    // رویدادهای مربوط به اتصال
    socket.addEventListener('open', (event) =&gt; {
        console.log('Connected to WebSocket');
    });

    // رویدادهای مربوط به دریافت داده
    socket.addEventListener('message', (event) =&gt; {
        console.log('Received message:', event.data);
    });

    // رویدادهای مربوط به بسته شدن اتصال
    socket.addEventListener('close', (event) =&gt; {
        console.log('Connection closed');
    });

    // ارسال داده به سرور
    socket.send('Hello, Server!');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>

<p>در این نمونه کد، یک اتصال WebSocket با <code>new WebSocket('ws://example.com/socket')</code> برقرار شده و رویدادهای <code>open</code>، <code>message</code>، و <code>close</code> برای اتصال، دریافت داده، و بستن اتصال اعلام شده‌اند. همچنین با <code>socket.send</code> می‌توانید داده به سرور ارسال کنید.</p>

<h2>استفاده از WebSocket در برنامه‌های وب</h2>

<p>استفاده از WebSocket در برنامه‌های وب امکان ارتباط زنده و ارسال داده‌ها به صورت آنی را فراهم می‌کند. برای پیاده‌سازی این تکنولوژی در برنامه‌های وب، مراحل زیر را دنبال کنید:</p>

<ol>
    <li><strong>برقراری اتصال:</strong> ابتدا با استفاده از <code>new WebSocket('آدرس سرور')</code> یک اتصال WebSocket برقرار کنید.</li>
    <li><strong>راه‌اندازی رویدادها:</strong> رویدادهای <code>open</code>، <code>message</code>، و <code>close</code> را برای اتصال تعریف کنید.</li>
    <li><strong>ارسال و دریافت داده:</strong> با استفاده از <code>socket.send()</code> داده به سرور ارسال کرده و با استفاده از رویداد <code>message</code> داده‌های دریافتی را پردازش کنید.</li>
    <li><strong>بستن اتصال:</strong> هنگامی که اتصال به سرور لازم نیست، با استفاده از <code>socket.close()</code> اتصال را ببندید.</li>
</ol>

<p>استفاده از WebSocket به توسعه‌دهندگان این امکان را می‌دهد تا برنامه‌های تعاملی و زنده‌ای را ایجاد کنند و تجربه کاربری بهبود یابد.</p>

<h2>مثال عملی: چت آنلاین با WebSocket</h2>

<p>برای نمونه، یک کد ساده برای چت آنلاین با استفاده از WebSocket آورده شده است. در این مثال، این امکان را دارید که اطلاعات چت را به صورت زمان واقعی بین کاربران ارسال کنید. کد زیر یک نمونه ساده از چت آنلاین با WebSocket را نشان می‌دهد:</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;WebSocket Chat Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="chat-container"&gt;
    &lt;ul id="chat-messages"&gt;&lt;/ul&gt;
    &lt;input type="text" id="message-input" placeholder="Type your message..."&gt;
    &lt;button onclick="sendMessage()"&gt;Send&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const socket = new WebSocket('ws://example.com/chat');

    socket.addEventListener('open', (event) =&gt; {
        console.log('Connected to WebSocket');
    });

    socket.addEventListener('message', (event) =&gt; {
        const messageContainer = document.getElementById('chat-messages');
        const newMessage = document.createElement('li');
        newMessage.textContent = event.data;
        messageContainer.appendChild(newMessage);
    });

    function sendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value;
        socket.send(message);
        messageInput.value = '';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>

<p>این مثال از یک واسط کاربری ساده برای چت آنلاین با WebSocket استفاده می‌کند. هر پیام جدید به صورت زمان واقعی به لیست پیام‌ها اضافه می‌شود. با این کد، می‌توانید تجربه چت آنلاین فوری و زنده را در وبسایت خود ایجاد کنید.</p>

<h2>استفاده از WebSocket برای ارسال تصاویر</h2>

<p>WebSocket این امکان را فراهم می‌کند که به جای ارسال متن، تصاویر نیز به صورت زنده بین مرورگر و سرور ارسال شوند. در ادامه یک نمونه کد برای ارسال تصاویر با استفاده از WebSocket آورده شده است:</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;WebSocket Image Upload&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="file" id="image-input" accept="image/*"&gt;
&lt;button onclick="uploadImage()"&gt;Upload Image&lt;/button&gt;

&lt;script&gt;
    const socket = new WebSocket('ws://example.com/image-upload');

    socket.addEventListener('open', (event) =&gt; {
        console.log('Connected to WebSocket');
    });

    function uploadImage() {
        const imageInput = document.getElementById('image-input');
        const imageFile = imageInput.files[0];

        if (imageFile) {
            const reader = new FileReader();

            reader.onload = (event) =&gt; {
                const imageData = event.target.result;
                socket.send(imageData);
            };

            reader.readAsDataURL(imageFile);
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>

<p>در این نمونه کد، یک ورودی فایل برای انتخاب تصاویر و یک دکمه برای ارسال تصویر ارائه شده است. با انتخاب تصویر، تصویر به صورت پایه‌ای به داده Base64 تبدیل شده و سپس با استفاده از WebSocket به سرور ارسال می‌شود.</p>

<h2>استفاده از WebSocket برای نمایش نوتیفیکیشن‌ها</h2>

<p>WebSocket را می‌توان برای ارسال نوتیفیکیشن‌ها به کاربران استفاده کرد. در ادامه یک نمونه کد برای ارسال نوتیفیکیشن با استفاده از WebSocket آورده شده است:</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;WebSocket Notifications&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="sendNotification()"&gt;Send Notification&lt;/button&gt;

&lt;script&gt;
    const socket = new WebSocket('ws://example.com/notifications');

    socket.addEventListener('open', (event) =&gt; {
        console.log('Connected to WebSocket');
    });

    function sendNotification() {
        const notificationData = {
            title: 'New Notification',
            message: 'You have a new message!',
            timestamp: new Date().toISOString(),
        };

        socket.send(JSON.stringify(notificationData));
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>

<p>در این نمونه کد، یک دکمه برای ارسال نوتیفیکیشن ارائه شده است. با فشردن دکمه، یک شی JSON حاوی اطلاعات نوتیفیکیشن ساخته شده و به صورت رشته JSON با استفاده از WebSocket به سرور ارسال می‌شود.</p>

<h2>جمع‌بندی</h2>

<p>WebSocket یک تکنولوژی قدرتمند است که به توسعه‌دهندگان این امکان را می‌دهد تا ارتباطات زنده و به روزرسانی به موقع را در برنامه‌های وب ایجاد کنند. با استفاده از WebSocket، می‌توانید تجربه کاربری را بهبود بخشیده و برنامه‌های تعاملی و زنده‌ای را ایجاد کنید.</p>

</body>
</html>
