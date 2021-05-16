import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Authorization',
    isLogin: true
  });
})

router.post('/login', (req, res) => {
  console.log(req.body);
  
})

router.get('/logout', (req, res) => {
  res.clearCookie('userInfo');
  res.redirect('/');
})


export default router;