import React, { useEffect, useState } from 'react'
import HeaderWeb from '../../components/HeaderWeb'
import './style.css'
import service from '../../service/service'
import Select from 'react-select';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoTrash } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

function Home() {

  const navi = useNavigate();
  const [lista, setLista] = useState([]);
  const [options, setOptions] = useState([])
  const [opcao, setOpcao] = useState("");
  const [nivel, setNivel] = useState("");
  const [filtro, setFiltro] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setOpcao();
    setNivel();
    setNivel2();
    setShow(false);
  }

  const handleShow = () => {
    setShow(true)
    setFiltro(options.filter((skill) => {
      for (let i = 0; i < lista.length; i++) {
        if (skill.label == lista[i].skills.nome) {
        return false;
        }
      }
      return true;
    }))
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setOpcao();
    setNivel();
    setNivel2();
    setShow2(false);
  }
  const handleShow2 = () => setShow2(true);
  const [nivel2, setNivel2] = useState("");
  const [idTroca, setIdTroca] = useState();


  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navi('/');
  }

  const pegarskills = async () => {
    await service.get("/skill/listar")
      .then((resposta) => {
        console.log(resposta.data);
        setOptions(resposta.data.map(skill => ({
          value: skill.id,
          label: skill.nome
        })))
      })
  }
  useEffect(() => {
    pegarskills()
  }, [])

  const listaSkill = () => {
    service.get(`/usuario/listaSkill/${sessionStorage.getItem('id')}`)
      .then((response) => {
        console.log('deu certo');
        console.log(response.data);
        setLista(response.data)
      })
      .catch(() => {
        console.log('deu errado');
      })
  }
  useEffect(() => {
    listaSkill()
  }, [])

  const addSkill = () => {
    //
    console.log(opcao.value);
    service.post("/skill/associar", {}, { params: { idSkill: opcao.value, idUsuario: sessionStorage.getItem('id'), nivel: nivel.value } })
      .then(() => {
        console.log('deu certo');
        navi('/')

      }).catch(() => {
        console.log('deu ruim');
      })
  }

  const deleta = (id) => {
    console.log(id);
    service.delete(`/skill/deletar/${id}`)
      .then(() => {
        console.log('deu certo');
        navi('/')
      }).catch(() => {
        console.log('deu ruim');
      })
  }
  const alterar = () => {
    console.log(nivel2.value);
    console.log(idTroca);
    service.patch(`/skill/atualizar/${idTroca}`, {}, { params: { nivel: nivel2.value } })
      .then(() => {
        console.log('deu certo');
        navi('/')
      }).catch(() => {
        console.log('deu ruim');
      })
  }

  return (
    <>
      <HeaderWeb />
      <div className='paginaHo'>
        <button className='logout' onClick={logout}>Logout<CiLogout /></button>
        {lista.length>=1?<>
        <Table style={{ textAlign: 'center', border: '1px solid black' }} striped bordered hover size='sm' >
          <thead >
            <tr >
              <th >imagem</th>
              <th>nome</th>
              <th>level</th>
              <th>descriçao</th>
            </tr>
          </thead>
          <tbody>
            {lista?.map((skill, key) => {
              return (
                <tr key={key}>
                  <td> <img height={70} src={skill.skills.imagem} /></td>
                  <td style={{ paddingTop: '28px' }}>{skill.skills.nome}</td>
                  <td style={{ paddingTop: '28px' }}>{skill.nivel}</td>
                  <td style={{ paddingTop: '28px' }}>{skill.skills.descricao}</td>
                  <td style={{ paddingTop: '28px', cursor: 'pointer' }} onClick={() => deleta(skill.id)}><IoTrash /></td>
                  <td style={{ paddingTop: '28px', cursor: 'pointer' }} onClick={() => { setIdTroca(skill.id); handleShow2() }}><CiEdit /></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <p>Adicione outra skill</p>
        </>:<><p>Adicione uma skill</p></>}

        <button className='botaoSkillHo' onClick={handleShow}>Adicionar</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            Escolha a skill e o seu nível nela
            <Select placeholder='Selecionar' onChange={setOpcao} options={filtro} />
            <Select placeholder='Selecionar' onChange={setNivel} options={
              [
                {
                  value: 'Alto',
                  label: 'Alto'
                },
                {
                  value: 'Médio',
                  label: 'Médio'
                },
                {
                  value: 'Baixo',
                  label: 'Baixo'
                }
              ]
            } />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addSkill}>
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Body>
            Altere seu nivel
            <Select placeholder='Selecionar' onChange={setNivel2} options={
              [
                {
                  value: 'Alto',
                  label: 'Alto'
                },
                {
                  value: 'Médio',
                  label: 'Médio'
                },
                {
                  value: 'Baixo',
                  label: 'Baixo'
                }
              ]
            } />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={alterar}>
              Altera
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Home