<div dir="rtl">

# Introduction   

زبان TypeScript یک سوپر‌ست نوع‌گذاری شده از JavaScript است که به زبان JavaScript کامپایل می‌شود. به بیانی دیگر، TypeScript  همان JavaScript است برای توسعه در مقیاس کاربردی. این زبان به شما امکان می دهد JavaScript را همانطور که می خواهید بنویسید و خوانایی و رفع اشکال آن را بهبود می بخشد. این زبان یک زبان شی گرای خالص است و فریمورک های معروفی مانند Angular 2.0 به این زبان نوشته شده اند.

# Requirements

همان طور که گفته شد ابتدا باید برنامه نوشته شده در زبان Typescript را به زبان JavaScript کامپایل و سپس آن را نیز تفسیر کرد. پس به `nodeJs` و `type Script Compiler(tsc)` نیاز داریم. همچنین نصب `npm` نیز توصیه می شود.

# installation

برای نصب `nodejs` از دستور زیر استفاده می کنیم:

<div dir="ltr">
	
    sudo apt install nodejs
	
</div>

برای نصب `npm` از دستور زیر استفاده می کنیم:

<div dir="ltr">
	
    sudo apt install npm
	
</div>

برای نصب `tsc` نیز از `npm` استفاده می کنیم:

<div dir="ltr">
	
    npm install -g typescript
	
</div>

حال برای کامپایل و اجرای برنامه های این زبان مراحل زیر را طی می کنیم:

1.ابتدا فایل مورد نظر را با پسوند `ts.` ذخیره می کنیم (برای مثال `test.ts`)
	
2.سپس فایل مورد نظر را با دستور `tsc [file_name].ts` به زبان js کامپایل می کنیم.(خروجی آن یک فایل مانند `test.js` است)
	
3.در نهایت برای اجرای فایل نهایی دستور `node [file_name].js` را اجرا می کنیم.
	
همچنین پکیج هایی نیز وجود دارند که مراحل 2 و 3 را ترکیب می کنند.(مانند `ts-node`)

# Differences

تایپ‌اسکریپت دربرگیرنده جاوااسکریپت است ولی تفاوت‌هایی جزیی با آن دارد که در جدول زیر به آن‌ها می‌پردازیم:

| JavaScript | TypeScript |  |
| ---------- | ---------- | --------- |
| در نسخه های قدیمی موجود نبود | استفاده از کلاس، اینترفیس، تایپ | شی‌گرایی
| وجود ندارد | با استفاده از تایپ و اینترفیس | Data binding | 
پکیج‌ها بدون نیاز به بیلد قابل استفاده هستند|پکیج‌های گوناگونی را با استفاده از npm می‌توان نصب کرد|پکیج‌های مختلف
چنین ویژگی وجود ندارد|می‌توان از Prototyping استفاده کرد|Prototyping
کدها کامپایل نمی‌شوند|کدها کامپایل می‌شوند|کامپایل
چنین ویژگی وجود ندارد|می‌توان از Annotation استفاده کرد|Annotation

- درنسخه‌های قدیمی js، شی‌گرایی وجود نداشت ولی در نسخه جدید به آن اضافه شده ولی با ts دارای تفاوت‌هایی است که در قطعه کد زیر به آن می‌پردازیم:

<div dir="ltr">
	
   	// JS🟨
	class User {
	    #name
	    constructor(name) {
	        this.#name = name;
	    }
	}
	const user = new User('Tom');
	
	// TS🟦
	class User {
	    #name: string 
	    constructor(name: string) {
	        this.#name = name;
	    }
	}
	const user = new User('Tom')

	
</div>

تنها تفاوت در تعریف متغیر name است که در ts باید نوع آن‌را مشخص کرد.

- در ts می‌توان داده‌ها را با ساختار خاصی ساخت. اینکار به وسیله‌ type و interface امکان‌پذیر است که در بخش‌های بعدی به آن‌ها اشاره می‌شود.

- در ts کد ابتدا به زبان js کامپایل و سپس اجرا می‌شود. برای همین اگر اروری داشته باشد قبل از اجرای کد باید آن‌را رفع کرد. به مثال زیر توجه کنید:

<div dir="ltr">

TS:

</div>

<div dir="ltr">

    s = "ali";
    console.log(s); // error s not defined
    s = 12;
    console.log(s); // error s not defined

</div>

<div dir="ltr">

Js:

</div>

<div dir="ltr">

    s = "ali";
    console.log(s); //ali
    s = 12;
    console.log(s); //12

