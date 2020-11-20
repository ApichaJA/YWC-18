import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      searchOrder: '',
      provinces: [],
  },

  getters:{
    getOrder(state){
      return state.searchOrder
    },

    getProvinces(state){
      return state.provinces
    },
  },

  mutations: {
    findOrder(state, order){
      state.searchOrder = order
    },

    pushProvince(state, data){
      state.provinces = data
    }

    

  },
  actions: {
    searching(searchInput, text){
      searchInput.commit('findOrder', this.state.searchOrder = text)
    },

    stackProvinces(province, data){
      province.commit('pushProvince', this.state.provinces = data)
    }
  },
  modules: {
  }
})
