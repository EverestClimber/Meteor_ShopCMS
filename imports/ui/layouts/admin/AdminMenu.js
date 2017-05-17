
//top-level imports
import React from 'react';
import { browserHistory, Link } from 'react-router';
//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
//modules

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;
const MenuItemGroup = Menu.ItemGroup;


// EXPORTED COMPONENT
// ====================================
export const AdminMenu = ({handleClick, location}) => {
  return (
    <Menu onClick={(key)=>handleClick(key)}  theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key="/admin">
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Menu.Item>
            <Menu.Item key="/admin/users">
              <Icon type="contacts" />
              <span className="nav-text">Users</span>
            </Menu.Item>
            <Menu.Item key="/admin/malls">
              <Icon type="appstore-o" />
              <span className="nav-text">Malls</span>
            </Menu.Item>
            <Menu.Item key="/admin/shops">
              <Icon type="shopping-cart" />
              <span className="nav-text">Shops</span>
            </Menu.Item>
            <Menu.Item key="/admin/account">
              <Icon type="setting" />
              <span className="nav-text">My Account</span>
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              <span className="nav-text">Logout</span>
            </Menu.Item>
          </Menu>
  );
}