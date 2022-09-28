const checkExists = require('../../helper/check-exists')
const verifyId = require('../../helper/verifyId')
const Articles = require('../../models/Articles')
const Categories = require('../../models/Category')
const User = require('../../models/User')

const getArticles = async (req, res) => {
    try {
        const articles = await Articles.find()
        checkExists(articles, 'Nenhum artigo encontrado!')
        res.json(articles)
    } catch (msg) {
        res.status(400).send(msg)
    }

}

const getArticlesById = async (req, res) => {
    const id = req.params.id

    try {
        verifyId(id, 'ID invalido')
        const article = await Articles.findOne({_id: id})
        checkExists(article, 'Nnhum artigo encontrado!')
        res.json(article)

    } catch (msg) {
        res.status(400).send(msg)
    }
}

const getArticlesByCategory = async (req, res)=>{

    const category = req.params.name
    try{
        checkExists(category, 'A categoria é necessaria!')
        const Category = await Categories.findOne({name: category})
        if(!Category){
            let msg = "Esta categoria não existe"
            throw msg
        }
        const articles = await Articles.find({category: category})
        if(articles.length === 0){
            let msg = 'Nenhum artigo encontrado!'
            throw msg
        }
        res.json(articles)

    }catch(msg){
        res.status(400).send(msg)
    }


}

const getArticlesByUser = async (req, res) =>{
    const id = req.params._id
    try{
        verifyId(id)
        const articles = await Articles.find({})
        const articlesFilter = await articles.filter(article=> article.user._id === id)
        console.log(articlesFilter)
        if(articlesFilter.length == 0){
            let msg = "Nenhum artigo encontrado!"
            throw msg
        }
        res.status(200).send(articlesFilter)

    } catch(msg){
        res.status(401).send(msg)
    }
}

module.exports = {getArticles, getArticlesById, getArticlesByCategory, getArticlesByUser}