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
const { Header, Content } = Layout;

const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
}



// EXPORTED COMPONENT
// ====================================
export const MainContent = ({routes, params, children, collapsed, toggle }) => {
  //console.log(routes);
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>toggle()} />
      </Header>
      <Content style={{ margin: '5px 16px' }}>
        <Breadcrumb style={{ margin: '12px 0' }} itemRender={itemRender} routes={routes} params={params} />
        <div style={{ padding: 24, background: '#fff', minHeight: '65vh' }}>
          <div style={{margin: '20px auto', width: 1000, maxWidth: '90%'}}>
            { children }
          </div>
        </div>
      </Content>
    </Layout>
  );
}