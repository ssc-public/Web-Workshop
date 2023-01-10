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
<p dir="rtl">
JSXGraph ابزار مناسبی برای کشیدن گراف های با معادلات پیچیده ریاضیاتی به صورت دقیق است و بر خلاف paper.js قابلیت انیمیشنی زیادی ندارد.
</p>
    
* Three.js
    
## Scope project views and tools
    
    
    
## آموزش

1<div dir="ltr">
    
```
var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(0, 0));
myPath.add(new Point(100, 50));
```
    
</div>
    
2<div dir="ltr">
    
```
var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(0, 0), new Point(100, 50));
```
    
</div>


3<div dir="ltr">
    
```
var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(0, 0), new Point(100, 50));

// insert a segment between the two existing
// segments in the path:
myPath.insert(1, new Point(30, 40));
```
    
</div>    
    
    
4<div dir="ltr">
    
```
var path = new Path();
path.strokeColor = 'black';
path.add(new Point(30, 75)); 
path.add(new Point(30, 25)); 
path.add(new Point(80, 25));
path.add(new Point(80, 75));
path.closed = true;

// Select the path, so we can see its handles:
path.fullySelected = true;

// Create a copy of the path and move it 100pt to the right:
var copy = path.clone();
copy.fullySelected = true;
copy.position.x += 100;

// Smooth the segments of the copy:
copy.smooth();
```
    
</div> 
    
    

5<div dir="ltr">
    
```
var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(40, 90));
myPath.add(new Point(90, 40));
myPath.add(new Point(140, 90));
```
    
</div>     


6<div dir="ltr">
    
```
var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(40, 90));
myPath.add(new Point(90, 40));
myPath.add(new Point(140, 90));

myPath.closed = true;
```
    
</div>  


7<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;
```
    
</div>  

    
8<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;
```
    
</div> 



9<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;

myCircle.removeSegment(0);
```
    
</div> 




10<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 100), 50);
myCircle.fillColor = 'black';

myCircle.remove();
```
    
</div> 




11<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.fillColor = 'black';
```
    
</div> 



12<div dir="ltr">
    
```
var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
var path = new Path.Rectangle(rectangle);
path.fillColor = '#e9e9ff';
path.selected = true;
```
    
</div> 



13<div dir="ltr">
    
```
var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
var radius = new Size(20, 20);
var path = new Path.Rectangle(rectangle, radius);
path.fillColor = 'black';
```
    
</div> 



14<div dir="ltr">
    
```
// Create a triangle shaped path 
var triangle = new Path.RegularPolygon(new Point(80, 70), 3, 50);
triangle.fillColor = '#e9e9ff';
triangle.selected = true;

// Create a decagon shaped path 
var decagon = new Path.RegularPolygon(new Point(200, 70), 10, 50);
decagon.fillColor = '#e9e9ff';
decagon.selected = true;
```
    
</div> 




15<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});
```
    
</div> 



16<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]]
});

myPath.strokeColor = '#ff0000'; // red
```
    
</div> 


17<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]]
});

myPath.strokeColor = new Color(0.5, 0, 0.5);
```
    
</div> 




18<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});

myPath.fillColor = '#ff0000';
```
    
</div> 




19<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]]
});

myPath.strokeColor = '#ff0000';

myPath.strokeWidth = 10;
```
    
</div> 





20<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});

myPath.strokeColor = '#ff0000';
myPath.strokeWidth = 10;

myPath.strokeCap = 'round';
```
    
</div> 




21<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});

myPath.strokeColor = '#ff0000';
myPath.strokeWidth = 10;

myPath.strokeJoin = 'round';
```
    
</div> 




22<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});

myPath.strokeColor = '#ff0000';
myPath.strokeWidth = 5;
myPath.strokeCap = 'round';

myPath.dashArray = [10, 12];
```
    
</div> 




23<div dir="ltr">
    
```
var firstPath = new Path.Circle({
	center: [80, 50],
	radius: 35
});

firstPath.strokeColor = '#ff0000';
firstPath.fillColor = 'blue';

// secondPath doesn't have a strokeColor yet:
var secondPath = new Path.Circle({
	center: [160, 50],
	radius: 35
});

// Apply the style of firstPath to that of secondPath:
secondPath.style = firstPath.style;
```
    
</div> 




16<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]]
});

myPath.strokeColor = '#ff0000'; // red
```
    
</div> 




16<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]]
});

myPath.strokeColor = '#ff0000'; // red
```
    
</div> 
    
    
    
</div>
