## <p dir="rtl" style="position:right;">پیاده‌سازی فرانت GraphQL با استفاده از React + Apollo </p>  



<p dir="rtl" style="position:right;">
در این قسمت می‌خواهیم برنامه‌ای برای سمت کلاینت graphQL پیاده‌سازی کنیم که در این قسمت کاربر می‌تواند query مورد نظر خود را به سمت سرور بفرستد و جواب مورد انتظار خودش را دریافت کند.
</p>
 <p dir="rtl" style="position:right;">
این پروژه در واقع پیاده‌سازی ‌ای برای سایت hackernews است که شامل تعدادی لینک است که کاربران این سایت می‌توانند لینک جدید اضافه کنند و یا اینکه به لینک‌های موجود رای دهند و یا رای خود را بازگردانند.<br />
می‌توانید پروژه‌ی اصلی را در 
<a href="https://github.com/howtographql/react-apollo" > این لینک</a>
مشاهده کنید.
</p>

<p dir="rtl" style="position:right;">
در کل، عمل‌هایی که در این پروژه انجام می‌شوند عبارتند از : <br />
- نمایش لیستی از لینک‌ها <br />
- امکان جست و جو در لیست لینک‌ها <br />
- احراز هویت کاربر <br />
- به کاربرانی که احراز هویت شده‌اند اجازه می‌دهد که لینک‌های جدید ایجاد کنند. <br />
- به کاربرانی که احراز هویت شده اند، اجازه‌ی رای دادن به هر کدام از لینک‌ها یا برداشتن رای خود از آن‌ها را می‌دهد. <br />
- اگر کاربران تغییری در لیست لینک‌ها دهند، سریع به روز رسانی می‌شود. 
</p>

<p  dir="rtl" style="position:right;">
برای پیاده‌سازی این پروژه برای  frontend و backend از تکنولوژی‌های زیر استفاده شده‌است. <br />
- فرانت : React و Apollo Client 3.2<br />
- بک : Apollo Server 2.18 و Prisma
</p>

## <p  dir="rtl" style="position:right;"> کلاینت GraphQL</p>

<p dir="rtl" style="position:right;">
در سمت کلاینت برای انجام دادن کار‌های تکراری مانند فرستادن query و غیره از GraphQL client استفاده می‌کنیم که از کار‌های تکراری جلوگیری می‌کند و تنها با یک بار صدا زدن API می‌تواند اطلاعات موردنیاز خود را از سمت سرور دریافت کند. <br />
برای پیاده‌سازی کلاینت GraphQL کتابخانه‌های متفاوتی همانند Apollo، Relay و urql وجود دارد که هر کدام از این کتاب‌خانه‌ها خوبی‌ها و بدی‌هایی دارند و میزان کنترل هر یک از آن‌ها روی روند عملیا‌ت‌های در حال انجام GraphQL متفاوت است. <br />
در پیاده‌سازی پروژه‌ي ذکر شده از Apollo Client استفاده می‌کنیم. <br />
</p>

### <p  dir="rtl" style="position:right;">  توضیح قسمت‌های مربوط به graphQL در بخش front پروژه</p>

<p dir="rtl" style="position:right;">
کل فایل‌های مربوط به بخش front سایت در پوشه‌ی front قرار دارد.<br />
در پوشه‌ی src پوشه‌ی دیگری به نام components وجود دارد که بخش‌های مختلف برای ساختن front در آن پیاده‌سازی شده‌اند.<br/>
حال به توضیح هر کدام از آن‌ها می‌پردازیم.
</P>

<p dir="rtl" style="position:right;">
در پوشه‌ی components فایلی به نام Link.js وجود دارد که مربوط به هر کدام از لینک‌های موجود در برنامه است. این component به صورت زیر پیاده‌سازی می‌شود.
</p>

```js
import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;
```
<p dir="rtl" style="position:right;">
فایل دیگری به نام LinkList.js وجود دارد که در آن لینک‌هایی که در صفحه‌ نمایش داده‌ می‌شوند را پیاده‌سازی می‌کنیم. پیاده‌سازی این component به صورت زیر است .
</p>

