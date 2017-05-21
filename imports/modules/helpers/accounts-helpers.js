import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import message from 'antd/lib/message';
import { Roles } from 'meteor/alanning:roles';
import { loginWithPassword, createUser, logout, onTokenChange } from 'meteor-apollo-accounts'


const afterLogin = (userId, apollo, _this) => {
  message.success('welcome!'); 
  apollo.resetStore();
  _this.setState({ loading: false });
  return browserHistory.push('/admin');
/*  if (Roles.userIsInRole(userId, ['admin'])) {
      return browserHistory.push('/admin');
  } else {
      return browserHistory.push('/');
  }*/
}

const alertErrors = (res, _this) => {
  const errors = res.graphQLErrors.map( err => err.message );
  errors.forEach(messageText => {
    message.error(messageText, 4);
    let errors = _this.state.errors;
    errors.push(messageText);
    _this.setState({ errors });
  });
  _this.setState({ loading: false });
}


export const handleSignup = (email, password, profile, apollo, _this) => {
  console.log(profile)
  createUser({email, password, profile}, apollo)
    .then(userId => afterLogin(userId, apollo, _this) )
    .catch( res => alertErrors(res, _this) );
};


export const handleLogin = (email, password, apollo, _this) => {
  loginWithPassword({email, password }, apollo)
    .then( (userId) => afterLogin(userId, apollo, _this) )
    .catch( res => alertErrors(res, _this) );
  //onTokenChange(({ userId, token }) => Meteor.loginWithToken(token, () => afterLogin(userId, props)));
};


export const handleLogout = (apollo, _this) => {
      logout(apollo)
        .then(()=> { 
          apollo.resetStore();
          message.success('you are logged out!', 3);
          return browserHistory.push('/'); 
        })
        .catch( res => alertErrors(res, _this) );
};