import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('wallet', {
    title: 'Wallet',
    isWallet: true
  })
})

export default router;