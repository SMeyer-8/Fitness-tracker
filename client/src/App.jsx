import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AllActiviteies } from "../src/Components/AllActiviteies";


import "./App.css";

function App() {
 return (
   <div className="App">
     <header className="header">
       <h1>FITNESS APP</h1>
       <Link to="/activities">Activities</Link>
     </header>
   </div>
 );
}

export default App;
