import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import User from "./components/User/User";
import { createContext, useState } from "react";
import UserList from "./components/User/UserList";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Appstate.Provider value={{ login, setLogin }}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/user/:id" element={<User></User>}></Route>
          <Route path="/user" element={<UserList></UserList>}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