</div>

- در ts ما برای annotation به شکل زیر عمل میکنیم:

<div dir="ltr">

    var variableName: TypeAnnotation = value;  

</div>

مثلا: 

<div dir="ltr">

    var age: number = 44;         // number variable  
    var name: string = "Ali";     // string variable  


</div>

اگر در ادامه به متغیر name مقداری عددی تخصیص دهیم به ارور میخوریم ولی در js این ویژگی وجود ندارد.

<div dir="ltr">

    // JS🟨
    var name = “Ali”;
    name = 44 ; // valid

    // TS🟦
    var name = “Ali”;
    name = 44 ; // error



</div>

# TypeScript basic syntax

برخی نکات اولیه در سینتکس TypeScript:

- semicolon در TypeScript اختیاری است. هر دستور در TypeScript یک عبارت نام دارد. یک خط می‌تواند شامل چندین دستور باشد به شرطی که دستورات توسط semicolon از یکدیگر جدا شده باشند.

- TypeScript، حساس به بزرگی حروف است.

- TypeScript یک زبان Object Oriented است. اشیا در این زبان سه feature اصلی دارند:

	1. State
	2. Behavior
	3. Identity

- کامنت در TypeScript بصورت زیر گذاشته میشوند:

<div dir="ltr">

    //this is single line comment 
	 
    /* This is a  
    Multi-line comment 
    */

</div>

- برای پرینت یک پیام از سینتکس زیر استفاده میشود:

<div dir="ltr">
	
    console.log("hello world")
    
</div>

# type

- Any: دیتا تایپ “Any” سوپر همه ی تایپ هاست و بصورت داینامیک یک تایپ را مشخص میکند. 
- Built-in types: 

	-تفاوت Null و Undefined: متغیری که در ابتدا undefined مشخص شده یعنی مقدار یا شی ای به آن اختصاص داده نشده است ولی متغیر null به معنی آن است که به این متغیر شی ای که مقداری ندارد اختصاص داده شده است.

- User-defined types