```js
import React from 'react';
import Link from './Link';

const LinkList = () => {
  const linksToRender = [
    {
      id: '1',
      description:
        'Prisma gives you a powerful database toolkit 😎',
      url: 'https://prisma.io'
    },
    {
      id: '2',
      description: 'The best GraphQL client',
      url: 'https://www.apollographql.com/docs/react/'
    }
  ];

  return (
    <div>
      {linksToRender.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;
```


<p dir="rtl" style="position:right;">
از linked list پیاده‌سازی شده در App.js استفاده می‌کنیم که component اصلی ما است تا لینک‌ها در صفحه نمایش داده شوند.
</p>

<p dir="rtl" style="position:right;">
حال به توضیح نحوه‌ی استفاده از query‌های GraphQL می‌پردازیم و اینکه چگونه از آن‌ها در برنامه استفاده کنیم.
برای استفاده از query مورد نظر خود ابتدا باید آن را تعریف کنیم. برای مثال اگر بخواهیم یک query به نام feed تعریف کنیم داریم :
</p>

```graphql
{
  feed {
    id
    links {
      id
      createdAt
      description
      url
    }
  }
}
```
<p dir="rtl" style="position:right;">
اکنون باید ببینیم که چگونه query‌های خود را در برنامه و با استفاده از javascript پیاده‌سازی کنیم. برای اینکار از کتاب‌خانه‌ی apollo/client استفاده می‌کنیم و از توابع آن در پیاده‌سازی query‌ها استفاده می‌کنیم. برای تعریف query از تابع useQuery و کتاب‌خانه‌ی gql در apollo/client استفاده می‌کنیم. <br />
برای مثال می‌خواهیم در فایل linkedlist.js یک query به نام FEED_QUERY تعریف کنیم. با استفاده از gql داریم :
</p>

```js
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
```

<p dir="rtl" style="position:right;">
پس تا اینجا query را تعریف کرده‌ایم. برای استفاده از آن از تابع useQuery استفاده می‌کنیم و query تعریف شده را به آن پاس می‌دهیم. این تابع یک داده به ما باز می‌گرداند که اطلاعاتی را که در query تعریف کرده بودیم و میخواستیم از سرور دریافت کنیم شامل می‌شود. کد linkedlist.js به صورت زیر در می‌آید :
</p>

```js
const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};
```

## <p dir="rtl" style="position:right;">توضیح gql و useQuery</p>
<p dir="rtl" style="position:right;">
Gql کتاب‌خانه‌ای است که برای تجزیه‌ی query تعریف شده برای GraphQL استفاده می‌شود. سپس query تعریف شده توسط gql را به تابع useQuery پاس می‌دهیم. چیزی که این تابع باز می‌گرداند از ۳ بخش زیر تشکیل شده‌است :<br />
- Loading : یک متغیر bool است که اگر مقدار آن true باشد، به این معناست که هنوز پاسخ از سمت سرور دریافت نشده و عملیات request دادن همچنان در حال انجام است. <br />
- Error : اگر در حین request دادن و یا دریافت داده اروری رخ دهد، توضیحات مربوط به این ارور و علت آن در این قسمت قرار می‌گیرد. <br />
- Data : این قسمت همان داده‌ی خواسته شده از سمت client است که از سرور دریافت شده است. در مثال بالا در فایل linkedlist.js این مقدار برابر با لیستی از لینک‌های موجود می‌باشد. این داده‌ها به همان شکل query تعریف شده دریافت می‌شود به این صورت که لینک‌ها در data.feed.links قرار دارند.
</p>

<p dir="rtl" style="position:right;">
همان‌طور که توضیح داده شد، در GraphQL دو عملیات مهم داریم : Query و Mutation <br />
در قسمت قبل نشان دادیم که چگونه به سرور query میفرستیم و  چطور می‌توانیم داده‌ها را از سرور بگیریم و آن را نمایش دهیم. حال می‌خواهیم ببینیم چگونه می‌توانیم با استفاده از Apollo client داده‌ها را تغییر دهیم و یا داده‌ی جدیدی اضافه کنیم. برای اینکار همانند قسمت قبل از gql استفاده می‌کنیم، اما به جای تابع useQuery از useMutation استفاده می‌کنیم. <br />
<br />
در پوشه‌ی src/components فایلی به نام CreateLink.js وجود دارد که مربوط به ساختن لینک جدید توسط کاربر در برنامه است . <br />
در ابتدا این فایل به شکل زیر است : <br />
</p>

