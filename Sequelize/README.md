<div dir="rtl" style="font-family:Amiri">
<link href='https://fonts.googleapis.com/css?family=Amiri' rel='stylesheet'>
<div dir="rtl" align='right'>

# Sequelize
</div>

## پیش‌گفتار
معمولاً برای ذخیره و بازیابی داده‌ها از برنامه‌هایی
موسوم به «پایگاه داده» استفاده می‌کنیم. این اطلاعات توسط یک برنامه‌ی پایگاه داده
مدیریت می‌شوند و توسط یک زبان معمولاً SQL می‌توانیم به آن‌ها در قالب جداولی دسترسی
بیابیم. امّا ما در برنامه‌ی خود داده‌ها را به صورت جدولی نمی‌خواهیم بلکه به صورت
تعدادی شئ (object) و مطابق زبان برنامه‌نویسی مورد استفاده‌ی خود می‌خواهیم
از این رو استفاده از پایگاه داده و اتّصال آن به برنامه‌ی اصلی، کمی پیچیده می‌شود
و در این مقاله، به معرّفی راهکاری برای ساده‌سازی پیاده‌سازی این ارتباط می‌پردازیم.

## سیکوئلایز (Sequelize) چیست؟
سیکوئلایز ماژولی متن‌باز برای Node.js است که کار با
پایگاه‌داده‌های رابطه‌ای را برای برنامه‌نویسان جاوااسکریپت ساده‌تر می‌سازد. پایگاه‌داده‌هایی که پشتیبانی می‌کند شامل SQLite و PostgreSQL و MySQL و ...
می‌شوند. <sup>[۲]</sup>


## مزایای استفاده از Sequelize
اجازه دهید پیش از این که به سراغ بیان فهرست‌وار مزایا برویم، با یک مثال
خودتان ببینید. فرض کنید ما در برنامه‌مان یک کلاس مقاله 
با نام Article می‌خواهیم داشته‌باشیم که ویژگی‌هایی از جمله
title و content دارد. روش پیاده‌سازی آن را بی و با استفاده از 
Sequelize در ادامه می‌بینیم و شما می‌توانید مقایسه‌شان کنید.

### مثال پیاده‌سازی عادّی (بی استفاده از Sequelize)<sup>[۲]</sup>
نخست باید در برنامه‌ی پایگاه داده، این جدول را ایجاد کنیم.
این کار را با یک درخواست SQL انجام می‌دهیم.
``` postgresql
-- create a database table
CREATE TABLE articles(
    id          INT AUTO_INCREMENT,
    title       NVARCHAR(100) NOT NULL,
    content        NVARCHAR(100) NOT NULL
);
```
سپس در کد جاوا اسکریپت خود باید بنویسیم:
```js
// instantiate mysql
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo_schema"
});
connection.connect();

// query sql statements
const query = "SELECT `id`, `title`, `content`, `submittedAt` \
FROM 'articles' WHERE `articles`.`id` = ?";
connection.query(query, 5, function(error, article){
    console.log(article);
});
```

### مثال از پیاده‌سازی با استفاده از Sequelize<sup>[۲]</sup>
در این بخش، به بیان جزئیات کد زیر و نحوه‌ی استفاده از `Sequelize`
نمی‌پردازیم و آن را به بخش‌های جلوتر موکول می‌کنیم. فعلاً صرفاً می‌خواهیم یک مثال برای انتقال شهودی از تفاوت استفاده  و عدم استفاده
از  آن را بیان کنیم. کافی است در کد جاوااسکریبپ خود بنویسیم:
```js
// instantiate sequelize
const Sequelize = require('sequelize');

// connect db
const connection = new Sequelize("db name", "username", "password");

// define article model
const Article = connection.define("article", {
    title: Sequelize.String,
    content: Sequelize.String
});
connection.sync();

// query using sequelize API
Article.findById(5).then(function (article) {
    console.log(article);
}
```

اکنون به صورت فهرست‌وار نیز برخی از مزایا را بیان می‌کنیم:<sup>[۲]</sup>

<div dir="rtl" align='right'>

