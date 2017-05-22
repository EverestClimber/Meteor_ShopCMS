// TOP-LEVEL IMPORTS
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { userId } from 'meteor-apollo-accounts'
// LAYOUTS
import PublicLayout from '../../ui/layouts/public';
import AdminLayout from '../../ui/layouts/admin';

// PAGES
import { 
  //public
  LandingPage, 
  LoginPage, 
  SignupPage,
  //admin
  AdminHomePage
} from '../../ui/pages';

import AdminUsersPage from '../../ui/pages/admin/admin-users';
import AdminUsersSinglePage from '../../ui/pages/admin/admin-user-single';
import AdminAccountPage from '../../ui/pages/admin/admin-account';
import AdminShopsPage from '../../ui/pages/admin/admin-shops';
import AdminAddShopPage from '../../ui/pages/admin/admin-add-shop';
import AdminMalls from '../../ui/pages/admin/admin-malls';
import AdminShopSinglePage from '../../ui/pages/admin/admin-shop-single';
import ResetPassword from '../../ui/pages/public/ResetPassword';
import ForgotPassword from '../../ui/pages/public/ForgotPassword';

// THEME
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider'



// Hook where will be fetched the data before displaying the component
// Will redirect user if not logged


const AppRoutes = () => {
  return (
  <LocaleProvider locale={enUS}>
    <Router history={browserHistory}>

      {/*PUBLIC AREA*/}
      <Route path="/" component={ PublicLayout }>
        <IndexRoute name='index' component={ LoginPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/signup" component={ SignupPage } />
        <Route name="forgot-password" path="/forgot-password" component={ ForgotPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
      </Route>

      {/*ADMIN AREA*/}
      <Route path="/admin" breadcrumbName='Admin' component={ AdminLayout }>
        <IndexRoute name="index" component={ AdminHomePage } />
        <Route path="/admin/account" breadcrumbName='Account' component={ AdminAccountPage }  />
        <Route path="/admin/malls" breadcrumbName='Malls' component={ AdminMalls }  />

        <Route path="shops" breadcrumbName='Shops' component={ AdminShopsPage }>
          <Route path=":_id" breadcrumbName='Shop Detail' component={ AdminShopSinglePage } />
        </Route>
        
        <Route path="users" breadcrumbName='Users' component={ AdminUsersPage }>
          <Route path=":_id" breadcrumbName='User Detail' component={ AdminUsersSinglePage }  />
        </Route>
        
      </Route>

    </Router>
  </LocaleProvider>
  );
}

export default AppRoutes;