![enter image description here](https://www.tutorialspoint.com/typescript/images/data_types.jpg)

# variable

متغیر ها در TypeScript بصورت زیر تعریف میشوند:

![enter image description here](https://www.tutorialspoint.com/typescript/images/declare_type.jpg)

در این تعریف بخش type-annotation و value اختیاری است و میتوانند در تعریف مشخص نشوند.
مثال:

<div dir="ltr">
	
    var score: number = 50;
    
</div>

# Condition و Loop

-نمونه کد برای تصمیم گیری در یک Condition:

<div dir="ltr">
	
    if (num % 2==0) { 
        console.log("Even"); 
    } else {
        console.log("Odd"); 
    }
    
</div>

۳ روش برای ایجاد حلقه در جهت اجرای چند باره یک بخش از کد وجود دارد:

- for loop:

<div dir="ltr">
	
    for (initial_count_value; termination-condition; step) {
        //statements 
    }
    
</div>
    
- while loop:

<div dir="ltr">
	
    while(condition) { 
        // statements if the condition is true 
    }

</div>

- do… while:

<div dir="ltr">
	
    do {
        //statements 
    } while(condition)
    
</div>	

# Function

فانکشن شامل یک سری عبارت است تا یک تسک خاص را انجام دهند. فانکشن درواقع یک بلوک منطقی برای مرتب سازی کد است. برای دسترسی به کد این بلوک فانکشن را صدا میزنیم که به این ترتیب کد reusable میشود.

سینتکس فانکشن به صورت زیر است:

<div dir="ltr">

    function func_name( param1 [:datatype], param2 [:datatype]…) { 
        // function body   
    }

</div>

که وجود پارامتر ها اختیاری است.

همچنین سینتکس برای صدا زدن یک فانکشن بصورت زیر است:

<div dir="ltr">

    function_name(param1 , param2…)

</div>

-یک نمونه کد برای ایجاد یک فانکشن و صدا زدن آن:

<div dir="ltr">

    function disp_details(id, name, mail_id) {
        console.log("ID:", id);
        console.log("Name", name);
	
    if (mail_id != undefined)
        console.log("Email Id", mail_id);
    }
    disp_details(123, "John");

</div>

### توابع بازگشتی:

تابع بازگشتی روشی برای تکرار یک عمل به طریقی است که یک فانکشن بتواند خودش را صدا بزند.

-یک نمونه کد برای ایجاد یک تابع recursive و صدا زدن آن:

<div dir="ltr">

    function factorial(number) {
        if (number <= 0) {         // termination case
            return 1; 
        } else {     
            return (number * factorial(number - 1));     // function invokes itself
        } 
    }; 
    console.log(factorial(6));      // outputs 720 

</div>

# Numbers

TypeScript مانند JavaScript مقادیر عددی را بصورت اشیا از حنس عدد ساپورت میکند. شی Number یک مقدار عددی را به یک نمونه از کلاس Number تبدیل میکند و این کلاس برای آن مثل یک wrapper عمل میکند.

-سینتکس مناسب برای ساختن یک Number Object:

<div dir="ltr">

    var var_name = new Number(value)

</div>

-بعضی از property های شی Number در زیر لیست شده اند:

- MAX_VALUE: بزرگ ترین عددی که در این زبان امکان وجودش هست. 
- MIN_VALUE: کوچک ترین عددی که در این زبان امکان وجودش هست. 
- NaN: نشان دهنده مقداری است که از جنس عدد نیست. (Not a Number) 

-در صورتی که یک مقدار غیر عددی به constructor شی Number پاس داده شود constructor، NaN برمیگرداند.

-برخی method های شی Number در زیر لیست شده اند:

- ()toExponential: این متد یک رشته برمیگرداند که نمایش عدد به فرم نمایی است.
- ()toPrecision: این متد عدد را با دقت مشخص شده (تعداد ارقام با اهمیت) نشان میدهد.
- ()toString: با ورودی گرفتن یک پایه، عدد را در مبنای مشخص شده بصورت رشته برمیگرداند.
- ()valueOf: مقدار primitive عدد را برمیگرداند.

# Strings

شی String مقدار primitive رشته را همراه با تعدادی method کمکی، در برمیگیرد.

-سینتکس برای ایجاد یک شی String:

<div dir="ltr">

    var var_name = new String(string);

</div>

-یک مثال کد از کاربرد این شی همراه با متد دسترسی به طول رشته:


<div dir="ltr">
    var uname = new String("Hello World") 
    console.log(uname) 
    console.log("Length "+uname.length) 
</div>

-برخی method های شی String در زیر لیست شده اند:

- ()charAt: کاراکتر موجود در شاخص مشخص شده را برمیگرداند.
- ()concat:متن دو رشته را با هم پیوند میزند و یک رشته جدید برمیگرداند.
- ()search: یک عبارت را در یک رشته جست و جو میکند.
- ()split: یک شی String را تقسیم کرده و بصورت یک آرایه از رشته ها برمیگرداند.
- ()replace: یک زیر رشته از رشته را با یک زیر رشته دیگر جایگزین میکند.
- ()substr: یک زیر رشته کاراکتر را که از شاخص مشخص شده شروع شده اند و تا تعداد مشخص شده پیش رفته است را برمیگرداند.
- ()toLowerCase: کاراکتر های رشته را به حروف کوچک تبدیل میکند و برمیگرداند.
- ()toUpperCase: کاراکتر های رشته را به حروف بزرگ تبدیل میکند و برمیگرداند.
- ()toString: یک رشته برمیگرداند که شی را نمایش بدهد.
- ()valueOf: مقدار رشته را برمیگرداند.

# Array

آرایه یک مجموعه از value ها را ذخیره میکند.

<div dir="ltr">

    var array_name[:datatype];        //declaration 
    array_name = [val1,val2,valn..]   //initialization

</div>

برخی از method هایی که در TypeScript برای آرایه وجود دارند در زیر لیست شده اند:

- ()concat

	یک آرایه جدید شامل جوین شده آرایه با یک آرایه دیگر را برمیگرداند.

- ()filter

	یک آرایه جدید برمیگرداند که با شرایط ذکر شده فیلتر شده اند.

- ()forEach

	یک فانکشن را برای همه المنت های آرایه صدا میزند.

- ()indexOf

	شاخص اولین المنت آرایه برابر با مقدار مشخص شده را برمیگرداند یا اگر چنین المنتی در آرایه موجود نباشد ۱- را برمیگرداند.

- ()pop

	آخرین المنت آرایه را حذف میکند و آن را برمیگرداند.

- ()push

	یک یا چند المنت جدید را به آخر آرایه اضافه میکند و طول جدید آرایه را برمیگرداند.

- ()sort

	المنت های آرایه را مرتب و سورت میکند.
	
# Tuples

Tuple ها برای زمانی که احتیاج داریم یک مجموعه از مقادیری با انواع مختلف ذخیره کنیم به کار میآیند زیرا آرایه ها این کار را نمیتوانند انجام بدهند.

-سینتکس برای تعریف یک tuple:

<div dir="ltr">

    var tuple_name = [value1,value2,value3,…value n]

</div>

-مثال:

<div dir="ltr">
	
    var mytuple = [10,"Hello"];
    
</div>

دسترسی به اعضای tuple هم به شکل زیر صورت میگیرد:

<div dir="ltr">
	
    var tup = [] 
    tup[0] = 12 
    tup[1] = 23 
    
</div>

-دو تا از عملگر هایی که روی یک tuple قابل انجام است در زیر توضیح داده شده اند:

- ()Push: یک عضو به tuple اضافه میکند.
- ()Pop: عضو آخر tuple را حذف میکند و آن را برمیگرداند.

-تخریب ساختار tuple: به این معنا که ساختار بندی آن را از بین میبریم. 

-مثالی از تخریب ساختار یک tuple:

<div dir="ltr">
	
    var a =[10,"hello"] 
    var [b,c] = a 
    console.log( b )   //10 
    console.log( c )   //hello
    
</div>

# Union

TypeScript این قابلیت را به برنامه میدهد که یک یا چند تایپ را با هم ترکیب کند. تایپ Union یک روش برای نشان دادن این است که یک مقدار میتواند یکی از چند تایپ ذکر شده را داشته باشد.

-سینتکس برای نشان دادن تایپ Union:

<div dir="ltr">

    Type1|Type2|Type3 

</div>

-یک مثال از تعریف متغیر با استفاده از Union:

<div dir="ltr">

    var val:string|number 
    val = 12 
    console.log("numeric value of val "+val) 
    val = "This is a string" 
    console.log("string value of val "+val)

</div>

-یک مورد استفاده دیگر union type ها به عنوان پارامتر فانکشن هاست:

<div dir="ltr">

    function disp(name:string|string[]) { 
        if(typeof name == "string") { 
            console.log(name) 
        } else { 
            var i; 
      
            for(i = 0;i<name.length;i++) { 
                console.log(name[i])
            } 
        } 
    } 

</div>

Union تایپ ها همچنین میتوانند در آرایه ها یا اینترفیس ها مورد استفاده واقع شوند:

<div dir="ltr">

    var arr:number[]|string[]; 
    var i:number; 
    arr = [1,2,4] 
    console.log("**numeric array**")  

    for(i = 0;i<arr.length;i++) { 
        console.log(arr[i]) 
    }  

    arr = ["Mumbai","Pune","Delhi"] 
    console.log("**string array**")  

    for(i = 0;i<arr.length;i++) { 
        console.log(arr[i]) 
    } 

</div>

در این قطعه کد اعضای آرایه میتوانند از نوع رشته یا عددی باشند.

# Interface

اینترفیس ها شامل ۳ بخش زیر هستند:

1. properties
2. methods
3. events

اینترفیس ها فقط این اعضا را declare میکنند و define کردن این اعضا بر عهده کلاسی است که آن را پیاده سازی میکند.

-روش تعریف اینترفیس:

<div dir="ltr">

    interface interface_name { 
        ...
    }

</div>

-یک مثال از تعریف و پیاده سازی یک اینترفیس توسط یک کلاس:

<div dir="ltr">

    interface IPerson { 
        firstName:string, 
        lastName:string, 
        sayHi: ()=>string 
    } 

    var customer:IPerson = { 
        firstName:"Tom",
        lastName:"Hanks", 
        sayHi: ():string =>{return "Hi there"} 
    } 

</div>

# Class

TypeScript درواقع همان JavaScript است که شی گرایی را ساپورت میکند. یک کلاس در TypeScript، داده های یک شی را محصور میکند. برای تعریف یک کلاس از سینتکس زیر استفاده میکنیم:

<div dir="ltr">
	
    class class_name {
        //class scope 
    }

</div>

یک کلاس میتواند ۳ بخش زیر را شامل شود:

1. Fields
2. Constructors
3. Functions

-یک مثال از یک کلاس که شامل هر ۳ این اعضا است در زیر آمده است:

<div dir="ltr">

    class Car { 
        //field 
        engine:string; 
 
        //constructor 
        constructor(engine:string) { 
            this.engine = engine 
        }  

        //function 
        disp():void { 
            console.log("Engine is  :   "+this.engine) 
        } 
    }

</div>

# Object

یک object یک نمونه است که شامل مجموعه ای از کلید ها و مقدار هاست. این مقدار ها میتوانند عددی، فانکشن یا حتی آرایه از شی های دیگر باشند.

- سینتکس object بصورت زیر است:

<div dir="ltr">

    var object_name = { 
        key1: “value1”, //scalar value 
        key2: “value”,  
        key3: function() {
             //functions 
        }, 
        key4:[“content1”, “content2”] //collection  
    };

</div>

-یک نمونه کد برای تعریف یک object و دسترسی به اعضای آن:

<div dir="ltr">

    var person = { 
        firstname:"Tom", 
        lastname:"Hanks" 
    }; 
    //access the object values 
    console.log(person.firstname) 
    console.log(person.lastname)

</div>

همچنین در صورتی که بخواهیم مقادیری را به object اضافه کنیم. TypeScript با استفاده از تعریف یک method template این اجازه را به ما میدهد. مثلا در قطعه کد زیر ما یک فانکشن را به شی person اضافه میکنیم:

<div dir="ltr">

    var person = {
        firstName:"Tom", 
        lastName:"Hanks", 
        sayHello:function() {  }  //Type template 
    } 
    person.sayHello = function() {  
        console.log("hello "+person.firstName)
    } 

</div>

# Testing With Jest :
- در برنامه نویسی TypeScript هم مانند سایر زبان ها ، یکی از مهمترین نکات ، نوشتن تست برای برنامه جهت اطمینان از Quality برنامه است تا برخی باگ ها قبل از release مشخص و برطرف شوند.
در ابتدا از دستورات زیر برای نصب jest و ts-jest استفاده میکنیم :

<div dir="ltr">

    npm install jest
    npm i -D ts-jest @types/jest

</div>

- مرحله دوم این است که یک فایل jest.config.js در همان محل فایل package.json بسازیم. برای اینکار از دستور زیر استفاده میکنیم:
<br />

<div dir="ltr">

    npx ts-jest config:init

</div>
فایل ایجاد شده باید حاوی کد زیر باشد :

<div dir="ltr">

    module.exports = {
    preset: "ts-jest",
    testEnvironment: "node"
    };

</div>

- مرحله ی سوم این است که یک فولدر با نام tests در محل فایل package.json بسازیم و فایل های تست خود را در این پوشه فرار دهیم. فرمت نام دهی فایل های تست باید بصورت زیر باشد :

<div dir="ltr">

    (file_name).test.ts

</div>
حالا ، در فایل package.json خط زیر را اضافه میکنیم :

<div dir="ltr">

    ...
    "scripts": {
        ...
        "test": "jest"
        },
    ...

</div>

در نهایت تست های خود را با دستور زیر run میکنیم:

<div dir="ltr">

    npm t

</div>

- مثالی برای تست یک تابع:
    - فرض کنید یک تابع با نام add داریم که در فایل calc.ts تعریف شده است و 2 ورودی int میگیرد و به ما حاصل جمع این دو را برکیگرداند . میخواهیم تستی بنویسیم تا از ضحت عملکرد این تابع مطمئن شویم :

<div dir="ltr">

    // file name : calc.test.ts

    import { add } from "../src/calc";

        describe("test add function", () => {

            it("should return 15 for add(10,5)", () => {
                expect(add(10, 5)).toBe(15);
            }); 
            // end of testing 15 for 10 + 5

            it("should return 5 for add(2,3)", () => {
                expect(add(2, 3)).toBe(5);
            }); 
            // end of testing 5 for 2 + 3

        }); 
        // end of describe()

        
</div>

 - حال، بیایید مثال کمی پیچیده تری بزنیم ! فرض کنید یک تابع با نام foreach نوشته ایم که برای تک تک اعضای یک array ، تابع callback را روی آن صدا میزند:

 
 <div dir="ltr">
    
    function forEach(items: any[], callback : (a: any[]) => void) {
        for (let index :int = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }
 </div>

حالا، فایل تست را برای بررسی این تابع مینویسیم:

 <div dir="ltr">

    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);
 </div>


 # More On Interfaces :

 - برای درک کارکرد و مفهوم interface ، به مثال زیر دقت کنید :

 <div dir="ltr">

    function printLabel(labeledObj: { label: string }) {
        console.log(labeledObj.label);
    }
        
    let myObj = { size: 10, label: "Size 10 Object" };
    printLabel(myObj);
 </div>

 در این مثال، تابع ما بعنوان ورودی یک object میگیرد که باید در آن حداقل یک ویژگی با نام label وجود داشته باشد.(که از جنس string است) حالا، سعی میکنیم سبک نوشتن این برنامه را نظام مند تر و مهندسی شده تر کنیم.با interface چنین کاری را ممکن میکنیم ! به قطعه کد زیر دقت کنید:

 <div dir="ltr">

    interface LabeledValue {
    label: string;
    }
    
    function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
    }
    
    let myObj = { size: 10, label: "Size 10 Object" };
    printLabel(myObj);
 </div>
 دقت کنید که مثل اکثر زبان های دیگر، نیازی نیست که بیان کنیم object مورد نظر ما ، این interface بخصوص را implement میکند ! در واقع اینجا ، صرفا شکل اهمیت دارد! یعنی اگر object ورودی به تابع ما ، مطابق روش توصیف داده شده در interface بود ، آنرا قبول میکنیم !

  - حال ، فرض کنید میخواهیم که بخشی از ویژگی های داخل interface ، اختیاری باشند. یکی از مورد استفاده ترین مکان ها برای چنین امری ، استفاده از دیزاین پترن Option Bags است. در زیر یک پیاده سازی برای این طراحی را میبینیم :

<div dir="ltr">
    
    interface SquareConfig {
        color?: string;
        width?: number;
    }
 
    function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
    }
    
    let mySquare = createSquare({ color: "black" });

