import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('wallet', {
    title: 'Wallet',
    isWallet: true
  })
  //res.clearCookie('isAuth');
  //res.clearCookie('token');
  res.cookie('userInfo', { isAuth: false, age: 52, info: 'HAHAHA'});
})

export default router;