import "./App.css";
import React, { useState } from "react";
import Demo from "./components/Demo";
import People from "./components/People";

export default function App() {

  return (
    <div className="App">
      <People/>
      <Demo/>
    </div>
  );
}
