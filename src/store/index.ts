import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import modules from './modules/index';

Vue.use(Vuex);

export interface RootState {
  data: string;
}

const store: StoreOptions<RootState> = {
  modules,
};

export default new Vuex.Store(store);
