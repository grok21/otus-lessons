const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())

const publicVapidKey = "BMxutJUhidJV7vcz_s5JKYOadv9Jp45Fm4BHn0dGcWtbogaXMCQB112AidBTfyzEB6ewNIlJDPUx_NedeucpeiA"
const privateVapidKey = "6-zHDyTxuqfA8dvRmZ-Zhz5lzRQwK_iPbZrIRbRO568"

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res) => {
  const subcscription = req.body
  console.log(subcscription)

  res.status(201).json({})

  const payload = JSON.stringify({title: "Push test"})

  webpush.sendNotification(subcscription, payload)
    .catch(err => console.log(err))
})

const port = 3000

app.listen(port, () => console.log(`Server has been started on port ${port}...`))