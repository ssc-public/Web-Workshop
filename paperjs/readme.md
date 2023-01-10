<p align="center">
    <img src="https://github.com/rezasoumi/Web-Workshop/tree/master/paperjs/img/paperjslogo.jpg">
</p>

<p align="center">
    تحقیق میان ترم برنامه سازی وب، دانشگاه صنعتی شریف
    <br/>
    استاد درس: جناب آقای امید جعفری نژاد
    <br/>
    نویسندگان: رضا صومی، حمیدرضا کلباسی، علی جوانمرد و پارسا صلواتی
</p>

<div dir="rtl">

## نحوه نصب
برای نصب می توانید از دستورات زیر استفاده کنید
و paperscript و paperjs را نصب کنید

<div dir="ltr">

```
npm install --save-dev paperscript
npm install paper
```

</div>

همچنین می توان از خود سایت نیز این پروژه را دانلود کنید که درون آن مثال های متنوعی نیز وجود دارد.
[paperjs.org/download](http://paperjs.org/download/)

## تعریف

    
پروژه paper.js یک چارچوب گرافیک برداری متن باز است که روی HTML5 Canvas کار می کند و ویژگی های زیر را داراست:
* A Scene Graph / Document Object Model for vector graphics: Works with nested layers, groups, paths, compound paths, rasters, symbols, etc.
* The handling and drawing of these graphic items is automatic and optimized, allowing you to construct or modify your items and styles and leave the drawing commands to Paper.js.
* A well-designed and battle-hardened Application Programming Interface (API).
* PaperScript, a simple extension of JavaScript, allows the scoped execution of scripts without polluting the global scope, the execution of multiple scripts per page in their separate sand-boxed scopes while sharing the library code and adding support for operator overloading to any object.
* There is a good reason for the word Vector in Vector Graphics. Paper.js treats Vector Mathematics as a first-class citizen by making working with vectors and geometries as simple as possible through its core types such as Point, Size, and Rectangle. The manipulation of Point and Size objects is further simplified in PaperScript, where direct math operations using normal operator syntax are possible on such objects as if they were plain numbers.
* Construct paths and manipulate their curves and segments in very convenient and fine-grained ways.
* Inspect and manipulate the precise bounding box of any item, supporting complicated stroke styles with different stroke ends and miter limits.
* Smoothen curves, and simplify path segments by fitting curves through points.
* Simulate dashed strokes that are currently lacking from the Canvas object, at near-native drawing speed.
Most blend modes known from Illustrator and Photoshop are supported through emulation in JavaScript: multiply, screen, overlay, soft-light, hard-light, color-dodge, * color-burn, darken, lighten, difference, exclusion, hue, saturation, luminosity, color, add, subtract, average & negation.
    
    
 
## مقایسه
* JSXGraph
<div dir="rtl">
JSXGraph ابزار مناسبی برای کشیدن گراف های با معادلات پیچیده ریاضیاتی به صورت دقیق است و بر خلاف paper.js قابلیت انیمیشنی زیادی ندارد.
</div>
    
* Three.js
    
    
    
    
    
    
</div>