- با استفاده از `Sequelize` می‌توان کد کوتاه‌تری نوشت.
- با استفاده از `Sequelize` می‌توان کد پایدارتری نوشت
- با استفاده از `Sequelize` می‌توان از نوشتن کدهای `SQL` دوری کرد.
- در واقع `Seqeulize` نسبت به استفاده‌ی مستقیم از پایگاه‌داده، سطح انتزاع 
بالاتری به ما می‌دهد.
</div>


## آغاز به کار
### نصب <sup>[۱]</sup>
برای نصب Sequelize می‌توانید دستور زیر را در خط فرمان خود 
به کار بگیرید:
```cmd
npm install --save sequelize
```
توجّه داشته‌باشید که باید یک پایگاه‌داده‌ی پشتیبانی‌شونده نیز مانند
postgreSQL یا SQLite یا mySQL یا Oracle یا Microsoft داشته باشید.

### اتّصال به پایگاه داده <sup>[۱]</sup>
برای اتّصال کد جاوااسکریپت برنامه به پایگاه‌داده، نخست باید بنویسید:
```js
const { Sequelize } = require('sequelize');
```
سپس باید یک نمونه از کلاس Sequelize بگیریم. این کار
را به یکی از سه روش زیر می‌توان انجام داد:

#### روش ۱ : دادن URI اتّصال
```js
const sequelize = new Sequelize('sqlite::memory:')//مثال برای SQLite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')//مثال برای postgreSQL
```

#### روش ۲ : جداگانه دادن مشخّصه‌ها (SQLite)
```js
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});
```

#### روش ۳ : جداگانه دادن مشخّصه‌ها (دیگر زبان‌ها)
```js
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
```

### بررسی اتّصال
برای اطمینان حاصل کردن از این که اتّصال به پایگاه داده برقرار است 
یا خیر، می‌توانید تابع `authenticate`
را همانند پاره‌کد زیر را به کار ببندید:<sup>[۱]</sup>
```js
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```

### بستن اتّصال
برای بستن اتّصال به پایگاه‌داده می‌توانید از 
<span dir="ltr">`sequelize.close()`</span>
بهره بگیرید که به‌صورت ناهمگام کار کرده و یک 
`promise` بر می‌گرداند. توجّه بفرمایید که با 
اجرای این دستور، دسترسی به پایگاه‌داده قطع شده و امکان ساختن
یک اتّصال نو نیست مگر آن که یک نمونه‌ی دیگر از
`Sequelize` بسازید.<sup>[۱]</sup>

## مقدّمات مدل
مدل‌ها اساس سیکوئلایز هستند. مدل انتزاعی بالاتر از یک
جدول از پایگاه‌داده را به ما ارائه می‌دهند. در سیکوئلایز،
این مدل‌ها کلاس‌هایی هستند که از کلاس `Model` ارث می‌برند.
مدل به سیکوئلایز اطلّاعاتی درباره‌ی نوع موجودیتی که نمایش می‌دهد
بیان می‌کند از جمله نام جدول، نام ستون‌ها و داده‌گونه‌ها.
<sup>[۱]</sup>

### تعریف مدل
مدل‌ها را به دو روش زیر می‌توان تعریف کرد که عملاً تفاوت خاصی ندارند.
<sup>[۱]</sup>

#### روش ۱ : فراخوانی `sequelize.define(modelName, attributes, options)`
```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
```
#### روش ۲ : ارث بردن از کلاس `Model` و فراخوانی `init(attributes, options)`
```js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
```

در هر دو حالت پس از تعریف مدل می‌توان با استفاده از نام مدل
و با `sequelize.models` به آن مدل دسترسی داشت مانند زیر:
```js
console.log(User === sequelize.models.User); // true after above examples
```


### پیرامون افزودن ویژگی‌های دیگر به مدل
در بالا برای تعریف یک مدل، کلاسی تعریف کردیم که از کلاس `Model` 
ارث می‌برد و این کار را به صورت 
<span dir="ltr">`class User extends Model {}`</span> انجام دادیم
امّا  می‌توانیم به آن مانند هر کلاس دیگری، ویژگی‌های دیگری نیز بیفزاییم.
مانند زیر:

