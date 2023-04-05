import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import User from "./components/User/User";
import { createContext } from "react";

const Appstate = createContext();

function App() {
  return (
    <Appstate.Provider value={{}}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/user/:id" element={<User></User>}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
