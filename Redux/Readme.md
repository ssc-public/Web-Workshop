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


<div dir='rtl'>

# React-Redux
همانگونه که در ابتدا گفته شد،
redux
صرفا ابزاری برای مدیریت حالت
(state)
برنامه هاست و به
framework
خاصی تعلق ندارد.
<br/>
اکنون می خواهیم از
redux
در
react
برای نگه داشتن state برنامه و component ها استفاده کنیم.

(ابتدا باید ماژول react-redux را برای دسترسی به ابزار های اتصال react به redux نصب کنید.)

## createStore
مانند حالت قبل ابتدا باید یک store بسازیم. اما در اینجا لازم است کمی بیشتر این فرایند را بررسی کنیم زیرا در ساختن store می توان از ابزار هایی استفاده کرد که عملکرد های مفیدی برای توسعه در react به store اضافه می کنند.

ابتدا به کد زیر نگاه کنید:

<div dir='ltr'>

```
  import React from 'react'
  import { render } from 'react-dom'
  import { Provider } from 'react-redux'

  1 const middlewares = [thunkMiddleware]
  2 const middlewareEnhancer = applyMiddleware(...middlewares)
  3 const enhancers = [middlewareEnhancer]
  4 const composedEnhancers = compose(...enhancers)
  5 const store = createStore(rootReducer, {}, composedEnhancers)
```
</div>
حال به توضیح آن می پردازیم:

خط ۱: در این جا یک آرایه از middleware هایی که می خواهیم به store اضافه کنیم را می بینیم. جلوتر با عملکرد دقیق middleware ها آشنا خواهیم شد.

خط ۲: از آرایه ی middleware ها یک enhancer ساخته ایم.  یک enhancer صرفا یک تابع است که یک store باز می گرداند که هم reducer ، initState  و  enhancer های دیگر آن را خودش تعیین کرده است. حال اگر بیشتر از یک enhancer داشته باشیم چگونه آن ها را ترکیب می کنیم تا در نهایت یک store داشته باشیم که تمام ویژگی ها آن ها را داشته باشد؟ این را جلوتر در خط ۴ خواهیم دید.

خط ۳: در این خط تمام enhancer هایی که داریم را در یک آرایه گذاشته ایم. در اینجا صرفا همان یک enhancer را داریم که middleware ها را اعمال می کند.

خط ۴: در اینجا تمام enhancer هایی که داریم را به تابع compose می دهیم و یک enhancer تحویل می گیریم که می توانیم آن را در ساختن یک store  که خواص تمام آن enhancer ها را دارد به کار بریم.

خط ۵: پارامتر اول همان reducer است که در بالا توضیح داده شد. (می تواند یک reducer باشد که حاصل ترکیب چند reducer توسط تابع combineReducers که در بالا توضیح داده شد ). پارامتر دوم state اولیه store است که ما آن را یک object خالی در نظر گرفته ایم. در نهایت پارامتر سوم همان enhancer است که در اینجا enhancer حاصل از ترکیب چند enhancer توسط تابع compose است.

### redux-devtools-extension
حین توسعه ی برنامه پیش می آید که state داخل store مقدار دلخواه ما نیست! در اینجا دوست داریم بدانیم که آن مقدار نادلخواه چیست، بلکه بتوانیم از این طریق مشکلی که در برنامه وجود دارد را حل کنیم. یک راه این است که در جای جای reducer ها console.log بگذاریم! راه آسانتر استفاده از ماژول redux-devtools-extensio است. این ماژول به ما اجازه می دهد که در مرورگر state داخل استور را به آسانی مشاهده کنیم و تغییرات آن را real-time (!) پیگیری کنیم.اضافه کردن این قابلیت به store بسیار آسان است و صرفا باید به جای تابع compose که در بالا توضیح داده شد از تابع composeWithDevTools که داخل این ماژول است استفاده کنیم و یک add-on هم به مرورگر خود اضافه کنیم. در 
<a href='https://medium.com/@samueldinesh/setting-up-redux-devtools-a-simple-guide-3b386a6254fa'>این لینک</a> توضیحات بیشتر راجع به نحوه استفاده از از redux-devtools آمده است. **استفاده از redux-devtools در توسعه برنامه به شدت توصیه می شود!**

