
const express = require('express')
const app = express()
app.listen(3000, () => console.log('listening on port 3000'))

const Address = require('./model/models')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extnded: false }))

//old use mongoose now
//const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://username:password1234@cluster0.z4dn6.mongodb.net/addressbook?retryWrites=true&w=majority'

const mongoose = require('mongoose')

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db'))
    .catch((er) => console.error(err))

//adding user to the address book
app.post('/', (req, res) => {
    console.log(req.body)
    name = req.body.name
    email = req.body.email
    phone = req.body.phone
    place = req.body.place

    let newAddress = new Address({
        name: name,
        email: email,
        phone: phone,
        place: place
    })

    newAddress.save()
        .then((address) => res.send(address))
        .catch(err => console.error(err))


})

app.get('/:id', (req, res) => {
    Address.findById(req.params.id, (err, address) => {
        res.send(address)
    })
        .catch(err => console.error(err))
})

app.put('/update/:id', (req, res) => {
    let address = {}

    if (req.body.name) address.name = req.body.name
    if (req.body.phone) address.phone = req.body.phone
    if (req.body.email) address.email = req.body.email
    if (req.body.place) address.palce = req.body.palce

    address = { $set: address }

    Address.update({ _id: req.params.id}, address )
        .then(() => res.send(address))
        .catch(err => console.error(err))
})

app.delete('/delete/:id', (req, res) => {
    Address.remove({ _id: req.params.id })
        .then(res.send('user deleted'))
        .catch(err => console.error(err))
})

