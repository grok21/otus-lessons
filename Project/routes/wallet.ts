import { Router } from 'express';
import { web3 } from '../keys/web3';
import { users } from '../keys/users';
import { User } from '../models/user';


const router = Router();

router.get('/', async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    console.log(candidate['transactions']);
    
    if (candidate) {
      res.render('wallet', {
        title: 'Wallet',
        isWallet: true, 
        isAuthenticated: req.cookies.userInfo.isAuthenticated,
        transactions: candidate['transactions']
      })
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/')
    }
  } catch (e) {
    console.log(e);
  }
  
  
  /*
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
  */
    
})

router.post('/', async (req, res) => {
  console.log('Body: ', req.body);
  
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    
    if (candidate) {
      web3.eth.sendTransaction({
        from: candidate['publicKey'],
        to: req.body.publicKey,
        value: req.body.value
      })
      .on('transactionHash', async (hash) => {
        console.log(hash);
        candidate['transactions'].push({
          hash: hash,
          from: candidate['publicKey'],
          to: req.body.publicKey,
          value: req.body.value
        })
        
        await candidate.save();
      })
      .on('error', e => console.log(e))
      
      res.redirect('/wallet')
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/')
    }
  } catch (e) {
    console.log(e);
  }
})

export default router;