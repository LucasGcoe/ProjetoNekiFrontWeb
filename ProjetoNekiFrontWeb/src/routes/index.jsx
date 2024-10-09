import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Erro from '../pages/Erro'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

function AppRouter() {

  const AuthRoute = ({ element }) => {
    return localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null ? element : <Navigate to="/" replace />;
  };

  const NonAuthRoute = ({ element }) => {
    return localStorage.getItem("token") == null || sessionStorage.getItem("token") == null ? element : <Navigate to="/Home" replace />;
  };


  return (
    <div>
      <Routes>
        <Route
          path='/Home'
          element={<AuthRoute element={<Home />} />}></Route>


        <Route
          path='/'
          element={<NonAuthRoute element={<Login />} />}></Route>

        <Route
          path='/Cadastro'
          element={<NonAuthRoute element={<Cadastro />} />}></Route>

        <Route path='/*' element={<Erro />}></Route>
      </Routes>
    </div>
  )
}
export default AppRouter
