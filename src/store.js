import moduleA from '@/store/a.js'
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// プラグインとして登録
Vue.use(Vuex)
Vue.use(VueAxios, axios)

const myModule = {
  namespaced: true,
  state() {
    return {
      entries: []
    }
  },
  mutations: {
    set(state, payload) {
      state.entries = payload
    }
  },
  actions: {
    load({ commit }, file) {
      axios.get(file).then(response => {
        commit('set', response.data)
      })
    }
  }
}

const moduleB = {
  namespaced: true,
  mutations: {
    update() { console.log('mutation: moduleB/update') }
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    moduleA,
    moduleB,
    moduleC: myModule,
    moduleD: myModule
  },
  getters: {
    user() { return 'getter: user' }
  },
  mutations: {
    update() { console.log('mutation: update') }
  },
  actions: {
    update() { console.log('action: update') }
  }
})

// 状態の監視
const unwatch = store.watch(
  (state, getters) => {
    return state.count // 監視したいデータを返す
  },
  (newVal, oldVal) => {
    // 処理
  }
)

// 何が呼び出されるか、コンソールログを確認してみよう
store.dispatch('moduleA/test')
console.log(store.getters['moduleA/test'])

// 別のデータを読み込んだりする
store.dispatch('moduleC/load', '/static/a.json')
store.dispatch('moduleD/load', '/static/b.json')

// コミットにフック
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
// ディスパッチにフック
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// ホットリロード
if (module.hot) {
  module.hot.accept(['@/store/a.js'], () => {
    // 更新されたモジュールを読み込む
    const myModule = require('@/store/a.js').default
    // 新しい定義をセット
    store.hotUpdate({
      modules: {
        myModule: myModule
      }
    })
  })
}

export default store
