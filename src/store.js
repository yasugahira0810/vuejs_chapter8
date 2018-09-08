import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
// プラグインとして登録
Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 200
    }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  },
  state: {
    message: '初期メッセージ'
  },
  getters: {
    // messageを使用するゲッター
    message(state) {
      return state.message
    }
  },
  mutations: {
    // メッセージを変更するミューテーション
    setMessage(state, payload) {
      state.message = payload.message
    }
  },
  actions: { // メッセージの更新処理
    doUpdate({
      commit
    }, message) {
      commit('setMessage', {
        message
      })
    }
  }
})
export default store
