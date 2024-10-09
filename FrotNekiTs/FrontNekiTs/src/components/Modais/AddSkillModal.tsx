
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import service from '../../service/service';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';




interface AddSkillModalProps {
  show: boolean;
  onHide: () => void;
  filtro: Opcao[];
  setOpcao: (opcao: Opcao[]) => void;
}

interface Opcao {
  value: number;
  label: string;
}

interface UserSkill {
  id: number;
  skills: {
    imagem: string;
    nome: string;
    descricao: string;
  };
  nivel: string;
}

interface Nivel {
  value: string;
  label: string;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({ show, onHide }) => {
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const [escolha, setEscolha] = useState<Opcao | null>(null);
  const [filtro, setFiltro] = useState<Opcao[]>([]);
  const navi = useNavigate();
  const [lista, setLista] = useState<UserSkill[]>([]);

  const fetchSkills = async () => {
    try {
      const resposta = await service.get<Opcao[]>("/skill/listar");
      setOpcoes(resposta.data.map(skill => ({
        value: skill.id,
        label: skill.nome,
      })));
    } catch (error) {
      console.error('Erro ao buscar skills:', error);
    }
  };

  const fetchUserSkills = async () => {
    try {
      const response = await service.get<UserSkill[]>(`/usuario/listaSkill/${sessionStorage.getItem('id')}`);
      setLista(response.data);
    } catch (error) {
      console.error('Erro ao listar skills:', error);
    }
  };

  const atualizarFiltro = () => {
    setFiltro(opcoes.filter(opcao =>
      !lista.some(item => item.skills.nome === opcao.label)
    ));
  };

  useEffect(() => {
    fetchSkills();
    fetchUserSkills();
  }, []);

  useEffect(() => {
    atualizarFiltro();
  }, [opcoes, lista]);

  const handleSkillChange = (selectedOption: Opcao | null) => {
    setEscolha(selectedOption);
  };

  const handleNivelChange = (selectedOption: Nivel | null) => {
    setNivel(selectedOption);
  };

  const addSkill = async () => {
    if (escolha && nivel) {
      try {
        await service.post("/skill/associar", {}, {
          params: {
            idSkill: escolha.value,
            idUsuario: sessionStorage.getItem('id'),
            nivel: nivel.value,
          },
        });
        navi('/'); // Navega após adicionar a skill
      } catch (error) {
        console.error('Erro ao adicionar skill:', error);
      }
    } else {
      console.error('Selecione uma skill e um nível antes de adicionar.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select 
          placeholder="Selecione uma opção" 
          onChange={handleSkillChange} 
          options={filtro} 
        />
        <Select 
          placeholder="Selecione um nível" 
          onChange={handleNivelChange} 
          options={[
            { value: 'Alto', label: 'Alto' },
            { value: 'Medio', label: 'Médio' },
            { value: 'Baixo', label: 'Baixo' },
          ]} 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button className='AddSkillButton' variant="primary" onClick={addSkill}>
          Adicionar Skill
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSkillModal;

