
<h1 dir="rtl" align = "center"> Axios in React Js 

<h4>
    نگارنده :
    علی نعمت دوست / محمد زارع
</h4>
<h1 dir="rtl" > مقدمه  </h1>

<p dir="rtl">
    در برنامه هایی که با استفاده از React Js میسازیم، گاهی لازم است تا برای تبادل اطلاعات با Back-End پروژه داده هایی را ارسال یا دریافت کنیم و سپس داده ها را پردازش کنیم. برای این منظور ابزار ها و روش های گوناگونی وجود دارد. در حالی که بسیاری با ابزارهایی مانند Fetch API آشنایی دارند، کتابخانه قدرتمندی به نام Axios وجود دارد که این فرآیند را بسیار ساده می‌کند. 
</p>


<h1 dir="rtl" >  Axios </h1>

<p dir="rtl">
 Axios مسئول ارسال درخواست ها (asynchronous HTTP requests) به REST endpoints یا بعبارتی همان Back-End پروژه و ارائه نتایج حاصل می‌باشد. در ادامه با ویژگی ها و کارکرد های Axios بیشتر آشنا میشویم. 
  
</p>

<h1 dir="rtl"> استفاده از Axios </h1>

<div dir="rtl">
    همانطور که پیشتر گفته شد از کتابخانه Axios برای ارسال درخواست های HTTP به سمت سرور استفاده می‌شود. در ادامه مثال هایی از به کارگیری Axios برای ارسال درخواست های POST , GET را مشاهده خواهیم کرد. به دلیل کاربرد گسترده تر و محبوبیت بیشتر Functional Component ها در میان توسعه دهندگان مثال هایی از به کارگیری Axios در این دسته از component ها را آورده ایم.
</div>

<h1> نصب Axios </h1>

<p>
    برای استفاده از Axios ابتدا باید پکیج های آن را نصب کرد. برای این منظور می‌توان از دستور های زیر استفاده کرد :
</p>    


```cmd
npm install axios
```



<p>
    بعد از نصب Axios برای استفاده باید آن را در React component اضافه کنید. برای import کردن Axios از این دستور باید استفاده کرد :
</p>


```jsx
import axios from "axios";
```




<h2> ارسال درخواست GET با استفاده از Axios </h2>

<p>
    در این مثال با استفاده از سرویس JSONPlaceholder API قصد داریم با استفاده از Axios داده هایی را دریافت کرده و به کاربر نمایش دهیم.
</p>

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GetData = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetData;
```
<h5> بررسی مثال بالا </h5>

<p>
    در این مثال، تابع fetchData را ساخته ایم که با استفاده از Axios درخواست GET را به سمت سرویس JSONPlaceholder API ارسال میکند. در ادامه پاسخ دریافت شده از سرور را در یک state به نام Data ( با مقدار اولیه یک آرایه تهی ) که پیشتر ساخته شده  ذخیره می‌کنیم. با استفاده از useState متدی به نام setData برای تغییر و مقداردهی Data تعیین شده است.
    در ادامه با استفاده از Hook تابع fetchData را پس از اجرای برنامه فرا خوانی میکنیم تا فرآیندهای ارسال درخواست و ذخیره نتایج حاصل به شرح بالا انجام شوند.
    در انتها نیز از تابع map برای نشان دادن لیست Post های ذخیره شده در Data استفاده شده است. 
    <p><mark><b>
        چون Axios مبتنی بر promise می‌باشد، به ما این قابلیت را می دهد تا برای داشتن کد asynchronous خوانا تر از مزایای async و await استفاده کنیم .
    </b></mark></p>
</p>

<h3>
    fetchData
</h3>

```jsx
const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
```

<p>
    استفاده از Axios یکی از ساده ترین روش های ارسال درخواست HTTP به سرور می‌باشد. این موضوع را به وضوح در استفاده از Axios برای ارسال درخواست GET میتوان مشاهده کرد. 
    پس از مشخص کردن نوع درخواست و URL ، صرفا کافی است برای دسترسی به پاسخ سرور از متد .data استفاده کرد. این یکی از برتری های Axios بر روش های دیگری همچون fetch می‌باشد. یعنی :
    <p><mark><b>
         در Axios به صورت خودکار داده های دریافتی از سرور به فرمت JSON تبدیل خواهند شد و نیازی به تبدیل نیست.
    </b></mark></p>
</p>


<h2> ارسال درخواست POST با استفاده از Axios </h2>

<p>
    مثالی از ارسال درخواست POST با استفاده از Axios :
</p>

```jsx
import React, { useState } from "react";
import axios from "axios";

const AddPost = () => {

  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
      alert("New Post has been created")
    } catch (error) {
      console.error("Connection Error. ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Post Title:
        <input type="text" name="title" value={postData.title} onChange={handleChange} />
      </label>
      <br />
      <label>
        Post Body:
        <textarea name="body" value={postData.body} onChange={handleChange}></textarea>
      </label>
      <br />
      <button type="submit"> Add New Post </button>
    </form>
  );
};

export default AddPost;
```

<h5> بررسی مثال بالا </h5>
<p>
    در این مثال یک form داریم که اطلاعات یک شی Post را از کاربر دریافت میکند. با submit کردن فرم تابع handleSubmit فراخوانی شده، اطلاعات Post جدید را ارسال کرده و پیامی را به کاربر alert میکند. 
    در این فرآیند از یک state به نام postData استفاده می شود که اطلاعات هر ورودی فرم در صورت تغییر با استفاده از handleChange در آن ذخیره می شود. برای آشنایی بیشتر با فرآیند ذخیره داده در state به فرم آرایه می توانید از لینک زیر بازدید کنید :
    https://www.dhiwise.com/post/react-append-to-state-array-understanding-immutability
</p>

<h3>
    postData
</h3>

```jsx
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
      alert("New Post has been created")
    } catch (error) {
      console.error("Connection Error. ");
    }
  };
```

<p>
    همانطور که واضح است شاهد مقدار زیادی مشابهت با فرآیند ارسال درخواست GET هستیم و این یکی از نقاط قوت و برتری Axios بر سایر روش ها است. 
    اما از جمله تفاوت های میان ارسال درخواست POST و GET میتوان اشاره کرد به قرار گرفتن body درخواست POST هنگام ارسال درخواست.

</p>

<h1> جمع بندی </h1>

<p>
    هدف از نگارش این متن آشنایی با یک روش بهینه و آسان برای ارسال درخواست های HTTP به سرور ( Back-End ) پروژه می باشد. همچنین سعی شد تا با ارائه مثال هایی از استفاده از Axios دید بهتری از این روش به شما بدهیم زیرا در صورت استفاده از react js برای توسعه Front-End بی شک نیاز به ابزاری برای تبادل اطلاعات با Back-End خواهید داشت. اما برای انتخاب این ابزار گزینه های متفاوتی را پیش رو دارید. انتخاب شما بین fetch و کتابخانه Axios به عوامل مختلفی همچون نیازمنیدی ها و آشنایی و تسلط شما بستگی دارد و ما سعی کردیم تا با آشنایی شما با Axios و ارائه برتری های این کتابخانه بر سایر روش ها راهی بهینه تر را پیشنهاد دهیم.
</p>
<h1>
    منابع
</h1>

<ul>
    <li>https://codedamn.com/news/reactjs/axios-network-requests</li>
    <li>https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/</li>
    <li>https://www.digitalocean.com/community/tutorials/react-axios-react</li>
    <li>https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b</li>
    <li>https://www.dhiwise.com/post/react-append-to-state-array-understanding-immutability</li>
</ul>
