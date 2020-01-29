<div dir = 'rtl'>

# Action 

Action ها , بارهای اطلاعاتی هستند که اطلاعات مربوط به application های شما را به store منتقل می کنند. آنها تنها منبع اطلاعات store هستند و با استفاده از  () store.dispatch به store منتقل می‌شوند.

هر action, یک plain object در javascript می باشد. Action ها باید دارای ویژگی type باشند که نوع action انجام شده را نشان می دهد. معمولاً  type ها باید به عنوان یک رشته ثابت (constant) تعریف شوند. هنگامی که application شما به اندازه کافی بزرگ است ، ممکن است بخواهید آنها را به یک فایل دیگر (فرضا فایلی به نام types.js که تنها شامل type های مورد نیاز است) منتقل کنید.
در کد زیر به ترتیب, یک نوع type و  یک action را ملاحظه می‌کنید.

<div dir = 'ltr'>

```
const ADD_TUDO = 'ADD_TUDO';
const action_sample = {
  type: ADD_TUDO,
  text: 'hello world'
 }
```
</div>

</div>
