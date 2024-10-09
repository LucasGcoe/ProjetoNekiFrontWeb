import React, { useState } from 'react';
import './styles.css';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import HeaderWeb from '../../components/HeaderWeb';
import service from '../../service/service';
import CustomModal from '../../components/Modais';
import Button from 'react-bootstrap/Button';


const Cadastro: React.FC = () => {
  const navi = useNavigate();
  const [verSenha, setVerSenha] = useState<boolean>(false);
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [login, setLogin] = useState<string>('');

  // Modal states
  const [modalProps, setModalProps] = useState<{ show: boolean; bodyText: string }>({ show: false, bodyText: '' });

  const toggleSenhaVisibility = () => {
    setVerSenha(!verSenha);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const fazercadastro = async (): Promise<void> => {
    if (!login || !senha || !confirmarSenha) {
      setModalProps({ show: true, bodyText: 'Preencha todos os campos' });
      return;
    }

    if (!validateEmail(login)) {
      setModalProps({ show: true, bodyText: 'Email inválido' });
      return;
    }

    if (senha !== confirmarSenha) {
      setModalProps({ show: true, bodyText: 'As senhas não coincidem' });
      return;
    }

    const log = { email: login, password: senha };

    try {
      await service.post("/usuario/cadastro", log);
      setModalProps({ show: true, bodyText: 'Cadastro realizado com sucesso' });
    } catch (error) {
      setModalProps({ show: true, bodyText: 'Email já cadastrado' });
    }
  };

  return (
    <>
      <HeaderWeb />
      <div className='paginaCa'>
        <p>Cadastro</p>
        <div className='cardLogiCa'>
          <div className='loginCa'>
            <p>Email</p>
            <input 
              placeholder=' Email' 
              className='inputsCa' 
              onChange={(e) => setLogin(e.target.value)} 
            />
          </div>

          <div className='senhaCa'>
            <p>Senha</p>
            <div className='inputSenhaCa'>
              <input 
                type={verSenha ? 'text' : 'password'} 
                placeholder=' Senha' 
                className='inputsCa' 
                onChange={(e) => setSenha(e.target.value)} 
              />
              <Button className='botaoVerCa' onClick={toggleSenhaVisibility}>
                {verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
              </Button>
            </div>
          </div>

          <div className='senhaCa'>
            <p>Confirmar senha</p>
            <div className='inputSenhaCa'>
              <input 
                type={verSenha ? 'text' : 'password'} 
                placeholder=' Confirmar senha' 
                className='inputsCa' 
                onChange={(e) => setConfirmarSenha(e.target.value)} 
              />
              <Button className='botaoVerCa' onClick={toggleSenhaVisibility}>
                {verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
              </Button>
            </div>
          </div>

          <Button className='botaoCadastrarCa' onClick={fazercadastro}>
            Cadastrar
          </Button>

          <Button className='botaoLoginCa' onClick={() => navi('/')}>
            Login
          </Button>
        </div>
      </div>

      <CustomModal 
        show={modalProps.show} 
        onHide={() => setModalProps({ show: false, bodyText: '' })} 
        bodyText={modalProps.bodyText} 
      />
    </>
  );
};

export default Cadastro;
