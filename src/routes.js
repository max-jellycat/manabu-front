import Home from 'common/pages/Home';
import SignUp from 'common/pages/SignUp/SignUp';
import SignIn from 'common/pages/SignIn/SignIn';
import Page404 from 'common/pages/404';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: SignIn },
  { path: '/register', component: SignUp },
  { path: '*', exact: false, component: Page404 },
];

export default routes;
