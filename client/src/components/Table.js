import React from "react";
import axios from 'axios';
import { useState } from "react";

function Table(props) {
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getCar')
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button onClick={getData}>Get Data</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">numberPlate</th>
                        <th scope="col">brand</th>
                        <th scope="col">model</th>
                        <th scope="col">note</th>
                        <th scope="col">year</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Del</th>
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
                            <td><button onClick={() => console.log(Car._id)}>Edit</button></td>
                            <td><button>X</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table;