</div> 

 همانطور که مشاهده میشود ، برای نوشتن ویژگی هایی که اختیاری هستند در interface ها ، از ؟ استفاده میشود. این به ما این امکان را میدهد که بتوانیم حالات مختلف یک ورودی را توصیف کنیم و با تک تک حالات برخوردی مناسب داشته باشیم ، بدون اینکه به uncheckedException یا CompileError برخورد کنیم .
 یکی دیگر از مزایای استفاده از اینترفیس ها ، گرفتن ارور های بامعنا تر و واضخ تر است ( و در نتیجه دیباگینگ راحت تر !). مثلا فرض کنید که ما در کد ، به اشتباه برای دسترسی به ویژگی رنگ یک مربع ، از clor بحای color  استفاده کنیم  (اشتباه تایپی)
 :

 <div dir="ltr">
    
    interface SquareConfig {
        color?: string;
        width?: number;
    }
    
    function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?

        newSquare.color = config.clor;
    // Error: Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
    
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
    }
    
    let mySquare = createSquare({ color: "black" });
 
 </div>

 - برخی موارد نیاز داریم که ویژگی هایی از object ما ، صرفا در زمان ایجاد قابل modify باشند و نه پس از آن ! در اینصورت کافی است که قبل آن ویژگی در اینترفیس مورد نطر ، کلمه ی کلیدی readonly قرار بگیرد:

 <div dir="ltr">
 
    interface Point {
        readonly x: number;
        readonly y: number;
    }
 
 </div>

 حال ، میبینیم که وقت ساخت یک آبجکت با ساختار Point، میتوانیم مقادیر x و y را modify کنیم ولی بعد از آن نمیتوانیم ! مثالی را ببینیم:

 <div dir="ltr">
 
    let p1: Point = { x: 10, y: 20 };
    p1.x = 5; // error!
    // Error: Cannot assign to 'x' because it is a read-only property.

 </div>

 در زبان typeScript شما علاوه بر داشتن داده ساختار Array<T> ، دسترسی به داده ساختار ReadOnlyArray<T> دارید، تنها با این تفاوت که تمامی متد های mutating را حذف کرده است ! که شما پس از مقدار دهی آرایه ، مطمئن باشید که مقدار داده های آن قابل تغییر نیستند !

 
 <div dir="ltr">
 
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    
    ro[0] = 12; // error!
    // Error_Details: Index signature in type 'readonly number[]' only permits reading.

    ro.push(5); // error!
    // Error_Details: Property 'push' does not exist on type 'readonly number[]'.
    
    ro.length = 100; // error!
    // Error_Details: Cannot assign to 'length' because it is a read-only property.
    
    a = ro; // error!
    // Error_Details: The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.

 </div>

