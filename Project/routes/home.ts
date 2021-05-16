import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    isHome: true
  })
  console.log(req.cookies);
  
})

router.get('/edit', (req, res) => {
  res.render('homeEdit', {
    title: 'Home',
    isHome: true
  })
})

export default router;