```js
class User extends Model {
  otherPublicField;
}
```
امّا باید به این نکته توجّه کنیم که ویژگی‌های همگانی نباید نامی
یکسان با ویژگی‌های نوع موجودیتمان بدارند زیرا در آن صورت این 
باعث همپوشانی می‌شود. بنابر این در مثال زیر، ویژگی `id` مشکل‌ساز
است امّا ویژگی `otherPublicField` مشکل‌ساز نیست.
```js
class User extends Model {
  id; // this field will shadow sequelize's getter & setter. It should be removed.
  otherPublicField; // this field does not shadow anything. It is fine.
}
```

### نام‌گذاری جداول
به طور پیش‌فرض اگر نامی برای جدول مربوط به یک مدل تعیین نکنید،
سیکوئلایز، اسم جمع نام مدل را به عنوان نام جدول تعیین می‌کند و جالب 
این است که حتّی جمع‌های بی‌قاعده را نیز به درستی انجام می‌دهد.
با این وجود، می‌توانید نام مورد نظر را با کلیدواژه‌ی `tableName`
بدهیم و یا با کلیدواژه‌ی `freezeTableName` کاری کنیم که نام جدول(ها)،
بشود همان نام مدل(ها). برای درک بهتر به مثال‌های پیش رو دقّت بفرمایید.<sup>[۱]</sup>

```js
sequelize.define('User', {
  // ... (attributes)
}, {
  freezeTableName: true
});
// با این کار نام جدول در پایگاه‌داده دقیقاً همان نام مدل یعنی User می‌شود
```

```js
const sequelize = new Sequelize('sqlite::memory:', {
  define: {
    freezeTableName: true
  }
});
// با این کار تغییر مثال بالایی، برای همه‌ی مدل‌ها اعمال می‌شود
```

```js
sequelize.define('User', {
  // ... (attributes)
}, {
  tableName: 'Employees'
});
// با این کار مستقیماً خودمان نام جدول را تعیین می‌کنیم.
```

## همگام‌سازی مدل
گاه پیش می‌آید که جدول مربوط به یک مدل هنوز ساخته نشده
و گاه ساخته شده و گاهی ساخته شده ولی نیاز به تغییر دارد مثلاً
باید ستونی به آن افزوده شود یا از آن کاسته شود. برای
مدیریت این موضوع باید چه کار کرد؟ در ادامه به این موضوع می‌ پردازیم.

به منظور مدیریت این مسئله، تابعی به نام `sync` وجود دارد
که ‌*پایگاه‌داده را با مدل ما همگام می‌کند.* 
درون این تابع می‌توان مقادیر force و alter را نیز تعیین کرد که در
ادامه با تفاوت‌های آن‌ها بیشتر آشنا می‌شوید.<sup>[۱]</sup>

<div dir="rtl" align="right">

- حالت ۱ : `User.sync()` : اگر جدول وجود ندارد، آن را می‌سازد و اگر هست، کاری نمی‌کند.
- حالت ۲ : `User.sync({force: true})` : (اگر جدول وجود دارد نخست آن را دور می‌ریزد و سپس دوباره از نو) جدول را می‌سازد.
- حالت ۳ : `User.sync({alter: true})` : بررسی می‌کند و تغییرات لازم را
در پایگاه‌داده اعمال می‌کند.
</div>
مثلاً

```js
await User.sync({ force: true });
console.log("The table for the User model was just (re)created!");
```
اگر مانند مثال بالا این دستورها را روی یک مدل ماننند `‌User`
فراخوانیم، تنها روی همان مدل و جدول مربوط به آن اعمال می‌شود
ولی اگر بخواهیم برای همه‌ی مدل‌ها این کار انجام شود باید مانند
مثال زیر، آن را روی `sequelize` فراخوانیم.<sup>[۱]</sup>

```js
await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
```

همچنین می‌توان اعمال تابع `sync` را به پایگاه‌داده‌هایی که نامشان از 
الگوی ویژه‌ی RegEx پیروی می‌کند محدود کرد مانند زیر:<sup>[۱]</sup>
```js
// This will run .sync() only if database name ends with '_test'.
sequelize.sync({ force: true, match: /_test$/ });
```

## داده‌گونه‌ها
پیش از این که به سراغ عملیات‌ها روی پایگاه‌داده بروم، به بررسی
داده‌گونه‌ها بپردازیم. برای دسترسی به داده‌گونه‌ها باید نخست
در کد جاوااسکریپت خود کد زیر را بنویسیم:

