const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const addCar = require('./models/addCar.js');
const carModel = require('./Schema/carSchema.js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;
const config = process.env;

async function connectDB(){
    try{
        await mongoose.connect(config.URI);
        console.log("Connection MongoDB Established");
    }
    catch{
        console.log('errorDB');
    }
}


app.get('/', (req, res) => {
    res.send('Hello World')
}
);

app.post('/addCar', (req, res) => {
    if (!req.body) {
        console.log(res.statusCode)
        return res.status(400).send('No JSON data received');
      }
    try{
        addCar(req.body);
    }
    catch{
        console.log('error in /addCar');
    }
    return res.status(200).send("Successful");
}
)

app.get('/getCar', (req, res) => {
    async function getCar() {
    try {
        const carList = await carModel.find();
        res.json(carList);
      }
    catch{
        console.log('error in /getCar');
    }
    }
    getCar()
}
)

app.put('/updateCar', (req, res) => {
    async function updateCar(id, car){
        await carModel.findOneAndUpdate({_id: id}, car)
        console.log("Car updated successfully");
    }
    updateCar(req.body._id, req.body.Data)
}
)

app.delete('/deleteCar', (req, res) => {
    async function delCar(_id){
        await carModel.findByIdAndDelete(req.body._id);    
        console.log("Car delete successfully");
    }
    delCar(req.body._id)
}
)

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    connectDB();
}
)
