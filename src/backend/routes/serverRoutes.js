import Home from '../../frontend/containers/Home'
import Login from '../../frontend/containers/Login'
import Register from '../../frontend/containers/Register'
import Player from '../../frontend/containers/Player'
import NotFound from '../../frontend/containers/NotFound'

const routes = isLogged => {
  return [
    {
      exact: true,
      path: '/',
      component: isLogged ? Home : Login
    },
    {
      exact: true,
      path: '/login',
      component: isLogged ? Home : Login
    },
    {
      exact: true,
      path: '/register',
      component: isLogged ? Home : Register
    },
    {
      exact: true,
      path: '/player/:id',
      component: isLogged ? Player : Login
    },
    {
      name: 'NotFound',
      component: NotFound
    }
  ]
} 

export default routes