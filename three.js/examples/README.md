<p dir="rtl" style="position:right;">
این کد یک سند HTML ساده است که از کتابخانه Three.js برای ایجاد یک صحنه سه‌بعدی با یک سیلندر چرخان (شبیه یک فنجان) استفاده می‌کند. اکنون اجزا و سطوح مختلف ایجاد در این کد را تجزیه و تحلیل می کنیم:

#<p dir="rtl" style="position:right;">ساختن صحنه (Scene):

```toml
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333); // پس‌زمینه تیره
```
<p dir="rtl" style="position:right;">

در این قسمت یک صحنه Three.js ایجاد می‌شود و پس‌زمینه آن به رنگ تیره (hex: 0x333) تنظیم می‌شود.

#<p dir="rtl" style="position:right;">افزودن نورها (Lights):

```toml
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 20;
pointLight.position.y = 30;
pointLight.position.z = 40;
scene.add(pointLight);
```
<p dir="rtl" style="position:right;">
یک نور محیطی و یک نور نقطه‌ای به صحنه اضافه می‌شوند تا صحنه را روشن کنند. مکان نور نقطه‌ای هم تنظیم می‌شود.

#<p dir="rtl" style="position:right;">تعریف دوربین (Camera):

<p dir="rtl" style="position:right;">
یک دوربین دورنگار با زاویه دید ۷۰ درجه و نسبت ابعاد مطابق با ابعاد پنجره ایجاد می‌شود. مکان دوربین هم تنظیم می‌شود.

#<p dir="rtl" style="position:right;">تعریف رندرر (Renderer):

```toml
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.append(renderer.domElement);
renderer.render(scene, camera);
```
<p dir="rtl" style="position:right;">
یک رندرر با استفاده از WebGL ایجاد می‌شود، اندازه آن به ابعاد پنجره تنظیم می‌شود، و سپس به سند اضافه می‌شود. همچنین، اولین رندر صحنه انجام می‌شود.

#<p dir="rtl" style="position:right;">ایجاد هندسه و متریال (Geometry and Material):

```toml

const geometry = new THREE.CylinderGeometry(80, 80, 200, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture });
```
<p dir="rtl" style="position:right;">
یک هندسه سیلندر و یک متریال با رنگ سفید و تکسچر از کانوس ایجاد می‌شود.

#<p dir="rtl" style="position:right;">ایجاد مش (Mesh):

```toml

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```
<p dir="rtl" style="position:right;">
هندسه و متریال با هم ترکیب شده و یک مش ایجاد می‌شود که به صحنه اضافه می‌شود.

#<p dir="rtl" style="position:right;">پاسخگویی به تغییر اندازه پنجره:

```toml
window.addEventListener('resize', () => {
   width = window.innerWidth;
   height = window.innerHeight;
   camera.aspect = width / height;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.render(scene, camera);
});
```
<p dir="rtl" style="position:right;">
یک گوشه‌گیر رویداد برای تغییر اندازه پنجره ایجاد شده است که در صورت تغییر ابعاد پنجره، دوربین و رندرر را به‌روز می‌کند و صحنه را مجدداً رندر می‌کند.

#<p dir="rtl" style="position:right;">انیمیشن:

```toml
function animate() {
   requestAnimationFrame(animate);
   changeCanvas();
   texture.needsUpdate = true;
   mesh.rotation.y += 0.01;
   renderer.render(scene, camera);
}
animate();
```
<p dir="rtl" style="position:right;">
یک حلقه انیمیشن با استفاده از requestAnimationFrame ایجاد شده است. در هر فریم، تکسچر کانوس به‌روز شده و استوانه یک کم چرخش می‌یابد.