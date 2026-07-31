<p align="center">
    <img src="jest-readme-headline.png" height="250px" alt="parse server logo">
    <br/>
تست JavaScript با JestJS
    <br/>
برنامه سازی وب، دانشگاه صنعتی شریف
    <br/>
ارائه دهنده درس: جناب آقای امید جعفری نژاد
    <br/>
نویسندگان: نگار نوبختی، ندا تقی زاده، شهاب حسینی مقدم
    
</p>

<body dir="rtl">
    
## مقدمه

<span dir = "rtl">Jest</span>
یک framework بر پایه جاواسکریپت است که توسط فیس‌بوک تولید شده و می‌توان هرگونه برنامه بر پایه جاواسکریپت مانند React و React Native را با آن تست کرد. Jest کار نوشتن تست برای Frontend را بسیار برای توسعه‌دهندگان سریع‌تر و راحت‌‌تر کرده.

از Jest می‌توان در زمینه‌هایی فراتر از Frontend استفاده کرد. قابلیت‌های Jest دیگر جنبه‌های جاواسکریپت، از جمله browser rendering، را نیز در بر دارد. با داشتن ویژگی‌هایی نظیر ماژول‌های auto-mocking، coverage thresholds و mapperها، Jest تبدیل به یک ابزار تست full-stack بسیار معروف در دسترس شده‌است.

<h2>
یادگیری jest
</h2>

<h3> شروع یادگیری</h3>
<p> در ابتدا جست را با کمک پکیج منیجر مورد علاقه خود نصب کنید</p>

<div dir='ltr'>

```
//install with npm
npm install --save-dev jest


//install with yarn
yarn add --dev jest
```

 </div>

<p>
بیایید با نوشتن یک تست برای یک تابع فرضی که دو عدد را جمع می کند شروع کنیم. ابتدا یک فایل sum.js ایجاد کنید:</p>
<p>در کدی که در ادامه مشاهده میکنید ما یک تابع داریم که دو عدد را ورودی میگیرد و آنها را با هم جمع میکند و در نهایت خروجی میدهد.</p>

<div dir='ltr'>

```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

 </div>

<p>
سپس یک فایل به نام sum.test.js ایجاد کنید. این شامل تست واقعی ما خواهد بود:</p>
<p>کدی که مشاهده میکنید در واقع داره میگه که برای مثال اگر دو عدد مانند یک و دو را با هم اگر جمع کنیم حتما خروجی مان برابر سه خواهد بود.</p>

<div dir='ltr'>

```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

 </div>

<p>
حالا در گام بعد بخش زیر را به package.json خود اضافه کنید:</p>

<div dir='ltr'>

```
{
  "scripts": {
    "test": "jest"
  }
}
```

 </div>

<p>
در نهایت، yarn test یا npm test را اجرا کنید و Jest این پیام را چاپ خواهد کرد:</p>

<div dir='ltr'>

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

 </div>

<p>
شما اولین تست خود را با استفاده از Jest با موفقیت نوشتید!

این تست دقیقا مانند آنچه که انتظارش را داشتیم بود و toBe برای آزمایش اینکه دو مقدار دقیقاً یکسان هستند استفاده میشود.

</p>

</br>

<h3> اگر بخواهیم از طریق کامند لاین اجرا کنیم:</h3>

<p>
می‌توانید Jest را مستقیماً از CLI اجرا کنید

(اگر در PATH شما به‌طور جهانی در دسترس باشد، به عنوان مثال با استفاده از yarn global add jest یا npm install jest --global) با گزینه‌های مفید متنوعی.

در اینجا نحوه اجرای Jest بر روی فایل های مطابق با my-test، با استفاده از config.json به عنوان فایل پیکربندی و نمایش اعلان سیستم عامل اصلی پس از اجرا آمده است:</p>

<div dir='ltr'>

```
jest my-test --notify --config=config.json
```

 </div>

<h3>پیکربندی اضافی    (Additional Configuration)  </h3>

<p>
یک فایل پیکربندی اولیه ایجاد کنید
بر اساس پروژه شما، Jest از شما چند سوال می پرسد و یک فایل پیکربندی اولیه با توضیحات کوتاه برای هر گزینه ایجاد می کند:</p>

<div dir='ltr'>

```
jest --init
```

 </div>

</br>

<h3> حال به نصب بابل میپردازیم</h3>
</br>

<h4>اگر بخواهید از طریق npm نصب کنید:</h4>

<div dir='ltr'>

```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

 </div>

<h4>اگر بخواهید از طریق yarn نصب کنید:</h4>

<div dir='ltr'>

```
yarn add --dev babel-jest @babel/core @babel/preset-env
```

 </div>

<p dir = "rtl">
با ایجاد یک فایل babel.config.js در root پروژه، Babel را برای هدف قرار دادن نسخه فعلی Node پیکربندی کنید:</p>

<h4 dir="ltr" >babel.config.js</h4>
<div dir='ltr'>

```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

 </div>

<div dir = "rtl">
Jest اگر روی چیز دیگری تنظیم نشده باشد، process.env.NODE_ENV را روی "test" تنظیم می کند. شما می توانید از آن در پیکربندی خود استفاده کنید تا به صورت مشروط فقط کامپایل مورد نیاز برای Jest را تنظیم کنید، به عنوان مثال:

