const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://edusantanaw:eduardo098@cluster0.syp9xzq.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then(
        console.log('Conectado com sucesso ao MongoDB!')
    ).catch((err) => {
        console.log(err)
    })

module.exports = mongoose
