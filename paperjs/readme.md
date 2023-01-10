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

1<div dir="ltr">
    
```
function onFrame(event) {
	// Your animation code goes in here
}
```
    
</div> 


2<div dir="ltr">
    
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



3<div dir="ltr">
    
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



4<div dir="ltr">
    
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
    


5<div dir="ltr">
    
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



6<div dir="ltr">
    
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



7<div dir="ltr">
    
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
    
</div>
