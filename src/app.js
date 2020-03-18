require('dotenv').config()
const config = require('./config/config')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyparser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')
const requestlogger = require('./middlewares/generic/logRequest')
const webpush = require('web-push')

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY
webpush.setVapidDetails(
  'mailto:bodnar.zsombor@gmail.com',
  publicVapidKey,
  privateVapidKey
)

// route require
const main = require('./routes/main')
const auth = require('./routes/auth')
const item = require('./routes/item')
const user = require('./routes/user')
const admin = require('./routes/admin')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))

// passport
const store = new MongoDBStore(
  {
    uri: config.mongo.path,
    databaseName: 'szertar',
    collection: 'sessions'
  },
  () => {
    // Should have gotten an error
  }
)

store.on('error', () => {
  // Also get an error here
})

app.use(
  session({
    secret: config.sessionSecret,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true,
    store: store
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
if (config.logrequests) {
  app.use(requestlogger.logrequest())
}

app.use((req, res, next) => {
  res.tpl = {}
  res.tpl.error = {}
  return next()
})

const sendMail = require('./middlewares/generic/sendMail')
const requireAdmin = require('./middlewares/user/requireAdmin')
app.get(
  '/test',
  requireAdmin(),
  (req, res, next) => {
    const payload = JSON.stringify({ title: 'test', body: 'Test message' })
    if (req.user.web_push.length > 0)
      req.user.web_push.forEach(subscription =>
        webpush.sendNotification(subscription, payload).catch(error => {
          console.error(error.stack)
        })
      )
    next()
  },
  sendMail('Test message', '<b> Test message </b>', 'Test'),
  (req, res) => res.end()
)

// web-push subscribe
app.post('/subscribe', (req, res) => {
  const subscription = req.body
  console.log(subscription)
  if (
    req.user.web_push.length > 0 &&
    !req.user.web_push.some(i => i.endpoint === subscription.endpoint)
  )
    req.user.web_push.push(subscription)
  else if (!req.user.web_push.length) req.user.web_push.push(subscription)
  req.user.save()
  res.status(201).json({})
})

app.post('/unsubscribe', (req, res) => {
  const userModel = objectRepository.userModel
  const subscription = req.body
  userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { web_push: { endpoint: subscription.endpoint } } },
    () => {}
  )
  res.status(201).json({})
})

const objectRepository = require('./models/objectRepository')
const rentModel = objectRepository.rentModel
app.use((req, res, next) => {
  res.locals.user = req.user || null
  res.locals.url = req.url
  res.locals.active = req.url.split('/')
  res.locals.newRents = null
  if (req.user) {
    if (req.user.isAdmin && res.locals.active[1] === 'admin') {
      rentModel
        .find()
        .or([{ state: 1 }, { state: 4 }])
        .exec((err, rents) => {
          res.locals.newRents = rents.length
          next()
        })
    } else {
      rentModel.findOne({ user: req.user._id, state: 0 }, (err, cart) => {
        req.user.inCart = 0
        if (cart && cart.items.length) {
          cart.items.forEach(item => {
            req.user.inCart += item.amount
          })
        }
        rentModel.find(
          { user: req.user._id, state: { $gte: 1 } },
          (err, rents) => {
            req.user.inRent = 0
            if (rents) req.user.inRent = rents.length
            req.user.save()
            next()
          }
        )
      })
    }
  } else next()
})

// routes
app.use('/', main)
app.use('/auth', auth)
app.use('/item', item)
app.use('/user', user)
app.use('/admin', admin)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