<h4 dir="ltr" >babel.config.js</h4>

<div dir='ltr'>

```
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    // ...
  };
};
```

 </div>

</br>

<p dir = "rtl">
babel-jest به طور خودکار هنگام نصب Jest نصب می شود و اگر پیکربندی babel در پروژه شما وجود داشته باشد، به طور خودکار فایل ها را تغییر می دهد. برای جلوگیری از این رفتار، می توانید به صراحت گزینه پیکربندی تبدیل را بازنشانی کنید:</p>

<h4 dir="ltr" >jest.config.js
</h4>

<div dir='ltr'>

```
module.exports = {
  transform: {},
};
```

 </div>

<h4>بسته وب  (webpack) </h4>
<p dir = "rtl">
Jest را می توان در پروژه هایی استفاده کرد که از بسته وب برای مدیریت دارایی ها، سبک ها و کامپایل استفاده می کنند. وب پک چالش های منحصر به فردی را نسبت به سایر ابزارها ارائه می دهد   .</p>

</br>

<h4>با استفاده از Vite</h4>
<p dir = "rtl">
Jest می‌تواند در پروژه‌هایی استفاده شود که از vite برای ارائه کد منبع بر روی ESM بومی استفاده می‌کنند تا برخی از ابزارهای فرانت‌اند را ارائه دهند، vite یک ابزار نظری است و گردش‌های کاری خارج از جعبه را ارائه می‌دهد. Jest به دلیل نحوه عملکرد سیستم پلاگین از vite به طور کامل توسط vite پشتیبانی نمی شود</p>

</br>

<h3>با استفاده از TypeScript</h3>

<h4>از طریق بابل</h4>

<p dir = "rtl">Jest از TypeScript از طریق Babel پشتیبانی می کند. ابتدا، مطمئن شوید که دستورالعمل‌های استفاده از Babel را در بالا دنبال کرده‌اید. سپس،  babel/preset-typescript را نصب کنید:</p>

<div dir='ltr'>

```
//install with npm
npm install --save-dev @babel/preset-typescript
```

 </div>

<div dir='ltr'>

```
//install with yarn
yarn add --dev @babel/preset-typescript
```

 </div>

<p dir = "rtl">
سپس  babel/preset-typescript را به لیست از پیش تنظیم‌ها در babel.config.js خود اضافه کنید.</p>

<h4 dir="ltr">
babel.config.js
</h4>
<div dir='ltr'>

```
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

 </div>

</br>

<p>
با این حال، برخی اخطارها برای استفاده از TypeScript با Babel وجود دارد. از آنجایی که پشتیبانی TypeScript در Babel صرفاً ترجمه است، Jest تست‌های شما را در حین اجرا بررسی نمی‌کند. اگر می خواهید، می توانید به جای آن از ts-jest استفاده کنید یا فقط کامپایلر TypeScript tsc را به طور جداگانه (یا به عنوان بخشی از فرآیند ساخت خود) اجرا کنید.</p>

</br>
<h3>از طریق ts-jest</h3>
<p dir = "rtl">ts-jest یک پیش پردازنده TypeScript با پشتیبانی از نقشه منبع برای Jest است که به شما امکان می دهد از Jest برای آزمایش پروژه های نوشته شده در TypeScript استفاده کنید.</p>

<div dir='ltr'>

```
//install with npm
npm install --save-dev ts-jest
```

 </div>

<div dir='ltr'>

```
//install with yarn
yarn add --dev ts-jest
```

 </div>

<p dir = "rtl">
و API های آزمایشی را از آن وارد کنید:</p>

<h4 dir="ltr">sum.test.ts</h4>

<div dir='ltr'>

```
import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

 </div>

<p dir = "rtl">
@types/jest یک کتابخانه شخص ثالث است که در DefinitelyTyped نگهداری می‌شود، از این رو ممکن است آخرین ویژگی‌ها یا نسخه‌های Jest هنوز پوشش داده نشده باشند. سعی کنید تا حد امکان نسخه‌های Jest و @types/jest را مطابقت دهید. به عنوان مثال، اگر از Jest 27.4.0 استفاده می کنید، نصب 27.4.x از @types/jest ایده آل است.</p>

</br>
</br>

<h3>
استفاده از Matchers</h3>

<p dir = "rtl">Jest از "Matchers" استفاده می کند تا به شما امکان می دهد مقادیر را به روش های مختلف آزمایش کنید.</p>

</br>

<h4 dir = "rtl">Matchers های رایج </h4>

<p>ساده ترین راه برای آزمایش یک مقدار، برابری دقیق است.
</p>

<div dir='ltr'>

```
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

 </div>

</br>

<p>
در این کد، expect(2 + 2) یک شی "expectation" را برمی گرداند. شما معمولاً با این اشیاء مورد انتظار کار زیادی انجام نمی دهید به جز تطبیق دهنده های فراخوان. در این کد،  toBe(4) تطبیق دهنده است. وقتی Jest اجرا می‌شود، همه تطابق‌های ناموفق را ردیابی می‌کند تا بتواند پیام‌های خطای خوبی را برای شما چاپ کند.
toBe از Object.is برای آزمایش برابری دقیق استفاده می کند. اگر می خواهید مقدار یک شی را بررسی کنید، به جای آن از toEqual یا toStrictEqual استفاده کنید:
</p>

<div dir='ltr'>

```
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

 </div>
