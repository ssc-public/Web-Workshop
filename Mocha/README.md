<div name="header" dir="rtl" align="center">
<h1>چارچوب آزمون نرم‌افزار Mocha</h1>
</div>

<div dir = "rtl">

# پیشگفتار


همواره در برنامه‌نویسی،
**«آزمون نرم‌افزار»**
جزئی جدایی‌ناپذیر از کار است که به ما اطمینان
بدهد برنامه و ماژول‌های برنامه، همانند انتظارات
ما رفتار می‌کنند. این کار می‌تواند به صورت
دستی توسط برنامه‌نویس انجام شود که
با اجرای برنامه، بررسی کند آیا برنامه
مطابق انتظارات کار می‌کند را خیر.
امّا همواره این کار کافی نیست یا 
بسیار سخت و زمان‌بر است. به همین جهت است که 
معمولاً در ساختن برنامه‌ها و
سامانه‌های نرم‌افزاری بزرگ، به دنبال ابزارهایی
برای خودکارسازی فرایند آزمون نرم‌افزار هستیم.
از همین رو برای زبان‌های برنامه‌نویس مختلف،
امکانات گوناگونی برای آزمون نرم‌افزار در نظر
گرفته شده. برای زبان جاوااسکریپت یک گزینه‌ی مناسب،
**Mocha**
است که در ادامه بیشتر با آن آشنا خواهیم شد.


# چارچوب Mocha چیست؟

<div dir="rtl">
Mocha
یک چارچوب آزمون برای جاوااسکریپت است که روی
Node.js اجرا می‌شود.
چارچوب‌ها فرایند آزمون مفاهیم ناهمگام جاوااسکریپت
در مرورگر را آسان‌تر می‌کنند.
<sup>[۱]</sup>
</div>

# چگونه Mocha را نصب کنیم؟

اوّلاً توجّه کنید که به عنوان پیش‌نیاز باید 
Node.js
را نصب داشته‌باشید.
برای نصب Mocha روی دستگاه از دستور زیر
استفاده کنید.

```bat
$ npm install --global mocha
```

برای افزودن آن به عنوان وابستگی به پروژه،
از دستور زیر استفاده کنید.

```bat
$ npm install --save-dev mocha
```

# آغاز به کار
این گونه عمل می‌کنیم.<sup>[۱]</sup> نخست در 
خط فرمان می‌نویسیم:

```bat
$ npm install mocha
$ mkdir test
```

و در ویرایشگرمان می‌نویسیم:

```js
var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
```

و در محیط خط فرمان، با وارد کردن
دستور زیر برای ما این خروجی را تولید می‌کند.

```bat
$ ./node_modules/mocha/bin/mocha

    Array
        #indexOf()
            ✓ should return -1 when the value is not present
        
            
    1 passing (9ms)
```

سپس در پرونده‌ی package.json یک
اسکریپت برای تست می‌افزاییم:

```json
"scripts": {
    "test": "mocha"
}
```

و اکنون برای انجام آزمون کافی است در 
خط فرمان بنویسیم:

```bat
$ npm test
```

# هوک‌ها در Mocha
شش هوک در آزمایش توسط این چارچوب برای
تنظیم یا بارگذاری پیش‌شرط‌های مورد 
استفاده در آزمایش استفاده می‌شود.

<ul dir="rtl">
    <li>it</li>
    <li>describe</li>
    <li>before</li>
    <li>after</li>
    <li>beforeEach</li>
    <li>afterEach</li>
</ul>

با دو مورد نخست در مثال پیشین تا حدودی آشنا شدید.
اگرچه در ادامه‌هم بیشتر آن‌ها را توضیح خواهیم داد.
امّا پیش از اجرای test-caseها،
before اجرا می‌شود و در نهایت after پس از اجرای همه‌ی
test-caseها اجرا می‌شود.
و beforeEach و afterEach به‌ترتیب، پیش و پس از اجرای
هر کدام از test-caseها اجرا می‌شوند.
<sup>[۲]</sup>

# توضیحاتی درباره‌ی describe و it

ما برای تست هر بخش از describe استفاده می‌کنیم.
در ورودی نخست describe یک رشته می‌نویسیم که
توضیح مختصری است درباره‌ی عملکردی که داریم برایش
آزمون می‌نویسیم. در ورودی دوم یک تابع تعریف می‌کنیم
که درون آن test-caseها را می‌نویسیم. برای نوشتن
هر کدام از test-case ها از تابع it استفاده می‌کنیم.
در ورودی نخست it رشته‌ای می‌نویسیم که توضیحی
مختصر درباره‌ی test-case مربوطه و ورودی و خروجی آن
است. سپس در ورودی دومش یک تابع تعریف می‌کنیم که
آزمون مربوطه را انجام دهد.

در ادامه یک نمونه از این کار را می‌بینید که
می‌خواهد تابعی به اسم pow را
-که قرار است ورودی یکم را به توان دومی برساند-
بیازماید.<sup>[۳]</sup>

```js
describe("pow", function() {
    it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
    });

    it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
    });
});
```

# انواع آزمون‌ها در Mocha

## آزمون‌های در انتظار (Prnding Tests)

آزمون‌های pending آزمون‌هایی بدون callback
هستند. نتایج آزمون، آزمون‌های pending را هم
در بر می‌گیرند امّا به عنوان در انتظار (pending)
مشخّص می‌شوند. یک آزمون pending به عنوان شکست‌خورده
تلقّی نمی‌شود. <sup>[۱]</sup>

```js
describe('Array', function () {
  describe('#indexOf()', function () {
    // pending test below
    it('should return -1 when the value is not present');
  });
});
```

