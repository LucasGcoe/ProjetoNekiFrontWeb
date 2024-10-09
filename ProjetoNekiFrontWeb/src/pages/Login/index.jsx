import React, { useEffect, useState } from 'react'
import './style.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import HeaderWeb from '../../components/HeaderWeb';
import service from '../../service/service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Login() {

  const navi = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [senha, setSenha] = useState();
  const [login, setLogin] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const funcVerSenha = () => {
    setVerSenha(!verSenha);
    console.log(verSenha);
  }
  const guardarSenha = () => {
    setGuardar(!guardar);
    console.log(guardar);
  }

  useEffect(() => {
    if (localStorage.getItem("guarda") !== null) {
      setGuardar(localStorage.getItem("guarda"));
      console.log(guardar);
    }
  }, [])

  const fazerlogin = async () => {
    const log = {
      email: login,
      password: senha
    }
    await service.post("/usuario/login", log)
      .then((resposta) => {
        console.log("deu certo");
        console.log(resposta.data);
        sessionStorage.setItem("token", resposta.data.token.jwtToken);
        sessionStorage.setItem("id", resposta.data.id);
        if (guardar) {
          localStorage.setItem("token", resposta.data.token.jwtToken);
          localStorage.setItem("id", resposta.data.id);

        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        }
        console.log(guardar);
        localStorage.setItem("guarda", guardar)
        navi("/Home")
      }).catch(() => {
        console.log("erro");
        handleShow()
      })
  }

  return (
    <>
      <HeaderWeb />
      <div className='paginaLo'>
        <p>Login</p>
        <div className='cardLogiLo'>

          <div className='loginLo'>
            <p>Email</p>
            <input placeholder=' Email' className='inputsLo' onChange={(e) => setLogin(e.target.value)} />
          </div>

          <div className='senhaLo'>
            <p>Senha</p>
            <div className='inputSenhaLo'>
              <input type={!verSenha && 'password'} placeholder=' Senha' className='inputsLo' onChange={(e) => setSenha(e.target.value)} />
              <button className='botaoVerLo' onClick={funcVerSenha}>{verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}</button>
            </div>
          </div>

          <div className='guardarLo'>
            <button className='botaoGuardarLo' onClick={guardarSenha}>{guardar ? <MdCheckBox size={18} /> : <MdCheckBoxOutlineBlank size={18} />}</button>
            <p>Guardar senha</p>
          </div>

          <button className='botaoEntrarLo' onClick={fazerlogin}>Entrar</button>
          <button className='botaoCadastroLo' onClick={() => navi('/Cadastro')}>Cadastrar-se</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          Email ou senha incorretos
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login