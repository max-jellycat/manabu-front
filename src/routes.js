import Home from 'common/pages/Home';
import SignUp from 'common/pages/SignUp/SignUp';
import SignIn from 'common/pages/SignIn/SignIn';
import Dashboard from 'dashboard/pages/Dashboard';
import Page404 from 'common/pages/404';
import SocialConnect from 'common/pages/SocialConnect';

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', roles: ['Authenticated', 'Admin'], component: Dashboard },
  { path: '/login', component: SignIn },
  { path: '/register', component: SignUp },
  { path: '/connect/:provider', component: SocialConnect },
  { path: '*', exact: false, component: Page404 },
];

export default routes;
