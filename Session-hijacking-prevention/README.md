# Session hijacking prevention

<div dir="rtl" style="text-align: right">

# جلوگیری از سرقت نشست

نشست در وب یعنی چند درخواست HTTP که سرور آن‌ها را به یک کاربر یا مرورگر مشخص نسبت می‌دهد. چون HTTP ذاتا وضعیت نگه نمی‌دارد، برنامه‌های وب معمولا یک شناسه نشست در کوکی ذخیره می‌کنند تا درخواست‌های بعدی همان کاربر شناخته شوند. اگر این شناسه لو برود، حدس زده شود یا پیش از ورود کاربر توسط مهاجم تعیین شده باشد، مهاجم می‌تواند با همان شناسه مثل کاربر واردشده با برنامه کار کند.

این متن روی چند حمله رایج و چند کنترل عملی تمرکز دارد. هدف این نیست که یک نسخه قطعی برای همه برنامه‌ها بدهیم. مدیریت نشست به زبان برنامه‌نویسی، فریم‌ورک، نحوه استقرار، TLS termination و تنظیمات کوکی بستگی دارد.

## حمله‌های رایج

### XSS و سرقت کوکی

در XSS، کد جاوااسکریپت ناخواسته در صفحه اجرا می‌شود. اگر کوکی نشست با `HttpOnly` ساخته نشده باشد، اسکریپت می‌تواند مقدار آن را بخواند و برای مهاجم بفرستد. `HttpOnly` جلوی همه اثرهای XSS را نمی‌گیرد، ولی خواندن مستقیم کوکی توسط اسکریپت سمت کاربر را سخت‌تر می‌کند.

### Session fixation

در session fixation، مهاجم تلاش می‌کند قبل از ورود کاربر، شناسه نشست مشخصی را به مرورگر او تحمیل کند. اگر برنامه بعد از ورود، شناسه نشست را عوض نکند، همان شناسه بعد از احراز هویت معتبر می‌ماند و مهاجم می‌تواند از آن استفاده کند.

یک نمونه ساده از لینک خطرناک:

```html
<a href="https://example.com/login.php?sessionid=known-id">Login</a>
```

نباید شناسه نشست را از URL یا ورودی کاربر پذیرفت. بعد از ورود یا تغییر سطح دسترسی، شناسه نشست باید دوباره ساخته شود.

### شنود شبکه

اگر نشست روی HTTP یا یک شبکه ناامن جابه‌جا شود، مهاجم می‌تواند ترافیک را بخواند و مقدار کوکی را به دست بیاورد. HTTPS درست پیکربندی‌شده جلوی خوانده شدن مقدار نشست در مسیر شبکه را می‌گیرد.

## کنترل‌های اصلی

### HTTPS و HSTS

برای Nginx باید سوکت HTTPS با `ssl` فعال شود و مسیر certificate و private key مشخص باشد. نمونه کوتاه:

```nginx
server {
    listen 443 ssl;
    server_name www.example.com;

    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

بعد از فعال شدن HTTPS، HSTS هم کمک می‌کند مرورگر در درخواست‌های بعدی از HTTP معمولی استفاده نکند:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### تنظیم کوکی نشست

سه flag مهم برای کوکی نشست:

- `HttpOnly`: جلوی خواندن کوکی با JavaScript را می‌گیرد.
- `Secure`: مرورگر کوکی را فقط روی HTTPS می‌فرستد.
- `SameSite`: ارسال کوکی در درخواست‌های cross-site را محدود می‌کند.

برای برنامه‌های Java Servlet می‌توان `Secure` و `HttpOnly` را در `web.xml` تنظیم کرد:

```xml
<session-config>
    <cookie-config>
        <http-only>true</http-only>
        <secure>true</secure>
    </cookie-config>
</session-config>
```

اگر TLS در Nginx تمام شود و درخواست داخلی با HTTP به Tomcat برسد، صرف فعال بودن HTTPS در Nginx لزوما باعث نمی‌شود برنامه Java کوکی `JSESSIONID` را با `Secure` بسازد. این flag باید در خود برنامه، کانتینر وب یا تنظیمات proxy به صورت روشن مدیریت شود.

### ساخت دوباره شناسه نشست بعد از ورود

برای کم کردن خطر session fixation، شناسه نشست را بعد از ورود موفق یا تغییر سطح دسترسی دوباره بسازید. در PHP:

```php
session_start();
session_regenerate_id(true);
```

### استفاده از فریم‌ورک‌های شناخته‌شده

OWASP یک فریم‌ورک وب نیست. OWASP راهنما و cheat sheetهای امنیتی منتشر می‌کند. برای تولید و مدیریت نشست، بهتر است از امکانات خود فریم‌ورک‌هایی مثل Spring Security، Django، Laravel یا Express session استفاده شود و تنظیمات پیش‌فرض آن‌ها با راهنمای امنیتی همان ابزار بررسی شود.

## جمع‌بندی

برای کم کردن خطر سرقت نشست، باید چند لایه را با هم درست کرد: HTTPS، کوکی‌های امن، شناسه نشست تصادفی و بی‌معنا، ساخت دوباره شناسه بعد از ورود، زمان انقضا و پاک کردن نشست هنگام خروج. هیچ‌کدام از این کنترل‌ها به تنهایی کافی نیستند.

## منابع

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP Secure Cookie Attribute](https://owasp.org/www-community/controls/SecureCookieAttribute)
- [Nginx HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [PHP session_regenerate_id](https://www.php.net/manual/en/function.session-regenerate-id.php)

</div>
