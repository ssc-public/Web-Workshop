# مقدمه‌ای بر OAuth2 + احراز هویت کاربران با استفاده از ابزار گیت‌هاب در Spring Boot

**این تحقیق توسط: مهدی داودزاده و سیدامیرعلی مقدسی**

---

## فهرست مطالب
1. [بیان مسئله](#بیان-مسئله)  
2. [معرفی کلی OAuth2 و ابزار گیت‌هاب در Spring Boot](#معرفی-کلی-oauth2-و-ابزار-گیتهاب-در-spring-boot)  
3. [ایجاد پروژه در IntelliJ و نیازمندی‌ها](#ایجاد-پروژه-در-intellij-و-نیازمندیها)  
4. [پیکربندی GitHub OAuth در پروژه Spring Boot](#پیکربندی-github-oauth-در-پروژه-spring-boot)  
5. [مثال ساده و ابتدایی از به کارگیری ابزار](#مثال-ساده-و-ابتدایی-از-به-کارگیری-ابزار) 
6. [مراجع](#مراجع)

---

## بیان مسئله
در بسیاری از پروژه‌ها، **احراز هویت (Authentication)** نقشی کلیدی دارد. امروزه استفاده از روش‌های سنتی (نام کاربری و رمز عبور ذخیره‌شده در دیتابیس) به تنهایی کافی نیست و اغلب نیاز داریم تا از روش‌های امن‌تر و ساده‌تر، همچون ورود با حساب‌های شبکه‌های اجتماعی یا سرویس‌های معتبر استفاده کنیم. یکی از راهکارهای رایج، **OAuth2** است. در این روش کاربران می‌توانند از حساب کاربری خود در سایت‌ها یا سرویس‌های معتبر (مانند گیت‌هاب) برای ورود به برنامه شما استفاده کنند.

در این تحقیق، قصد داریم با استفاده از **Spring Boot** و **OAuth2**، فرآیند احراز هویت کاربران از طریق **GitHub** را پیاده‌سازی کنیم. این کار باعث می‌شود نیازی به مدیریت مستقیم اطلاعات حساس کاربر (مانند رمز عبور) نداشته باشیم و امنیت بیشتری برای برنامه خود تأمین کنیم.

---

## معرفی کلی OAuth2 و ابزار گیت‌هاب در Spring Boot
در واقع **OAuth2** یک پروتکل استاندارد و محبوب است که به برنامه‌ها اجازه می‌دهد تا به‌جای ذخیره و مدیریت اعتبارنامه‌های کاربران، از سرویس‌های خارجی برای تأیید هویت و مجوز دسترسی (Authorization) استفاده کنند. در این میان، گیت‌هاب (GitHub) یکی از محبوب‌ترین پلتفرم‌های میزبانی کد است که با **OAuth App** های خود، این امکان را می‌دهد که کاربران با حساب کاربری گیت‌هاب خود وارد برنامه شما شوند.

در اکوسیستم Spring، کتابخانه **Spring Security** این قابلیت را به‌صورت یکپارچه ارائه می‌دهد. با استفاده از استارترهای Spring Boot می‌توانیم به‌سادگی **OAuth2** را پیکربندی و راه‌اندازی کنیم و از کاربر بخواهیم با حساب گیت‌هاب وارد شود.

---

## ایجاد پروژه در IntelliJ و نیازمندی‌ها

در این بخش توضیح می‌دهیم که چطور یک پروژه ساده Spring Boot را با استفاده از IntelliJ راه‌اندازی کنیم و پیش‌نیازهای لازم برای OAuth2 را در آن اضافه نماییم.

### 1. نصب IntelliJ IDEA
- ابتدا مطمئن شوید که [IntelliJ IDEA](https://www.jetbrains.com/idea/) را نصب کرده‌اید (نسخه Community نیز کفایت می‌کند).
- همچنین اطمینان داشته باشید که Java 17 (یا نسخه بالاتر) بر روی سیستم شما نصب شده است (Spring Boot نسخه‌های اخیر ترجیحاً با جاوای 17 به بالا بهتر کار می‌کند).

### 2. ایجاد یک پروژه جدید در IntelliJ
1. ابتدا IntelliJ IDEA را باز کنید.
2. در صفحه خوش‌آمدگویی (Welcome)، روی **New Project** کلیک کنید.
3. گزینه‌ی **Spring Initializr** را انتخاب نمایید (در نسخه‌های جدید IntelliJ، ممکن است گزینه‌ی **Spring Initializr and Spring Boot** نام داشته باشد).


![1](https://github.com/user-attachments/assets/d56be9d2-4f50-4dde-86e9-5888ba60af15)

4. اطلاعات پروژه را وارد کنید:
    Group: مثلا `com.example`
    Artifact: مثلا `spring-github-auth`
   - نوع زبان: `Java`
   - نسخه‌ی Spring Boot: معمولا آخرین نسخه‌ی پایدار را انتخاب کنید (مثلا 3.x.x).
5. در بخش **Dependencies**، موارد زیر را اضافه کنید:
    **Spring Web**
    **Spring Security**
    **OAuth2 Client** (یا اگر جدا باشد: **OAuth2 Resource Server** و **OAuth2 Client**. معمولاً در استارتر “Spring Security OAuth2 Client” کفایت می‌کند.)
6. روی **Finish** کلیک کنید تا پروژه ساخته شود.


![2](https://github.com/user-attachments/assets/11356581-13d3-4a7d-93ac-bc21307dc5e2)

### 3. ساختار پوشه‌های پروژه
پس از ساخته شدن پروژه، ساختار اولیه مانند زیر خواهد بود:
```
spring-github-auth
 ┣─ src
 │   ┣─ main
 │   │   ┣─ java
 │   │   │   └─ com.example.springgithubauth
 │   │   │       └─ SpringGithubAuthApplication.java
 │   │   └─ resources
 │   │       └─ application.properties (یا application.yml)
 ┣─ pom.xml
 ┗─ ...
```
اگر از **Gradle** استفاده می‌کنید، در پروژه فایل `build.gradle` دارید و اگر از **Maven** استفاده می‌کنید، فایل `pom.xml` موجود خواهد بود.

---

## پیکربندی GitHub OAuth در پروژه Spring Boot
   **ثبت برنامه (Register an OAuth App) در GitHub**  
    به حساب گیت‌هاب خود وارد شوید و به آدرس زیر بروید تا یک OAuth App بسازید: <br>
     [Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
    <br> در صفحه باز شده، اطلاعات لازم را پر کنید: <br>
    پس از ثبت برنامه، **Client ID** و **Client Secret** به شما داده می‌شود. <br>
![3](https://github.com/user-attachments/assets/f58ef280-709f-4371-852f-f9310b1ddb09)
<br>

3. **تنظیمات در فایل application.yml یا application.properties**  
   اگر از فایل `application.yml` استفاده می‌کنید، اطلاعات زیر را وارد کنید:
   ```yaml
   spring:
     security:
       oauth2:
         client:
           registration:
             github:
               client-id: <YOUR_CLIENT_ID>
               client-secret: <YOUR_CLIENT_SECRET>
               scope: read:user
               redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
               client-name: GitHub
           provider:
             github:
               authorization-uri: https://github.com/login/oauth/authorize
               token-uri: https://github.com/login/oauth/access_token
               user-info-uri: https://api.github.com/user
   server:
     port: 8080
   ```
   > **نکته:** مقدار `<YOUR_CLIENT_ID>` و `<YOUR_CLIENT_SECRET>` را با مقادیر واقعی که از GitHub گرفتید جایگزین کنید.

   اگر از `application.properties` استفاده می‌کنید، همین تنظیمات را به شکل کلید-مقدار وارد نمایید: <br>
```properties
spring.security.oauth2.client.registration.github.client-id=<YOUR_CLIENT_ID>
spring.security.oauth2.client.registration.github.client-secret=<YOUR_CLIENT_SECRET>
spring.security.oauth2.client.registration.github.scope=read:user
spring.security.oauth2.client.registration.github.redirect-uri={baseUrl}/login/oauth2/code/{registrationId}
spring.security.oauth2.client.registration.github.client-name=GitHub

spring.security.oauth2.client.provider.github.authorization-uri=https://github.com/login/oauth/authorize
spring.security.oauth2.client.provider.github.token-uri=https://github.com/login/oauth/access_token
spring.security.oauth2.client.provider.github.user-info-uri=https://api.github.com/user
server.port=8080
```

<br>


5. **ایجاد کلاس پیکربندی امنیت (Optional)**
   گرچه اگر از **Spring Boot 2.6+** (یا بالاتر) استفاده می‌کنید، ممکن است به تنظیمات خاصی نیاز نداشته باشید؛ ولی می‌توانید کلاسی به نام `SecurityConfig` ایجاد کرده و آن را به شکل زیر پیکربندی کنید:
   ```java
   @Configuration
   @EnableWebSecurity
   public class SecurityConfig {

       @Bean
       SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
           http
               .authorizeHttpRequests(auth -> auth
                   .requestMatchers("/").permitAll()
                   .anyRequest().authenticated()
               )
               .oauth2Login(Customizer.withDefaults());
           
           return http.build();
       }
   }
   ```


   <br> در اینجا به مسیر اصلی ("/") اجازه دسترسی همگانی داده شده است و سایر مسیرها نیاز به احراز هویت دارند.
    سپس با `oauth2Login(Customizer.withDefaults())` می‌گوییم که از تنظیمات پیش‌فرض OAuth2 استفاده کند.

5. **اجرای پروژه**  
   پروژه را اجرا کنید (مثلا با اجرای کلاس اصلی `WebResearchApplication`).<br>
   مرورگر را باز کرده و به آدرس `http://localhost:8080` بروید.<br>
   هنگامی که می‌خواهید به صفحه‌ای که نیاز به احراز هویت دارد بروید، به صفحه ورود هدایت می‌شوید. در آنجا `GitHub` را مشاهده می‌کنید، روی آن کلیک کنید و فرآیند لاگین گیت‌هاب را دنبال کنید. <br>
   پس از ورود موفقیت‌آمیز، به برنامه بازگردانده می‌شوید و اطلاعات پایه کاربر (مطابق با scope تعیین‌شده) در اختیار برنامه قرار می‌گیرد. <br>

---

## مثال ساده و ابتدایی از به کارگیری ابزار
در این مثال بسیار ساده، ما یک کنترلر ایجاد می‌کنیم که اطلاعات کاربر واردشده را نشان می‌دهد.

1. **ایجاد یک کنترلر به نام `HomeController`**:


   ```java
   @Controller
   public class HomeController {

       @GetMapping("/")
       @ResponseBody
       public String homePage() {
           return "خوش آمدید! برای مشاهده پروفایل خود به /profile بروید.";
       }

       @GetMapping("/profile")
       @ResponseBody
       public String userProfile(OAuth2AuthenticationToken authentication) {
           if (authentication == null) {
               return "شما وارد نشده‌اید!";
           }

           Map<String, Object> userAttributes = authentication.getPrincipal().getAttributes();
           String username = (String) userAttributes.get("login");
           String html = "<h1>پروفایل کاربر</h1>" +
                         "<p>نام کاربری گیت‌هاب شما: " + username + "</p>" +
                         "<p><a href='/logout'>خروج</a></p>";
           return html;
       }
   }
   ```
2. **بررسی نتایج**:
    با ورود به آدرس `http://localhost:8080/` پیام خوش‌آمد نمایش داده می‌شود. <br>
    سپس در آدرس `http://localhost:8080/profile` اگر لاگین نکرده باشید، به صفحه‌ی احراز هویت منتقل می‌شوید. پس از ورود به حساب گیت‌هاب، مرورگر شما را به صفحه پروفایل بازمی‌گرداند و نام کاربری گیت‌هاب نمایش داده می‌شود. <br>

به این ترتیب یک نمونه‌ی کاملاً ساده و ابتدایی از احراز هویت با GitHub توسط OAuth2 در Spring Boot را مشاهده کردیم. البته در عمل می‌توانید سرویس‌های مختلف، دیتابیس و منطق تجاری دیگری نیز اضافه کنید تا برنامه واقعی‌تری بسازید. <br>

---


## مراجع
1. **مستندات رسمی Spring Security**  
   [https://docs.spring.io/spring-security/reference/index.html](https://docs.spring.io/spring-security/reference/index.html)

2. **مستندات رسمی GitHub برای ساخت OAuth App**  
   [https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

3. **آموزش ورود با OAuth2 در Spring Security (Baeldung)**  
   [https://www.baeldung.com/spring-security-5-oauth2-login](https://www.baeldung.com/spring-security-5-oauth2-login)


---
