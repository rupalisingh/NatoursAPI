const fs = require("fs");
const express = require("express");

const app = express();

//MiddleWare
app.use(express.json());

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

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  //console.log(req.body)
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
