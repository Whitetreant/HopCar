import React, { useState } from 'react';
import axios from 'axios';
function ModalEdit(props) {
    const [input, setInput] = useState(
        {
            _id: props._id,
            numberPlate: '',
            brand: '',
            model: '',
            note: [],
            year: '',
        });

    /**
 * Handles the search functionality for editing car details.
 * Updates the state with the input values.
 *
 * @param {Event} event - The event object from the input field change.
 * @param {Object} props - The props passed to the component.
 * @param {string} props._id - The unique identifier of the car.
 * @param {Object} input - The current state of the input fields.
 * @param {Function} setInput - The function to update the input state.
 */
    function search(event) {
        let { name, value } = event.target;
        if (name === "note") {
            value = value.split(',')
        }
        setInput({
            ...input,
            [name]: value,
            _id: props._id
        });
    }

    /**
     * Handles the edit car functionality.
     * Validates the input fields and sends a PUT request to the server.
     *
     * @param {Event} event - The event object from the button click.
     * @param {Object} input - The current state of the input fields.
     * @returns {Promise<void>}
     */
    async function editCar(event) {
        if (!input.numberPlate || !input.brand || !input.model || !input.note || !input.year) {
            alert('Please fill all the fields');
            return;
        }

        const response = await axios.put("http://localhost:8000/updateCar", { data: { input } });

        alert('Car Successfully Added to Database');
        setInput({
            _id: '',
            numberPlate: '',
            brand: '',
            model: '',
            note: [],
            year: '',
        });
        return;
    }
    return <>


        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Car number {props.index}</h5>
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
                        <button onClick={editCar} type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div >
    </>

};

export default ModalEdit;