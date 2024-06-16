import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import "./App.css"
import AddRecipe from "./components/AddRecipe";
import { useState } from "react";
import SavedRecipe from "./components/SavedRecipe";
function App() {
  const [search,setSearch]=useState('')
  return (
    <div className="App">
      <Router>
        <Nav search={search}
        setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<Home search={search}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/recipe" element={<AddRecipe/>}/>
          <Route path="/savedrecipe" element={<SavedRecipe/>}/>
        </Routes>
      </Router>
    
    </div>
  );
}
export default App;