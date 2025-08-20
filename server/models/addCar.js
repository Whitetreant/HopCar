const carModel = require('../Schema/carSchema')
async function sendCar(request) {
    const data = request.data.input
    const saveCar = new carModel({
        numberPlate: data.numberPlate,
        brand: data.brand,
        model: data.model,
        note: data.note,
        year: data.year
    });
    await saveCar.save();
    console.log("Car send successfully");
}

module.exports = sendCar;
