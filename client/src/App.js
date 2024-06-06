import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Resecipe from "./components/Resceipe";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/resceipe" element={<Resecipe/>}/>
        </Routes>
      </Router>
    
    </div>
  );
}
export default App;