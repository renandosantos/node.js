const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', engine({
    partialsDir: ['views/partials']
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/dashboard', (req, res) => {

    const itens = ["item a", "item b", "item c"]
    
res.render('dashboard', { itens })
})

app.get('/post', (req, res) => {
    const post = {
        tittle:'Aprender Node.js',
        category:'JavaScript',
        body: 'Este artigo vai te ajudar com Node.js....',
        comments: 4,
    }

    res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            tittle:"Aprender Node.js",
            category:"JavaScript",
            body:"Teste",
            comments: 4,
        },
        {
            tittle:"Aprender PHP",
            category:"PHP",
            body:"Teste",
            comments: 4,
        },
        {
            tittle:"Aprender python",
            category:"python",
            body:"Teste",
            comments: 4,
        }
    ]
    res.render('blog', { posts })
})

app.get('/', (req, res) => {
const user = {
    name:'renan',
    surname:'santos',
    age: 24
}
const palavra = 'teste' 
const auth = true
const approved = false

    res.render('home', {user: user , palavra, auth, approved })
})

app.listen(3000, () => {
    console.log(`App funcionando na porta ${port}`)
})