در خط آخر میتوان دید که شما نمیتوانید یک آرایه ی readOnly را به یک آرایه ی عادی assign کنید ( هر چند دارای type یکسانی هستند)!
البته اگر بخواهید از readonlyArray خود یک نمونه ی mutable هم داشته باشید ، به راحتی میتوانید این کار را بکنید :

<div dir="ltr">

    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    
    a = ro as number[]; // correct !

</div>

ممکن است این سوال پیش بیاید که باید از readonly استفاده کنیم یا const ؟ جواب به این سوال ساده است . کافی است ببینید که میخواهید با یک variable کار کنید یا یک property ! اگر میخواهید با variable کار کنید ، باید از const برای اینکار استفاده کنید . در غیر این صورت باید از readonly استفاده شود !

 - جزئیاتی در باب Property Checks در interface:
 <br/>
 به قطعه کد زیر نگاه کنید :

 <div dir="ltr">
    
    interface SquareConfig {
        color?: string;
        width?: number;
    }
    
    function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
    }
    
    let mySquare = createSquare({ colour: "red", width: 100 });

 </div>

همه چیز بنطر خوب میرسد و برنامه باید بدون مشکل اجرا شود ! اما اینطور نیست . در مرحله ی اجرا ، خطای زیر را دریافت میکنیم :

