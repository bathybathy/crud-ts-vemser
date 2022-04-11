import { BrowserRouter, Routes, Route } from "react-router-dom"

import './Routers.css'
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Users from "./pages/users/Users"
import Address from "./pages/address/Address"
import NotFound from "./pages/notFound/NotFound"
import AuthProvider from "./context/AuthContext"

function Routers() {
  return (
    <div className={'fullPage'}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='*' element={ <NotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/users' element={<Users /> } />
            <Route path='/address' element={ <Address /> } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default Routers