<span dir = "rtl"> toEqual </span>
به صورت بازگشتی هر فیلد یک شی یا آرایه را بررسی می کند.

<p>استفاده از toStrictEqual بر استفاده از toEqual ترجیح داده می شود. toEqual به سادگی مقادیر تعریف نشده را نادیده می گیرد، در حالی که toStrictEqual آنها را در نظر می گیرد.</p>

<h3>
حقیقیت (Truthiness)</h3>
<p>
در تست‌ها، گاهی اوقات لازم است بین تعریف نشده، تهی و نادرست (undefined, null, and false) تمایز قائل شوید، اما گاهی اوقات نمی‌خواهید با این موارد متفاوت رفتار کنید. Jest حاوی کمک‌هایی است که به شما اجازه می‌دهند در مورد آنچه می‌خواهید صریح باشید.
</p>

<ul dir = "rtl">

<li>toBeNull فقط با null مطابقت دارد
</li>

<li>انطباق toBeUndefined فقط تعریف نشده است
</li>

<li>toBeDefined برعکس toBeUndefined است
</li>

<li>toBeTruthy هر چیزی را که یک عبارت if درست تلقی می کند مطابقت می دهد
</li>

<li>toBeFalsy هر چیزی را که یک عبارت if به عنوان نادرست تلقی می کند مطابقت می دهد
</li>

</ul>

<p>
برای مثال</p>

<div dir='ltr'>

```
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

 </div>

</br>

<h3>
شماره  (Numbers)</h3>

<p>بیشتر روش‌های مقایسه اعداد دارای معادل‌های همسان هستند.</p>

<div dir='ltr'>

```
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

 </div>

<p>برای برابری ممیز شناور، به جای toEqual از toBeCloseTo استفاده کنید، زیرا نمی خواهید یک تست به یک خطای گرد کردن کوچک بستگی داشته باشد.</p>

<div dir='ltr'>

```
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

 </div>

</br>

<h3> رشته ها 
(Strings) </h3>

<p>با toMatch می‌توانید رشته‌ها را در برابر عبارات منظم بررسی کنید:</p>

<div dir='ltr'>

```
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

 </div>

</br>

<h3 > آرایه ها و تکرارپذیرها   (Arrays and iterables)
  </h3>

<p>با استفاده از toContain می‌توانید بررسی کنید که آیا یک آرایه یا تکرار دارای یک آیتم خاص است:</p>

<div dir='ltr'>

```
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```

 </div>

</br>
<h3>استثناها (Exceptions) </h3>
<p>اگر می خواهید آزمایش کنید که آیا یک تابع خاص هنگام فراخوانی خطا می دهد یا خیر، از toThrow استفاده کنید.</p>

<div dir='ltr'>

```
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error mesage using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

 </div>

<p>تابعی که یک استثنا ایجاد می کند باید در یک تابع پیچیده فراخوانی شود در غیر این صورت ادعای toThrow ناموفق خواهد بود.</p>

</br></br>

<h3>  تست کد ناهمزمان (Testing Asynchronous Code) 
</h3>

<p>در جاوا اسکریپت معمول است که کد به صورت ناهمزمان اجرا شود. وقتی کدی دارید که به‌صورت ناهمزمان اجرا می‌شود، Jest باید بداند که کدی که آزمایش می‌کند چه زمانی کامل شده است، قبل از اینکه بتواند به آزمایش دیگری برود. Jest راه های مختلفی برای رسیدگی به این موضوع دارد.</p>

</br>
<h4> وعده ها (Promises)
 </h4>

<p>
یک قول را از تست خود برگردانید، و Jest منتظر خواهد ماند تا آن وعده حل شود. اگر قول رد شود، آزمون ناموفق خواهد بود.

به عنوان مثال، فرض کنید که fetchData وعده ای را برمی گرداند که قرار است به رشته «peanut butter» حل شود. ما می توانیم آن را با:</p>

<div dir='ltr'>

```
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

 </div>

</br>

<h4 dir = "rtl">Async/Await</h4>

<p>
از طرف دیگر، می توانید از async استفاده کنید و در تست های خود منتظر بمانید. برای نوشتن یک تست async، از کلمه کلیدی async در مقابل تابعی که برای تست ارسال شده است استفاده کنید. به عنوان مثال، همان سناریوی fetchData را می توان تعریف کرد:</p>

<div dir='ltr'>

```
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

 </div>

<p>
می توانید async و await را با .resolves یا .rejects ترکیب کنید.</p>

<div dir='ltr'>

```
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```

 </div>

<p>
اگر انتظار دارید وعده ای  رد شود، از روش .catch استفاده کنید. اطمینان حاصل کنید که expect.assertions را اضافه کرده اید تا تأیید شود که تعداد معینی از ادعاها فراخوانی شوند، در غیر این صورت، یک وعده اوکی شده در آزمون شکست نمی خورد.

</p>

<div dir='ltr'>

```
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

 </div>

</br>

<h3  dir = "rtl"> Callbackها</h3>

<p>
اگر از وعده ها استفاده نمی کنید، می توانید از callbacks استفاده کنید. به عنوان مثال، فرض کنید که fetchData، به جای بازگشت یک وعده، انتظار یک تماس را دارد، یعنی برخی از داده ها را واکشی می کنند و پس از تکمیل آن، callback(null, data) را فرا می خواند. می‌خواهید تست کنید که این داده‌های برگشتی رشته «peanut butter» است.

