const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// BUG 1: Missing middleware
app.use(express.json())

// BUG 2: CORS not enabled properly
app.use(cors)

mongoose.connect('mongodb://127.0.0.1:27017/testdb')
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log('Error connecting to MongoDB:',err));
const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

const User = mongoose.model('User', userSchema)

// GET USERS
app.get('/users', async (req, res) => {
    const users = await User.find
    res.json(users)
})

// ADD USER
app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    })

    await user.save
    res.send("User added")
})

// GET SINGLE USER
app.get('/users/:id', async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    res.json(user)
})

// DELETE USER
app.delete('/users/:id', async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    res.send("Deleted")
})

// BUG 3: No callback
app.listen(3000,() =>{ 
    console.log('server is running on port 3000 ');

})