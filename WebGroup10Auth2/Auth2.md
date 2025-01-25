# مقدمه ای بر OAuth2 و احراز هویت کاربران با استفاده از Keycloak در Spring Boot

## نویسندگان
- مبینا رشیدی
- مهسا حاجی رحیمی
- فربد فتاحی


### مسئله:
در پروژه‌های نرم‌افزاری، یکی از چالش‌های اصلی، احراز هویت کاربران و مدیریت دسترسی‌ها به منابع مختلف است. سیستم‌های احراز هویت سنتی معمولاً پیچیده هستند و مدیریت آنها زمان‌بر است. مشکلاتی نظیر امنیت پایین، سختی در گسترش و مدیریت کاربران و نیاز به تبادل امن اطلاعات، همواره مطرح هستند. 

### اهمیت احراز هویت:
احراز هویت به فرایند تعیین هویت واقعی یک کاربر اطلاق می‌شود. این امر نه تنها برای امنیت سیستم بلکه برای فراهم آوردن تجربیات شخصی‌سازی شده و کنترل دسترسی به منابع حساس حیاتی است.

### اهداف: 
1. ایجاد سیستمی که امنیت بالا و مدیریت ساده‌ای داشته باشد.
2. توانایی مقیاس‌پذیری برای تعداد زیادی از کاربران.
3. سهولت در اعمال تغییرات و مدیریت نقش‌ها و دسترسی‌ها.

## ۲. معرفی کلی OAuth2 و Keycloak

### OAuth2:
- **تاریخچه و تعریف**: OAuth2 در سال ۲۰۱۲ معرفی شد و پروتکلی برای احراز هویت و اعطای مجوز است. این پروتکل به برنامه‌ها اجازه می‌دهد بدون نیاز به اشتراک‌گذاری اعتبارنامه‌های کاربران، به منابع آنها دسترسی پیدا کنند.
  
- **مفاهیم کلیدی**:
  - **Resource Owner**: کاربری که مالک منابع است و به برنامه‌ها اجازه دسترسی به منابع خود را می‌دهد.
  - **Client**: برنامه‌ای که می‌خواهد به منابع کاربر دسترسی پیدا کند.
  - **Authorization Server**: سروری که درخواست‌های مجوز را پردازش می‌کند و Tokens ایجاد می‌کند.
  - **Resource Server**: سروری که منابع کاربر را میزبانی می‌کند و Tokens را اعتبارسنجی می‌کند.
  
- **نحوه کار**: فرآیند تبادل Token و مجوزدهی بدون نیاز به اشتراک‌گذاری مستقیم اطلاعات کاربر.
  - **Authorization Code Grant**: روشی که بیشتر در برنامه‌های وب استفاده می‌شود و در آن کاربر به برنامه اجازه دسترسی به منابع خود را می‌دهد.
  - **Implicit Grant**: روشی که برای برنامه‌های تک صفحه‌ای (SPA) مناسب است و مستقیماً Token به مرورگر کاربر ارسال می‌شود.
  - **Resource Owner Password Credentials Grant**: روشی که در آن کاربر اعتبارنامه‌های خود را مستقیماً به برنامه می‌دهد.
  - **Client Credentials Grant**: برای احراز هویت بین سرویس‌ها بدون دخالت کاربر.

### Keycloak:
- **تعریف و ویژگی‌ها**: Keycloak یک ابزار منبع باز برای مدیریت هویت و دسترسی است که پشتیبانی کاملی از OAuth2 و OpenID Connect دارد. این ابزار توسط شرکت Red Hat توسعه داده شده و به توسعه‌دهندگان اجازه می‌دهد به سرعت و به آسانی سیستم‌های احراز هویت پیچیده را پیاده‌سازی کنند.
  
