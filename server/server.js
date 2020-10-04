import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'

import config from './config'
import Html from '../client/html'

import User from './models/User.model'
import Channel from './models/Channel.model'
import Message from './models/Message.model'
import DirectMessage from './models/Direct-message.model'

const Root = () => ''

mongooseService.connect()

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT)
middleware.forEach((it) => server.use(it))

server.post('/api/v1/register', async (req, res) => {
  const { body } = req
  try {
    const user = new User({
      email: body.email,
      password: body.password,
      username: body.username
    })
    user.save()
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    connections.forEach((c) => {
      c.write(JSON.stringify({ type: 'SHOW_MESSAGE', message: `${user.email} Just Logged in` }))
    })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/channels', async (req, res) => {
  try {
    const channels = await Channel.find({})
    res.json({ status: 'ok', channels })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/channels', async (req, res) => {
  const { body } = req
  try {
    const channel = new Channel({
      name: body.name
    })
    channel.save()
    res.json({ status: 'ok', channel })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/message', async (req, res) => {
  const { body } = req
  try {
    const message = new Message({
      channel: body.channel,
      message: body.message,
      time: body.time,
      username: body.username,
      id: body.id
    })
    message.save()
    res.json({ status: 'ok', message })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/direct-message', async (req, res) => {
  const { body } = req
  try {
    const directMessage = new DirectMessage({
      sender: body.sender,
      recipient: body.recipient,
      message: body.message,
      time: body.time,
      id: body.id
    })
    directMessage.save()
    res.json({ status: 'ok', directMessage })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/message', async (req, res) => {
  try {
    const messages = await Message.find({})
    res.json({ status: 'ok', messages })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/direct-message', async (req, res) => {
  try {
    const directMessages = await DirectMessage.find({})
    res.json({ status: 'ok', directMessages })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    // conn.write(JSON.stringify({ type: 'SHOW_MESSAGE', message: 'hellow' }))
    conn.on('data', async (data) => {
      console.log('recieced', data)
      const parsedData = JSON.parse(data)
      if (typeof parsedData.type !== 'undefined' && parsedData.type == 'SEND_MESSAGE') {
        if (parsedData.active.indexOf('#') === 0) {
          connections.forEach((c) => {
            c.write(data)
          })
        }
        if (parsedData.active.indexOf('@') === 0) {
          connections
            .filter(
              (it) =>
                typeof it.userInfo !== 'undefined' &&
                it.userInfo.username === conn.userInfo.username
            )
            .forEach((c) => {
              c.write(
                JSON.stringify({
                  ...parsedData
                })
              )
            })
          connections
            .filter(
              (it) =>
                typeof it.userInfo !== 'undefined' &&
                it.userInfo.username === parsedData.active.slice(1)
            )
            .forEach((c) => {
              c.write(
                JSON.stringify({
                  ...parsedData,
                  active: `@${conn.userInfo.username}`
                })
              )
            })
        }
      }

      if (parsedData.type === 'SYSTEM_WELCOM') {
        conn.userInfo = {
          username: parsedData.username
        }
        const users = connections
          .filter((it) => typeof it.userInfo !== 'undefined')
          .map((it) => it.userInfo.username)
        connections.forEach((c) => {
          c.write(JSON.stringify({ type: 'UPDATE_ALIVE_USERS', users }))
        })
      }
    })

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
    const users = connections
      .filter((it) => typeof it.userInfo !== 'undefined')
      .map((it) => it.userInfo.username)
    connections.forEach((c) => {
      c.write(JSON.stringify({ type: 'UPDATE_ALIVE_USERS', users }))
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}

console.log(`Serving at http://localhost:${port}`)
