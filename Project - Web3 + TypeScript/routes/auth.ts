import { Router } from 'express';
import { User } from '../models/user';
import { keys } from '../global/keys';
import * as bcrypt from 'bcrypt';

const router = Router();
let counter: number = 0;

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Authorization',
    isLogin: true
  });
})

router.post('/login', async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email });
    
    if (candidate) {
      if (bcrypt.compare(req.body.password, candidate['password'])) {
        res.cookie('userInfo', { isAuthenticated: true, userEmail: candidate['email']});
        res.redirect('/home');
      } else {
        res.redirect('/auth#login');
      }
    } else {
      res.redirect('/auth#login');
    }
  } catch(e) {
    console.log(e);
  } 
})

router.post('/register', async (req, res) => {
  try {
    const hashPassword: string = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
      fullName: req.body.fullName, 
      email: req.body.email, 
      password: hashPassword,
      publicKey: keys.public[counter],
      privateKey: keys.private[counter],
      transactions: []
    })

    await user.save();
    counter++;
    res.redirect('/auth#login');
  } catch (e) {
    console.log(e);
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('userInfo');
  res.redirect('/');
})

export default router;