import './App.css';
import axios from 'axios'
import Table from './components/Table';
import { useState } from "react";
function App() {
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

  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>Welcome to HopCar!</h1>
      <p>This is a simple app to manage your car inventory.</p>
      <button onClick={() => getData()}>Add Car</button>
      <button>Refresh</button>
      <Table data={data}></Table>
    </div >
  );
}


export default App;
