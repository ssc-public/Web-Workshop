# پیاده‌سازی GraphQl با node js
<p align="center" width="100%">
<img width="397" alt="Screen Shot 1400-10-03 at 15 25 41" src="https://user-images.githubusercontent.com/59199865/147351150-d6fd731c-9583-4b27-a7cd-bde53ef13727.png">
</p>

## نصب و راه‌اندازی 
1. یک directory جدید بسازید و به آن بروید.
2. یک پروژه node js ایجاد کنید. در صورتی که تا حالا از دستور زیر استفاده نکرده‌اید، این [داک](https://docs.npmjs.com/cli/v8/commands/npm-init) را مطالعه کنید.
```
npm init --yes
```
3. برای کار با GraphQl و Apollo باید dependencies مربوطه را با استفاده از دستور زیر نصب کنیم.
```
npm install apollo-server graphql
```
<p dir='rtl' align='right'>4. یک فایل index.js در root پروژه بسازید.</p>

<p dir='rtl' align='right'>5. برای خود یک GraphQl schema در فایل index.js به صورت زیر بسازید.</p>

```
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Food {
    food: String
    price: String
    description: String
  }

  type Query {
    foods: [Food]
  }
`;
```
برای مثال ما دیتا مورد نیاز را hard code می‌کنیم:
```
const foods = [
  {
    food: 'Steak',
    price: '100$',
    description: 'Well done'
  },
  {
    food: 'Pasta',
    price: '80$',
    description: 'Spicy'
  },
  {
    food: 'French Fries',
    price: '10$',
    description: 'Waffle style'
  }
];
```
6. یک resolver تعریف می‌کنیم. در واقع resolver به Apollo GraphQl می گوید که چگونه داده های مرتبط با یک نوع داده خاص را fetch کند.
```
const resolvers = {
  Query: {
    foods: () => foods,
  },
};
```
7. سپس از Apollo Server یک instance می‌گیریم.
```
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```
<p dir='rtl' align='right'>8. GraphQl برخلاف REST API که دارای متد‌های get, post, delete, ... است، تنها دو روش دارد. در صورتی که بخواهیم state را تغییر دهیم از mutation  استفاده می‌کنیم. کد موجود در <a href="https://github.com/nonaghazizadeh/web_workshop/blob/master/GraphQl/Vue-Nodejs/back/index.js">این بخش</a> پیاده‌سازی کامل با mutation است.</p>
<p dir='rtl' align='right'>9. سرور را با دستور زیر ران می‌کنیم.</p>

```
node index.js
```
10. در نهایت سرور در یک url که در کنسول آمده است، بالا می‌آید.

