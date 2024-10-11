
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import service from '../../service/service';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


interface EditSkillModalProps {
  show: boolean;
  onHide: () => void;
  onEditSkill: () => void;
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

interface Option {
  value: string;
  label: string;
}

const EditSkillModal: React.FC<EditSkillModalProps> = ({ show, onHide, onEditSkill }) => {
  const [nivel, setNivel] = useState<Option | null>(null); // Estado para armazenar o nível selecionado
  const navi = useNavigate();

  const updateSkill = async () => {
    console.log('clicou no botão');
    if (nivel) {
      try {
        await service.patch(
          `/skill/atualizar/${localStorage.getItem('idSkill')}`,
          {},
          { params: { nivel: nivel.value } } // Passa apenas o valor selecionado
        );

        localStorage.removeItem('idSkill');
        onEditSkill(); // Chama a função passada como prop para atualizar a lista de skills após a edição
        navi('/');
      } catch (error) {
        console.error('Erro ao alterar skill:', error);
      }
    }
  };

  const handleChange = (selectedOption: Option | null) => {
    setNivel(selectedOption);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          placeholder="Selecione uma opção"
          onChange={handleChange}
          options={[
            { value: 'Alto', label: 'Alto' },
            { value: 'Medio', label: 'Medio' },
            { value: 'Baixo', label: 'Baixo' },
          ]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className='EditSkillButton' variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button className='EditSkillButtonSave' variant="primary" onClick={updateSkill}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSkillModal;
