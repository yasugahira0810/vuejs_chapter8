import Vue from 'vue'
import App from './App'
import store from '@/store.js'

var vue = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

console.log(store.state.count)
store.commit('increment')
console.log(store.state.count)
