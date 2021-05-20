import { Router } from 'express';
import { User } from '../models/user';
import { web3 } from '../global/web3';
import { auth } from '../middleware/auth';
import { UserType } from '../types/types';

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const candidate: UserType = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    let balance: string = web3.utils.fromWei(await web3.eth.getBalance(candidate['publicKey']));
    let comission: string = web3.utils.fromWei(await web3.eth.getGasPrice());

    if (candidate) {
      res.render('wallet', {
        title: 'Wallet',
        isWallet: true, 
        isAuthenticated: req.cookies.userInfo.isAuthenticated,
        balance: balance,
        transactions: candidate.transactions,
        comission: comission
      })
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }  
})

router.post('/', auth, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    
    if (candidate) {
      web3.eth.sendTransaction({
        from: candidate['publicKey'],
        to: req.body.publicKey,
        value: web3.utils.toWei(req.body.value)
      })
      .on('transactionHash', async (hash) => {
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
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }
})

export default router;