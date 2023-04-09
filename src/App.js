import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import User from "./components/User/User";
import { createContext, useState } from "react";
import UserList from "./components/User/UserList";
import { auth } from "./firebase/FireApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthProvider from "./context/AuthProvider";
import ChatApp from "./components/Chat/ChatApp";
import ChatUI from "./components/Chat/ChatUI";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [user] = useAuthState(auth);
  if (user) {
    console.log("App JS: " + user);
    console.log("App JS:" + user.email);
    console.log("App JS:" + user.displayName);
  }
  return (
    <AuthProvider>
      <Appstate.Provider value={{ login, setLogin }}>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/user/:id" element={<User></User>}></Route>
            <Route path="/chat" element={<ChatApp></ChatApp>}></Route>
            <Route path="/chat2" element={<ChatUI></ChatUI>}></Route>
            <Route path="/user" element={<UserList></UserList>}></Route>
          </Routes>
        </div>
      </Appstate.Provider>
    </AuthProvider>
  );
}

export default App;
export { Appstate };
