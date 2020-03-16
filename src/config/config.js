const AUTH_SCH_URL = 'https://auth.sch.bme.hu'

var config = {
  port: process.env.PORT,
  logrequests: true,
  sessionSecret: process.env.SESSION_SECRET, //sensitive
  mongo: {
    path: process.env.MONGO_PATH //sensitive
  },
  oauth2: {
    authorizationURL: `${AUTH_SCH_URL}/site/login`,
    tokenURL: `${AUTH_SCH_URL}/oauth2/token`,
    userURL: `${AUTH_SCH_URL}/api/profile?access_token=`,
    id: process.env.OAUTH2_ID, //sensitive
    key: process.env.OAUTH2_KEY, //sensitive
    callbackURL: 'http://localhost:8000/auth/authsch/callback',
    scope: ['basic', 'displayName', 'mail', 'mobile', 'eduPersonEntitlement']
  },
  emailPort: process.env.EMAIL_PORT,
  emailHost: process.env.EMAIL_HOST
}

module.exports = config
