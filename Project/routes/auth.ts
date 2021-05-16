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

router.post('/login', async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email });
    console.log(candidate);
    
    if (candidate) {
      if (candidate['password'] === req.body.password) {
        res.cookie('userInfo', { isAuthenticated: true});
        res.redirect('/home');
      } else {
        res.redirect('/auth#login');
      }
      
    }
  } catch(e) {
    console.log(e);
  } 
})

router.post('/register', async (req, res) => {
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