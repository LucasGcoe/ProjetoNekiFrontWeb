import React, { useState } from 'react'
import './style.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import HeaderWeb from '../../components/HeaderWeb';
import service from '../../service/service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Cadastro() {

  const navi = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const [login, setLogin] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
    navi('/')
  }
  const handleShow2 = () => setShow2(true);

  const funcVerSenha = () => {
    setVerSenha(!verSenha);
    console.log(senha);
  }

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  function validateEmail(login) {
    let res = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return res.test(login);
  }

  const fazercadastro = async () => {
    console.log(login);
    console.log(senha);
    console.log(confirmarSenha);
    if (login == undefined || senha == undefined || confirmarSenha == undefined || login == '' || senha == '' || confirmarSenha == '') {
      handleShow4()
      return;
    }
    if (!validateEmail(login)) {
      handleShow5();
      return;
    }
    if (senha === confirmarSenha) {
      console.log("senhas iguais");
      const log = {
        email: login,
        password: senha
      }
      await service.post("/usuario/cadastro", log)
        .then((resposta) => {
          console.log("deu certo");
          handleShow2()
        }).catch(() => {
          handleShow3()
          console.log("erro");
        })

    } else {
      handleShow()
    }
  }

  return (
    <>
      <HeaderWeb />
      <div className='paginaCa'>
        <p>Cadastro</p>
        <div className='cardLogiCa'>

          <div className='loginCa'>
            <p>Email</p>
            <input placeholder=' Email' className='inputsCa' onChange={(e) => setLogin(e.target.value)} />
          </div>

          <div className='senhaCa'>
            <p>Senha</p>
            <div className='inputSenhaCa'>
              <input type={!verSenha && 'password'} placeholder=' Senha' className='inputsCa' onChange={(e) => setSenha(e.target.value)} />
              <button className='botaoVerCa' onClick={funcVerSenha}>{verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}</button>
            </div>
          </div>

          <div className='senhaCa'>
            <p>Confirmar senha</p>
            <div className='inputSenhaCa'>
              <input type={!verSenha && 'password'} placeholder=' Confirmar senha' className='inputsCa' onChange={(e) => setConfirmarSenha(e.target.value)} />
              <button className='botaoVerCa' onClick={funcVerSenha}>{verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}</button>
            </div>
          </div>

          <button className='botaoCadastrarCa' onClick={fazercadastro}>Cadastrar</button>

          <button className='botaoLoginCa' onClick={() => navi('/')}>Login</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>As senhas não coincidem</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Body>Cadastro realizado com sucesso</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Body>Email já cadastrado</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show4} onHide={handleClose4}>
        <Modal.Body>Preencha todos os campos</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show5} onHide={handleClose5}>
        <Modal.Body>Email inválido</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Cadastro