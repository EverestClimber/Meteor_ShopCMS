import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import message from 'antd/lib/message';
import { Roles } from 'meteor/alanning:roles';
import { loginWithPassword, logout } from 'meteor-apollo-accounts'


const afterLogin = (userId, props) => {
  message.success('we in this bitch!'); 
  props.client.resetStore();
  if (Roles.userIsInRole(userId, ['admin'])) {
      return browserHistory.push('/admin');
  } else {
      return browserHistory.push('/');
  }
}


export const handleLogin = (email, password, props) => {
  loginWithPassword({email, password}, props.client)
    .then((userId) => afterLogin(userId, props));
};


export const handleLogout = (props) => {
      logout(props.client)
        .then(()=> {
          props.client.resetStore()
          return browserHistory.push('/');
        });
};