const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const io = require('socket.io')(3100)
const mongoose = require('mongoose')

app.use(bodyParser.json())

// collections
const Users = require('./UserModel')

// database connection

mongoose.connect('mongodb+srv://zidiks:Karambatv123@cluster0.yvl9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true},
    function(err){
        if(err){
            throw err
        }
        console.log('Database connected')
        
        io.on('connection',(socket)=>{
            console.log('user connected')
            socket.on('joinRoom',(data)=>{
                console.log('user joined room')
                socket.join(data.myID)          

            })

        })

        Users.watch().on('change',(change)=>{
            console.log('Something has changed')
            io.to(change.fullDocument._id).emit('changes',change.fullDocument)
        })

})