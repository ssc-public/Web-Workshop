<div dir = 'rtl'>

# Action

Action ها , بارهای اطلاعاتی هستند که اطلاعات مربوط به application های شما را به store منتقل می کنند. آنها تنها منبع اطلاعات store هستند و با استفاده از () store.dispatch به store منتقل می‌شوند.

هر action, یک plain object در javascript می باشد. Action ها باید دارای ویژگی type باشند که نوع action انجام شده را نشان می دهد. معمولاً type ها باید به عنوان یک رشته ثابت (constant) تعریف شوند. هنگامی که application شما به اندازه کافی بزرگ است ، ممکن است بخواهید آنها را به یک فایل دیگر (فرضا فایلی به نام types.js که تنها شامل type های مورد نیاز است) منتقل کنید.
در کد زیر به ترتیب, یک نوع type و یک action را ملاحظه می‌کنید.

<div dir = 'ltr'>

```
const ADD_TUDO = 'ADD_TUDO';
const action_sample = {
  type: ADD_TUDO,
  text: 'hello world'
 }
```

</div>
حال می‌توانید خط اول را با کد زیر جایگزین کنید, بدین معنی که آن‌ را از یک فایل دیگر import کنید.

<div dir = 'ltr'>

```
import ADD_TUDO from './types.js';
```

</div>

غیر از ویژگی type, مابقی ساختار یک action به عهده شماست.

# Action Creator

Action creator ها تابع هایی هستند که action می سازند (یا به عبارتی یک action را به عنوان خروجی بر‌می‌گردانند).

<div dir = 'ltr'>

```
const makeTodo(text) => {
  const action = {
    type: ADD_TUDO,
    text
  }
  return action
}
```

</div>
و برای dispatch کردن یک action نیز می‌توان از action creator آن استفاده کرد

<div dir = 'ltr'>
  
  ```
  dispatch(makeTodo(text));
  ```
  </div>
  
  # Reducer
  
  Reducer ها, در واکنش به action هایی که به store منتقل می‌شوند, نحوه‌ی تغییر حالت برنامه 
(application's state) را مشخص می کنند. در واقع action ها, تنها رخ دادن اتفاقی را توصیف می کنند, اما نحوه‌ی تغییر حالت برنامه  به ازای آن action را Reducer ها  توصیف می کنند.

# Store

در بخش های قبلی ، ما action هایی را بیان کردیم که نشان‌ می‌دادند که چه اتفاقی رخ داده است و reducer هایی که طبق این اقدامات, state برنامه را به روز می کنند ، تعریف شده اند.
store, آبجکتی است که این‌ها را کنار هم می‌آورد که مسئولیت‌های زیر را دارا می‌باشد:

۱. قابلیت دسترسی به state برنامه با استفاده از `()getState`

۲. قابلیت به‌روز‌رسانی state برنامه بااستفاده از <span dir = 'ltr'> `dispatch(action)` </span>

۳. قابلیت گوش دادن (subscribe) بعد از هر به‌روز‌‌رسانی state برنامه با استفاده از <span dir = 'ltr'> `subscribe(listener)` </span> که listener, تابع می‌باشد.

۴. غیر فعال‌کردن subscribe تعریف‌‌ شده

در صورت داشتن reducer, ساختن store راحت خواهد بود. از قسمت reducer, می‌دانیم بااستفاده از <span dir = 'ltr'> `combineReducer()` </span> می‌توان چندین reducer را ترکیب کرد و یک reducer واحد ساخت. در اینجا آبجکت todoApp که بااستفاده از ()combineReducers ساخته‌شده‌است را import می‌کنیم.

<div dir = 'ltr'>

```
import {createStore} from 'redux';
import todoApp from './reducers/';
const store = createStore(todoApp);
```

</div>

در نمونه کد زیر با استفاده از action, dispatch ساخته شده توسط makeTodo که یک actionCreator می‌باشد, state برنامه را عوض می‌کند. 

<div dir = 'ltr'>

```
import {createStore} from 'redux';
import {makeTodo} from './actions';
import todoApp from './reducers';
const store = createStore(todoApp);
store.dispatch(makeTodo('hello world'));
```
</div>

در نمونه کد زیر subscribeای تعریف شده است که پس از هر به‌روز‌رسانی state, صدا زده می‌شود و state برنامه را نشان‌می‌دهد.

<div dir = 'ltr'>

```
import {createStore} from 'redux';
import todoApp from './reducers/';
const store = createStore(todoApp);
const subscription = store.subscribe(() => console.log(store.getState()));
```

</div>

که می‌توان در ادامه, با صدا کردن subscribe, subscription تعریف ‌شده را غیر‌فعال کرد.

<div dir = 'ltr'>

```
...
subscription(); //deActivate subscription
```

</div>
</div>
