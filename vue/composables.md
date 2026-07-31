<div dir="rtl">

# یک "Composable" چیست؟

در برنامه‌های Vue، یک "Composable" تابعی است که از Composition API استفاده می‌کند تا منطق stateful را کپسوله‌سازی و قابل
استفاده مجدد کند.

## مثال ردیاب ماوس

برای پیاده‌سازی عملکرد ردیابی ماوس در داخل یک کامپوننت با استفاده از Composition API:
<div dir="ltr">

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

</div>

برای استفاده مجدد از این منطق در کامپوننت‌های مختلف، می‌توانیم آن را به عنوان یک تابع composable در یک فایل خارجی تعریف
کنیم:

<div dir="ltr">

```js

// mouse.js
import {ref, onMounted, onUnmounted} from 'vue'

export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    return {x, y}
}
```

</div>

و سپس در کامپوننت‌ها استفاده کنیم:

<div dir="ltr">

```vue

<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>

مثال Async State
```

</div>

برای مدیریت حالت‌های مختلف در هنگام دریافت داده‌های Async، می‌توانیم یک composable بنویسیم:

<div dir="ltr">

```js

// fetch.js
import {ref} from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))

    return {data, error}
}
```

</div>

و در کامپوننت استفاده کنیم:

<div dir="ltr">

```vue

<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

</div>

قبول کردن state های reactive

برای اینکه useFetch بتواند یک ref را قبول کند و هربار که URL تغییر کند، درخواست جدید انجام دهد:

<div dir="ltr">

```js

const url = ref('/initial-url')
const {data, error} = useFetch(url)

url.value = '/new-url'
```

</div>

یا یک تابع دریافت کننده:

<div dir="ltr">

```js

const {data, error} = useFetch(() => `/posts/${props.id}`)
```

</div>

این انعطاف‌پذیری امکان استفاده مجدد و کپسوله‌سازی منطق‌های پیچیده‌تر را فراهم می‌آورد.
</div>

<div dir="ltr">

```vue
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

</div>