```js
import React, { useState } from 'react';

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
```
<p dir="rtl" style="position:right;">
حال با استفاده از gql یک mutation به نام CREATE_LINK_MUTATION به صورت زیر تعریف می‌کنیم.
</p>

```js
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
```
<p dir="rtl" style="position:right;">
با استفاده از تابع useMutation می‌خواهیم عوض کردن لینک‌ها را پیاده‌سازی کنیم. به این تابع mutation تعریف شده در قسمت قبل و متغیر‌هایی‌ که می‌خواهیم تغییر دهیم را پاس دهیم. این تابع یک function به ما برمی‌گرداند که هر گاه بخواهیم می‌توانیم برای عوض کردن لینک‌ها از آن استفاده کنیم. پس تکه کد زیر به CreateLink اضافه می‌شود.
</p>

```js
const CreateLink = () => {
  // ...
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    }
  });
  // ...
};
```
<p dir="rtl" style="position:right;">
در کد بالا، createLink همان تابعی است که می‌توانیم هر گاه بخواهیم آن را صدا کنیم. پس آن را به هنگام submitکردن فرم صدا می‌زنیم. 
</p>
```js
return (
  <div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createLink();
      }}
    >
      ...
    </form>
  </div>
);
```
<p dir="rtl" style="position:right;">
حال می‌خواهیم به توضیح قسمت‌های مربوط به authentication همانند login بپردازیم. <br />
در پوشه‌ی src/components فایلی به نام login.js داریم که کد اولیه آن به صورت زیر است :
</p>

```js
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => console.log('onClick')}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
```

<p dir="rtl" style="position:right;">
در کد بالا دو قسمت اصلی وجود دارد:<br />
-  یک قسمت برای کاربرانی که ثبت‌نام کرده اند و حساب کاربری دارند که برای این کاربران دو ورودی مربوط به ایمیل کاربر و رمز او نمایش داده‌ می‌شود. <br />
- یک قسمت برای کاربرانی که هنوز ثبت نام نکرده اند و اول باید در سایت ثبت نام کنند. برای این کاربران دو ورودی قبلی به همراه یک ورودی دیگر برای اسم کاربر نمایش داده می‌شود. <br />
<br />
وضعیت کاربر با توجه به متغیر formState.login مشخص می‌شود و با توجه به آن، یکی از دو قسمت توضیح داده‌شده در بالا نمایش داده می‌شود. <br />
<br />
برای هر کدام از login یا signup ، نیاز به تعریف و استفاده mutation‌های مربوط به هر یک داریم. این mutation‌ها را به صورت زیر تعریف می‌کنیم : <br />
</p>

```js
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
```

<p dir="rtl" style="position:right;">
هر کدام از این mutation ها یک سری پارامتر‌هایی می‌گیرد و یک token باز می‌گردانند که از آن برای احراز هویت کاربر استفاده می‌کنیم. اکنون باید دو تابع login و signup با استفاده از تابع useMutation تعریف کنیم که آن‌ها را به هنگام کلیک کردن بر روی دکمه‌های login و signup صدا کنیم. پس داریم :
</p>

```js
const [login] = useMutation(LOGIN_MUTATION, {
  variables: {
    email: formState.email,
    password: formState.password
  },
  onCompleted: ({ login }) => {
    localStorage.setItem(AUTH_TOKEN, login.token);
    history.push('/');
  }
});

const [signup] = useMutation(SIGNUP_MUTATION, {
  variables: {
    name: formState.name,
    email: formState.email,
    password: formState.password
  },
  onCompleted: ({ signup }) => {
    localStorage.setItem(AUTH_TOKEN, signup.token);
    history.push('/');
  }
});
```

<p dir="rtl" style="position:right;">
همان‌طور که گفته شد، قسمت دیگری در پروژه وجود دارد که در آن کاربرانی که در سایت ثبت نام شده‌اند می‌توانند به هر کدام از لینک‌ها رای دهند یا رای خود را پس گیرند. <br />
برای اینکه وضعیت هر لینک را با توجه به رای کاربر عوض کنیم، query‌ای که قبلا با نام FEED_QUERY در فایل LinkList.js نوشته بودیم را به‌روزرسانی می‌کنیم که کد جدید آن به صورت زیر است :
</p>

