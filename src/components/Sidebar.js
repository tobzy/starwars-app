import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {history} from '../App'
import logo from '../assets/images/logo.png'

const {Sider} = Layout;

const SideBar = (props) => {
  const goToStarwarsPage = (obj) => {
    if (obj.key === '1') {
      history.push(`/people`)
    }
    if (obj.key === '2') {
      history.push(`/films`)
    }
    if (obj.key === '3') {
      history.push(`/planets`)
    }
    if (obj.key === '4') {
      history.push(`/species`)
    }
    if (obj.key === '5') {
      history.push(`/starships`)
    }
    if (obj.key === '6') {
      history.push(`/vehicles`)
    }

  }
  const getSelectedKeys = () => {
    if (props.location.pathname === '/people') return '1'
    if (props.location.pathname === '/films') return '2'
    if (props.location.pathname === '/planets') return '3'
    if (props.location.pathname === '/species') return '4'
    if (props.location.pathname === '/starships') return '5'
    if (props.location.pathname === '/vehicles') return '6'
  }

  const {logoStyles} = styles
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" style={logoStyles}>
        <img src={logo} height={70} alt="logo"/>
      </div>
      <Menu theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onSelect={goToStarwarsPage}
            selectedKeys={
              [getSelectedKeys()]
            }
      >
        <Menu.Item key="1">
          <Icon type="team"/>
          <span className="nav-text">People</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera"/>
          <span className="nav-text">Films</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="global"/>
          <span className="nav-text">Planets</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="man"/>
          <span className="nav-text">Species
          </span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="rocket"/>
          <span className="nav-text">StarShips
          </span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="car"/>
          <span className="nav-text">Vehicles
          </span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
const styles = {
  logoStyles: {
    margin: '16px',
  }
}


export default SideBar