const mongoose = require('mongoose');

const connect  = ()=>{
    const con = mongoose.connect('mongodb+srv://sparkstoideasdev4:cIUfWwygFLIvNVIZ@cluster0.vvexfby.mongodb.net/annie')
    .then(()=>{
        console.log('DB Connect successfuly')
    })
    .catch((err)=>{
        console.log('Error in db connection' , err)
    })
}

module.exports = connect ;