```js
export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
```
<p dir="rtl" style="position:right;">
همچنین نیاز به یک mutation برای عملیات رای دادن نیاز داریم که آن را با نام VOTE_MUTATION در فایل Link.js به صورت زیر می‌نویسیم :
</p>

```js
const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
```
<p dir="rtl" style="position:right;">
همانند قبل از تابع useMutation استفاده می‌کنیم تا تابعی به نام vote بسازیم و هر جا که نیاز بود از آن استفاده کنیم. پارامترهایی که به تابع useMutation در این قسمت پاس می‌دهیم، VOTE_MUTATION و شناسه‌ی لینکی که کاربر انتخاب کرده است.<br />
بنابراین فایل Link.js را به صورت زیر به روز رسانی می‌کنیم : 
</p>

```js
const Link = (props) => {
  // ...
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    }
  });
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        <div
          className="ml1 gray f11"
          style={{ cursor: 'pointer' }}
          onClick={vote}
        >
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};
```
<p dir="rtl" style="position:right;">
همان‌طور که میبینیم، تابع vote را با کلیک کردن بر روی علامت کنار هر لینک صدا می‌زنیم.
</p>

<p dir="rtl" style="position:right;">
<br />
یکی از ویژگی‌های دیگر apollo client این است که برای طرف client در برنامه‌های مربوط به graphQL، یک حافظه‌ی نهان ایجاد و نگهداری می‌کند. معمولا نیاز نیست کار زیادی برای مدیریت این حافظه انجام دهیم، اما بعضی اوقات با توجه به شرایط نیاز به برخی راهکار‌ها در این زمینه داریم. <br />
<br />
برای مثال در این پروژه، وقتی درخواست mutation برای سرور میفرستیم، نیاز است به طور دستی در به‌روز رسانی کردن حافظه دخالت داشته باشیم. این کار را با استفاده از امکاناتی که apollo client در اختیار ما قرار می‌دهد می‌توانیم انجام دهیم. <br />
هنگامی که در فایل Link.js، درخواست mutation برای vote میفرستیم، این به‌روز رسانی حافظه باید انجام شود. بنابراین تابعی را که در فایل Link.js با نام vote با استفاده از useMutation ایجاد کرده‌ایم را به صورت زیر عوض می‌کنیم :
</p>

```js
const Link = (props) => {
  // ...
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    },
    update(cache, { data: { vote } }) {
      const { feed } = cache.readQuery({
        query: FEED_QUERY
      });

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote]
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks
          }
        }
      });
    }
  });

  // ...
};
```
<p dir="rtl" style="position:right;">
در کد بالا، تابع update بعد از کامل شدن mutation انجام می‌شود و به ما اجازه می‌دهد که از حافظه‌ بخوانیم یا داده‌ای را تغییر دهیم و آن را ذخیره کنیم.<br />
همان‌طور که می‌یبینیم در تابع update، تابعی به نام cache.readQuery صدا زده شده که به آن، FEED_QUERY را به عنوان query داده می‌شود. این کار به ما این اجازه را می‌دهد که دقیقا به همان بخشی از حافظه که می‌خواهیم آن را به روزرسانی کنیم دسترسی پیدا کنیم. حالا که به این قسمت از حافظه دسترسی داریم، می‌توانیم یک آرایه‌ی جدید از داده‌ها شامل رای جدیدی که ساخته شده بسازیم. حال با استفاده از تابع cache.writeQuery این لیست جدید را در حافظه ذخیره و لیست رای‌ها را به روزرسانی می‌کنیم.<br />
همین‌کار را برای اضافه کردن لینک جدید در فایل CreateLink.js نیز باید انجام دهیم. پس تابع createLink را به صورت زیر تغییر می‌دهیم :
</p>

```js
const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy
        }
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
        variables: {
          take,
          skip,
          orderBy
        }
      });
    },
    onCompleted: () => history.push('/new/1')
  });
```

<p dir="rtl" style="position:right;">
در کد بالا نیز، تابع update به شکل قبل کار می‌کند. ابتدا نتیجه‌های فعلی FEED_QUERY را می‌خوانیم و سپس لینک جدید را به آن اضافه می‌کنیم و همانند قبل دوباره آن را در حافظه می‌نویسیم.<br />
<br />
یکی دیگر از قسمت‌های این پروژه، توانایی جست و جو کردن کاربر میان لینک‌ها است. به توضیح قسمت‌های مربوط به GraphQL این بخش می‌پردازیم.<br />
فایلی به نام Search.js در پوشه‌ی src/components وجود دارد. برای این قسمت، نیاز به نوشتن یک query برای فیلترکردن لیست لینک‌ها داریم. پس کوئری FEED_SEARCH_QUERY در این فایل به صورت زیر قرار دارد :
</p>

