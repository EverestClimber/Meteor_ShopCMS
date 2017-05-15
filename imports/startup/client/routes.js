// TOP-LEVEL IMPORTS
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// LAYOUTS
import PublicLayout from '../../ui/layouts/public';
import AdminLayout from '../../ui/layouts/admin';

// PAGES
import { 
  //public
  LandingPage, 
  LoginPage, 
  SignupPage,
  //app
  DocumentsListPage,
  //admin
  AdminHomePage
} from '../../ui/pages';
import DocumentDetailPage from '../../ui/pages/app/DocumentDetail';
import AdminUsersPage from '../../ui/pages/admin/admin-users';
import AdminUsersSinglePage from '../../ui/pages/admin/admin-user-single';
import AdminAccountPage from '../../ui/pages/admin/admin-account';
import AdminShopsPage from '../../ui/pages/admin/admin-shops';
import AdminAddShopPage from '../../ui/pages/admin/admin-add-shop';

// THEME
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider'

import { userId } from 'meteor-apollo-accounts'

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
      </Route>

      {/*ADMIN AREA*/}
      <Route path="/admin" component={ AdminLayout }>
        <IndexRoute name="index" component={ AdminHomePage } />
        <Route path="/admin/users" component={ AdminUsersPage }  />
        <Route path="/admin/shops" component={ AdminShopsPage }  />
        <Route path="/admin/shops/create" component={ AdminAddShopPage }  />
        <Route path="/admin/users/:_id" component={ AdminUsersSinglePage }  />
        <Route path="/admin/account" component={ AdminAccountPage }  />
      </Route>

    </Router>
  </LocaleProvider>
  );
}

export default AppRoutes;