به‌طور پیش‌فرض، آزمایش‌های Jest پس از پایان اجرای خود کامل می‌شوند. این بدان معناست که این تست آنطور که در نظر گرفته شده کار نخواهد کرد:

</p>

<div dir='ltr'>

```
// Don't do this!
test('the data is peanut butter', () => {
  function callback(error, data) {
    if (error) {
      throw error;
    }
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

 </div>

<p>مشکل این است که به محض تکمیل fetchData، قبل از تماس مجدد، تست کامل می شود.

یک نوع تست جایگزین وجود دارد که این مشکل را برطرف می کند. به جای قرار دادن تست در یک تابع با آرگومان خالی، از یک آرگومان منفرد به نام done استفاده کنید. Jest منتظر می ماند تا قبل از اتمام تست تماس انجام شده فراخوانی شود.</p>

<div dir='ltr'>

```
test('the data is peanut butter', done => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

 </div>

<p>اگر ()done هرگز فراخوانی نشود، تست شکست خواهد خورد (با خطای timeout)، که می‌خواهید اتفاق بیفتد.

اگر دستور expect با شکست مواجه شود، یک خطا ایجاد می کند و ()done فراخوانی نمی شود. اگر بخواهیم در لاگ تست ببینیم که چرا شکست خورده است، باید انتظار را در یک بلوک try بپیچیم و خطای موجود در بلوک catch را به انجام بدهیم. در غیر این صورت، با یک خطای زمان مات مواجه می‌شویم که نشان نمی‌دهد چه مقداری توسط expect(data) دریافت شده است.</p>

</br>
</br>
<h3 dir="rtl">.resolves / .rejects</h3>

<p> 
شما همچنین می توانید از تطبیق .resolves در عبارت انتظار خود استفاده کنید و Jest منتظر خواهد ماند تا این وعده حل شود. اگر وعده رد شود، تست به طور خودکار ناموفق خواهد بود.</p>

<div dir='ltr'>

```
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

 </div>

<div dir="rtl">

## تنظیم و جمع آوری

گاهی در هنگام تست کردن، لازم است که برخی تنظیمات را قبل از شروع تست انجام دهیم و یا بعد از پایان یافتن تست ها، کاری بکنیم.
Jest توابع کمک کننده ای برای این کار ها در اختیار شما قرار می دهد.

### تنظیم تکرار شونده

اگر کارهایی هست که مکررا باید قبل و بعد تست ها انجام دهید، میتوانید از قلاب های
`beforeEach` و `afterEach`
استفاده کنید.

<span dir="ltr"></span>

مثلا، فرض کنید که چند تست دارید که قرار است با یک پایگاه داده از شهرها در تعامل باشد.
شما باید قبل از هر تست تابع
<span dir="ltr">initializeCityDatabase() </span>
را صدا بزنید، و وقتی که تست انجام شد، باید تابع
<span dir="ltr">clearCityDatabase()</span>
را صدا بزنید تا تغییرات انجام شده در تست را پاک کند.
این کار را میتوانید به صورت زیر انجام دهید:

<div dir="ltr">

```javascript
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
```

</div>

`beforeEach` و `afterEach`
میتوانند همانند تست ها، کد آسنکرون را اجرا کنند -
یعنی میتوانند یا یک پارامتر
done
بگیرند یا یک promise برگردانند.
به عنوان مثال اگر تابع `initializeCityDatabase` یک promise برگرداند که وقتی دیتابیس شروع به کار کرد reslove شود،
ما باید promise را برگردانیم:

<div dir="ltr">

```javascript
beforeEach(() => {
  return initializeCityDatabase();
});
```

</div>

### تنظیمات یک-باره

در بعضی از حالات، لازم است که یک بار تنظیمات را در ابتدای فایل انجام دهیم.
این کار میتواند دردسرزا باشد مخصوصا اگر تنظیمات آسنکرون باشند، چون نمیتوان به صورت inline آنها را انجام داد.
در این شرایط میتوان از قلاب های `beforeAll` و `afterAll` استفاده کرد.

به عنوان مثال اگز هر توابع `initializeCityDatabase` و `clearCityDatabase` هردو promise برگرداندند،
و پایگاه داده شهر ها میتوانست بین تست ها مشترکا استفاده شود، میتوانیم کد تست را به صورت زیر تغییر دهیم:

<div dir="ltr">

```javascript
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
```

</div>

### دید

قلاب های سظح بالای `before` و `after` بر روی تمام تست های فایل اعمال میشوند.
قلاب هایی که در بلوک `descibe` تعریف شده باشند تنها بر روی تست هایی که در همان بلوک `describe` هستند تعریف میشوند.

به طور مثال، فرض کنید که علاوه بر پایگاه داده شهر، یک پایگاه داده غذا هم داشتیم.
در این شرایط میتوانستیم برای تست های مختلف، تنظیمات مختلف انجام دهیم:

<div dir="ltr">

```javascript
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test("Vienna <3 veal", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
```

</div>

توجه داشته باشید که `beforeEach` در سطح بالا، قبل از `beforeEach` داخل بلوک `descibe` اجر میشود.
کد زیر میتواند ترتیب اجرای قلاب ها را به خوبی نمایش دهد:

<div dir="ltr">

```javascript
beforeAll(() => console.log("1 - beforeAll"));
afterAll(() => console.log("1 - afterAll"));
beforeEach(() => console.log("1 - beforeEach"));
afterEach(() => console.log("1 - afterEach"));

test("", () => console.log("1 - test"));

describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));

  test("", () => console.log("2 - test"));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

