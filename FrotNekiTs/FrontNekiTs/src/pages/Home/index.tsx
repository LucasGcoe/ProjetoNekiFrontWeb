
import React, { useEffect, useState } from 'react';
import HeaderWeb from '../../components/HeaderWeb';
import './styles.css';
import service from '../../service/service';
import SkillTable from '../../components/SkillTable/SkillTable';
import AddSkillModal from '../../components/Modais/AddSkillModal';
import EditSkillModal from '../../components/Modais/EditSkillModal';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface UserSkill {
  id: number;
  skills: {
    imagem: string;
    nome: string;
    descricao: string;
  };
  nivel: string;
}

interface Option {
  value: number;
  label: string;
}

const Home: React.FC = () => {
  const navi = useNavigate();
  const [lista, setLista] = useState<UserSkill[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [opcao, setOpcao] = useState<Option | null>(null);
  const [nivel, setNivel] = useState<Option | null>(null);
  const [filtro, setFiltro] = useState<Option[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [nivel2, setNivel2] = useState<Option | null>(null);
  const [idTroca, setIdTroca] = useState<number | undefined>(undefined);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navi('/');
  };

  const fetchUserSkills = async () => {
    try {
      const response = await service.get<UserSkill[]>(`/usuario/listaSkill/${sessionStorage.getItem('id')}`);
    
      setLista(response.data);
      setFiltro(options.filter(skill =>
        !response.data.some(item => skill.label === item.skills.nome)
      ));
    } catch (error) {
      console.error('Erro ao listar skills:', error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, [options]);

  const deleteSkill = async (id: number) => {
    try {
      await service.delete(`/skill/deletar/${id}`);
      fetchUserSkills(); 
      navi('/');
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
    }
  };

  const updateSkill = async () => {
    if (nivel2 && idTroca) {
      try {
        await service.patch(`/skill/atualizar/${idTroca}`, {}, { params: { nivel: nivel2.value } });
        setShowEdit(false);
        fetchUserSkills();
      } catch (error) {
        console.error('Erro ao alterar skill:', error);
      }
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lista.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const Botao={
    color:'green',
  }
  return (
    <>
      <HeaderWeb />
      <div className='paginaHo'>
        <Button className='logout' onClick={logout}>
          Logout <CiLogout />
        </Button>
        {lista.length > 0 ? (
          <>
            <SkillTable
              lista={currentItems}
              onDelete={deleteSkill}
              onEdit={(id) => { setIdTroca(id); setShowEdit(true); }}
            />
            <p className='paragraph'>Adicione outra skill</p>

            <div className="pagination">
              {Array.from({ length: Math.ceil(lista.length / itemsPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <p>Adicione uma skill</p>
        )}

        <Button className='botaoSkillHo' onClick={() => setShowAdd(true)}>Adicionar</Button>

        <AddSkillModal
          show={showAdd}
          onHide={() => setShowAdd(false)}
          filtro={filtro}
          setOpcao={setOpcao}
          setNivel={setNivel}
        />

        <EditSkillModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          onEditSkill={updateSkill}
          setNivel={setNivel2}
        />
      </div>
    </>
  );
};

export default Home;