- **ویژگی‌ها**:
  - **مدیریت کاربران**: Keycloak امکان مدیریت کاربران، ایجاد و حذف کاربران، تغییر رمز عبور و غیره را فراهم می‌کند.
  - **مدیریت نقش‌ها و دسترسی‌ها**: با استفاده از Keycloak می‌توان به کاربران نقش‌های مختلفی اختصاص داد و دسترسی‌های مختلفی برای آنها تعریف کرد.
  - **ورود یکبار (SSO)**: با استفاده از Keycloak، کاربران می‌توانند با یکبار ورود به سیستم به همه برنامه‌ها دسترسی داشته باشند.
  - **پشتیبانی از احراز هویت چند عامله (MFA)**: امکان اضافه کردن لایه‌های امنیتی بیشتر با استفاده از احراز هویت چند عامله.
  - **ادغام با LDAP و Active Directory**: Keycloak می‌تواند با سیستم‌های مدیریت هویت موجود مانند LDAP و Active Directory یکپارچه شود.

## ۳. مثال ساده از به کارگیری Keycloak در Spring Boot

### راه‌اندازی پروژه:
- **تنظیمات اولیه**: اولین قدم نصب و تنظیم Keycloak Server است. Keycloak Server به عنوان سرور احراز هویت عمل می‌کند و درخواست‌های احراز هویت را پردازش می‌کند.

### یکپارچه‌سازی با Spring Boot:
- **افزودن وابستگی‌ها به فایل `pom.xml`**:
  
  ```xml
  <dependency>
      <groupId>org.keycloak</groupId>
      <artifactId>keycloak-spring-boot-starter</artifactId>
      <version>11.0.3</version>
  </dependency>
  ```

### پیکربندی اولیه:
- **تنظیمات فایل `application.properties`**: در این فایل، تنظیمات مورد نیاز برای اتصال به Keycloak را اضافه می‌کنیم.
  
  ```properties
  keycloak.realm=myrealm
  keycloak.auth-server-url=http://localhost:8080/auth
  keycloak.resource=myclient
  keycloak.credentials.secret=mysecret
  keycloak.security-constraints[0].authRoles[0]=user
  keycloak.security-constraints[0].securityCollections[0].patterns[0]=/*
  ```

### نوشتن کلاس‌های اصلی:
- **کلاس Main Application**:
  
  ```java
  @SpringBootApplication
  public class MyApplication {
      public static void main(String[] args) {
          SpringApplication.run(MyApplication.class, args);
      }
  }
  ```

- **کلاس Security Configuration**: در این کلاس تنظیمات امنیتی مربوط به Keycloak را انجام می‌دهیم.
  
  ```java
  @Configuration
  @EnableWebSecurity
  public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {
      @Autowired
      public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
          auth.authenticationProvider(keycloakAuthenticationProvider());
      }

      @Bean
      @Override
      protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
          return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
      }

      @Override
      protected void configure(HttpSecurity http) throws Exception {
          super.configure(http);
          http.authorizeRequests()
              .antMatchers("/admin/*").hasRole("admin")
              .anyRequest().permitAll();
      }
  }
  ```

## ۴. نتیجه‌گیری و منابع

### جمع‌بندی: 
- **اهمیت احراز هویت**: بررسی چالش‌های احراز هویت کاربران و اهمیت امنیت در سیستم‌های نرم‌افزاری.
- **پروتکل OAuth2**: معرفی و توضیح مفاهیم کلیدی و نحوه کارکرد این پروتکل.
- **ابزار Keycloak**: معرفی ویژگی‌ها و مزایای استفاده از این ابزار برای مدیریت هویت و دسترسی.

### منابع و لینک‌ها:
1. [مستندات رسمی OAuth2](https://oauth.net/2/)
2. [مستندات رسمی Keycloak](https://www.keycloak.org/documentation.html)
3. [آموزش Keycloak و Spring Boot](https://www.baeldung.com/keycloak-spring-boot)
4. [کتاب جامع OAuth2](https://oauth2simplified.com/)

