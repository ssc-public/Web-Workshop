<div dir="rtl">

# Svelte

نویسندگان:
[امیررضا آران‌پور](https://github.com/AmirrezaAranpour "AmirrezaAranpour")
،
[مهیار افشار](https://github.com/mahyar176 "mahyar176")
،
[امیرحسین نقدعلی](https://github.com/AmirHossein-Naqdali "AmirHossein-Naqdali")

---

## فهرست مطالب

1. [مقدمه](#مقدمه)
2. [تاریخچه و پیدایش Svelte](#تاریخچه-و-پیدایش-svelte)
3. [مفاهیم اصلی Svelte](#مفاهیم-اصلی-svelte)
4. [مزایا و ویژگی‌های منحصر به فرد](#مزایا-و-ویژگی‌های-منحصر-به-فرد)
5. [مقایسه با فریم‌ورک‌های دیگر](#مقایسه-با-فریم‌ورک‌های-دیگر)
6. [معماری و نحوه کارکرد](#معماری-و-نحوه-کارکرد)
7. [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
8. [سینتکس و ساختار کد](#سینتکس-و-ساختار-کد)
9. [مدیریت State و Reactivity](#مدیریت-state-و-reactivity)
10. [کامپوننت‌ها و Props](#کامپوننت‌ها-و-props)
11. [Event Handling و Binding](#event-handling-و-binding)
12. [SvelteKit و اکوسیستم](#sveltekit-و-اکوسیستم)
13. [کاربردهای عملی و نمونه پروژه](#کاربردهای-عملی-و-نمونه-پروژه)
14. [چالش‌ها و محدودیت‌ها](#چالش‌ها-و-محدودیت‌ها)
15. [آینده Svelte](#آینده-svelte)
16. [نتیجه‌گیری](#نتیجه‌گیری)
17. [منابع](#منابع)

---

## مقدمه

در دنیای پرشتاب توسعه وب، انتخاب فریم‌ورک مناسب برای ساخت رابط‌های کاربری تعاملی و کارآمد، یکی از مهم‌ترین تصمیمات
توسعه‌دهندگان محسوب می‌شود. در میان فریم‌ورک‌های مختلفی که در سال‌های اخیر ظهور کرده‌اند، **Svelte** با رویکردی متفاوت و
نوآورانه توجه بسیاری از توسعه‌دهندگان را به خود جلب کرده است.

<span dir="ltr">Svelte</span> نه تنها یک فریم‌ورک JavaScript، بلکه یک **کامپایلر** است که کد شما را در زمان build به کد JavaScript بهینه تبدیل
می‌کند. این رویکرد باعث شده تا Svelte در مقایسه با سایر فریم‌ورک‌های معروف مانند React، Vue و Angular عملکرد بهتری داشته
باشد و bundle size کوچک‌تری تولید کند.

هدف از این تحقیق، بررسی جامع Svelte از جنبه‌های مختلف تکنیکی، عملکردی، و کاربردی است. در ادامه با تاریخچه، ویژگی‌ها،
مزایا و معایب، نحوه کارکرد، و مقایسه آن با سایر فریم‌ورک‌ها آشنا خواهیم شد و درنهایت نگاهی به آینده این تکنولوژی خواهیم
داشت.

---

## تاریخچه و پیدایش Svelte

فریم‌ورک Svelte در سال **2016** توسط **ریچ هریس (Rich Harris)**، روزنامه‌نگار و توسعه‌دهنده نیویورک تایمز، ایجاد شد. هریس که پیش
از این روی پروژه‌های متن‌بازی مانند **Rollup** کار کرده بود، با چالش‌هایی که در توسعه اپلیکیشن‌های تعاملی برای روزنامه
مواجه شده بود، تصمیم گرفت رویکردی متفاوت از فریم‌ورک‌های موجود ارائه دهد.

ایده اصلی پشت Svelte این بود که به جای داشتن **runtime overhead**، کد را در زمان **build** کامپایل کند و JavaScript
بهینه تولید کند؛ الهام‌گرفته از کامپایلرهای زبان‌های برنامه‌نویسی سنتی.

- نسخه‌ی اولیه پایدار: **2017**
- نسخه‌ی 2: **2018** (بهبودهای قابل توجه)
- نسخه‌ی 3: **2019** (تغییرات اساسی در API و syntax)

یکی از نقاط عطف مهم، پیوستن ریچ هریس به شرکت **Vercel** در **2021** بود که شتاب توسعه را افزایش داد. در همین دوره، **
SvelteKit** به‌عنوان فریم‌ورک تمام‌عیار برای توسعه اپلیکیشن‌های وب بر پایه Svelte معرفی شد.

---

## مفاهیم اصلی Svelte

### Compile-Based

بزرگ‌ترین تمایز Svelte رویکرد **compile-time** آن است. به‌جای ارسال کد فریم‌ورک به مرورگر، Svelte در زمان build کد شما
را تحلیل و به JavaScript خالص و بهینه تبدیل می‌کند.

### Reactive Programming

<span dir="ltr">Svelte</span> از مفهوم **reactivity** برای مدیریت state استفاده می‌کند. هرگاه داده‌ای تغییر کند، تمام قسمت‌های وابسته در UI
به‌طور خودکار به‌روزرسانی می‌شوند.

### Component-Based Architecture

<span dir="ltr">Svelte</span> نیز مانند فریم‌ورک‌های مدرن، مبتنی بر **کامپوننت** است. هر کامپوننت یک فایل `svelte.` شامل HTML، CSS و JavaScript
است.

### No Virtual DOM

برخلاف React که از **Virtual DOM** استفاده می‌کند، Svelte مستقیماً **DOM واقعی** را دستکاری می‌کند؛ نتیجه: کاهش overhead
و افزایش سرعت.

---

## مزایا و ویژگی‌های منحصر به فرد

- **عملکرد بالا**: به‌دلیل کامپایل در زمان build و حذف Virtual DOM.
- **Bundle Size کوچک**: تنها کدهای استفاده‌شده وارد bundle می‌شوند.
- **سادگی Syntax**: یادگیری آسان و بهره‌وری بالاتر.
- **Built-in Features**: مدیریت state، انیمیشن‌ها و transitions به‌صورت داخلی.
- **CSS Scoping خودکار**: استایل هر کامپوننت به همان کامپوننت محدود است.

---

## مقایسه با فریم‌ورک‌های دیگر

### Svelte vs React

<span dir="ltr">React</span> از Virtual DOM و JSX استفاده می‌کند؛ Svelte مستقیماً DOM را تغییر می‌دهد و syntax نزدیک‌تری به HTML دارد. از نظر
عملکرد، Svelte غالباً سریع‌تر است؛ اما React اکوسیستم بزرگ‌تری دارد.

### Svelte vs Vue

هر دو syntax ساده دارند. Vue یک **runtime framework** است، در حالی‌که Svelte **compile-time** است. Vue templateهای
قدرتمندی دارد، اما خروجی Svelte غالباً کوچک‌تر است.

### Svelte vs Angular

<span dir="ltr">Angular</span> یک فریم‌ورک کامل و مناسب پروژه‌های بزرگ با **TypeScript** است. Svelte ساده‌تر و سبک‌تر است (و از TS هم پشتیبانی
می‌کند) اما امکانات out-of-the-box کمتری نسبت به Angular دارد.

---

## معماری و نحوه کارکرد

### فرآیند کامپایل

<span dir="ltr">Svelte compiler</span> کد `svelte.` شما را دریافت و پردازش می‌کند:

1. **<span dir="ltr">Parsing</span>**: تجزیه فایل به AST
2. **Analysis**: تحلیل وابستگی‌ها و reactivity
3. **Code Generation**: تولید JavaScript بهینه
4. **Optimization**: بهینه‌سازی نهایی

### Reactivity System

سیستم reactivity Svelte بر پایه **assignment tracking** عمل می‌کند؛ با هر انتساب به متغیر، کد تولیدشده بخش‌های وابسته
DOM را به‌روز می‌کند.

### Component Lifecycle

Lifecycle hooks مهم:

- `onMount`
- `beforeUpdate`
- `afterUpdate`
- `onDestroy`

---

## نصب و راه‌اندازی

### پیش‌نیازها

- **Node.js 14+**

### ایجاد پروژه‌ی جدید

```bash
npx sv create myapp
cd my-svelte-app
npm install
npm run dev
```

### ساختار پروژه

```
my-svelte-app/
├── src/
│   ├── lib/
│   ├── routes/
│   ├── app.html
│   └── app.css
├── static/
├── package.json
└── svelte.config.js
```

### پیکربندی

- فایل `svelte.config.js` برای تنظیم کامپایلر و adaptor.

---

## سینتکس و ساختار کد

### ساختار فایل کامپوننت

```svelte
<script>
  // JavaScript logic
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<main>
  <!-- HTML template -->
  <h1>Count: {count}</h1>
  <button on:click={increment}>
    Increment
  </button>
</main>

<style>
  /* Scoped CSS */
  main {
    padding: 1rem;
  }

  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
```

### Template Syntax

- **Interpolation**: <code>{expression}</code>
- **Conditionals**: <code>{#if condition} ... {/if}</code>
- **Loops**: <code>{#each items as item} ... {/each}</code>
- **Await**: <code>{#await promise} ... {/await}</code>

### Directives

- `on:event` — مدیریت رویداد
- `bind:property` — دوطرفه‌سازی مقادیر
- `use:action` — اکشن‌های المنت
- `class:name` — کلاس‌های شرطی

---

## مدیریت State و Reactivity

### Local State

```svelte
<script>
  let name = 'World';
  let count = 0;

  // Reactive statement
  $: doubled = count * 2;

  // Reactive block
  $: {
    console.log(`Count is ${count}`);
  }
</script>
```

### Stores (Global State)

**store.js**

```js
import {writable} from 'svelte/store';

export const count = writable(0);
```

استفاده در کامپوننت:

```svelte
<script>
  import { count } from './store.js';
</script>

<h1>{$count}</h1>
<button on:click={() => $count += 1}>+</button>
```

### Custom Stores

```js
import {writable} from 'svelte/store';

function createCount() {
    const {subscribe, set, update} = writable(0);

    return {
        subscribe,
        increment: () => update(n => n + 1),
        decrement: () => update(n => n - 1),
        reset: () => set(0)
    };
}

export const count = createCount();
```

---

## کامپوننت‌ها و Props

### تعریف Props

```svelte
<script>
  export let name;
  export let age = 0; // default value
</script>

<p>Hello {name}, you are {age} years old.</p>
```

### استفاده از کامپوننت

```svelte
<script>
  import Child from './Child.svelte';
</script>

<Child name="John" age={25} />
```

### Slots

**Parent.svelte**

```svelte
<div class="card">
  <slot name="header"></slot>
  <slot></slot>
  <slot name="footer"></slot>
</div>
```

استفاده:

```svelte
<Parent>
  <h1 slot="header">Title</h1>
  <p>Content goes here</p>
  <button slot="footer">Action</button>
</Parent>
```

---

## Event Handling و Binding

### Event Handling

```svelte
<script>
  function handleClick(event) {
    console.log('Button clicked!', event);
  }

  function handleMouseover() {
    console.log('Mouse over!');
  }
</script>

<button on:click={handleClick}>
  Click me
</button>

<div on:mouseover={handleMouseover}>
  Hover over me
</div>
```

### Event Modifiers

```svelte
<button on:click|preventDefault={handleClick}>
  Click me
</button>

<button on:click|once={handleClick}>
  Click me once
</button>
```

### Two-way Binding

```svelte
<script>
  let name = '';
  let agreed = false;
  let selected = 'option1';
</script>

<input bind:value={name} />
<input type="checkbox" bind:checked={agreed} />
<select bind:value={selected}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

---

## اکوسیستم SvelteKit

### معرفی SvelteKit

**<span dir="ltr">SvelteKit</span>** فریم‌ورک رسمی برای ساخت اپلیکیشن‌های وب با Svelte است: routing، SSR، SSG، endpoints، code splitting خودکار
و HMR را فراهم می‌کند.

### ویژگی‌ها

- File-based routing
- Server-side rendering (SSR)
- Static site generation (SSG)
- API endpoints
- Code splitting خودکار
- Hot module replacement

### ساختار Routing

```
src/routes/
├── +page.svelte          # /
├── about/
│   └── +page.svelte      # /about
├── blog/
│   ├── +page.svelte      # /blog
│   └── [slug]/
│       └── +page.svelte  # /blog/[slug]
└── api/
    └── posts/
        └── +server.js    # /api/posts
```

### Loading Data

```js
// +page.js
export async function load({fetch, params}) {
    const res = await fetch('/api/posts');
    const posts = await res.json();

    return {
        posts
    };
}
```

### کتابخانه‌های محبوب

- **UI**: Svelte Material UI، Carbon Components
- **Animation**: Svelte Transition، Lottie Svelte
- **Forms**: Svelte Forms Lib، Felte
- **State Management**: Zustand، Redux Toolkit
- **Testing**: Jest، Cypress، Playwright

---

## کاربردهای عملی و نمونه پروژه

### اپلیکیشن Todo List

```svelte
<script>
  let todos = [];
  let newTodo = '';

  function addTodo() {
    if (newTodo.trim()) {
      todos = [
        ...todos,
        { id: Date.now(), text: newTodo, completed: false }
      ];
      newTodo = '';
    }
  }

  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  }

  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }
</script>

<div class="app">
  <h1>Todo List</h1>

  <form on:submit|preventDefault={addTodo}>
    <input
      bind:value={newTodo}
      placeholder="Add new todo..."
    />
    <button type="submit">Add</button>
  </form>

  <ul>
    {#each todos as todo}
      <li class:completed={todo.completed}>
        <input
          type="checkbox"
          bind:checked={todo.completed}
        />
        <span>{todo.text}</span>
        <button on:click={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .app {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
  }

  .completed span {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>
```

### Dashboard تحلیلی

<span dir="ltr">Svelte</span> برای ساخت داشبوردهای تعاملی بسیار مناسب است. با استفاده از کتابخانه‌هایی مانند **D3.js** می‌توان نمودارهای پیچیده
ایجاد کرد.

### Progressive Web App (PWA)

<span dir="ltr">SvelteKit</span> امکان ساخت PWA با قابلیت‌هایی مانند **offline support** و **push notifications** را فراهم می‌کند.

---

## چالش‌ها و محدودیت‌ها

- **اکوسیستم کوچک‌تر** نسبت به React/Vue
- **منابع یادگیری محدودتر** به دلیل جدید بودن
- **ابزارهای توسعه** (debugging/profiling) کمتر بالغ نسبت به رقبا
- **تیم توسعه کوچک‌تر** → احتمال کندی در رفع باگ‌ها/افزودن فیچر
- **مهاجرت دشوار** از پروژه‌های بزرگ React/Vue

---

## آینده Svelte

- **Svelte 5 و Runes**: معماری جدید برای reactivity قدرتمندتر و منعطف‌تر
- **بهبود Performance**: بهینه‌سازی مداوم کامپایلر و کاهش اندازه خروجی
- **ابزارهای توسعه بهتر**: debugging، profiling و IDE support
- **پشتیبانی TypeScript قوی‌تر** و ارتقای type-safety
- **رشد اکوسیستم**: افزایش کتابخانه‌ها و ابزارهای پیرامونی
- **Server-side Enhancements**: بهبود SSR و edge computing در SvelteKit

---

## نتیجه‌گیری

<span dir="ltr">Svelte</span> با رویکرد نوآورانه خود جایگاه ویژه‌ای در دنیای فریم‌ورک‌های JavaScript پیدا کرده است. **کامپایل‌محور بودن، عملکرد
بالا، bundle کوچک و syntax ساده** از مزایای کلیدی آن هستند. هرچند اکوسیستم آن کوچک‌تر از رقباست، اما رشد سریع محبوبیت
و **SvelteKit** به‌عنوان راه‌حل جامع، آینده‌ای روشن را رقم می‌زنند.

برای پروژه‌های جدیدی که به **عملکرد بالا، سادگی توسعه و خروجی سبک** نیاز دارند، Svelte انتخابی عالی است. همچنین برای
توسعه‌دهندگانی که به دنبال تجربه‌ای متفاوت و فناوری‌های نو هستند، یادگیری Svelte توصیه می‌شود.

---

## منابع

1. مستندات رسمی Svelte — <https://svelte.dev>
2. مستندات SvelteKit — <https://kit.svelte.dev>
3. Rich Harris Talks — مجموعه سخنرانی‌ها
4. Svelte Society — انجمن رسمی توسعه‌دهندگان
5. State of JS Survey — مقالات تحلیلی
6. GitHub Repository رسمی Svelte
7. Svelte Blog — وبلاگ رسمی تیم توسعه
8. کتاب **Svelte and Sapper in Action** اثر Mark Volkmann
9. دوره‌های آموزشی Svelte در پلتفرم‌های مختلف
10. مقایسه‌های Performance بین فریم‌ورک‌ها

</div>
