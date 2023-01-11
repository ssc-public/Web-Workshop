<p align="center">
<img src="https://user-images.githubusercontent.com/59171005/211690897-aac2a411-b4ff-4b10-a250-cca08038034c.jpg">
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



9<div dir="ltr">
    
```
var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;

myCircle.removeSegment(0);
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




18<div dir="ltr">
    
```
var myPath = new Path({
	segments: [[40, 115], [80, 180], [200, 20]],
	selected: true
});

myPath.fillColor = '#ff0000';
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



27<div dir="ltr">
    
```
// Change the current style of the project:
project.currentStyle = {
	strokeColor: '#000000',
	fillColor: '#ff0000',
	strokeWidth: 3
};

// This path will inherit the styles we just set:
var firstPath = new Path.Circle({
	center: [100, 100],
	radius: 50
});

// Change the current stroke width and fill color of the project:
project.currentStyle.strokeWidth = 8;
project.currentStyle.fillColor = 'green';

// This path will have a green fill and have a strokeWidth of 8pt:
var secondPath = new Path.Circle({
	center: [250, 100],
	radius: 50
});
```
    
</div> 





29<div dir="ltr">
    
```
var path;

var textItem = new PointText(new Point(20, 30));
textItem.fillColor = 'black';
textItem.content = 'Click and drag to draw a line.';

function onMouseDown(event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	path = new Path();
	path.strokeColor = 'black';
	
	// Select the path, so we can see its segment points:
	path.fullySelected = true;
}
function onMouseDrag(event) {
	// Every drag event, add a point to the path at the current
	// position of the mouse:
	path.add(event.point);
	
	textItem.content = 'Segment count: ' + path.segments.length;
}

function onMouseUp(event) {
	var segmentCount = path.segments.length;
	
	// When the mouse is released, simplify it:
	path.simplify();
	
	// Select the path, so we can see its segments:
	path.fullySelected = true;
	
	var newSegmentCount = path.segments.length;
	var difference = segmentCount - newSegmentCount;
	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';

}
```
    
</div> 



    

## ایجاد انیمیشن ها

برای ایجاد انیمیشن از onFrame handler استفاده می شود. زمانی که این تابع فراخوانی می شود در هر ثانیه 60 بار توسط paper.js اجرا می شود و پس از هر بار veiw دوباره render می شود. نحوه فراخوانی این تابع را در قطعه کد زیر مشاهده می کنید. 

<div dir="ltr">
    
```
function onFrame(event) {
	// Your animation code goes in here
}
```
    
</div> 

تابع onFrame به عنوان ورودی یک event object دریافت می کند که اطلاعاتی درباره event می دهد:
* متغیر event.count تعداد دفعاتی که frame event به اصطلاح fired شده باشد.
* متغیر event.time کل زمان طی شده از اولین frame event به ثانیه
* متغیر event.delta زمان سپری شده از آخرین frame event 
معمولا این مقادیر برای ساخت انیمیشن استفاده نمی شوند. در قطعه کد زیر نحوه دسترسی به هرکدام را مشاهده می کنید.

<div dir="ltr">
    
```
function onFrame(event) {
	// the number of times the frame event was fired:
	console.log(event.count);

	// The total amount of time passed since
	// the first frame event in seconds:
	console.log(event.time);

	// The time passed in seconds since the last frame event:
	console.log(event.delta);
}
```
    
</div> 


در ادامه مثال هایی را بررسی خواهیم کرد. در قطعه کد زیر یک مربع ساخته شده و در تابع onframe این شکل سه درجه rotate روی آن در هر 1/60 ثانیه صورت می گیرد. با افزایش متغیر زاویه سرعت چرخش مربع نیز افزایش پیدا می کند.


<div dir="ltr">
    
```
// Create a rectangle shaped path with its top left point at
// {x: 75, y: 75} and a size of {width: 75, height: 75}
var path = new Path.Rectangle({
	point: [75, 75],
	size: [75, 75],
	strokeColor: 'black'
});

function onFrame(event) {
	// Each frame, rotate the path by 3 degrees:
	path.rotate(3);
}
```
    
</div> 

