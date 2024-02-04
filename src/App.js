import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./components/Demo";
import People from "./components/People";

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <People />
          } />
        </Routes>
      </BrowserRouter>
      <Demo />
    </div>
  );
}
