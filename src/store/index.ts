import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules/index';

Vue.use(Vuex);

export interface RootState {
  data: string;
}

export default new Vuex.Store({
  modules,
});
