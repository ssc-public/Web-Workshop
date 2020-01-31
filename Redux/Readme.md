<div dir = 'rtl'>

# Redux

redux, قابلیت تعریف یک state کلی در برنامه که توسط همه‌ی کامپوننت‌های برنامه قابل دسترسی و تغییر باشد را می‌دهد. در ۴ بخش زیر, نحوه‌ی تعریف redux و تغییر state آن به‌همراه چرخه‌ی کار redux گفته می‌شود.

# Action

Action ها , بارهای اطلاعاتی هستند که اطلاعات مربوط به application های شما را به store منتقل می کنند. آنها تنها منبع اطلاعات store هستند و با استفاده از () store.dispatch به store منتقل می‌شوند.

هر action, یک plain object در javascript می باشد. Action ها باید دارای ویژگی type باشند که نوع action انجام شده را نشان می دهد. معمولاً type ها باید به عنوان یک رشته ثابت (constant) تعریف شوند. هنگامی که application شما به اندازه کافی بزرگ است ، ممکن است بخواهید آنها را به یک فایل دیگر (فرضا فایلی به نام types.js که تنها شامل type های مورد نیاز است) منتقل کنید.
در کد زیر به ترتیب, یک نوع type و یک action را ملاحظه می‌کنید.

<div dir = 'ltr'>

```
const MAKE_TODO = 'MAKE_TODO';
const action_sample = {
  type: MAKE_TODO,
  text: 'hello world'
 }
```

</div>
حال می‌توانید خط اول را با کد زیر جایگزین کنید, بدین معنی که آن‌ را از یک فایل دیگر import کنید.

<div dir = 'ltr'>

```
import MAKE_TODO from './types.js';
```

</div>

غیر از ویژگی type, مابقی ساختار یک action به عهده شماست.

# Action Creator

Action creator ها تابع هایی هستند که action می سازند (یا به عبارتی یک action را به عنوان خروجی بر‌می‌گردانند).

<div dir = 'ltr'>

```
const makeTodo(text) => {
  const action = {
    type: MAKE_TODO,
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
(application's state) را مشخص می کنند. در واقع action ها, تنها رخ دادن اتفاقی را توصیف می کنند, اما نحوه‌ی تغییر حالت برنامه  به ازای آنaction را Reducer ها  توصیف می کنند.


<div dir = 'ltr'>

```
const reducer = (state, action) => nextState;
```
</div>

reducer ها, pure function هستند. بدین معنی که state فعلی به همراه action را گرفته و بدون کار اضافی, state بعدی را تولید می‌کنند.

منظور از کار های اضافی, کارهایی اعم از:

۱. تغییر دادن آرگومان‌های تابع

۲. صدا‌زدن api ها یا انتقال در routing

۳. صدا‌کردن function هایی که pure نیستند. مانند <span dir = 'ltr'> ``` Math.random()``` </span>

حال میخواهیم یک reducer بسازیم. در ابتدا initialState تعریف می‌کنیم که حالت اولیه state را نشان می‌دهد. در واقع در ابتدای کار , state تعریف‌نشده است و در این حالت, initialState را باز‌می‌گردانیم.

<div dir = 'ltr'>

```
import makeTodo from './actions';

const initialState = {
  situation: 'not started yet!'
}

const sampleReducer = (state, action) => {
  if (!state) {
    return initialState;
  }

  return state;
}
```
</div>

البته می‌توان مقدار پیش‌فرض state را در خود آرگومان تابع, مقدار‌دهی کرد.

<div dir = 'ltr'>

```
const sampleReducer = (state = initialState, action) => {
  return state;
}
```

</div>
حال می‌خواهیم state برنامه را با توجه به action داده‌شده, تغییر‌دهیم.

<div dir = 'ltr'>

```
import makeTodo from './actions';

const initialState = {
  situation: 'not started yet'
}

const sampleReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MAKE_TODO':
      return Object.assign({}, state, {
        situation: action.text
      })
    default: 
      return state;
  }
}

