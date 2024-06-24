import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import AddRecipe from "./components/User/AddRecipe";
import SavedRecipe from "./components/User/SavedRecipe";
import AdminUserView from "./components/Admin/AdminUserView";
import Userprofile from "./components/Userprofile";
import AdminUserRecipes from "./components/Admin/AdminUserRecipes";
import AdminrecipeView from "./components/Admin/AdminrecipeView";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/user/:userId" element={<Userprofile/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/recipe" element={<AddRecipe />}/>
          <Route path="/savedrecipe" element={<SavedRecipe />}/>
          <Route path="/admin" element={<AdminUserView/>}/>
          <Route path="/admin/:userId" element={<AdminUserRecipes/>}/>
          <Route path="/admin/recipe" element={<AdminrecipeView/>}/>
 
        </Routes>
      </Router>
    
    </div>
  );
}
export default App;