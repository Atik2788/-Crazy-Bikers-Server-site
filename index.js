const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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



    // get bikes data from database
    app.get('/bikes', async (req, res) => {
      const query = {};
      const options = await bikesCollection.find(query).toArray();
      res.send(options)
    })

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


    // post or add booking data in database
    app.post('/bookings', async(req, res)=>{
      const booking = req.body;
      // console.log(booking)
      const result = await bookingsCollection.insertOne(booking)
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