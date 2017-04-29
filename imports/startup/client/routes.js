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
  AdminHomePage,
  AdminUsersPage,
  AdminAccountPage
} from '../../ui/pages';


// THEME
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider'

import { userId } from 'meteor-apollo-accounts'

// Hook where will be fetched the data before displaying the component
// Will redirect user if not logged
const requireAuth = (nextState, replaceState) => {
    if(!userId()){
      return replaceState("/login")
    }
}


const AppRoutes = () => {
  return (
  <LocaleProvider locale={enUS}>
    <Router history={browserHistory}>

      {/*PUBLIC AREA*/}
      <Route path="/" component={ PublicLayout }>
        <IndexRoute name='index' component={ LandingPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/signup" component={ SignupPage } />
        <Route path="/documents" component={ DocumentsListPage } />
      </Route>

      {/*ADMIN AREA*/}
      <Route path="/admin" component={ AdminLayout }>
        <IndexRoute name="index" component={ AdminHomePage } onEnter={requireAuth} />
        <Route path="/admin/users" component={ AdminUsersPage } onEnter={requireAuth} />
        <Route path="/admin/account" component={ AdminAccountPage } onEnter={requireAuth} />
      </Route>

    </Router>
  </LocaleProvider>
  );
}

export default AppRoutes;