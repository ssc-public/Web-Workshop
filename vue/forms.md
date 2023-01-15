فرم ها:

هنگامی که با فرم ها در فرانت اند سروکار داریم، اغلب نیاز داریم که حالت عناصر ورودی فرم را با استیت مربوطه در جاوا اسکریپت همگام سازی کنیم. bind کردن مقادیر و تغییر event listener ها بصورت دستی می‌تواند دشوار باشد:

```vue
<input
  :value="text"
  @input="event => text = event.target.value"
/>
```

دستور v-model به ما کمک می کند تا موارد فوق را ساده کنیم:
```vue
<input v-model="text" />
```

  

  
عنصر رادیو:
  
```vue
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

عنصر سلکت:
  
```vue
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

انتخاب چندگانه (پیوند به آرایه):
```vue
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

سلکت آپشن را می توان به صورت پویا با v-for رندر کرد:
```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```


```vue
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```


بایند کردن مقادیر:

برای رادیو، چک باکس و سلکت آپشن، مقادیر اتصال v-model معمولاً رشته‌های ثابت هستند (یا بولین برای چک باکس):

```vue
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

اما گاهی اوقات ممکن است بخواهیم مقدار را به یک پروپرتی پویا در نمونه فعال فعلی متصل کنیم. برای رسیدن به آن می توانیم از v-bind استفاده کنیم. علاوه بر این، استفاده از v-bind به ما این امکان را می دهد که مقدار ورودی را به مقادیر غیر رشته ای متصل کنیم.

چک باکس:
```vue
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" 
/>
```
این true-value و false-value ویژگی های مخصوص Vue هستند که فقط با v-model کار می کنند. در اینجا مقدار toggle با تیک زدن yes و در صورت برداشتن تیک،no  تنظیم می شود. همچنین می توانید آنها را با استفاده از v-bind به مقادیر پویا متصل کنید:

```vue
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" 
/>
```


نکته:
اتریبیوت ‌های true-value و false-value بر مقدار ورودی تأثیر نمی‌گذارند، زیرا مرورگرها کادرهای بدون علامت را در ارسال‌های فرم درج نمی‌کنند. برای تضمین اینکه یکی از دو مقدار در یک فرم ارسال می شود (به عنوان مثال "بله" یا "خیر")، به جای آن از ورودی های رادیویی استفاده کنید.

ورودی های رادیویی:
```vue
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```
هنگامی که اولین ورودی رادیویی بررسی می شود، انتخاب روی مقدار اول تنظیم می شود و هنگامی که ورودی دوم بررسی می شود روی مقدار دوم تنظیم می شود.

سلکت آپشن:
```vue
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```
این v-model از بایند کردن مقادیر غیر رشته ای نیز پشتیبانی می کند! در مثال بالا، هنگامی که گزینه انتخاب می شود، فیلد selected به مقدار واقعی شیء {شماره: 123 } تنظیم می شود.
