import React from 'react';
import { browserHistory } from 'react-router';
//
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
//modules
import { handleLogout, ApolloRoles } from '../../../modules/helpers';
import { LoadingScreen } from '../../components/common';
import { GET_USER_DATA } from '../../apollo/queries';
//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

import { AdminMenu } from './AdminMenu'
import { MainContent } from './MainContent'

// CONSTANTS & DESTRUCTURING
// ====================================
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;

const SCREEN_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      width: SCREEN_WIDTH
    };
  }
  updateDimensions() {
      this.setState({width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth });
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillReceiveProps({ data }){
    if (!data.loading && (!data.user || !data.user.roles || !data.user.roles.includes('admin'))) {
      return browserHistory.push('/');
    }
  }
  componentDidMount() {
    const { loading, user } = this.props.data;

    window.addEventListener("resize", this.updateDimensions);

    if (!loading && (!user && !user.roles && !user.roles.includes('admin'))) {
      return browserHistory.push('/');
    }
    
  }
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick(e) {
    if (e.key === 'logout') { return handleLogout(this.props.client, this); }
    browserHistory.push(e.key);
    this.setState({ current: e.key });
    return;  
  }
  render() {
    const { routes, params, location } = this.props;
    if (!this.props || !this.props.data || this.props.data.loading) {
      return <LoadingScreen />
    }
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <AdminMenu handleClick={this.handleClick} location={location} />
        </Sider>
        <MainContent {...this.props} toggle={this.toggle} collapsed={this.state.collapsed} />
      </Layout>
    );
  }
}



export default withApollo(graphql(GET_USER_DATA)(AdminLayout))