const {Router} = require('express')
const User = require('../models/user')

const router = Router()

router.get('/login', async (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const {email, password} = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const isSame = candidate['password'] === password

      if (isSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        res.redirect('/')
      } else {
        res.redirect('/auth/login')
      }
    }
  } catch (e) {
    console.log(e)
    res.redirect('/auth/login')
  }
})

router.post('/register', async (req, res) => {
  console.log(req.body)

  try {
    const {name, email, password, confirm} = req.body
    const candidate = await User.findOne({ email })

    if (candidate || (password !== confirm)) {
      res.redirect('/auth/login#register')
    } else {
      const newUser = new User({email, name, password})
      await newUser.save()
      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e)
    res.redirect('/auth/login')
  }
})



module.exports = router