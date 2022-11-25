const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config();
const port = process.env.PORT || 5000

const app = express()

// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ev4byy.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

  try{
    const bikesCollection = client.db('CrazyBikers').collection('bikes')
    const categoryCollection = client.db('CrazyBikers').collection('category')



    app.get('/bikes', async(req, res) =>{
      const query = {};
      const options = await bikesCollection.find(query).toArray();
      res.send(options)
    })

    app.get('/category', async(req, res) =>{
      const query = {};
      const options = await categoryCollection.find(query).toArray();
      res.send(options)
    })


  }




  finally{

  }
}



run().catch(error => console.error(error))


app.get('/', async (req, res) => {
  res.send('crazy bikes running')
})


app.listen(port, () => console.log(`Crazy Bikes running on port ${port}`))