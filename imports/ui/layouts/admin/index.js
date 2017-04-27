import React from 'react';
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


class AdminLayout extends React.Component {
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
  render(){
   
    return (
	    <Layout>
	      <Content style={{ padding: 0 }}>
	          {React.cloneElement(this.props.children, {...this.props})}
	      </Content>
	      <Footer>
	      </Footer>
	    </Layout>
	  );
  }
}


export { AdminLayout };