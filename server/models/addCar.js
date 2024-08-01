const carModel = require('../Schema/carSchema')
async function sendCar(request) {
    const saveCar = new carModel({
        numberPlate: request.numberPlate,
        brand: request.brand,
        model: request.model,
        note: request.note,
        year: request.year
    });
    await saveCar.save();
    console.log("Car send successfully");
}

module.exports = sendCar;