```js
const { DataTypes } = require("sequelize"); // Import the built-in data types
```
در ادامه به معرفی خلاصه‌ی برخی از داده‌گونه‌ها می‌پردازیم.
```js
// STRINGs
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.
DataTypes.TSVECTOR           // TSVECTOR        PostgreSQL only.

// BOOLEANs
DataTypes.BOOLEAN            // TINYINT(1)

// NUMBERs
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            PostgreSQL only.
DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)

// DATE
DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY   // DATE without time
```

## عملیّات‌های مقدّماتی روی پایگاه‌داده
در این بخش به بررسی نحوه‌ی انجام برخی از عملیّات‌های مقدّماتی
روی پایگاه‌داده توسّط این چارچون می‌پردازیم.
### حذف جدول (Drop)
برای حذف یک جدول کافی است مانند مثال زیر، روی
مدل مربوطه،‌ تابع `drop` را فرابخوانیم.
```js
await User.drop();
```
و برای حذف همه‌ی جداول، کافی است به جای نام مدل، `sequelize` را بگذاریم
مانند مثال زیر:
```js
await sequelize.drop();
```

### تعریف ستون‌های یک جدول
هنگاخ تعریف یک جدول، از هر کدام از روش‌های گفته‌شده که عمل کنید،
باید یک شئ که شامل ستون‌های جدول مربوط به مدل است داده شود.
و هر ستون یک نام دارد و یک شئ که ویژگی‌های دیگر آن ستون را
به ما می‌گوید از جمله داده‌گونه‌ی مربوطه، مقدار پیش‌فرض،
هیچ‌مقدارپذیری، یکتایی، کلید اوّلیه بودن، کلید بیرونی بودن و
مشخّصات ارجاع.

مثال زیر مثالی مناسب است برای دیدن این موضوع:
```js
const { Model, DataTypes, Deferrable } = require("sequelize");

class Foo extends Model {}
Foo.init({
  // instantiating will automatically set the flag to true if not set
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  // default values for dates => current time
  myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  // setting allowNull to false will add NOT NULL to the column, which means an error will be
  // thrown from the DB when the query is executed if the column is null. If you want to check that a value
  // is not null before querying the DB, look at the validations section below.
  title: { type: DataTypes.STRING, allowNull: false },

  // Creating two objects with the same value will throw an error. The unique property can be either a
  // boolean, or a string. If you provide the same string for multiple columns, they will form a
  // composite unique key.
  uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
  uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },

  // The unique property is simply a shorthand to create a unique constraint.
  someUnique: { type: DataTypes.STRING, unique: true },

  // Go on reading for further information about primary keys
  identifier: { type: DataTypes.STRING, primaryKey: true },

  // autoIncrement can be used to create auto_incrementing integer columns
  incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

  // You can specify a custom column name via the 'field' attribute:
  fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },

  // It is possible to create foreign keys:
  bar_id: {
    type: DataTypes.INTEGER,

    references: {
      // This is a reference to another model
      model: Bar,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      deferrable: Deferrable.INITIALLY_IMMEDIATE
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  },

  // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
  commentMe: {
    type: DataTypes.INTEGER,
    comment: 'This is a column name that has a comment'
  }
}, {
  sequelize,
  modelName: 'foo',

  // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
  indexes: [{ unique: true, fields: ['someUnique'] }]
});
```

### تعریف سطرهای یک جدول (نمونه‌های مدل)
یک سطر از جدول در حقیقت به معنای یک نمونه از کلاس مربوط به مدلمان
است. توجّه بفرمایید که نباید از مدلمان مانند یک کلاس معمولی
با `new` نمونه بسازیم بلکه باید با کلیدواژه‌ی `build` مانند زیر
این کار را انجام دهیم.
```js
const jane = User.build({ name: "Jane" });
```
و دستور بالا تنها یک نمونه از مدل User را برای ما ساخت امّا
در پایگاه‌داده‌ی ما ذخیره نشده. برای ذخیره‌ی آن باید از 
`save` همانند مثال زیر کمک بگیریم.
```js
await jane.save();
```
و چنانچه بخواهیم ساختن نمونه و انباشتن آن در پایگاه‌داده در یک
دستور انجام شود، می‌توان به جای این که یک بار `build` و سپس
`save‍‍` را فرابخوانیم، مانند زیر `create` را فرابخوانیم.
```js
const jane = await User.create({ name: "Jane" });
```