<div dir="ltr">

    Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
    Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
</div>

همانطور که احتمالا متوجه شده اید ، ما به اشتباه ویژگی color را بصورت colour تایپ کردیم و این باعث ایجاد خطا شده است ! <br/>
ممکن است اینطور بنظرتان برسد که " چون ویژگی color اختیاری بوده است ، پس تابع ما باید فقط ویژگی width را برمیداشت و به colour بعنوان یک ویژگی اضافی نگاه میکرد "
این حرف ، کاملا منطقی است ! اما بیایید واقع گرایانه به ماجرا نگاه کنیم ! برای چه باید دو متغیر با نام های اینچنینی رادر برنامه داشته باشم که حاصل یک اشتباه تایپی است و عملا به یک معنا هستند ؟! مشخصا احتمال اینکه من جایی از برنامه تایپ کنم colour ولی منظورم color باشد خیلی زیاد است و این ممکن است باگی ایجاد کند که گیدا کردن آن راحت نیست! <br/><br/>
در زبان typeScript هم ، با ObjectLiteral ها ، برخورد خاصی میشود زیرا ممکن است باگی در این ناحیه ایجاد شود که پیدا کردن آن سخت باشد!
در واقع اگر ObjectLiteral مد نظر شما دارای هر property باشد که متغیر مقضد شما آنرا نداشته باشد ، ارور دریافت میکنید. مثلا :


