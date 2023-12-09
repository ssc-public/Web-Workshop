<div dir="rtl">
<h1>
    واچر‌ها
</h1>

در کامپوننت‌ها برای اینکه متوجه شویم مقدار متغییری تغییر کرده است یا خیر از آپشن <code>watch</code> استفاده می‌کنیم.
<br>
مثال:

<div dir="ltr">

```vue
<template>
  <div>
    {{ count }}
    <button @click="increase"> increase </button>
  </div>
</template>

<script>
export default {
 data: () => ({
   count: 0,
 }), 
 methods: {
   increase() {
     this.count += 1
   }   
 },
 watch: {
   count(newCount, oldCount) {
     console.log('old count: ', oldCount)
     console.log('new count: ', newCount)
   }
 } 
}
</script>
```
</div>

همانطور که می‌بینید اتتریبویت‌های آپشن <code>watch</code>
تابع هستند؛ واچر‌ها را می‌توان به صورت‌های دیگری نیز نوشت فرض کنید می‌خواهید متوجه تغییرات یک متغیر درونی از یک آبکت 
بشوید.
برای این کار می‌توانید از روش زیر استفاده کنید:

<div dir="ltr">

```vue
<script>
export default {
 data: () => ({
   user: {
     firstName: 'foo'
   },
 }), 
 created() {
   setTimeout(() => {
     this.user.firstName = 'bar'
   }, 5000)
 },
 watch: {
   'user.firstName'(newFirstName, oldFirstName) {
     console.log('old first name: ', oldFirstName)
     console.log('new first name: ', newFirstName)
   },
 } 
}
</script>
```
</div>

حال فرض کنید می‌خواهید متوجه تغییرات درونی یک آبجکت بشوید در این صورت به شکل زیر عمل می‌کنیم:


<div dir="ltr">

```vue
<script>
export default {
 data: () => ({
   user: {
     firstName: 'foo'
   },
 }), 
 created() {
   setTimeout(() => {
     this.user.firstName = 'bar'
   }, 5000)
 },
 watch: {
   user: {
     handler(newUser, oldUser) {
       console.log('old user: ', oldUser)
       console.log('new user: ', newUser)
     },
     deep: true,
   }
 } 
}
</script>
```
</div>


</div>
