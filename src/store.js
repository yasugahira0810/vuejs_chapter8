import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
// プラグインとして登録
Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  getters: {
    test(state, getters, rootState, rootGetters) {
      // 自分自身の item ゲッターを使用 getters['moduleA/item']
      getters.item
      // ルートの user ゲッターを使用
      rootGetters.user

      return [getters.item, rootGetters.user]
    },
    item() { return 'getter: moduleA/item' },
  },
  actions: {
    test({ dispatch, commit, getters, rootGetters }) {
      // 自分自身の update をディスパッチ
      dispatch('update')
      // ルートの update をディスパッチ
      dispatch('update', null, { root: true })
      // ルートの update をコミット
      commit('update', null, { root: true })
      // ルートに登録されたモジュール moduleB の update をコミット
      commit('moduleB/update', null, { root: true })
    },
    update() { console.log('action: moduleA/update') },
  }
}
const moduleB = {
  namespaced: true,
  mutations: {
    update() { console.log('mutation: moduleB/update') }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
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

// 何が呼び出されるか、コンソールログを確認してみよう
store.dispatch('moduleA/test')
console.log(store.getters['moduleA/test'])

export default store
