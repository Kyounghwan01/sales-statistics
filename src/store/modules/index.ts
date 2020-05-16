/** import한 변수로 namespace 반영 */
import loginUser from './loginUser';
import auth from './auth';
import users from './users';
import order from './order';
import editOrder from './editOrder';
import sales from './sales';

const modules = {
  loginUser,
  auth,
  users,
  order,
  editOrder,
  sales,
};

export default modules;
