import Vue from 'vue'
import App from './App.vue'

import VueApollo from 'vue-apollo'
Vue.use(VueApollo)


import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  // You should use an absolute URL here
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


