import React from 'react';
import { browserHistory } from 'react-router'
//
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
//modules
import { handleLogout } from '../../../modules/helpers';
//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

// CONSTANTS & DESTRUCTURING
// ====================================
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

class PublicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.state = {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    };
  }
  updateDimensions() {
      this.setState({width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillMount(){

  }
  handleClick = (e) => {
    if (e.key === 'logout') { 
      message.loading('logging you out...', 3);
      return handleLogout(this.props);
    }
    browserHistory.push(e.key);
    return this.setState({ current: e.key });
  }
  render(){
    
    return (
	    <Layout>
        <Header className="header">
          <Menu 
            defaultSelectedKeys={[this.props.location.pathname]} 
            onClick={this.handleClick} 
            mode="horizontal" 
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/">Home</Menu.Item>
            {!this.props.data || !this.props.data.user && <Menu.Item key="/login">Login</Menu.Item>}
            {!this.props.data || !this.props.data.user && <Menu.Item key="/signup">Signup</Menu.Item>}
            {this.props.data && this.props.data.user && <Menu.Item key="logout">Logout</Menu.Item>}
          </Menu>
        </Header>
	      <Content style={{ padding: 0, minHeight: 'calc(100vh - 64px)' }}>
	          {React.cloneElement(this.props.children, {...this.props})}
	      </Content>
	      <Footer>
	      </Footer>
	    </Layout>
	  );
  }
}

const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      randomString,
      _id
    }
  }
`;


export default withApollo(graphql(GET_USER_DATA)(PublicLayout))
