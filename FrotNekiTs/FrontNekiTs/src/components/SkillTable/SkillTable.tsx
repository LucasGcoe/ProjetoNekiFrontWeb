import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import './styles.css';


interface Skill {
  id: number;
  skills: {
    nome: string;
    descricao: string;
    imagem: string;
  };
  nivel: string;
}

interface SkillTableProps {
  lista: Skill[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const SkillTable: React.FC<SkillTableProps> = ({ lista, onDelete, onEdit }) => {

  return (
    <Table>
      <thead>
        <tr className='CabecalhoEdit'>
          <th className='Cabecalho'>Imagem</th>
          <th className='Cabecalho'>Nome</th>
          <th className='Cabecalho'>Descrição</th>
          <th className='Cabecalho'>Nível</th>
          <th className='Cabecalho'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {lista.map((item) => (
          <tr key={item.id}>
            <td className='Line' > <img height={70} src={item.skills.imagem} /></td>
            <td className='Line'>{item.skills.nome}</td>
            <td className='Line'>{item.skills.descricao}</td>
            <td className='Line'>{item.nivel}</td>
            <td className='Line'>
              <Button className='EditButton' onClick={() => {
                onEdit(item.id);
                localStorage.setItem("idSkill", String(item.id))
              }}>Editar</Button>
              <Button className='DeleteButton' onClick={() => onDelete(item.id)}>Deletar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SkillTable;