<div dir="ltr">

    let mySquare = createSquare({ colour: "red", width: 100 });
    /* Error: Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
    Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'? */

</div>

 - راه حل چیست ؟
  ممکن است بگویید " من از کدم اطمینان دارم و میدانم که منظورم از colour با color کاملا متفاوت است ! "<br />
  برای رفع این مشکلات ، خیلی ساده میتوانید از  typeassertion استفاده کنید :

  <div dir="ltr">
  
        let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
  
  </div>

  البته راه حل بهتر و منظم تری برای اینکار وجود دارد. اگر object شما قطعا ویژگی های اضافه تری دارد که برای موارد مهم و خاصی استفاده میشوند ، از این راه استفاده میکنیم . فرض کنید که SquareConfig علاوه بر ویژگی های colorو width که اختیاری هستند ، قطعا ویژگی های دیگری هم دارد (مثل همان colour!) . کافی است در اینترفیس خود ، خط زیر را اضافه کنیم :

  <div dir="ltr">

    interface SquareConfig {

    color?: string;
    width?: number;
    [propName: string]: any; // this line !

    }
  </div>

حالا دوباره امتحان میکنیم تا ببینیم colour را ایراد میگیریم یا خیر !

<div dir="ltr">

    let squareOptions = { colour: "red", width: 100 };
    let mySquare = createSquare(squareOptions);
    // Congrats! It Works :)