</div>

### ترتیب اجرا

<span dir = "rtl"> Jest </span>
، تمام هندلر های describe یک فایل تست را
<i>قبل</i>
از تست ها اجرا میکند.
به همین دلیل، بهتر است که تنظیم و جمع آوری تست ها در هندلر های `before` و `after` انجام شود،
به جای این که در بلوک `describe` باشد.
وقتی که بلوک های `describe` کامل شدند، Jest به طور پیش فرض، تمام تست ها را به صورت متوالی به ترتیبی که به آنها
بر بخورد، اجرا خواهد کرد، برای هر یک از آنها منتظر خواهد ماند که تمام شوند و اثرشان پاک شود، سپس سراغ تست بعدی می رود.

برای درک بهتر این ترتیب، به تست زیر دقت کنید:

<div dir="ltr">

```javascript
describe("describe outer", () => {
  console.log("describe outer-a");

  describe("describe inner 1", () => {
    console.log("describe inner 1");

    test("test 1", () => console.log("test 1"));
  });

  console.log("describe outer-b");

  test("test 2", () => console.log("test 2"));

  describe("describe inner 2", () => {
    console.log("describe inner 2");

    test("test 3", () => console.log("test 3"));
  });

  console.log("describe outer-c");
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3
```

</div>
    
<span dir = "rtl">Jest</span>
، قلاب های `before` و `after` را مثل مثل بلوک های `describe` و `test` به ترتیب تعریف شدنشان فراخوانی می کند.
توجه داشته باشید که قلاب های `after` دیدی که در آن قرار دارند، زودتر فراخوانی می شوند.
به طور مثال، به صورت زیر می توانید منابعی را که به یک دیگر نیاز دارند تنظیم و جمع آوری کنید:

<div dir="ltr">

```javascript
beforeEach(() => console.log("connection setup"));
beforeEach(() => console.log("database setup"));

afterEach(() => console.log("database teardown"));
afterEach(() => console.log("connection teardown"));

test("test 1", () => console.log("test 1"));

describe("extra", () => {
  beforeEach(() => console.log("extra database setup"));
  afterEach(() => console.log("extra database teardown"));

  test("test 2", () => console.log("test 2"));
});

// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown
```

</div>

### توصیه های عمومی

اگر تستی رد می شود، قبل از هر کاری باید چک کنیم که آیا آن تست وقتی به تنهایی اجرا شود هم رد می شود یا خیر.
برای این که فقط یک تست را اجرا کنیم، میتوانیم دستور `test` را به طور موقت با دستور `test.only` جایگزین کنیم:

<div dir="ltr">

```javascript
test.only("this will be the only test that runs", () => {
  expect(true).toBe(false);
});

test("this test will not run", () => {
  expect("A").toBe("A");
});
```

</div>

اگر تستی دارید که معمولا وقتی در کنار تست های دیگر اجرا می شود، رد می شود، ولی وقتی به تنهایی آن را اجرا کنید رد نمی شود،
میتوان حدس زد که تست دیگری وجود دارد که با آن تست تداخل دارد.
این مشکل را معمولا میتوان با پاک کردن برخی داده ها که با `beforeEach` مشترک است رفع کرد.
اگر مطمپن نیستید که آیا چنین تداخلی وجود دارد یا خیر، میتوانید `beforeEach`، لاگ بگیرید

## توابع قلابی

با استفاده از توابع قلابی می توانید با پاک کردن بدنه تابع، ارتباطات بین قسمت های مختلف کد را بررسی کنید،
فراخوانی های تابع را به همراه پارامتر های آن بررسی کنید، توابع constructor فراخوانی شده را پیدا کنید،
و در هنگام تست، مقادیر برگردانده شده توسط تابع را تنظیم کنید.

دو راه برای قلابی سازی توابع وجود دارد:
یا ساختتن یک تابع قلابی برای استفاده در تست، یا نوشتن یک `manual mock` برای بازنویسی وابستگی به یک ماژول.

### استفاده از تابع قلابی

فرض کنید که می خواهیم تابع `forEach` را تست کنیم که به ازای هر یک از عناصر آرایه ای که به آن داده شده است،
یک callback را صدا می زند.

<div dir="ltr">

```javascript
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

</div>

برای تست کردن این تابع می توانیم از یک تابع قلابی استفاده کنیم، سپس بررسی کنیم که آیا callback به درستی صدا زده شده یا خیر:

<div dir="ltr">

```javascript
const forEach = require("./forEach");

const mockCallback = jest.fn((x) => 42 + x);

