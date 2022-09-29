const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://edusantanaw:eduardo098@cluster0.syp9xzq.mongodb.net/?retryWrites=true&w=majority')
    .then(
        console.log('Conectado com sucesso ao MongoDB!')
    ).catch((err) => {
        console.log(err)
    })

module.exports = mongoose
