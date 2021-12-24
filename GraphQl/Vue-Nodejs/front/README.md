# پیاده‌سازی GraphQl با vue js
<p align="center" width="100%">
<img width="795" alt="Screen Shot 1400-10-03 at 19 43 04" src="https://user-images.githubusercontent.com/59199865/147364109-6df4c013-5f17-47b5-bb6b-203ba760d0a9.png">
</p>

## نصب و راه‌اندازی
1. در صورتی که Vue CLI را نصب نکرده‌اید با استفاده از دستور زیر نصب کنید همجنین برای مطالعه بیشتر [اینحا](https://cli.vuejs.org/guide/installation.html) را مطالعه کنید.
```
npm install -g @vue/cli
```
1. یک directory جدید بسازید و به آن بروید.
3. یک vue app با استفاده از دستور زیر بسازید.
```
vue create your-app-name
```
4. برای راحتی کار از بوت استرپ استفاده می‌کنیم. بوت استرپ را با استفاده از CDN و قرار دادن کد زیر در تگ head در مسیر `your-app-name/public/index.html` انجام می‌دهیم.
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```
&nbsp; &nbsp; &nbsp; و کد زیر را در انتهای تگ body قرار می دهیم.
```
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```
5. ما Apollo را به صورت زیر نصب می‌کنیم.
```
vue add apollo
```
6. از Apollo یک instance می‌گیریم، Apollo client و Apollo provider را در مسیر زیر مطابق کد زیر قرار می‌دهیم. در این صورت تمام child component ها می‌توانند از Apollo استفاده کنند.
```
import Vue from 'vue'
import App from './App.vue'

import VueApollo from 'vue-apollo'
Vue.use(VueApollo)


import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
```

7. برای استفاده از Apollo، باید از object آن استفاده کرد.
```
<script>
export default {
  apollo: {
  }
}
</script>
```


