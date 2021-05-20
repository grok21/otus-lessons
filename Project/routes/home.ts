import { Router } from 'express';
import { User } from '../models/user';
import { web3 } from '../keys/web3';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    let balance: string = web3.utils.fromWei(await web3.eth.getBalance(candidate['publicKey']));
    res.render('home', {
      title: 'Home',
      isHome: true, 
      isAuthenticated: req.cookies.userInfo.isAuthenticated, 
      privateKey: candidate['privateKey'], 
      publicKey: candidate['publicKey'], 
      email: candidate['email'],
      fullName: candidate['fullName'],
      balance: balance
    })
  } catch (e) {
    console.log(e);
  }
})

router.get('/edit', auth, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail }).lean();
    
    res.render('homeEdit', {
      title: 'Home',
      isHome: true,
      isAuthenticated: req.cookies.userInfo.isAuthenticated,
      email: candidate['email'],
      fullName: candidate['fullName']
    })
  } catch (e) {
    console.log(e);
  }
})

router.post('/edit', auth, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.cookies.userInfo.userEmail });
    
    candidate['fullName'] = req.body.fullName;
    candidate['email'] = req.body.email;

    await candidate.save()
  } catch (e) {
    console.log(e);
  }
  
  res.redirect('/home');
})

export default router;