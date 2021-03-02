const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('index')
  console.log(req.user)
})

module.exports = router