## Provider
حال که store خود را ساختیم لازم است که آن را کامپوننت های خود تزریق کنیم! این کار را با یک context provider مخصوص redux انجام می دهیم:

<div dir='ltr'>

```
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
</div>
حال می توانیم از تابعی که برای متصل کردن کامپوننت ها به redux وجود دارد (connect) استفاده کنیم.

## Connect
برای استفاده از store در کامپوننت بعد از انجام مراحل قبل به چیز دیگری نیاز نداریم زیرا store آماده است و در context در دسترس است(برای اطلاعات بیشتر راجع به این کار <a href='https://github.com/reduxjs/react-redux/issues/281'>این لینک</a> را مشاهده کنید)

اما همانطور که ممکن است در لینک بالا مشاهده کرده باشید این کار سخت و کمی هم کثیف(!) است. راه استاندارد برای استفاده از state و subscribe کردن به store و dispatch کردن action ها، همگی با استفاده از تابعی به نام connect است. استفاده از این تابع بسیار ساده است:

<div dir='ltr'>

```
//  ^^^imports and component definitions up here^^^

const mapStateToProps = state => {
  return {
    neededValue: state.neededValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    specialCaseDispatch: input => {
      //the logic code to build yourAction
      dispatch(yourAction)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent)
```
</div>
آرگومان اول(mapStateToProps): یک تابع است که ورودی اش state(همان state داخل store، کلا منظور از state در این بخش همین است مگر خلاف آن ذکر شود!) است و خروجی اش یک object است که با props کامپوننت ترکیب می شود(<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign'>Object.assign</a>). مثلا در کد بالا مقداری که در state.neededValue است با key ای که نام آن را neededValue گذاشته ایم در props کامپوننت ما قرار می گیرد و می توانیم از آن استفاده کنیم.
نکته: تابع mapStateToProps می تواند یک ورودی دوم هم داشته باشد که همان props کامپوننت (البته پیش از اجرای constructor) است. کاربرد این می تواند این باشد که بسته به props ای که از component پدر به component ما داده می شود می توانیم داده ای که از state انتخاب می کنیم را کنترل کنیم.

آرگومال دوم(mapDispatchToProps): این آرگومان هم می تواند یک تابع باشد مانند همین که در کد بالا دیدیم هم می تواند یک object عادی باشد.

*اگر تابع باشد: آن تابع با ورودی dispatch صدا زده می شود و خروجی آن نیز یک object است که با props کامپوننت ترکیب می شود. استفاده نورمال از این تابع این است که key ها نام توابعی هستند که بدنه ی آن ها در value می آید. این توابع در props کامپوننت در دسترس هستند و می توانند با ورودی خاصی صدا زده شوند. در بدنه این توابع منطقی پیاده سازی می شود که با توجه به ورودی یک action می سازند و آن را dispatch می کنند.

*اگر object باشد: بالاتر راجع به action creator ها صحبت شد که ورودی این میگیرند و یک action باز می گردانند. اگر دقت کنید می فهمید کدی که در value های mapStateToProps وجود دارد در واقع یک سری action creator هستند که در پایان خود، action ساخته شده را بازنمی گردانند بلکه آن را dispatch می کنند. تابع connect این امکان را ارائه می کند که یک object به جای آرگومان دومش بدهیم که key های آن نام توابعی است که در props در اختیار ما قرار می گیرند و value آن ها action creator  هستند.کاری که connect در این موقعیت انجام می دهد این است که مقداری را که action creator ها بازمیگردانند را dispatch می کند. اینگونه خیلی اوقات از نوشتن تابع mapDispatchToProps بی نیاز می شویم. در زیر می توانیم این نحوه ی دادن mapDispatchToProps را مشاهده کنیم:

هر یک از توابع داخل object داده شده به props یک action creator است.

<div dir='ltr'>

```
export default connect(
  mapState,
  { increment, decrement, reset }
)(Counter);

```
</div>

در نهایت با این دو آرگومان، connect یک HOC باز می گرداند که کامپوننتمان را به آن می دهیم و کامپوننتی که props آن طبق توضیحات آن تغییر کرده است به دست می آوریم.

دقت کنید که خودمان در هیچ جا subscribe نکردیم. خود connect این کار را انجام می دهد و اگر state به روز رسانی شود props کامپوننت را به روز رسانی می کند که در نتیجه باعث می شود کامپوننت دوباره render شود.

## Async actions
اگر به نحوه ی استفاده از action creator ها در قسمت قبل توجه کنید در می یابید که استفاده از آنها برای انجام فعالیت های async مثل fetch کردن داده از سرور دشوار است زیرا داخل promise بازگردانده شده از fetch نمی توانید action ساخته شده را return کنید به خارج از تابع action creator بنابراین باید dispatch را که از mapDispatchToProps گرفته اید به action creator به عنوان ورودی بدهید تا در آنجا بتوانید داخل تابع resolve که به promise بازگردانده شده از fetch می دهید از dispatch استفاده کنید و action dispatch کنید! اما این راه هم مشکل دارد زیرا در هر حال action creator شما باید یک action بازگرداند که در این صورت شما باید یک action با type مثلا fetching بازگردانید و برنامه را مطلع کنید که شما در حال انجام عمل async هستید تا مثلا یک loading به کاربر نشان داده شود.

همانطور که دقت کردید فرایند توضیح داده شده در بالا مقدار زیادی کد اضافی دارد، مثلا اینکه شما باید در تمام ورودی های action creator ها خود تابع dispatch را اضافه کنیم و در mapDispatchToProps آن را به action creator ورودی بدهیم.

## Thunk

در قسمت createStore با استفاده کردن از thunk در ساختن store آشنا شدیم حال می خواهیم نحوه استفاده از آن را بیاموزیم.

thunk یک middleware برای ساده سازی استفاده از action creator های async است. امکانی که thunk به ما ارائه می دهد این است که در action creator ها به جای اینکه حتما یک object بازگردانیم که همان action ماست، می توانیم یک تابع بازگردانیم. حال thunk با این تابع چه می کند؟ (سوالی که در این بین مطرح می شود ممکن است این باشد که اصلا thunk در این میان چه کاره است و چطور مقدار بازگشتی از action provider به آن می رسد؟! در این باره جلوتر در middleware ها صحبت خواهیم کرد. کلیت موضوع اینگونه است که thunk را می توانیم یک تابع در نظر بگیریم که جایگزین dispatch در store می شود و هر گاه یک action را به dispatch می دهیم در واقع داریم به thunk می دهیم) thunk آن تابع را با دو ورودی dispatch و getState صدا می زند. dispatch همان dispatch اصلی store است که action ها را به reducer ها می برد و getState هم یک تابع است که با صدا زدن آن state آن لحظه ی store را دریافت می کنیم.

مزیت اینکه می توانیم چنین تابعی را از action creator بازگردانیم چیست؟ همان مشکلی که در بالا راجع به سخت بودن هندل کردن action creator های async مطرح کردن اینگونه حل می شود. زیرا در تابعی که بر می گردانیم می توانیم هر عمل async ای که داریم انجام دهیم و هر موقع هر جا نیاز داشتیم(مثلا داخل resolve یک promise) می توانیم dispatch را صدا بزنیم و action مورد نیاز را dispatch کنیم. همچنین در action هایی که dispatch می کنیم می توانیم از state نیز استفاده کنیم(مثلا می توانیم authToken بازگردانده شده از سرور را در state ذخیره کنیم و در request هایی که به سرور می زنیم از آن استفاده کنیم)

نمونه ای از این نوع action creator را در زیر مشاهده می کنید:

<div dir='ltr'>

```
export const actionCreatorUsingThunk = (actionCreatorInput) => (dispatch,getState) => {
  //Async actions , logic code and needed dispatches here.
}
```
</div>

## Middleware

همانطور که گفته بودیم middleware ها در واقع توابعی هستند که به جای dispatch در store قرار می گیرند و می توانند در روند dispatch شدن یک action سرویس هایی به ما ارائه کنند. یک نمونه از middleware یعنی thunk را دیدیم. حال می خواهیم یک middleware خودمان بنویسیم:

<div dir='ltr'>

```
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```
</div>
این middleware را می توانید در همان آرایه middleware که در قسمت createStore در بالا توضیح دادیم بگذارید و از این به بعد قبل از هر dispatch برای شما state در کنسول چاپ می شود.

برای اینکه از ساختار درونی middleware با خبر شوید به <a href='https://redux.js.org/advanced/middleware/#understanding-middleware'>این لینک</a> مراجعه کنید.

</div>