```
</div>

برای تغییر state برنامه, گفته‌شده‌بود که نباید آرگومان‌های reducer را تغییر داد. در نتیجه برای عوض کردن المان‌های state, از Object.assign استفاده می کنیم تا از state فعلی یک copy بگیریم و سپس تغییرات لازمه را به آبجکت  جدید وارد می کنیم. به‌عبارتی یک آبجکت جدید برای state جدید می‌سازیم بدون اینکه state فعلی را تغییر دهیم. می‌توان کد تغییر‌دادن state را به شکل زیر باز‌نویسی کرد.

<div dir = 'ltr'>

```
 case 'MAKE_TODO':
    return {
      ...state,
      situation: action.text
    }
```
</div>

همچنین اگر action داده‌شده, ناشناخته بود, همان state فعلی را در default بر‌می‌گردانیم.

در کد زیر, کمی state برنامه و تعداد actionها را بیشتر کرده‌ایم.

<div dir = 'ltr'>

```
import {makeTodo, changeTime} from './actions';

{/*
suppose that changeTime is = {type: 'CHANGE_TIME', time: 'now'};
*/}


const initialState = {
  situation: 'not started yet!',
  time: 'yesterday'
}

const sampleReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MAKE_TODO':
      return {
        ...state,
        situation: action.text
      };
    case 'CHANGE_TIME':
      return {
        ...state,
        time: action.time
      }
  }
}

```
</div>

همان‌طور که ملاحظه ‌می‌کنید, ممکن است به‌مرور زمان, reducer تعریف‌‌شده بزرگ شود و readability کد پائین بیاید. برای رفع این مشکل, می‌توان چندین reducer تعریف کرد و در نهایت آنها‌ را ‌ترکیب کرده و به‌عنوان reducer واحد (به اصطلاح rootReducer) به store برنامه داد.

به قطعه کد زیر که reducer تعریف شده در کد بالا را به ۲ قسمت جدا تقسیم کرده‌است, توجه کنید.

<div dir = 'ltr'>

```
//reducers.js

import {makeTodo, changeTime} from './actions';

{/*
suppose that changeTime is = {type: 'CHANGE_TIME', time: 'now'};
*/}

//reducer1 configuration
const initialState1 = {
  situation: 'not started yet!'
}

export const reducer1 = (state = initialState1, action) => {
  switch(action.type) {
    case 'MAKE_TODO':
      return {
        ...state,
        situation: action.text
      };
    default:
      return state;
  }
}

//reducer2 configuration
const initialState2 = {
  time: 'yesterday'
}

export const reducer2 = (state = initialState2, action) => {
  switch(action.type) {
    case 'CHANGE_TIME':
      return {
        ...state,
        time: action.time
      };
    default:
      return state;
  }
}
```
</div>

و در نهایت با‌استفاده از <span dir = 'ltr'> ``` combineReducers() ``` </span> آنها را با‌هم ترکیب کرد و ترکیب آنها را به store, به عنوان reducer واحد داد.

<div dir = 'ltr'>

```
//rootReducer.js

import {reducer1, reducer2} from './reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  reducer1,
  reducer2
})

export default rootReducer;
```
</div>

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

# Data Flow

چرخه‌ی کار هر برنامه‌ی ‌redux از ۴ مرحله تشکیل شده است:‌

۱. در مرحله‌ی اول یک action که از جنس plainObject است و رخ دادن اتفاقی را توصیف می‌کند, توسط dispatch فرستاده می‌شود.

<div dir = 'ltr'>

```
const action = {
  type: 'MAKE_TODO',
  text: 'hello world'
};
store.dispatch(action);
```

</div>

۲. action فرستاده‌شده با استفاده از dispatch, به rootReducer برنامه فرستاده می‌شود تا تغییرات لازم با توجه به action فرستاده‌شده, به state برنامه اعمال شود. منظور از rootReducer, آبجکت ساخته‌شده توسط <span dir = 'ltr'> `combineReducers()` </span> می‌باشد که action فرستاده‌شده را به همه‌ی reducer ها ارسال می‌کند.

<div dir = 'ltr'>

```
// homeReducer file
initialState = {...}

export default const homeReducer = (state = initialState, action) => {
  switch(action.type) {
    ...
  }
}

```
</div>
۳. rootReducer تعریف‌ شده, خروجی حاصل از همه‌ی reducer ها را ترکیب می‌کند و به صورت یک state واحد در می‌آورد.

۴. در نهایت, state جدید در store ذخیره می‌شود. پس از ذخیره‌سازی state جدید, subscribe های تعریف شده برای store صدا زده می‌شوند.
</div>
