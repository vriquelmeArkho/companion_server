require('dotenv').config()
const companion = require('@uppy/companion')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

app.use(bodyParser.json())
app.use(session({
  secret: process.env.COMPANION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// Add root route
app.get('/', (req, res) => {
  res.send('Companion server is running!')
})

const options = {
  providerOptions: {
    drive: {
      key: process.env.COMPANION_GOOGLE_KEY,
      secret: process.env.COMPANION_GOOGLE_SECRET
    },
    dropbox: {
      key: process.env.COMPANION_DROPBOX_KEY,
      secret: process.env.COMPANION_DROPBOX_SECRET
    },
    onedrive: {
      key: process.env.COMPANION_ONEDRIVE_KEY,
      secret: process.env.COMPANION_ONEDRIVE_SECRET
    }
  },
  server: {
    host: process.env.COMPANION_DOMAIN,
    protocol: process.env.COMPANION_PROTOCOL || 'https'
  },
  filePath: process.env.COMPANION_DATADIR || '/tmp/uploads',
  secret: process.env.COMPANION_SECRET,
  debug: true,
  corsOrigins: process.env.COMPANION_CLIENT_ORIGINS ? process.env.COMPANION_CLIENT_ORIGINS.split(',') : ['*'],
  uploadUrls: [process.env.COMPANION_DOMAIN]
}

const { app: companionApp } = companion.app(options)
app.use(companionApp)

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Companion server listening on port ${PORT}`)
}) 