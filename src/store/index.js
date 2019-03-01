import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    authorities: [],
    seletedAuthority: {},
    storesDataUrl: '../../static/data/'
  },
  getters: {
    authorities (state) {
      return state.authorities
    },
    seletedAuthority (state) {
      return state.seletedAuthority
    }
  },
  mutations: {
    SET_AUTHORITIES (state, authorities) {
      state.authorities = authorities
    },
    SET_AUTHORITY (state, authority) {
      state.seletedAuthority = authority
    }
  },
  actions: {
    getAuthorities ({commit, state}, payload) {
      Vue.http.get(state.storesDataUrl + 'authorities.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const authorities = data
          commit('SET_AUTHORITIES', authorities)
        }
      })
    },
    setSelectedAuthority({commit, state}, payload) {
      let authority = {};
      if(payload.id) {
        authority = state.authorities.find(authority => authority.id == payload.id);
      }
      commit('SET_AUTHORITY', authority)
    }
  }
})
