import './App.css';
import './pages/Login';
import React, { useState } from "react";
import { login } from "./services/api";
import Login from './pages/Login';

function App() {

  return (
    <div>
      <Login />;
    </div>
  );
}

export default App;
