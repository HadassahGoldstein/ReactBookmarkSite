import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout from './components/Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserBookmarks from './pages/UserBookmarks';
import AddBookmark from './pages/AddBookmark';
import PrivateRoute from './PrivateRoute';
import { AuthContextComponent } from './AuthContext';



const App = () => {
  return (
    <AuthContextComponent>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Logout' component={Logout} />
        <PrivateRoute exact path='/UserBookmarks' component={UserBookmarks} />
        <PrivateRoute exact path='/AddBookmark' component={AddBookmark} />
      </Layout>
    </AuthContextComponent>
  )
}

export default App;