# احراز هویت کاربران با استفاده از OAuth2 و Keycloak در Spring Boot

## مقدمه
یکی از چالش‌های اصلی در پروژه‌های نرم‌افزاری، احراز هویت کاربران و مدیریت دسترسی‌هاست. در این راهنما به بررسی چگونگی پیاده‌سازی این موضوع با استفاده از **OAuth2** و **Keycloak** در پروژه‌های Spring Boot می‌پردازیم.

## مفاهیم کلیدی

### OAuth2
- **Resource Owner:** کاربر مالک منابع.
- **Client:** برنامه‌ای که به منابع دسترسی دارد.
- **Authorization Server:** سروری که مجوزها و Tokens را مدیریت می‌کند.
- **Resource Server:** سروری که منابع را میزبانی و Tokens را اعتبارسنجی می‌کند.

### Keycloak
- ابزار منبع‌باز مدیریت هویت.
- ویژگی‌ها:
  - مدیریت کاربران، نقش‌ها و دسترسی‌ها.
  - پشتیبانی از SSO و MFA.
  - ادغام با LDAP و Active Directory.

## پیاده‌سازی

### افزودن وابستگی‌ها در `pom.xml`:
```xml
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-spring-boot-starter</artifactId>
    <version>11.0.3</version>
</dependency>
