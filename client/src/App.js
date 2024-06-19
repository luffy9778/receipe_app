import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Register";
import "./App.css"
import AddRecipe from "./components/AddRecipe";
import { useState } from "react";
import SavedRecipe from "./components/SavedRecipe";
import AdminUserView from "./components/AdminUserView";
function App() {
  const [search,setSearch]=useState('')
  const [navSearch,setnavSearch]=useState(true)
  return (
    <div className="App">
      <Router>
        <Nav search={search}
        setSearch={setSearch}
        navSearch={navSearch}/>
        <Routes>
          <Route path="/" element={<Home search={search} setnavSearch={setnavSearch}/>}/>
          <Route path="/login" element={<Login setnavSearch={setnavSearch}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/recipe" element={<AddRecipe setnavSearch={setnavSearch}/>}/>
          <Route path="/savedrecipe" element={<SavedRecipe setnavSearch={setnavSearch}/>}/>
          <Route path="/user" element={<AdminUserView/>}/>
        </Routes>
      </Router>
    
    </div>
  );
}
export default App;