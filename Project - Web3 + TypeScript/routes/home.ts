import { Router } from 'express';
import { User } from '../models/user';
import { web3 } from '../global/web3';
import { auth } from '../middleware/auth';
import { UserType } from '../types/types';

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const candidate: UserType = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    
    if (candidate) {
      let balance: string = web3.utils.fromWei(await web3.eth.getBalance(candidate.publicKey));
      res.render('home', {
        title: 'Home',
        isHome: true, 
        isAuthenticated: req.cookies.userInfo.isAuthenticated, 
        privateKey: candidate.privateKey, 
        publicKey: candidate.publicKey, 
        email: candidate.email,
        fullName: candidate.fullName,
        balance: balance
      })
    } else {
      console.log('Sth gone wrong...');  
      res.redirect('/');   
    }
  } catch (e) {
    console.log(e);
  }
})

router.get('/edit', auth, async (req, res) => {
  try {
    const candidate: UserType = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    
    if (candidate) {
      res.render('homeEdit', {
        title: 'Home',
        isHome: true,
        isAuthenticated: req.cookies.userInfo.isAuthenticated,
        email: candidate.email,
        fullName: candidate.fullName
      })
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }
})

router.post('/edit', auth, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    
    if (candidate) {
      candidate['fullName'] = req.body.fullName;
      candidate['email'] = req.body.email;

      await candidate.save();
      res.redirect('/home');
    } else {
      console.log('Sth gone wrong...');
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }
})

export default router;