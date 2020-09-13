import React from 'react';
import './navbar.css';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';



class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 150, float:"left", height: "100%"}}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 0, backgroundColor: "grey"}}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>

        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
          style={{height:'100%', borderRight: 0}}
        >
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <ContainerOutlined />
            <span>Option 3</span>
          </Menu.Item>
          <Menu.Item key="3">
            <ContainerOutlined />
            <span>Option 3</span>
          </Menu.Item>
          <Menu.Item key="3">
            <ContainerOutlined />
            <span>Option 3</span>
          </Menu.Item>
          <Menu.Item key="3">
            <ContainerOutlined />
            <span>Option 3</span>
          </Menu.Item>
          <Menu.Item key="3">
            <ContainerOutlined />
            <span>Option 3</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Sidebar;