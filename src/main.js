import Vue from 'vue'
import App from './App'
import store from '@/store.js'

var vue = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

//store.dispatch('actionType', 100)
//console.log(store.state.count)
//store.commit('mutationType', 10)
//console.log(store.state.count)
//store.commit('increment')
//console.log(store.state.count)