### تغییر یک نمونه‌ی مدل (یک سطر)
در ادامه به نحوه‌ی بازیابی یک سطر از جدول خواهیم پرداخت ولیکن
فعلاً برای تغییر یک سطر، فرض کنید به نمونه‌ی مدل مربوطه دسترسی
داریم و می‌خواهیم یک یا چند ویژگی آن را تغییر دهیم.

#### روش ۱
می‌توانیم هر کدام از ویژگی‌ها (ستون‌ها) را از مدل مربوطه، مقدار
نو دهیم و سپس دستور `save` را اجرا کنیم مانند زیر:
```js
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// the name is still "Jane" in the database
await jane.save();
// Now the name was updated to "Ada" in the database!
```
#### روش ۲
می‌توانیم روی شئ مربوطه، چندین ویژگی را همزمان تغییر دهیم
و سپس دستور `save‍` را مانند روش ۱ اجرا کنیم.
```js
const jane = await User.create({ name: "Jane" });

jane.set({
  name: "Ada",
  favoriteColor: "blue"
});
// As above, the database still has "Jane" and "green"
await jane.save();
// The database now has "Ada" and "blue" for name and favorite color
```
#### روش ۳
می‌توانیم با `update` مقادیر بروزرسانی‌شونده را تعیین
کنیم. فرق این روش با روش ۲ در عمل این است که با `save` کل تغییرات
روی سطر مربوطه‌ی جدول در پایگاه‌داده اعمال می‌شود ولی با 
`update` می‌توان تغییرات را تنها روی ستون‌های خاصی ذخیره کرد.
گاهی ممکن است نخواهیم همه‌ی تغییراتی که در برنامه‌ی خود روی مدل
مربوطه داده‌ایم، در پایگاه‌داده ذخیره شوند.
```js
const jane = await User.create({ name: "Jane" });
jane.favoriteColor = "blue"
await jane.update({ name: "Ada" })
// The database now has "Ada" for name, but still has the default "green" for favorite color
await jane.save()
// Now the database has "Ada" for name and "blue" for favorite color
```
#### روش ۴
همانند روش ۱ یا ۲ با این تفاوت که مثل روش ۳ می‌توانیم تنها برخی از
ستون‌ها را ذخیره کنیم. برای این کار مطابق زیر عمل می‌کنیم.
روش ۳ نیز در حقیقت در درونش دارد از همین موضوع استفاده می‌کند.
```js
await jane.save({ fields: ['name'] });
```

### حذف یک نمونه (سطر)
به سادگی و با دستور `destroy` همانند مثال زیر می‌توان
این کار را انجاام داد.
```js
await jane.destroy();
```

### بازخوانی یک نمونه (سطر) از پایگاه‌داده
گاهی ممکن است تغییراتی را روی یک نمونه از مدل اعمال کنیم، ولی
نخواهیم آن را روی پایگاه‌داده بنویسیم بلکه بخواهیم دوباره مدل تغییر
نکرده را از پایگاه‌داده بخوانیم یا ممکن است مدل روی پایگاه‌داده
تغییراتی کرده باشد (احتمالاً توسط عاملی خارج از برنامه‌ی ما) و
بخواهیم دوباره مقدار جدید را از پایگاه‌داده بخوانیم. برای این کار
نیاز نیست یک نمونه‌ی دیگر از مدل تعریف کنیم بلکه کافی است
تابع `reload` را روی نمونه‌ی مدل همانند مثال زیر فرابخوانیم.
```js
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// the name is still "Jane" in the database
await jane.reload();
console.log(jane.name); // "Jane"
```

