import './App.css';
import Table from './components/Table';
import React, { useState } from "react";

function App() {

  return (
    <div>
      <h1>Welcome to HopCar!</h1>
      <p>This is a simple app to manage your car inventory.</p>
      <Table></Table>
    </div >

  );
}

export default App;
