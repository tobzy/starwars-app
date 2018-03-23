import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import SideBar from './Sidebar';
import StarWarsPeople from './StarWarsPeople';
import StarWarsFilms from './StarWarsFilms';
import StarWarsPlanets from './StarWarsPlanets';
import StarWarsShips from './StarWarsShips';
import StarWarsSpecies from './StarWarsSpecies';
import StarWarsVehicles from './StarWarsVehicles';

const {Content, Footer} = Layout;

const MainLayout = (props) => {
  let pageBreadcrumb = props.location.pathname.split('/')[1] || "people";
  return (
    <Layout style={{minHeight: '100vh'}}>
      <LoadingBar progressIncrease={5} updateTime={100}
                  style={{backgroundColor: 'rgb(0, 177, 217)', height: '3px', position: 'fixed', zIndex: 150}}/>
      <SideBar {...props}/>

      <Layout>
        {/*<Header style={{background: '#fff', padding: 0}}/>*/}
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>StarWars</Breadcrumb.Item>
            <Breadcrumb.Item>{ pageBreadcrumb[0].toUpperCase() + pageBreadcrumb.slice(1)}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{padding: 24, background: '#fff', minHeight: '100vh'}}>
            <Switch>
              <Route path='/people' component={StarWarsPeople} exact/>
              <Redirect strict from={"/people/"} to={"/people"} />

              <Route path='/films' component={StarWarsFilms} exact/>
              <Redirect strict from={"/films/"} to={"/films"} />

              <Route path='/planets' component={StarWarsPlanets} exact/>
              <Redirect strict from={"/planets/"} to={"/planets"} />

              <Route path='/species' component={StarWarsSpecies} exact/>
              <Redirect strict from={"/species/"} to={"/species"} />

              <Route path='/vehicles' component={StarWarsVehicles} exact/>
              <Redirect strict from={"/vehicles/"} to={"/vehicles"} />

              <Route path='/starships' component={StarWarsShips} exact/>
              <Redirect strict from={"/starships/"} to={"/starships"} />

              <Redirect strict from={"/"} to={"/people"} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Source: <a href="https://swapi.co">Star Wars API </a>  Design: <a href="http://github.com/tobzy">Tobechukwu</a>
        </Footer>
      </Layout>
    </Layout>
  )
  }


  export default MainLayout