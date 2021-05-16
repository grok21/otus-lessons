import { Router } from 'express';
import { web3 } from '../keys/web3';
import { users } from '../keys/users';

const router = Router();

router.get('/', async (req, res) => {
  const transaction = await web3.eth.getTransaction('0x57662cf4de02cd7efef181c6287b4a6e50c0a2d713e3d8f52a636dd7c44f091c');
  console.log(transaction);
  
  
  res.render('wallet', {
    title: 'Wallet',
    isWallet: true, 
    isAuthenticated: req.cookies.userInfo.isAuthenticated,
    transactions: [{
      hash: '0x57662cf4de02cd7efef181c6287b4a6e50c0a2d713e3d8f52a636dd7c44f091c',
      from: '0x15cC2f8aB46Ba6FF423D2380e7692f6D548d061d',
      to: '0xE26E316fD1Af6759BeE245651F4E864fA66d386C',
      value: 20,
    }]
  })
    
})

router.post('/', (req, res) => {
  console.log('Body: ', req.body);
  web3.eth.sendTransaction({
    from: users[0].publicKey,
    to: req.body.publicKey,
    value: req.body.value
  })
  .on('transactionHash', hash => {
    console.log(hash);
    users[0].transactions.push(hash)
  })
  .on('error', e => console.log(e))
  
  res.redirect('/wallet')
})

export default router;