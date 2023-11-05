import { BrowserRouter, Route,  Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
   
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>


    </>
  )
}

export default App