</div>

 توجه کنید که این روش ، تا زمانی پاسخگو است که یک ویژگی مشترک (حداقل) بین object شما و interface مقصد وجود داشته باشد! مثلا کد زیر همجنان به ارور میخورد:

 <div dir="ltr">

    let squareOptions = { colour: "red" };
    let mySquare = createSquare(squareOptions);
    //Error: Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.
 
 </div>




  # Annotations in Typescript :
 همانند اینترفیس که در قسمت قبل دیدیم ، انوتیشن‌ها نیز سیستمی برای نسبت دادن تایپ به متغیرها هستند.
 تفاوت اساسی بین انوتیشن‌ها و اینترفیس در نحوه نسبت دادن آنهاست به صورتی که در انوتیشن این کار به صورت دستی و در اینترفیس به صورت اتوماتیک انجام می‌شود.
 حال چند مثال از این انوتیشن‌ها را با هم بررسی می‌کنیم.
  <div dir="ltr">

    let age: number = 30; // for numbers
    let fruit: string = "kiwi"; // for strings
    let flatEarth: boolean = false; // for booleans
    let aliens: null = undefined; // for undefined or null values

 </div>
 در مثال بالا ما برای هریک از تایپ‌های اولیه یک انوتیشن تعریف کردیم.
 حال همانطور که مشاهده شد این کار در تایپ‌اسکریپت به صورت دستی انجام شده و در صورت تغییر در نوع متغییر با خطا روبه‌رو خواهیم شد.
 حال انوتیشن به صورت متادیتا این اطلاعات را به کامپایلر داده و در صورت درست نبودن مانع از کامپایل شدن برنامه می‌شود.
 مثال زیر را مشاهده کنید:
   <div dir="ltr">

    let counter: number;
    counter = 'Hello'; // compile error 


    Type '"Hello"' is not assignable to type 'number'.

 </div>
 حال این انوتیشن‌ها می‌توانند برای تعریف ارایه و ابجکت ها نیز به کار .
 روند
  <div dir="ltr">

    let person: {
        name: string;
         age: number
    };

    person = {
         name: 'John',
         age: 25
    }; // valid

 </div>
   <div dir="ltr">

    let arrayName: type[];

 </div>

 # decorators in typescript:
 حال مثال‌های بالا انواعی از inline annotations بودند اما نوع دیگری از انوتیشن وجود دارد که به آن decorator می‌گوییم
 البته برخی معتقدند که این دو(انوتیشن و دکوریتور) متفاوت‌اند چرا که ما نمی‌توانیم مشخص کنیم که انوتیشن چگونه به صورت متادیتا به برنامه اضافه شود اما نحوه تفسیر دکوریتور در کامپایلر کاملا به متادیتای داده شده توسط ما بستگی دارد.
 چند مثال از دکوریتورها با هم ببینیم:
  <div dir="ltr">

    declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

    declare type PropertyDecorator = (target: Object, propertyKey: string |     symbol) => void;

    declare type MethodDecorator = <T>(target: Object, propertyKey: string  | symbol, descriptor: TypedPropertyDescriptor<T>) =>     TypedPropertyDescriptor<T> | void;

    declare type ParameterDecorator = (target: Object, propertyKey: string  | symbol, parameterIndex: number) => void;

 </div>
 در مثال‌های بالا همانطور که مشاهده می‌شود از دکوریتور برای اضافه کردن متادیتا به :
 class
 method
 property
 parameter
 استفاده شده که ما دکوریتور method را بررسی و تحلیل می‌کنیم
 
 # method decorators:
 به مثال زیر دقت کنید.
 <div dir="ltr">

    class C {
    @log
    foo(n: number) {
        return n * 2;
        }
    }

 </div>
    در اینجا مشاهده می‌شود که از @log برای انوتیت کردن متود استفاده شده
    حال نگاهی به متود log بیاندازیم:
    <div dir="ltr">

    function log(target: Function, key: string, value: any) {
    return {
        value: function (...args: any[]) {
            var a = args.map(a => JSON.stringify(a)).join();
            var result = value.value.apply(this, args);
            var r = JSON.stringify(result);
            console.log(`Call: ${key}(${a}) => ${r}`);
            return result;
         }
        };
    }
 </div>
 مشاهده می‌شود که 3 ارگومان در دکوریتور مورد نظر داریم:
 target: هدف دکوریتور مورد نظر
 key:نام متودی که دکوریت می‌شود
 value:مشخص کننده property در صورت وجود آن در ابجکت اولیه 
 کد زیر ، کدیست که کامپایلر پس از تفسیر متادیتای موجود در دکوریتور log به ما می‌دهد:
 <div dir="ltr">

    var C = (function () {
    function C() {
    }
    C.prototype.foo = function (n) {
        return n * 2;
    };
    Object.defineProperty(C.prototype, "foo",
        __decorate([
            log
        ], C.prototype, "foo", Object.getOwnPropertyDescriptor(C.prototype, "foo")));
    return C;
    })();
 </div>
 در صورت نبودن @log کد داده شده توسط کامپایلر به صورت زیر خواهد بود:
 <div dir="ltr">

    var C = (function () {
    function C() {
    }
    C.prototype.foo = function (n) {
        return n * 2;
    };
    return C;
    })();
 </div>
 یعنی کامپایلر مدل متفاوتی کد را تفسیر کرده که این مدل تفسیر بستگی به متادیتای داده‌شده توسط ما دارد.

 </div>
