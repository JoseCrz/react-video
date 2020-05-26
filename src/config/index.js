require('dotenv').config()

const config = {
  DEV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT || 3000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
}

module.exports = config