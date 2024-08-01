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

    async function editCar(event) {
        console.log(input)
        if (!input.numberPlate || !input.brand || !input.model || !input.note || !input.year) {
            alert('Please fill all the fields');
            return;
        }

        const response = await axios.put("http://localhost:8000/updateCar", { data: { input } });

        alert('Car Successfully Add to Database');
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
                            <input name="numberPlate" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Brand</span>
                            <input name="brand" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Model</span>
                            <input name="model" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Note</span>
                            <input name="note" onChange={search} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Year</span>
                            <input name="year" onChange={search} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
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