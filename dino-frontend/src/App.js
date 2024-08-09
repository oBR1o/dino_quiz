import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthGuard, AuthProvider } from "./auth";
import config from "./config";
// import ax from "./config/ax";
import Activity from "./pages/Activity";
import AllResultAct from "./pages/AllResultAct";
import Announce from "./pages/Announce";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Member from "./pages/Member";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResultAct from "./pages/ResultAct";

function App() {

  const [home, setHome] = useState([]);

  useEffect(() => {
    const fetchClassroom = async() => {
        let result = await axios.get(`${config.apiUrlPrefix}/homePage/`)
        setHome(result.data.results)
        console.log(result.data.results)
    }
    fetchClassroom();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate replace to ="/login"/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/home' element={<AuthGuard><Home /></AuthGuard>}/>
            <Route path='/profile' element={<AuthGuard><Profile /></AuthGuard>}/>
            <Route path="/240-124/Announce" element={<AuthGuard><Announce /></AuthGuard>}/>
            <Route path="/240-124/Activity" element={<AuthGuard><Activity /></AuthGuard>}/>
            <Route path="/240-124/Member" element={<AuthGuard><Member /></AuthGuard>}/>
            <Route path="/240-124/ResultAct" element={<AuthGuard><ResultAct /></AuthGuard>}/>
            <Route path="/240-124/AllResultAct" element={<AuthGuard><AllResultAct /></AuthGuard>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
