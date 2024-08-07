import React, { useState } from 'react';
import axios from 'axios';
function ModalAdd() {
    const [input, setInput] = useState(
        {
            numberPlate: '',
            brand: '',
            model: '',
            note: [],
            year: '',
        });

    /**
 * Handles the search functionality for adding a car.
 * Updates the state with the input values.
 *
 * @param {Event} event - The event object from the input change event.
 * @returns {void}
 */
    function search(event) {
        let { name, value } = event.target;
        if (name === "note") {
            value = value.split(',')
        }
        setInput({
            ...input,
            [name]: value,
        });
    }

    /**
     * Adds a car to the database.
     * Displays an alert message upon successful addition.
     *
     * @param {Event} event - The event object from the button click event.
     * @returns {Promise<void>}
     */
    async function addCar(event) {
        if (!input.numberPlate || !input.brand || !input.model || !input.note || !input.year) {
            alert('Please fill all the fields');
            return;
        }

        const response = await axios.post("http://localhost:8000/addCar", { data: { input } });

        alert('Car Successfully Add to Database');
        setInput({
            numberPlate: '',
            brand: '',
            model: '',
            note: [],
            year: '',
        });
        return;
    }
    return <>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Car</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Car</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Plate Number</span>
                            <input value={input.numberPlate} name="numberPlate" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Brand</span>
                            <input value={input.brand} name="brand" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Model</span>
                            <input value={input.model} name="model" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Note</span>
                            <input value={input.note} name="note" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Year</span>
                            <input value={input.year} name="year" onChange={search} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={addCar} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>

};

export default ModalAdd;