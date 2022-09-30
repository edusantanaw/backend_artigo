const express = require('express')
const cors = require('cors')
const app = express()
const articles = require('./routes/articleRoutes')
const user = require('./routes/userRoutes')


const myOrigin = 'https://sistema-de-artigos.netlify.app'
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "*")
    app.use(cors({credentials: true, origin: `${myOrigin}`));
    next();

})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/article', articles)
app.use('/user', user)


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Programa iniciando...')
})