## آزمون‌های انحصاری (Exclusive Tests)
این اجازه را می‌دهد تا تنهای برخی از
test-caseها را اجرا کنیم. برای این کار
کافی است پس از it یا describe مربوطه،
only. بگذاریم. <sup>[۱]</sup>

```js
describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // this test will be run
    });

    it.only('should return the index when present', function () {
      // this test will also be run
    });

    it('should return -1 if called with a non-Array context', function () {
      // this test will not be run
    });
  });
});
```

## آزمون‌های فراگیر (Inclusive Tests)

این امکان را می‌دهد تا به Mocha بگوییم
که از اجرای برخی از test-caseها چشم
بپوشاند. برای این کار کافی است به جای
only، پس از آن skip بگذاریم.
<sup>[۱]</sup>

```js
describe('Array', function () {
  describe('#indexOf()', function () {
    it.skip('should return -1 unless present', function () {
      // this test will not be run
    });

    it('should return the index when present', function () {
      // this test will be run
    });
  });
});
```

```js
describe('Array', function () {
  describe.skip('#indexOf()', function () {
    it('should return -1 unless present', function () {
      // this test will not be run
    });
  });
})
```

## آزمون‌های چندباره‌کوش (Retry Tests)

به ما این امکان را می‌دهد تا بگوییم
یک آزمون را چندین بار انجام دهد. این
قابلیت به درد آزمون‌های سراسری (end-to-end)
می‌خورد که دسترسی به منابع دشوار باشد.
**این قابلیت برای آزمون واحد (Unit Testing) توصیه نمی‌ شود.**
<sup>[۱]</sup>

```js
describe('retries', function () {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```

# تأیید (Assertion)

<div dir="rtl">
Mocha این امکان را ارائه می‌دهد تا از هر 
کتابخانه‌ی assertion دلخواهمان استفاده کنیم.
در مثالی که قبلاً دیدید، از دستور assert که 
در Node.js به صورت built-in وجود دارد
استفاده کردیم در حالی که می‌توان از هر دستوری
که خطا پرتاب کند (throw an Error) استفاده کرد.
چندتا از کتابخانه‌هایی که به این منظور قابل
استفاده هستند عبارتند از:
</div>

<ul dir="rtl">
    <li>should.js</li>
    <li>expect.js</li>
    <li>chai</li>
    <li>better-assert</li>
    <li>unexpected</li>
</ul>

# پیکربندی mocha
موکا از فایل‌های پیکربندی،
نمونه‌ای از ابزارهای خط فرمان مدرن،
در چندین فرمت پشتیبانی می‌کند:<sup>[۱]</sup>
## فرمت JavaScript
می‌توان یک فایل mocharc.js.
ساخت و در مسیر root پروژه گذاشت و 
یک شئ
<span dir="ltr">(`module.exports = {/* ... */}`)</span>
صادر کرد که تنظیمات ما را در بر بگیرد.
## فرمت JSON
باید یک فایل mocharc.json.
ساخت و در root پروژه گذاشت.
## فرمت YAML
باید یک فایل mocharc.yaml.
در root پروژه ساخت.
## فرمت package.json
باید یک ویژگی mocha در پرونده‌ی
package.json افزود.

# ویژگی code در Errorها
هنگامی که خود Mocha استثناء را ایجاد می کند،
خطای مرتبط دارای یک ویژگی code خواهد بود. 
در صورت لزوم، مصرف کنندگان باید به جای 
تطبیق رشته‌ها با ویژگی code، ویژگی code را بررسی کنند. 
جدول زیر این کدهای خطا را توضیح می دهد:
<sup>[۱]</sup>

<table dir="ltr">
    <thead><th>Code</th><th>Description</th></thead>
    <tr><td>ERR_MOCHA_INVALID_ARG_TYPE</td><td>wrong type was passed for a given argument</td></tr>
    <tr><td>ERR_MOCHA_INVALID_ARG_VALUE</td><td>invalid or unsupported value was passed for a given argument</td></tr>
    <tr><td>ERR_MOCHA_INVALID_EXCEPTION</td><td>a falsy or otherwise underspecified exception was thrown</td></tr>
    <tr><td>ERR_MOCHA_INVALID_INTERFACE</td><td>interface specified in options not found</td></tr>
    <tr><td>ERR_MOCHA_INVALID_REPORTER</td><td>reporter specified in options not found</td></tr>
    <tr><td>ERR_MOCHA_NO_FILES_MATCH_PATTERN</td><td>test file(s) could not be found</td></tr>
    <tr><td>ERR_MOCHA_UNSUPPORTED</td><td>requested behavior, option, or parameter is unsupported</td></tr>
</table>

# افزونه
برای این ابزار، افزونه‌هایی برای IDEهای
مختلف، در نظر گرفته شده. ما این جا به معرفی 
چندتا از این ابزارها می‌پردازیم:  

<ul>
    <li><a href="https://www.jetbrains.com/idea/features/nodejs.html"
    >افزونه‌ی NodeJs plugin</a>
    برای IDEهای JetBrains مانند WebStrom
    </li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=maty.vscode-mocha-sidebar"
    >افزونه‌ی Mocha Sidebar</a>
    برای VS-code
    </li>
    
</ul>


# فهرست مراجع
<div dir="ltr" align="left">
    <ol type="1">
        <li id="res 1" name="res 1">
            <a href="https://mochajs.org/">https://mochajs.org/</a>
        </li>
        <li id="res 2" name="res 2">
            <a href="https://www.geeksforgeeks.org/introduction-to-mocha/">
            https://www.geeksforgeeks.org/introduction-to-mocha/
            </a>
        </li>
        <li id="res 3" name="res 3"><a href="https://javascript.info/testing-mocha">https://javascript.info/testing-mocha</a></li>
    </ol>
</div>
</div>
