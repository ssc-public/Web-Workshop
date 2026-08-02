# Web Assembly with Rust

تحقیق پایان‌ترم درس برنامه سازی وب - پاییز ۱۴۰۱

نویسندگان: سجاد ریحانی، حمیدرضا شریف‌زاده، دانیال عرفانیان

## وب اسمبلی چیه؟

وب اسمبلی یک فرمت دستورات باینریه که مثل اسمبلی یک زبان(wat - webAssembley Text) در قالب یکسری دستورات هم داره. اکثر مرورگرها می‌تونند برنامه‌هایی که در قالب این فرمت (فایل های wasm) رو اجرا کنن. هر چند که محدود به وب و مرورگر نیست و به صورت عمومی می‌تونه توسط هر میزبان و محیطی که نیازمندی‌هاش رو پیاده‌سازی کرده باشه اجرا بشه.

هدف اصلی توسعه این ابزار اجرای برنامه‌هایی با به پردازش سنگین روی محیط وب بود. مثلا بازی ساخته شده با موتور بازی‌سازی unreal engine که نرم‌افزار سنگینی از لحاظ پردازشی محسوب میشه به این زبان کامپایل شده و به راحتی و بدون مشکل میتونه روی وب ارايه بشه. کاری که انجام دادنش با js به دلیل پرفورمنس پایین‌تری که dynamic type بودن و garbage collector داشتنش روش اعمال می‌کنه ممکن نیست. 

وب‌اسمبلی این امکان رو فراهم می‌کنه که برنامه‌مون رو به هر زبان دلخواهی که خواستیم مثل rust یا c++ بنویسیم و بعد اون رو به وب‌اسمبلی کامپایل کنیم و در نهایت در وب ازش استفاده کنیم. 

![Untitled](Web%20Assembly%20with%20Rust%20e1a6ebe4ec0849499a2b48d3b0bb9d91/Untitled.png)

## حالا Rust چیه؟

راست یک زبان برنامه‌نویسی که با این هدف طراحی شده که زبانی باشه که در همه زمینه‌ها چه سطح‌بالا و چه سطح پایین با پرفورمنس زیاد قابل استفاده باشه. مهمترین ویژگی rust اینه که در زمان کامپایل از امنیت برنامه‌ از لحاظ مشکلات حافظه‌ای رو تضمین می‌کنه. در واقع اصلا به شما اجازه نمیده کدی بنویسید که مشکل حافظه‌ای داره. از اونجایی که بیشتر از ۵۰٪ آسیب پذیری‌های امنیتی از سوراخ مشکلات حافظه‌ای مثل double free, dangling ptr ,… به وجود می‌آن. نوشتن برنامه به زبانی که تمام این مشکلات رو حل می‌کنه امنیت برنامه رو بسیار بالا می‌بره. 

شاید بگید نمیشه که یه زبان توی همه این زمینه‌ها خوب باشه. هم پرفورمنس داشته باشه، هم امن باشه، هم بشه در سطح بالا و پایین ازش استفاده کرد، یه جای کار باید بلنگه. و خب تقریبا درست فکر می‌کنید. drawback زبان rust اینه که یادگرفتنش سخته. مفاهیمی مثل lifetime، ownership، borrwing و … وجود دارند که آشنا شدن باهاشون مخصوصا برای کسانی که با زبان‌های سطح پایین مثل c, c++ عمیق کار نکردند سخته و بدون یادگرفتن این مفاهیم هم نمیشه بیشتر از hello world در rust کد زد.

البته rust دو ویژگی دیگه هم داره که سختی یادگرفتنش رو آسون تر می‌کنه. اولیش داکیومنت‌ها و آموزش‌های خیلی خوبشه که توسط تیم توسعه زبان و کامیونیتی آپدیت میشه. کتاب [The Rust Programming Language](https://doc.rust-lang.org/book/) بهترین نقطه شروع برای آشنایی با این زبانه. دومیش هم پیام‌های خطاش در هنگام کامپایله که قشنگ توضیح میده مشکل چیه، برای توضیح بیشتر ارجاع داره به داکیومنت‌ها و بیشتر مواقع حتی می‌گه که چیکار باید بکنید تا درست بشه.

## نصبیات

اول یه مشت چیز میز باید نصب کنید.

- [rustc, rustup, cargo](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- cargo-generate: `cargo install cargo-generate`
- [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)

## مثل همیشه، سلام دنیا

قالب آماده یک پروژه web assembly در این [آدرس](https://github.com/rustwasm/wasm-pack-template) هست. میتونید  با دستور زیر از cargo generate استفاده اونو بسازید:

```bash
cargo generate --git [https://github.com/rustwasm/wasm-pack-template](https://github.com/rustwasm/wasm-pack-template)
```

بعد از اجرای دستور اسم پروژه رو می‌پرسه که hello-world میزنیم.

که داخلش این‌فایل‌ها رو می‌بینید:

‍

hello-world/
├── Cargo.toml
├── LICENSE_APACHE
├── LICENSE_MIT
├── [README.md](http://readme.md/)
└── src
├── [lib.rs](http://lib.rs/)
└── [utils.rs](http://utils.rs/)

- cargo.toml: فایل وابستگی‌ها و تنظیمات بیلد پروژه
- src/lib.rs: فایل اصلی پروژه
- src/utils.rs: فایل ابزارهای کمکی

محتوای فایل src/lib.rs رو دقیق‌تر نگاه کنیم:

```rust
#![allow(unused_variables)]
fn main() {
mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, world!");
}
}
```

در این فایل با استفاده از ماژول wasm_bindgen تابع alert از js وارد شده و تابع greet برای استفاده شدن توسط js تعریف شده و export شده. که یک پیغام با alert چاپ می‌کنه.

برای build شدن پروژه دستور `wasm-pack build` رو اجرا کنید. (اینجا اگه دیدید گیر کرده و هیچ اتفاقی نمی‌افته از فیلترشکن استفاده کنید.)

بعد از اتمام فایل‌های مربوطه داخل پوشه pkg ساخته می‌شن.

برای اینکه داخل یک صفحه وب نشونش بدیم از این [قالب](https://github.com/rustwasm/create-wasm-app) استفاده می‌کنیم:

داخل پوشه پروژه دستور `npm init wasm-app www`  رو اجرا می‌کنیم که داخل فولدر www پروژه node قالب رو می‌سازه.

فایل‌های اصلی  indes.html و index.js هستند. داخل indes.js تابع greet از webassembly وابسته صدا زده شده.البته این قالب فعلا به hello-wasm-pack وابسته‌است نه به پروژه ما.

با دستور `npm install` در پوشه www وابستگی‌های لازم رو نصب می‌کنیم.

 حالا باید از پکیج خودمون به جای hello-wasm-pack استفاده کنیم.

 داخل فایل hello-world/www/package.json کنار devDependency یک ردیف dependency اضافه کنید و داخلش `"hello-world": "file:../pkg"` رو بنویسید. این قسمت فایل باید این شکلی بشه:

![Untitled](Web%20Assembly%20with%20Rust%20e1a6ebe4ec0849499a2b48d3b0bb9d91/Untitled%201.png)

حالا فایل indes.js رو تغییر می‌دیم تا به جای hello-wasm-pack از hello-world ما ایمپورت رو انجام بده:

```jsx
import * as wasm from "hello-world";

wasm.greet();
```

دوباره `npm install` رو اجرا می‌کنیم تا وابستگی جدید نصب بشه.

حالا می‌تونیم با اجرای `npm run start` صفحه رو روی آدرس [http://localhost:8080/](http://localhost:8080/) اجرا کنیم و آلرت رو ببینیم. تبریک:)