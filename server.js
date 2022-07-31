const express = require('express')
const app = express()
const cors = require('cors')
const distDir = __dirname + "/dist/";
 app.use(express.static(distDir));
 app.use(cors())

const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const MongoClient = require('mongodb').MongoClient


// create a db connection
MongoClient.connect(`mongodb+srv://${username}:${password}@cluster0.7lkx5.mongodb.net/?retryWrites=true&w=majority`)
.then(client => {
    const db = client.db('BillTrack')
    const billsCollection = db.collection('bills')
    console.log(`Connected to the database!`)
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))//this reads the html
    app.use(bodyParser.json())//returns json
    app.use(express.static('public'))
    
    
    app.get('/', (request, response) => {
        billsCollection.find().toArray()
            .then(results => {
                response.render('index.ejs', {info : results})
            })
            .catch(err => console.error(err))
    })
    
    app.post('/bills', (request, response) => {// POST (CREATE) request
        billsCollection.insertOne(request.body)//inserting the data into the db table (bills table)
            .then(result => {
                console.log(result)
                response.redirect('/')// after the the creation of the quote, we will redirect back to the root page '/'
            })
            .catch(err => console.error(err))
    })

    app.delete('/deleteBill', (request, response) => {
        db.collection('bills').deleteOne({billName: request.body.billNameS})
        .then(result => {
            console.log(`bill Deleted`)
            response.json('bill Deleted')
        })
        .catch(error => console.error(error))
    
    })
})

.catch(err => console.error(err))



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}. You better go catch it.`)
})