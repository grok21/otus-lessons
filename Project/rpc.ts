//import keys from './keys/keys'
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import Web3 from 'web3';

import homeRoutes from './routes/home';
import walletRoutes from './routes/wallet';
import authRoutes from './routes/auth';


//console.log(keys);

const app = express();
app.use(cookieParser())

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs', 
  allowProtoMethodsByDefault: true, 
  allowProtoPropertiesByDefault: true
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/home', homeRoutes);
app.use('/wallet', walletRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main page',
    isAuthenticated: req.cookies.userInfo.isAuthenticated
  });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));


//const web3: any = new Web3("http://127.0.0.1:8545");

//web3.eth.getAccounts().then(a => console.log(a))
