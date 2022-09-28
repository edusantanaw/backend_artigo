const User = require('../../models/User')
const { existsOrError, equalsOrError, validEmail } = require('../../helper/validations')
const verifyId = require('../../helper/verifyId')
const bcrypt = require('bcrypt')
const checkExists = require('../../helper/check-exists')
const Articles = require('../../models/Articles')

module.exports = class updateUser {
    //only available for admin  updating all user data
    static async editUser(req, res) {
        const { name, email, password, confirmPassword } = req.body
        const id = req.params.id

        try {
            verifyId(id, 'O id é invalido')
            const user = await User.findOne({ _id: id })

            existsOrError(name, 'nome é invalido!')
            user.name = name

            existsOrError(email, 'email invalido!')
            validEmail(email, 'Email invalido!')

            // check if email is aready been used
            const checkEmail = await User.findOne({ email: email })

            if(checkEmail){
                let msg = 'Email ja esta sendo usado!'
                throw msg
            }
            user.email = email

            existsOrError(password, 'A senha é necessaria!')
            existsOrError(confirmPassword, 'A confirmação senha é necessaria!')
            equalsOrError(password, confirmPassword, 'Senhas diferentes!')
            user.password = password

            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )

            res.status(200).send('Usuario atualizado com sucesso!')

        } catch (msg) {
            res.status(400).send(msg)
        }

    }

    static async removeUser(req, res) {
        const id = req.params.id

        try {
            verifyId(id, 'O id é invalido!')
            const user = await User.findOne({ _id: id })
            
            checkExists(user, 'Usuario não encontrado!')

            const articles = await Articles.find()
            articles.map((articles) => {
                const userId = articles.user._id
                if (userId === id) {
                    let msg = 'Usario tem artigos!'
                    throw msg
                }
            })

            await User.findOneAndDelete({
                _id: id
            })

            res.status(201).send('Usuario excuido com sucesso!')

        } catch (msg) {
            res.status(404).send(msg)
        }
    }

    static async editPassword(req, res) {
        const id = req.params.id
        const { password, confirmPassword } = req.body

        try {
            existsOrError(password, 'Senha Invalida!')
            existsOrError(confirmPassword, 'Confirmação da senha é necessaria para a alteração!')
            equalsOrError(password, confirmPassword, 'Senha e a confirmação não conferem!')

            const user = await User.findOne({ _id: id })
            const salt = await bcrypt.genSalt(12)

            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash

            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )
            res.status(200).send('Senha alterada com sucesso!')

        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    static async editEmailAndName(req, res) {
        const id = req.params.id
        const { name, email } = req.body

        try {
            const user = await User.findOne({ _id: id })
            checkExists(user, 'Usuario não encontrado!')

            if (email) {
                validEmail(email, 'O email é invalido')
                const checkEmail = await User.findOne({ email: email })
                if (email !== user.email) {
                    if (checkEmail) {
                        let msg = 'O email já esta sendo usado!'
                        throw msg
                    }
                    user.email = email
                }
            }
            if (name) {
                existsOrError(name, 'nome invalido!')
                user.name = name
            }

            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )
            res.status(200).send('Email/nome alterados com sucesso!')

        } catch (msg) {
            res.status(400).send(msg)
        }
    }
}