import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Player from '../containers/Player'
import NotFound from '../containers/NotFound'

const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
    <Layout >
      <Switch>
        <Route exact path="/" component={ isLogged ? Home : Login} />
        <Route exact path="/login" component={ isLogged ? Home : Login}/>
        <Route exact path="/register" component={ isLogged ? Home : Register} />
        <Route exact path="/player/:id" component={ isLogged ? Player : Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
    </BrowserRouter>
  )
}

export default App