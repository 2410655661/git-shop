import Vue from 'vue';
import Vuex from 'vuex';
import { UPDATE_USERNAME, EDIT_USER } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: null,
  },
  mutations: {
    UPDATE_USERNAME: (state, name) => {
      state.userName = name
      sessionStorage.setItem('userName', JSON.stringify(name))
    },
    EDIT_USER: (state) => {
      state.userName = null
      sessionStorage.removeItem('userName')
    }
  },
  actions: {

  }
})