test("forEach mock function", () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

</div>

### صفت mock.

تمام توابع قلابی یک صفت ویژه به نام `mock.` دارند که اطلاعاتی در مورد این که تابع چگونه صدا زده شده و
چیزی برگردانده را در خود نگه می دارد. همچنین این صفت، مقدار `this` را برای هر فراخوانی نگه می دارد.
پس میتوان چیز هایی مانند مثال زیر را بررسی کرد:

<div dir="ltr">

```javascript
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]
```

</div>

همان طور که گفته شد، با استفاده از این ويژگی می توان نحوه صدا زده شدن توابع، ایجاد شدن آنها و نتیچه ی برگشته شده از آنها را بررسی کرد:

<div dir="ltr">

```javascript
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe("return value");

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe("test");

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe("test");
```

</div>

### نتیجه قلابی تابع

با استفاده از توابع قلابی،‌ می توان مقادیری را برای تست کردن به کد وارد کرد:

<div dir="ltr">

```javascript
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

</div>

توابع قلابی در کدهایی که به طور مستمر پارامتر ها را به تابع تحویل می دهند هم مثمر ثمر هستند.
برای کد هایی با این ویژگی، تست نوشتن راحت تر است چون لازم نیست برای شبیه سازی عمل کرد کد کار زیادی بکنیم،
در عوض، مقداری که تابع قرار است برگرداند را در همانجا که لازم داریم به طور مستقیم وارد کد می کنیم:

<div dir="ltr">

```javascript
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter((num) => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```

</div>

در اکثر استفاده های واقعی، شما می خواهید که یک تابع قلابی از کامپوننتی وابسته داشته باشید و آن را تنظیم کنید، ولی روش کار مشابه همین کار است.
در این شرایط بهتر است تا جای ممکن در توابعی که به طور مستقیم آن ها را تست نمی کنید، هیچ گونه منطقی پیاده نکنید.

### ماژول قلابی

فرض کنید کلاسی داریم که کاربران را از API فراخوانی می کند. این کلاس با استفاده از
[axios](https://github.com/axios/axios)
API را صدا می کند و صفت
`data` که شامل تمام کاربران است را بر می گرداند:

<div dir="ltr">

```javascript
// users.js:
import axios from "axios";

class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

export default Users;
```

</div>

حال، برای این که این تابع را بدون وصل شدن به API
(که باعث کند و نامطمین شدن تست ها می شود)،
می توانیم از تابع
<span dir = "ltr">
`jest.mock(...)`
</span>
استفاده کنیم تا یک نمونه قلابی از ماژول axios داشته باشیم.

با داشتن ماژول قلابی، می توانیم یک mockResolvedValue برای
<span dir = "ltr"> `.get`</span>
داشته باشیم که بتوانیم نتیجه تست را با آن مقایسه کنیم.
در حقیقت، می خواهیم که
<span dir = "ltr"> `axios.get('/users.json')`</span>
یک پاسخ قلابی برگرداند.

<div dir="ltr">

```javascript
// users.test.js:
import axios from "axios";
import Users from "./users";

jest.mock("axios");

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then((data) => expect(data).toEqual(users));
});
```

</div>
    
### partial های تقلبی

می توان قسمت هایی از ماژول را با کد قلابی عوض کرد در حالی که مابقی ماژول دست نخورده باقی بماند.

<div dir="ltr">

```javascript
// foo-bar-baz.js:
export const foo = "foo";
export const bar = () => "bar";
export default () => "baz";
```

</div>

<div dir="ltr">

```javascript
//test.js
import defaultExport, { bar, foo } from "../foo-bar-baz";

