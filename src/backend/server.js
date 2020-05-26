import express from 'express'
import webpack from 'webpack'
import React from 'react'
import helmet from 'helmet'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import passport from 'passport'
import boom from '@hapi/boom'
import cookieParser from 'cookie-parser'
import axios from 'axios'

import serverRoutes from './routes/serverRoutes'
import getManifest from './utils/getManifest'

import Layout from '../frontend/components/Layout'
import reducer from '../frontend/reducers'

import config from '../config'
import { TWO_HOURS ,THIRTY_DAYS} from './utils/times'

const { DEV, PORT } = config

const app = express()

// ? Basic Server Middleware Config
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

// ? Basic Auth Strategy
require('./utils/auth/strategies/basic')

if (DEV) {
  console.log('Working in development mode')

  const webpackConfig = require('../../webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackCompiler = webpack(webpackConfig)
  const webpackServerConfig = { port: PORT, hot: true }
  
  app.use(webpackDevMiddleware(webpackCompiler, webpackServerConfig))
  app.use(webpackHotMiddleware(webpackCompiler))

} else {
  app.use((req, res, next) => {
    if(!req.manifest) {
      req.manifest = getManifest()
      next()
    }
  })
  app.use(express.static(`${__dirname}/public`))
  app.use(helmet())
  app.use(helmet.permittedCrossDomainPolicies())
  app.disable('x-powered-by')
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css'
  const mainScript = manifest ? manifest['main.js'] : 'assets/app.js'
  const vendorBuild = manifest ? manifest['vendors.js'] : '/assets/vendor.js'

  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>React Video</title>
    </head>
    <body>
      <div id="app">
        ${html}
      </div>
      <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
        </script>
      <script type="text/javascript" src="${mainScript}"></script>
      <script type="text/javascript" src="${vendorBuild}"></script>
    </body>
    </html>
  `)
}

const renderApp = (req, res) => {
  let initialState

  const { email, name, id } = req.cookies  

  if (id) {
    initialState = {
      user: {
        id,
        name,
        email
      },
      playing: {},
      filter: '',
      myList: [],
      trends: [],
      originals: [],
    }
  } else {
    initialState = {
      user: {},
      playing: {},
      filter: '',
      myList: [],
      trends: [],
      originals: [],
    }
  }
  const store = createStore(reducer, initialState)
  const preloadedState = store.getState()
  const isLogged = (initialState.user.id)

  const html = renderToString(
    <Provider store={store} >
      <StaticRouter location={req.url} context={ { } }>
        <Layout>
          {renderRoutes(serverRoutes(isLogged))}
        </Layout>
      </StaticRouter>
    </Provider>
  )

  res.send(setResponse(html, preloadedState, req.manifest))
}

app.post('/auth/sign-in', async (req, res, next) => {
  const { rememberMe } = req.body
  
  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized())
      }
      
      req.login(data, { session: false }, async error => {
        if (error) {
          next(error)
        }
        
        const {token, ...user } = data

        res.cookie('token', token, {
          httpOnly: !DEV,
          secure: !DEV,
          maxAge: rememberMe ? THIRTY_DAYS : TWO_HOURS
        })

        res.status(200).json(user)
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
})

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req

  try {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: user
    })
    console.log(data)
    res.status(201).json({
      name: user.name,
      email: user.email,
      id: data
    })
  } catch (error) {
    next(error)
  }
})

app.get('*', renderApp)

app.listen(PORT, error => {
  if (error) console.log(error)
  else console.log(`Listening on port: ${PORT}`)
})