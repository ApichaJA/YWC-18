import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      searchOrder: ''
  },

  getters:{
    getOrder(state){
      return state.searchOrder
    }
  },

  mutations: {
    findOrder(getters, order){
      getters.searchOrder = order
    }
  },
  actions: {
    searching(searchInput, text){
      searchInput.commit('findOrder', this.state.searchOrder = text)
    }
  },
  modules: {
  }
})
