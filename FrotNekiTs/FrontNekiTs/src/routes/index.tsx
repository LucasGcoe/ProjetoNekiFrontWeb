import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Erro from '../pages/Erro';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  return (localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null) ? element : <Navigate to="/" replace />;
};

const NonAuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  return (localStorage.getItem("token") === null && sessionStorage.getItem("token") === null) ? element : <Navigate to="/Home" replace />;
};

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/Home'
          element={<AuthRoute element={<Home />} />}
        />
        <Route
          path='/'
          element={<NonAuthRoute element={<Login />} />}
        />
        <Route
          path='/Cadastro'
          element={<NonAuthRoute element={<Cadastro />} />}
        />
        <Route path='/*' element={<Erro />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