```js
const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
```
<p dir="rtl" style="position:right;">
این کوئری یک پارامتر به نام filter می‌گیرد که برای فیلترکردن لیست لینک‌ها از ان استفاده می‌کند. از پارامتر filter در واقع در یکی از فایل‌های مربوط به سرور در مسیر server/src/resolvers/Query.js استفاده می‌شود که کد این قسمت از فایل به صورت زیر است :
</p>

```js
async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

module.exports = {
  feed
};
```
<p dir="rtl" style="position:right;">
تابع feed که در بالا تعریف شده، همان تابعی است که در کوئری FEED_SEARCH_QUERY از آن استفاده شده است. در اینجا وارد جزئیات مربوط به سرور نمیشویم و آن‌ها را در بخش دیگری توضیح می‌دهیم.<br />
<br />
در بخش search نیاز داریم که هرگاه دکمه‌ی OK فشار داده شد، کوئری مربوط به جست و جو که همان FEED_SEARCH_QUERY  است فرستاده شود. اما چون از تابع useQuery استفاده می‌کنیم، این درخواست فقط زمانی انجام می‌شود که کل component مربوط به جست و جو لود شود. برای رفع این مشکل از تابع دیگری به نام useLazyQuery استفاده می‌کنیم. عملکرد این تابع مثل useQuery است با این تفاوت که می‌توانیم آن را دستی اجرا کنیم. بنابراین از آن استفاده می‌کنیم تا هرگاه دکمه‌ی OK فشار داده شد، این کوئری اجرا شود. پس فایل Search.js را به صورت زیر تغییر می‌دهیم :
</p>

```js
const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    FEED_SEARCH_QUERY
  );
  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};
```

<p dir="rtl" style="position:right;">
یکی دیگر از بخش‌های این برنامه، realtime بودن آن است که این ویژگی را با استفاده از subscription‌ها در GraphQL پیاده‌سازی می‌کنیم. با استفاده از subscriptionها به هنگام رخ دادن یک رویداد مشخص، سرور داده‌هایی را به سمت کلاینت می‌فرستد. وقتی از subscription استفاده می‌کنیم، سرور یک ارتباط به کلاینت برقرار می‌کند که در هنگام رخ دادن رویدادی که از قبل مشخص شده، داده‌های مورد نیاز client را برای آن ارسال می‌کند. در واقع subscription‌ها از WebSocket برای برقراری ارتباط استفاده میکنند.<br />
<br />
می‌خواهیم ببینیم چگونه از subscription در apollo client استفاده کنیم. ابتدا خط زیر را در ترمینال اجرا کنید :
</p>

```
yarn add subscriptions-transport-ws
```
<p dir="rtl" style="position:right;">
سپس ۳ خط زیر را به قسمت import‌های فایل index.js اضافه می‌کنیم.
</p>

```js
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
```
<p dir="rtl" style="position:right;">
فایل index.js را به صورت زیر تغییر می‌دهیم :
</p>

