import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import HeaderWeb from '../../components/HeaderWeb';
import service from '../../service/service';
import LoginModal from '../../components/Modais/LoginModal';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login: React.FC = () => {
  const navi = useNavigate();
  const [verSenha, setVerSenha] = useState<boolean>(false);
  const [guardar, setGuardar] = useState<boolean>(false);
  const [senha, setSenha] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleVerSenha = () => {
    setVerSenha(prev => !prev);
  };

  const toggleGuardar = () => {
    setGuardar(prev => !prev);
  };

  useEffect(() => {
    const guarda = localStorage.getItem("guarda");
    if (guarda) {
      setGuardar(guarda === 'true');
    }
  }, []);

  const fazerLogin = async () => {
    const log = {
      email: login,
      password: senha,
    };

    try {
      const resposta = await service.post("/usuario/login", log);
      console.log("Login realizado com sucesso", resposta.data);
      
      sessionStorage.setItem("token", resposta.data.token.jwtToken);
      sessionStorage.setItem("id", resposta.data.id);

      if (guardar) {
        localStorage.setItem("token", resposta.data.token.jwtToken);
        localStorage.setItem("id", resposta.data.id);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
      }

      localStorage.setItem("guarda", JSON.stringify(guardar));
      navi("/Home");
    } catch (error) {
      console.error("Erro ao realizar login", error);
      handleShow();
    }
  };

  return (
    <>
      <HeaderWeb />
      <div className='paginaLo'>
        <p>Login</p>
        <LoginForm
          login={login}
          senha={senha}
          verSenha={verSenha}
          guardar={guardar}
          setLogin={setLogin}
          setSenha={setSenha}
          toggleVerSenha={toggleVerSenha}
          toggleGuardar={toggleGuardar}
        />
        <button className='botaoEntrarLo' onClick={fazerLogin}>Entrar</button>
        <button className='botaoCadastroLo' onClick={() => navi('/Cadastro')}>Cadastrar-se</button>
      </div>
      <LoginModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Login;
