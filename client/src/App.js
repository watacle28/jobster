import React from 'react';
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Layout } from './layout/Layout';

//pages
import {Home} from './pages/Home'
import {Devs} from './pages/Devs'

import {Contact} from './pages/Contact'
import {Lost} from './pages/404'
import {Companies} from './pages/Companies'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Add } from './pages/Add';

import { EditProfile } from './pages/EditProfile';
import {EditCo} from './pages/EditCo'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from './redux/actions/auth';
import { Loader } from './components/Loader';
import { AuthRoute, PrivateRoute } from './utils/myRoutes';
import { DevView } from './components/DevView';
import { DevProfile } from './components/DevProfile';
import { CompanyProfile } from './components/CompanyProfile';
import { About } from './pages/About';


const StyledApp = styled.section`
 background: ${props => props.theme.background};
 margin: 0 auto;
 width: 100%; 
 /* max-width: 1440px; */
 min-height: 100vh;
 position: relative;
 color: ${props => props.theme.primaryColor};

`

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state =>state.auth.loading)
  useEffect(() => {
    dispatch(loadUserData())
   
  }, [dispatch])
  return ( 
    
    <StyledApp >
     
      <Router> 
        {loading ? <Loader/>:
      <Layout>
     <Switch>
     <Route exact path ='/' component={Home}/>
      <PrivateRoute exact path ='/add' component = {Add}/>
      <PrivateRoute exact path ='/edit/:id' component={Add}/>
      <PrivateRoute exact path = '/devs' component ={Devs}/>
      <Route exact path='/contact' component = {Contact}/>
      <PrivateRoute exact path='/dev/:id' component={DevProfile}/>
      <PrivateRoute exact path='/co/:id' component={CompanyProfile}/>
      <PrivateRoute exact path='/edit/dev/:id' component = {EditProfile}/>
      <PrivateRoute exact path='/edit/co/:id' component = {EditCo}/>
      <AuthRoute exact path='/login' component = {Login}/>
      <AuthRoute exact path='/register' component = {Register}/>
      <Route component = {Lost}/>
     </Switch>
        </Layout>} </Router>
     
    </StyledApp>
    
  );
}

export default App;


// TODOS
// 1 . single job page
// 2 . filtering and sorting 
// 3 . 