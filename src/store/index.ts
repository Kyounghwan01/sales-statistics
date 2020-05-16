import Vue from 'vue';
import Vuex from 'vuex';
// import modules from './modules';

/** import한 변수로 namespace 반영 */
import loginUser from './modules/loginUser';
import auth from './modules/auth';
import users from './modules/users';
import order from './modules/order';

Vue.use(Vuex);

export interface RootState {
  data: string;
}

export default new Vuex.Store({
  modules: {
    loginUser,
    auth,
    users,
    order,
  },
});
