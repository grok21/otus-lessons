import { Router } from 'express';
import { users } from '../keys/users';
import { web3 } from '../keys/web3'

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    isHome: true, 
    isAuthenticated: req.cookies.userInfo.isAuthenticated, 
    privateKey: users[0].privateKey, 
    publicKey: users[0].publicKey, 
    email: users[0].email,
    fullName: users[0].fullName,
    balance: users[0].balance
  })
  console.log(req.cookies);
  web3.eth.getAccounts().then(a => console.log(a))
  
})

router.get('/edit', (req, res) => {
  res.render('homeEdit', {
    title: 'Home',
    isHome: true,
    isAuthenticated: req.cookies.userInfo.isAuthenticated,
    email: users[0].email,
    fullName: users[0].fullName
  })
})

router.post('/edit', (req, res) => {
  console.log('Body: ', req.body);
  res.redirect('/home');
})

export default router;