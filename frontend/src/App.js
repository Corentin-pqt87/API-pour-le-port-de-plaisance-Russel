import './App.css';
import React, { useState } from "react";
import Login from './pages/Login';
import Dashboard from './pages/Dashbord';
import { BrowserRouter, Routes, Route } from "react-router-dom";


/**
 * Page d'acceuil du site
 * @returns 
 */
function App() {

  return (
    <div>
      <Login />;
    </div>
  );
}

export default App;
