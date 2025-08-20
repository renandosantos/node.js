const express = require('express') 
const {engine} = require('express-handlebars') 
const conn = require('./db/conn')
const port = 3000 

const user = require('./models/user')

const app = express() 

app.use(express.urlencoded({
        extended: true 
    })
)

app.use(express.json()) 

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars') 

app.use(express.static('public')) 

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    console.log(req.body)

    await user.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const User = await user.findOne({raw: true, where: { id: id } })

    res.render('userview', { User })
})

app.get('/', async (req, res) => {
    
    const users = await user.findAll({ raw: true })
    
    console.log(users)

    res.render('home', {users: users}) 
})


conn.sync().then(() => {
    app.listen(3000, ()=> { 
    console.log(`APP rodando na porta ${port}`) 
    })
})
.catch((err) => console.log(err))
