const fs = require('fs')
const express = require('express')

const app = express()

// app.get('/', (req,res) => {
// res.status(200).send('Hello from the server')
// })

//sending a json file

// app.get('/', (req,res) => {
//     res.status(200).json({message : 'Hello from the server', app : 'Natours-udemy'})
//     })
   
// app.post('/', (req, res) => {
//     res.send("You can post this to endpoint....")
// })

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))

app.get('/api/v1/tours', (req,res) => {
res.status(200).json({
    status : 'success',
    results : tours.length,
    data : {
        tours : tours
    }
})
})

const port = 3000

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