```js
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
```
<p dir="rtl" style="position:right;">
در کد بالا، wsLink نشاندهنده‌ی یک ارتباط WebSocket برای subscription ها است. همچنین از تابع split برای مسیریابی صحیح درخواست‌ها و به روزرسانی صدازدن ApolloClient استفاده می‌کنیم. وب‌سوکتی که پیاده می‌کنیم، به subscription endpoints آگاه است. در اینجا endpoint مربوط به subscription مشابه Http endpoint است با این تفاوت که در subscription از پروتکل ws (websocket) به جای http استفاده می‌شود. همچنین websocket تعریف شده، با استفاده از token مربوط به کاربر که در localstorage ذخیره شده احراز هویت می‌شود.<br />
تابع split در اینجا استفاده می‌شود تا request را به یک middleware link مشخصی هدایت کند. این تابع ۳ ورودی می‌گیرد. اولی یک تابع است و ورودی‌های دوم و سوم هرکدام از جنس ApolloLink هستند. ورودی اول که یک تابع است، مقدار bool برمیگرداند. اگر این مقدار true باشد، request به لینک ورودی دوم تابع split و در غیر این صورت به لینک ورودی سوم تابع split هدایت می‌شود. <br />
در کد index.js، تابع ورودی اول split نشان می دهد که آیا عملیات درخواست شده از جنس subscription هست یا خیر. اگر بود، آن را به سمت wsLink و اگر نبود آن را به سمت httpLink هدایت می‌کند.<br />
<br />
حال می‌خواهیم از subscription برای realtime کردن برنامه استفاده کنیم.<br />
برای اینکه بخواهیم در هنگام ساخته شدن لینک‌های جدید، برنامه به صورت realtime کار کند، باید رخداد‌هایی را که برای لینک‌ها اتفاق می‌افتد را subscribe کنیم. <br />
تابع useQuery به ما دسترسی به تابعی به نام subscribeToMore را می‌دهد. می‌توانیم ساختار این تابع را دوباره و مطابق آنچه میخواهیم بنویسیم و از آن برای انجام کار روی داده‌های جدیدی که طی subscription می‌رسد استفاده کنیم.<br />
فایل LinkList.js را به صورت زیر تغییر می‌دهیم :
</p>

```js
const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: 'desc' };
  return { take, skip, orderBy };
};

const LinkList = () => {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes(
    'new'
  );
  const pageIndexParams = history.location.pathname.split(
    '/'
  );
  const page = parseInt(
    pageIndexParams[pageIndexParams.length - 1]
  );

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const {
    data,
    loading,
    error,
    subscribeToMore
  } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page)
  });

  subscribeToMore({
    // ...
  });

  // ...
};
```

<p dir="rtl" style="position:right;">
تابع subscribeToMore یک object به عنوان ورودی می‌گیرد که نیاز است آن را برای چگونه گوش دادن یا جواب دادن به subscription تنظیم کنیم.<br />
ابتدا باید یک subscription document یه کلید document در این object پاس دهیم. این document در واقع یک GraphQL document است که در آن subscription خود را تعریف می‌کنیم. همچنین می‌توانیم به یک کلید به نام updateQuery یک تابع پاس دهیم که از آن برای به روز رسانی کردن حافظه استفاده کنیم. <br />
تنظیمات توضیح داده‌شده برای object ورودی به تابع subscribeToMore به صورت زیر پیاده‌سازی می‌شود :
</p>

```js
subscribeToMore({
  document: NEW_LINKS_SUBSCRIPTION,
  updateQuery: (prev, { subscriptionData }) => {
    if (!subscriptionData.data) return prev;
    const newLink = subscriptionData.data.newLink;
    const exists = prev.feed.links.find(
      ({ id }) => id === newLink.id
    );
    if (exists) return prev;

    return Object.assign({}, prev, {
      feed: {
        links: [newLink, ...prev.feed.links],
        count: prev.feed.links.length + 1,
        __typename: prev.feed.__typename
      }
    });
  }
});
```
<p dir="rtl" style="position:right;">
پس از این کافی است یک subscription به نام NEW_LINKS_SUBSCRIPTION با استفاده از gal تعریف کنیم.
</p>

```js
const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;
```
<p dir="rtl" style="position:right;">
کار‌هایی که برای subscription در بالا توضیح داده‌شد را برای اضافه کردن رای‌های جدید نیز انجام می‌دهیم.<br />
پس در فایل LinkList.js کد‌ زیر را به LinkList component اضافه می‌کنیم.
</p>

```js
subscribeToMore({
  document: NEW_VOTES_SUBSCRIPTION
});
```
<p dir="rtl" style="position:right;">
همچنین همانند قسمت قبل یک subscription دیگر به نام NEW_VOTES_SUBSCRIPTION در بالای فایل LinkList.js اضافه می کنیم.
</p>

```js
const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
```

<p dir="rtl" style="position:right;">
در نهایت برنامه‌ی ما به صورت realtime قابل اجرا است!<br />
<br />
به این ترتیب توانستیم با استفاده از Apollo Client برنامه‌ای پیاده‌سازی کنیم که از GraphQL برای صدا زدن api‌ها استفاده کند و کاربرد آن را در پروژه‌ای واقعی مشاهده کنیم.
</p>
  


