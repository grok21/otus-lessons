const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')

mongoose.connect('mongodb://localhost/my-courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const db = mongoose.connection

db.on('error', err => console.error(err.message))
db.once('open', () => console.info("Connected to MongoDB!"))

const app = express()

// Creating handlebars engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs', 
    allowProtoMethodsByDefault: true, 
    allowProtoPropertiesByDefault: true
})

// Handlebars configuring
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))

// Routes 
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))