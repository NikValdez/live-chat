const Pusher = require('pusher')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const pusher = new Pusher({
  appId: '540269',
  key: '28982d94b53fc029355e',
  secret: '0b0e2862458c3bb11b81',
  cluster: 'us2',
  encrypted: true
})
app.set('PORT', process.env.PORT || 5000)

app.post('/message', (req, res) => {
  const payload = req.body
  pusher.trigger('chat', 'message', payload)
  res.send(payload)
})

app.listen(app.get('PORT'), () =>
  console.log('Listening at ' + app.get('PORT'))
)
