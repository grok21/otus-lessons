import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import Web3 from 'web3';

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs', 
  allowProtoMethodsByDefault: true, 
  allowProtoPropertiesByDefault: true
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))

console.log('CREATED');



//const web3: any = new Web3("http://127.0.0.1:8545");

//web3.eth.getAccounts().then(a => console.log(a))
