import React from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface LoginFormProps {
  login: string;
  senha: string;
  verSenha: boolean;
  guardar: boolean;
  setLogin: (value: string) => void;
  setSenha: (value: string) => void;
  toggleVerSenha: () => void;
  toggleGuardar: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  login,
  senha,
  verSenha,
  guardar,
  setLogin,
  setSenha,
  toggleVerSenha,
  toggleGuardar
}) => {
  return (
    <div className='cardLogiLo'>
      <div className='loginLo'>
        <p>Email</p>
        <input
          placeholder=' Email'
          className='inputsLo'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div className='senhaLo'>
        <p>Senha</p>
        <div className='inputSenhaLo'>
          <input
            type={verSenha ? 'text' : 'password'}
            placeholder=' Senha'
            className='inputsLo'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className='botaoVerLo' onClick={toggleVerSenha}>
            {verSenha ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
          </button>
        </div>
      </div>

      <div className='guardarLo'>
        <button className='botaoGuardarLo' onClick={toggleGuardar}>
          {guardar ? <MdCheckBox size={18} /> : <MdCheckBoxOutlineBlank size={18} />}
        </button>
        <p>Guardar senha</p>
      </div>
    </div>
  );
};

export default LoginForm;
