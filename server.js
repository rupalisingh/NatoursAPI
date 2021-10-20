const app = require('./app')


//4) Start Server

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
