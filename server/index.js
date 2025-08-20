const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const addCar = require('./models/addCar.js');
const carModel = require('./Schema/carSchema.js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = process.env;

async function connectDB() {
    try {
        await mongoose.connect(config.URI);
        console.log("Connection MongoDB Established");
    }
    catch {
        console.log('errorDB');
    }
}


app.get('/', (req, res) => {
    res.send('Landing')
}
);

app.post('/addCar', (req, res) => {
    if (!req.body) {
        return res.status(400).send('No JSON data received');
    }
    try {
        addCar(req.body);
    }
    catch {
        console.log('error in /addCar');
    }
    return res.status(200).send("Successful");
}
)

app.get('/getCar', async (req, res) => {
    try {
        const carList = await carModel.find();
        return res.status(200).json(carList);
    }
    catch (error) {
        console.log('error in /getCar', error);
    }
}
)

app.put('/updateCar', (req, res) => {
    async function updateCar(id, car) {
        await carModel.findOneAndUpdate({ _id: id }, car)
        console.log("Car updated successfully");
    }
    updateCar(req.body.data.input._id, req.body.data.input)
    return res.status(200).send("Successful");
}
)

app.delete('/deleteCar', (req, res) => {
    async function delCar(_id) {
        await carModel.findByIdAndDelete(req.body._id);
        console.log("Car delete successfully");
    }
    delCar(req.body._id)
    return res.status(200).send("Successful");
}
)

app.listen(config.PORT, () => {
    console.log(`Server is running on port : ${config.PORT}`);
    connectDB();
}
)
