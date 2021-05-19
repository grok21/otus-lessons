import { Router } from 'express';
import { web3 } from '../keys/web3';
import { users } from '../keys/users';
import { User } from '../models/user';


const router = Router();

router.get('/', async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    let balance = await web3.eth.getBalance(candidate['publicKey']);
    balance = web3.utils.fromWei(balance);
    let comission = await web3.eth.getGasPrice();
    comission = web3.utils.fromWei(comission);

    if (candidate) {
      res.render('wallet', {
        title: 'Wallet',
        isWallet: true, 
        isAuthenticated: req.cookies.userInfo.isAuthenticated,
        balance: balance,
        transactions: candidate['transactions'],
        comission: comission
      })
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/')
    }
  } catch (e) {
    console.log(e);
  }  
})

router.post('/', async (req, res) => {
  console.log('Body: ', req.body);
  
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    
    if (candidate) {
      web3.eth.sendTransaction({
        from: candidate['publicKey'],
        to: req.body.publicKey,
        value: web3.utils.toWei(req.body.value)
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