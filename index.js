const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000

const app = express()

// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ev4byy.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

  try {
    const bikesCollection = client.db('CrazyBikers').collection('bikes')
    const categoryCollection = client.db('CrazyBikers').collection('category')
    const bookingsCollection = client.db('CrazyBikers').collection('bookings')
    const usersCollection = client.db('CrazyBikers').collection('users')

    const blogsCollection = client.db('CrazyBikers').collection('blogs')



    // ***************************  bikes  ***************************
    // ***************************  bikes  ***************************

    // get bikes data from database
    app.get('/bikes', async (req, res) => {
      const query = {};
      const options = await bikesCollection.find(query).toArray();
      res.send(options)
    })

    // post bike from add bike in database
    app.post('/bikes', async (req, res) => {
      const bike = req.body;
      const result = await bikesCollection.insertOne(bike)
      res.send(result)
    })

    // get bikes data by email
    app.get('/bikesemail', async (req, res) => {
      const userEmail = req.query.email;
      const query = { email: userEmail }
      const bikes = await bikesCollection.find(query).toArray()
      res.send(bikes)
    })

    // post booking info in bike data
    app.put('/bikes/:id', async(req, res)=>{

      const id = req.params.id;
      console.log(id);
      const filter = {_id: ObjectId(id)}
      const options = { upsert: true };
      const updatedDoc = {
          $set: {
              status: 'booked',
              // transactionId: payment.transactionId
          }
      }
      const updatedResult = await bikesCollection.updateOne(filter, updatedDoc, options)

      res.send(updatedResult)
  })

    // post booking info in bike data
    app.put('/bikesAdvertise/:id', async(req, res)=>{

      const id = req.params.id;
      console.log(id);
      const filter = {_id: ObjectId(id)}
      const options = { upsert: true };
      const updatedDoc = {
          $set: {
              status: 'advertised',
              // transactionId: payment.transactionId
          }
      }
      const updatedResult = await bikesCollection.updateOne(filter, updatedDoc, options)

      res.send(updatedResult)
  })


    // ***************************  category  ***************************
    // ***************************  category  ***************************

    // get category data from database
    app.get('/category', async (req, res) => {
      const query = {};
      const options = await categoryCollection.find(query).toArray();
      res.send(options)
    })

    // get bikes data by category name from database
    app.get('/bikes/:category', async (req, res) => {
      const categoryName = req.params.category;
      const query = { category: categoryName }
      const result = await bikesCollection.find(query).toArray()
      res.send(result)
    })


    // ***************************  bookings  ***************************
    // ***************************  bookings  ***************************

    // get bookings data in database by email
    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const bookings = await bookingsCollection.find(query).toArray()
      res.send(bookings)
    })

    // post or add booking data in database
    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      // console.log(booking)
      const result = await bookingsCollection.insertOne(booking)
      res.send(result)
    })


    // post or add user information in database
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })


    // get question for blog from database
    app.get('/blogs', async (req, res) => {
      const query = {}
      const result = await blogsCollection.find(query).toArray()
      res.send(result)
    })

  }




  finally {

  }
}



run().catch(error => console.error(error))


app.get('/', async (req, res) => {
  res.send('crazy bikes running')
})


app.listen(port, () => console.log(`Crazy Bikes running on port ${port}`))