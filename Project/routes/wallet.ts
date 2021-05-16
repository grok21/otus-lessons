import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('wallet', {
    title: 'Wallet',
    isWallet: true, 
    isAuthenticated: req.cookies.userInfo.isAuthenticated
  })
})

export default router;