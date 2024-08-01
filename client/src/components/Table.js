import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";

function Table(props) {
    const [data, setData] = useState([]);
    const [id, setId] = useState({ _id: "", index: 0 });
    async function getData() {
        try {
            const response = await axios.get('http://localhost:8000/getCar')
            setData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function delCar(_id) {
        try {
            const response = await axios.delete("http://localhost:8000/deleteCar", { data: { _id } });
            await getData();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <ModalAdd> </ModalAdd>
            <ModalEdit _id={id._id} index={id.index}> </ModalEdit>
            <button onClick={getData}>Refresh</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Number Plate</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Note</th>
                        <th scope="col">Year</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((Car, index) => (
                        <tr key={Car._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{Car.numberPlate}</td>
                            <td>{Car.brand}</td>
                            <td>{Car.model}</td>
                            <td>{Car.note.join(', ')}</td>
                            <td>{Car.year}</td>
                            <td><button onClick={() => setId({ _id: Car._id, index: index + 1 })} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">Edit Car</button></td>
                            <td><button onClick={() => delCar(Car._id)}>X</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table;