### بازیابی داده‌ها (SELECT)
برای بازیابی داده‌ها از پایگاه داده کافی است تابع `findAll` را
روی کلاس مدل مروبطه مانند زیر فرابخوانیم.
```js
const users = await User.findAll();
```
و کد بالا معادل کد SQL زیر است:
```sql
SELECT * FROM users;
```
و برای گزیدن برخی از ستون‌ها، کافی است همانند مثال زیر در ورودی تابع `findAll` یک شئ شمال آرایه‌ای به نام `attributes` بدهیم که نام
ستون‌های بازیابی شونده را تعیین می‌کند.
```
User.findAll({
  attributes: ['fname', 'lname', 'username', 'id']
});
```
و کد بالا معادل کد SQL زیر است:
```sql
SELECT fname, lname, username, id FROM users;
```
همچنین می‌توان نام‌های ستون‌ها را با برچسب‌هایی دیگر جایگزین کرد
(دقّت شود که این تغییر نام تنها در نمایش داده‌های بازیابی‌شده
است و تغییری در پایگاه‌داده ثبت نمی‌کند.)
```js
User.findAll({
  attributes: [['fname', 'name'], ['lname', 'family'], 'username']
});
```
و کد بالا معادل کد SQL زیر است:
```sql
SELECT fname AS name, lname AS family, username FROM users;
```
همچنین می‌توان با کلیدواژه‌ی `exlude` همه‌ی ستون‌ها را به جز
برخی ستون‌های خاص بازیابی کرد (یعنی مثلاً اگر ۱۰ تا ستون دارد و ما
همه‌ی آنها را به جز ستون پنجم و دهم می‌خواهیم، به جای این که مجبور
باشیم نام ۸ تا ستون را بنویسیم، می‌گوییم همه‌ی ستون‌ها به جز ستون پنجم و دهم) مانند مثال زیر:
```js
Model.findAll({
  attributes: { exclude: ['baz'] }
});
```
و کد بالا معادل کد SQL زیر است:
```sql
-- Assuming all columns are 'id', 'foo', 'bar', 'baz' and 'qux'
SELECT id, foo, bar, qux FROM ...
```

#### شرط در بازیابی داده‌ها (WHERE)
برای اعمال شرط در SQL از کلیدواژه‌ی `WHERE` کمک می‌گرفتیم.
در این جا هم مطابق مثال زیر، باید از کلیدواژه‌ی `where` بهره بگیریم
امّا پیش از آن باید <span dir="ltr">`const { Op } = require("sequelize");`</span> را نوشته باشیم. البتّه برای شرط‌های
برابری یا عضویت در یک مجموعه می‌توان بی آن هم عمل کرد ولی در اکثر شرایط
به آن نیاز خواهیم داشت. مثال زیر مثالی جامع از انواع استفاده از 
این قابلیّت است.
```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // There are more postgres-only range operators, see below
    }
  }
});
```


## جمع‌بندی
در این مقاله به بررسی چارچوب Sequelize پرداختیم و دریافتیم که
ارتباطات میان  اشیاء و کلاس‌های کد برنامه‌ی ما را با پایگاه‌داده
آسان‌تر می‌کند و با روش نصب آن و برخی اعمال مقدّماتی در آن آشنا
شدیم. برای آگاهی بیشتر درباره‌ی این چارچوب و یادگیری امکانات
پیشرفته‌تر آن، مراجعه به
<a href="https://sequelize.org/docs/v6/">
این پیوند
</a>
توصیه می‌شود.

<hr/>


## واژه‌نامه
<!-- TODO: مرتّب‌سازی و افزودن فارسی به انگلیسی و انگلیسی به فارسی -->

<div dir="rtl" align="center">

|English | فارسی|
|:--- | ---:|
|Connection | اتّصال|
|Extend | ارث بردن|
|Abstraction | انتزاع|
|Reload|بازخوانی|
|DataBase | پایگاه‌داده|
|Table | جدول|
|Framework|چارچوب|
|DataType|داده‌گونه|
|Relational (DataBase)|<span dir="rtl">(پایگاه‌داده‌ی) رابطه‌ای</span>|
|Sequelize | سیکوئلایز|
|(function) call|فراخوانی (تابع)|
|Primary Key|کلید اوّلیه|
|Foreign Key|کلید بیرونی|
|Option|گزینه|
|OpenSource|متن‌باز|
|Model | مدل|
|Parameter | مشخّصه|
|Asynchronous | ناهمگام|
|Instance|نمونه|
|Entity | نوع موجودیت|
|Attribute, Field|ویژگی|
|Synchronization|همگام‌سازی|
|Public|همگانی|
|Nullable|هیچ‌مقدارپذیر|
</div>





<hr/>

## فهرست مراجع
1. https://sequelize.org/docs/v6/
2. https://www.section.io/engineering-education/introduction-to-sequalize-orm-for-nodejs/


</div>