![animation1](https://user-images.githubusercontent.com/59171005/211649752-5fe26b02-70dd-458f-9f2c-95f010473e55.gif)



در قطعه کد زیر یک دایره ساخته شده است و در onFrame handler در هر 1/60 ثانیه مقدار hue یا همان رنگ را یک واحد اضافه می شود. لازم به ذکر است از مقدار صفر به معنای قرمز شروه شده و تا آبی پر رنگ رفته و در 360 دوباره به قرمز برمی گردد.    

<div dir="ltr">
    
```
// Create a circle shaped path at the center of the view,
// with a radius of 70:
var path = new Path.Circle({
	center: view.center,
	radius: 70,
	fillColor: 'red'
});

function onFrame(event) {
	// Each frame, change the fill color of the path slightly by
	// adding 1 to its hue:
	path.fillColor.hue += 1;
}
```
    
</div> 

![animation2](https://user-images.githubusercontent.com/59171005/211649814-184d170c-c479-4bf9-aaea-38b1ab49b7fa.gif)

 

در کد زیر ابتدا یک text ساخته می شود و در onFrame مکان این text به destination تغییر میکند و چون در فواصل زمانی کم آپدیت صورت میگیرد تغییر به صورت پیوسته بوده و به صورت گسسته با چشم دیده نمی شود. در اینجا در هر فریم به اندازه 1/30 کل فاصله طی می شود و با افزایش این عدد حرکت از پیوسته به گسسته تغییر خواهد کرد. و هرگاه فاصله کمتر از 5 شد دوباره destination به صورت تصادفی نقطه ای از صفحه مقداردهی می شود.


<div dir="ltr">
    
```
// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	justification: 'center',
	fontSize: 30,
	fillColor: 'white'
});

// Define a random point in the view, which we will be moving
// the text item towards.
var destination = Point.random() * view.size;

function onFrame(event) {
	// Each frame, move the path 1/30th of the difference in position
	// between it and the destination.
	
	// The vector is the difference between the position of
	// the text item and the destination point:
	var vector = destination - text.position;
	
	// We add 1/30th of the vector to the position property
	// of the text item, to move it in the direction of the
	// destination point:
	text.position += vector / 30;
	
	// Set the content of the text item to be the length of the vector.
	// I.e. the distance it has to travel still:
	text.content = Math.round(vector.length);
	
	// If the distance between the path and the destination is less
	// than 5, we define a new random point in the view to move the
	// path to:
	if (vector.length < 5) {
		destination = Point.random() * view.size;
	}
}
```
    
</div>

![3](https://user-images.githubusercontent.com/59171005/211651908-5c0a1332-548d-4cee-b044-fa2b5bc4547a.gif)



در قطعه کد زیر 150 دایره ایجاد شده و با استفاده از symbol در جایی از صفحه قرار می گیرد.(ابتدا دایره به سیمبل bind می شود و با دستور symbol.place(center) یک دایره به symbol اضافه می شود) سپس در onFrame handler در یک لوپ دایره ها از طریق لایه های اکتیو project گرفته می شود (متغیرهای موجود در symbol) و مولفه x آنها در صفحه به اندازه 1/20 عرض هرکدام افزایش پیدا می کند و پس از طی کردن صفحه دوباره از سمت چپ سروع به حرکت می کنند. 


<div dir="ltr">
    
```
// The amount of circles we want to make:
var count = 150;

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'white',
	strokeColor: 'black'
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	placedSymbol.scale(i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		
		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		item.position.x += item.bounds.width / 20;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}
```
    
</div> 


![4](https://user-images.githubusercontent.com/59171005/211653185-7bb5ff5b-191a-40b2-9995-aadfe79e44f5.gif)



قطعه کد زیر یک path با width خاکستری به اندازه 30 ایجاد کرده 5 نقطه روی آن مشخص می کند و به segment های متفاوت تبدیل می شوند و در onFrame یک لوپ روی این 5 عنصر زده می شود بخش مربوطه را دریافت می کند. در ادامه بر اساس event.time (کل زمانی که از اولین فریم تا به اینجا طی شده است) مقدار sin را دریافت کرده و برای هر نقطه این مقدار را در حداکثر ارتفاع مجاز ضرب کرده تا ارتفاع جدید بدست آید. لازم به ذکر است چون به صورت ترتیبی اجرا می شوند مقدار sin برای دو نقطه کنار هم یکسان نبوده و ارتفاع شان به یک میزان تغییر نمی کند و به صورت سینوسی این کار صورت می گیرد.  


<div dir="ltr">
    
```
// The amount of segment points we want to create:
var amount = 5;

// The maximum height of the wave:
var height = 60;

// Create a new path and style it:
var path = new Path({
	// 80% black:
	strokeColor: [0.8],
	strokeWidth: 30,
	strokeCap: 'square'
});

// Add 5 segment points to the path spread out
// over the width of the view:
for (var i = 0; i <= amount; i++) {
	path.add(new Point(i / amount, 1) * view.size);
}

// Select the path, so we can see how it is constructed:
path.selected = true;

function onFrame(event) {
	// Loop through the segments of the path:
	for (var i = 0; i <= amount; i++) {
		var segment = path.segments[i];

		// A cylic value between -1 and 1
		var sinus = Math.sin(event.time * 3 + i);
		
		// Change the y position of the segment point:
		segment.point.y = sinus * height + 100;
	}
	// Uncomment the following line and run the script again
	// to smooth the path:
	// path.smooth();
}
```
    
</div>  

![5](https://user-images.githubusercontent.com/59171005/211652144-71686156-e2c0-43cb-be4c-7c5a45440c0e.gif)



## تعامل با کاربر

ماوس:

تابع های mouse handler یک event دریافت می کنند که اطلاعاتی در رابطه با رخدادهای mouse می دهد که در ادامه بررسی خواهیم کرد.

در قطعه کد زیر هنگام برداشتن mouse، آخرین مکانی که mouse کلیک شده بوده را با event.downPoint می گیرد و مکانی که در حال حاضر mouse رها شده است را نیز می گیرد و خطی بین این دو رسم می کند.
<div dir="ltr">
    
```
function onMouseUp(event) {
	// Create a path:
	var path = new Path();

	// Add the mouse down position:
	path.add(event.downPoint);

	// Add the mouse up position:
	path.add(event.point);
}
```
    
</div>
خروجی کد بالا را در پایین مشاهده می کنید.

![mouse1](https://user-images.githubusercontent.com/59171005/211678229-eb87e533-4a9b-4914-b9cf-b818392c9b7d.gif)



می توان یک خط را نیز به صورت پیوسته کشید که کد زیر این کار را انجام می دهد. onMouseDrag هر زمانی که وکتور delta یک واحد شود فراخوانی شده و این نقطع را به path اضافه می کند (هرچه mindistance کمتر باشد خطوط پیوسته تر خواهند بود). یک نمونه خروجی پایین کد نمایش داده شده است. 

<div dir="ltr">
    
```
// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
tool.minDistance = 1;

var path;

function onMouseDown(event) {
	// Create a new path and give it a stroke color:
	path = new Path();
	path.strokeColor = '#00000';

	// Add a segment to the path where
	// you clicked:
	path.add(event.point);
}

function onMouseDrag(event) {
	// Every drag event, add a segment
	// to the path at the position of the mouse:
	path.add(event.point);
}
```
    
</div>

![mouse2_1](https://user-images.githubusercontent.com/59171005/211687162-0e8de3a4-5d1d-4cbd-9341-2d173e2a847b.gif)




متغیر tool.mindistance برابر 10 قرار داده شده است به این معنی که هنگامی onMouseDrag فراخوانی شود که cursor mouse حداقل 10pt جابجا شده باشد. event.delta وکتور بین مکان حال حاضر mouse و آخرین مکان mouse است که این تابع فراخوانی شده است. سپس زاویه وکتور 90 درجه تغییر داده شده و طول وکتور برابر 5 قرار داده می شود که خروجی را در پایین کد مشاهده می کنید.
<div dir="ltr">
    
```
// The mouse has to be moved at least 10 pt
// before the next onMouseDrag event is called:
tool.minDistance = 10;

function onMouseDrag(event) {
	var path = new Path();
	path.strokeColor = 'black';
	var vector = event.delta;

	// rotate the vector by 90 degrees:
	vector.angle += 90;

	// change its length to 5 pt:
	vector.length = 5;
	
	path.add(event.middlePoint + vector);
	path.add(event.middlePoint - vector);
}
```
    
</div>

![mouse2](https://user-images.githubusercontent.com/59171005/211678189-39f5b5ae-7c3f-48e1-8416-ca136295afaa.gif)


کد زیر همانند گذشته از delta استفاده کرده و آن را 90 درجه چرخانده است و علاوه یر آن دو خط دیگر از top و bottom آن خط رسم کرده است که بسته به سرعت تغییر می توان فاصله آن حداکثر 45 و حداقل 10 واحد با خط اولیه باشد.

<div dir="ltr">
    
```
tool.minDistance = 10;
tool.maxDistance = 45;

var path;

function onMouseDown(event) {
	path = new Path();
	path.strokeColor = '#00000';
	path.selected = true;

	path.add(event.point);
}

function onMouseDrag(event) {
	var step = event.delta;
	step.angle += 90;

	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	
	var line = new Path();
	line.strokeColor = '#000000';
	line.add(top);
	line.add(bottom);

	path.add(top);
	path.insert(0, bottom);
}
```
    
</div>

![mouse2_2](https://user-images.githubusercontent.com/59171005/211689476-df3b4343-0cd0-4bca-baa7-2d1ca22cb7fc.gif)





همچنین اگر mindistance ثبت نشود در فاصله زمانی مشخص با تغییر مکان mouse این تابع فراخوانی می شود که با event.delta.length می توان سرعت تغییر mouse را متوجه شد و event.middlepoint به معنای وسط وکتور delta است. خروجی کد را در پایین کد مشاهده می کنید.

    
<div dir="ltr">
    
```
function onMouseDrag(event) {
	var radius = event.delta.length / 2;
	var circle = new Path.Circle(event.middlePoint, radius);
	circle.fillColor = 'black';
}
```
    
</div>

![mouse3](https://user-images.githubusercontent.com/59171005/211678153-216f4149-2a8d-403d-b8d6-1f39ec4d0a0c.gif)


کد براش و خروجی را نیز در پایین مشاهده می کنید.



<div dir="ltr">
    
```
tool.minDistance = 10;
tool.maxDistance = 45;

var path;

function onMouseDown(event) {
	path = new Path();
	path.fillColor = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};

	path.add(event.point);
}

function onMouseDrag(event) {
	var step = event.delta / 2;
	step.angle += 90;
	
	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	path.add(top);
	path.insert(0, bottom);
	path.smooth();
}

function onMouseUp(event) {
	path.add(event.point);
	path.closed = true;
	path.smooth();
}
```
    
</div>

![mouse2_3](https://user-images.githubusercontent.com/59171005/211690024-02476e19-b3a2-4fb5-a978-802704c32d7c.gif)




کیبرد:

برای دریافت اطلاعات key ثبت شده در کیبورد از onKeyDown و onKeyUp استفاده می شود. 
در کد زیر با فشردن و نگه داشتن یک کلید keyboard تابع onKeyDown فراخوانی شده و تا زمانی که نگه داشته شده است پیام موجود در این تابع را مشاهده خواهیم کرد و بلافاصله پس از برداشتن کلید تابع onKeyUp فراخوانی می شود.

<div dir="ltr">
    
```
// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	content: 'Click here to focus and then press some keys.',
	justification: 'center',
	fontSize: 15
});

function onKeyDown(event) {
	// When a key is pressed, set the content of the text item:
	text.content = 'The ' + event.key + ' key was pressed!';
}

function onKeyUp(event) {
	// When a key is released, set the content of the text item:
	text.content = 'The ' + event.key + ' key was released!';
}
```
    
</div>

خروجی کد بالا را در پایین مشاهده می کنید.

![keyboard1](https://user-images.githubusercontent.com/59171005/211684098-e4230e5f-97e6-47e2-9ef4-ecf02095a2fa.gif)



کد دیگری را در پایین مشاهده می کنید که یک path ساخته و در هر مرحله با فشردن کلید های awsd به چپ بالا پایین و راست حرکت می کنیم.
step طول حرکت بوده و در ابتدا از مقدار موجود در متغیر position شروع به حرکت می کنیم. 
<div dir="ltr">
    
```
// The starting position of the line
var position = new Point(100, 100);

// The amount we will move when one of the keys is pressed:
var step = 10;

var path = new Path();
path.strokeColor = 'black';
path.add(position);

function onKeyDown(event) {
	if(event.key == 'a') {
		position.x -= step;
	}

	if(event.key == 'd') {
		position.x += step;
	}

	if(event.key == 'w') {
		position.y -= step;
	}

	if(event.key == 's') {
		position.y += step;
	}
	path.add(position);
}
```
    
</div>

خروجی کد بالا را در پایین مشاهده می کنید.

![keyboard2](https://user-images.githubusercontent.com/59171005/211684077-2e995dec-6d5f-4f94-ac39-90581d0e61ba.gif)




</div>