jest.mock("../foo-bar-baz", () => {
  const originalModule = jest.requireActual("../foo-bar-baz");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe("mocked baz");
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
```

</div>

### پیاده سازی قلابی

گاهی وقت ها نیاز است که به جای تغییر دادن مقدار بازگشتی تابع تقلبی، پیاده سازی دیگری به جای آن بگذاریم.
این کار را می توان با
<span dir = "ltr"> </span>
یا
بر روی توابع قلابی انجام داد.

<div dir="ltr">

```javascript
const myMockFn = jest.fn((cb) => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

</div>

<div dir="ltr">

```javascript
// foo.js:
module.exports = function () {
  // some implementation;
};
```

</div>

از `mockImplementation` می توان برای تابع قلابی که قرار است در یک ماژول دیگر ساخته شود، پیاده سازی پیش فرض تعیین کرد.

<div dir="ltr">

```javascript
// test.js:
jest.mock("../foo"); // this happens automatically with automocking
const foo = require("../foo");

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

</div>

وقتی نیاز است که رفتار تابع تقلبی را در شرایطی پیچیده بررسی کنید، مثلا وقتی که چند بار صدا زده شدن تابع چند خروجی متفاوت داشته باشد،
می توانید از متد `mockImplementationOnce` استفاده کنید.

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

</div>

وقتی تمام پیاده سازی هایی که با `mockImplementationOnce` تعریف کرده ایم تمام شوند، از دفعه بعد، پیاده سازی پیش فرض که با
`jest.fn` (در صورتی که وجود داشته باشد):

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn(() => "default")
  .mockImplementationOnce(() => "first call")
  .mockImplementationOnce(() => "second call");

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

</div>

برای حالاتی که متد ها به صورت زنجیره ای فراخوانی می شوند (و همواره نیاز دارند که `this`) را برگردانند، می توان به راحتی از
<span dir="ltr">`.mockReturnThis()`</span>
استفاده کرد که در API ارایه شده برای همه توابع تقلبی وجود دارد.

<div dir="ltr">

```javascript
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```

</div>

### نام های تقلبی

اگر بخواهید، می توانید برای توابع قلابی، نام بگذارید. این نام به جای
<span dir="ltr">`jest.fn`</span>
در خروجی error ها نشان داده خواهد شد.
اگر می خواهید به راحتی تابع قلابی که خطا می دهد را شناسایی کنید، از
<span dir="ltr"> `.mockName()`</span>
استفاده کنید.

<div dir="ltr">

```javascript
const myMockFn = jest
  .fn()
  .mockReturnValue("default")
  .mockImplementation((scalar) => 42 + scalar)
  .mockName("add42");
```

</div>

### Custom Matchers

برای این که راحت تر بتوانیم assert کنیم که توابع قلابی چگونه صدا شده اند، می توانیم از custom matcher ها استفاده کنیم:

<div dir="ltr">

```javascript
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```

</div>

با استفاده از این mathcer ها می توان به راحتی صفت
<span dir="ltr">`.mock`</span>
را بررسی کرد.
البته اگر می خواهید چیز خاصی را چک کنید یا به این نحوه نگارش عادت ندارید، می توانید این کار را به صورت دستی انجام دهید.

<div dir="ltr">

```javascript
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe("a mock name");
```

</div>

برای مشاهده لیست کاملی از matcher ها، می توانید به
[مستندات](https://jestjs.io/docs/expect)
مراجعه کنید.

## زمانبندهای قلابی

توابع زمانبند موجود در جاواسکریپت (setTimeout، setInterval،...) وابسته به گذر واقعی زمان هستند و عملکرد آنها برای محیط تست مناسب نیست. Jest می‌تواند این توابع را با توابع دیگری که می‌توانند گذر زمان را کنترل کنند جایگزین کند. به این توابع جایگزین به اصطلاح "fake timer" می‌گویند.

استفاده از این توابع با استفاده از `jest.useFakeTimers()` انجام می‌شود. در مثال زیر نمونه کد اولیه‌ای از فعالسازی زمانبندهای قلابی است.

<div dir="ltr">

```js
function timerGame(callback) {
  console.log("Ready....go!");
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("waits 1 second before ending the game", () => {
  const timerGame = require("../timerGame");
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

</div>

### اجرای تمامی زمانبندها

مثال بخش قبل را در نظر بگیرید. این بار یک تابع callback را به `timerGame` ارسال می‌کنیم. میخواهیم تستی بنویسیم که از فراخوانی callback پس از یک ثانیه اطمینان حاصل کنیم.

از `runAllTimers` استفاده می‌کنیم تا در میانه تست زمان را به سرعت جلو ببریم.

<div dir="ltr">

```js
jest.useFakeTimers();
test("calls the callback after 1 second", () => {
  const timerGame = require("../timerGame");
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

</div>

نحوه عملکرد `runAllTimers` بدین صورت است که تمامی macrotaskها (تسک‌های async ناشی از setTimeout و setInterval) و microtaskها (تسک‌های async ناشی از promiseها) را اجرا می‌کند. حتی اگر این تسک‌ها تسک جدیدی را ایجاد کنند، آنها را نیز اجرا می‌کند تا callback queue خالی شود.

### اجرای زمانبندهای در انتظار

در حالت‌هایی که یک زمانبند بازگشتی داشته باشیم (زمانبندی که در callback خود زمانبند دیگری را تنظیم می‌کند) اجرای تمامی این زمانبندها منجر به یک چرخه بی‌انتها می‌شود.

در این حالت برای رفع مشکل از `runOnlyPendingTimers` استفاده می‌کنیم. تفاوت `runOnlyPendingTimers` با `runAllTimers` در این است که تنها تسک‌هایی را که تا لحظه فراخوانی آن در callback queue بوده‌اند را اجرا می‌کند و اگر هر تسک، تسک جدیدی را به صف اضافه کند، آن را اجرا نمی‌کند.

مثال:

<div dir="ltr">

```js
function infiniteTimerGame(callback) {
  console.log("Ready....go!");

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```js
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("infiniteTimerGame", () => {
  test("schedules a 10-second timer after 1 second", () => {
    const infiniteTimerGame = require("../infiniteTimerGame");
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // At this point in time, there should have been a single call to
    // setTimeout to schedule the end of the game in 1 second.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    jest.runOnlyPendingTimers();

    // At this point, our 1-second timer should have fired its callback
    expect(callback).toBeCalled();

    // And it should have created a new timer to start the game over in
    // 10 seconds
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```

</div>

### پیش‌برد زمانبندها براساس زمان

یک گزینه دیگر برای کنترل بیشتر بر زمانبند‌ها استفاده از تابع `jest.advanceTimersByTime(msToRun)` است. هنگام فراخوانی این تابع تمامی زمانبندها به مقدار `msToRun` پیشروی می‌کنند. در این بازه زمانی، تمامی macrotaskهای درون task queue و دیگر macrotaskهای ناشی از آنها اجرا می‌شوند.

<div dir="ltr">

```js
function timerGame(callback) {
  console.log("Ready....go!");
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
jest.useFakeTimers();
it("calls the callback after 1 second via advanceTimersByTime", () => {
  const timerGame = require("../timerGame");
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

</div>

### تخلیه زمانبندها

گاهی ممکن است در تست‌ها مفید باشد که تمامی زمانبندها را متوقف کنیم. در این هنگام از تابع `jest.clearAllTimers()` استفاده می‌کنیم.

## snapshot testing

<span dir = "rtl">snapshot test</span>
مقوله‌ای است که معمولا در تست کردن UI برنامه‌ها استفاده می‌شود و ابزاری است برای اطمینان از اینکه در UI برنامه تغییر غیرمنتظره‌ای ایجاد نمی‌شود.

به طور معمولا یک تست snapshot از فایل snapshotای که از قبل از یک کامپوننت ذخیره شده به عنوان مرجع استفاده می‌کند. پس از render شدن کامپوننت، یک snapshot دیگر از آن گرفته می‌شود و با فایل snapshot قبلی مقایسه می‌شود. در صورتی که این دو snapshot مشابه یکدیگر نباشند، تست با شکست مواجه می‌شود.

### مثال snapshot testing

مثالی از استفاده از snapshot testing با jest را در React به نمایش می‌گذاریم. از پکیچی به نام test renderer متعلق به React استفاده می‌کنیم تا به جای بارگذاری کل برنامه، که بار زیادی را ایجاد می‌کند، تنها کامپوننت مورد نظر را بارگذاری کنیم.

کامپوننت Link را در نظر بگیرید:

<div dir="ltr">

```js
import { useState } from "react";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

export default function Link({ page, children }) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
```

</div>

می‌توان تست snapshot زیر را برای این کامپوننت نوشت:

<div dir="ltr">

```js
import renderer from "react-test-renderer";
import Link from "../Link";

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

</div>

بار اولی که این تست اجرا شود فایل snapshot مرجع ایجاد می‌شود. در دفعات بعد jest این فایل را با خروجی render مقایسه می‌کند. شکست خوردن تست به این معنا است که پیاده سازی این کامپوننت به طور غیرمنتظره‌ای تغییر کرده یا خطایی در render این کامپوننت وجود داشته.

> هشدار:warning:: فایل snapshot ایجاد شده باید همراه پروژه کامیت شود! مخصوصا که از نسخه 20 به بعد Jest فرایند تولید اتوماتیک snapshot در CI انجام نمی‌شود.

### نکات تکمیلی

#### 1. با تست snapshot مانند کد برخورد کنید

بهتر است کامیت‌های مربوط به آنها بازبینی شوند. snapshotها باید کوتاه و متمرکز باشند و تحت تست‌هایی با استفاده از ابزارهایی مانند eslint قرار گیرند.

#### 2. تست‌های snapshot باید قطعی باشند

هربار اجرای تست بر کامپوننتی که تغییری نکرده باید نتیجه یکسان بدهد. در صورت استفاده از توابع غیرقطعی مانند `Date.now()` می‌توان آنها را Mock کرد.

#### 3. تست snapshot جایگزین unit test نیست

علاوه بر این با سیسات‌های test-driven development نیز سازگار نیست.

## تغییر DOM

وظیفه نوعی از توابع ایجاد نوعی تغییر در DOM است. این نوع تست‌ها می‌توانند چالش برانگیز باشند. این توابع ممکن است عملیات Async انجام دهند یا فراخوانی به دیگر توابعی داشته باشند که عملکرد آنها نیاز به mock داشته باشد.

یک مثال را بررسی می‌کنیم. نمونه

<div dir="ltr">

```js
"use strict";

const $ = require("jquery");
const fetchCurrentUser = require("./fetchCurrentUser.js");

$("#button").click(() => {
  fetchCurrentUser((user) => {
    const loggedText = "Logged " + (user.loggedIn ? "In" : "Out");
    $("#username").text(user.fullName + " - " + loggedText);
  });
});
```

</div>

در این مثال پس کلیک از یک رخداد کلیک، داده‌هایی به صورت async دریافت می‌شوند و سپس محتوای یک المان تغییر می‌کند.

می‌توان تستی به شکل زیر را برای آن نوشت.

<div dir="ltr">

```js
"use strict";

jest.mock("../fetchCurrentUser");

test("displays a user after a click", () => {
  // Set up our document body
  document.body.innerHTML =
    "<div>" +
    '  <span id="username" />' +
    '  <button id="button" />' +
    "</div>";

  // This module has a side-effect
  require("../displayUser");

  const $ = require("jquery");
  const fetchCurrentUser = require("../fetchCurrentUser");

  // Tell the fetchCurrentUser mock function to automatically invoke
  // its callback with some data
  fetchCurrentUser.mockImplementation((cb) => {
    cb({
      fullName: "Johnny Cash",
      loggedIn: true,
    });
  });

  // Use jquery to emulate a click on our button
  $("#button").click();

  // Assert that the fetchCurrentUser function was called, and that the
  // #username span's inner text was updated as we'd expect it to.
  expect(fetchCurrentUser).toBeCalled();
  expect($("#username").text()).toBe("Johnny Cash - Logged In");
});
```

</div>

در این تست تابع `fetchCurrentUser` تقلید شده است تا به جای یک درخواست واقعی به شبکه، داده‌ها به صورت محلی دریافت شوند.

همچنین تابعی که آن را تست می‌کنیم به DOM ارجاع دارد. به همین دلیل لازم است که DOM را به درستی پیاده‌سازی کرده باشیم.

</div>
