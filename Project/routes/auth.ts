import { Router } from 'express';
import { users } from '../keys/users';
import { User } from '../models/user';

const router = Router();

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Authorization',
    isLogin: true
  });
})

router.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.email === users[0].email && req.body.password === users[0].password) {
    console.log('OK');
    res.cookie('userInfo', { isAuthenticated: true, age: 52, info: 'HAHAHA'});
    res.redirect('/home');
  } else {
    console.log('Not OK');
    res.redirect('/auth#login');
  }
})

router.post('/register', async (req, res) => {
  console.log(req.body);

  try {
    const user = new User({
      fullName: req.body.fullName, 
      email: req.body.email, 
      password: req.body.password,
      publicKey: users[0].publicKey,
      privateKey: users[0].privateKey,
      transactions: []
    })

    await user.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('userInfo');
  res.redirect('/');
})


export default router;