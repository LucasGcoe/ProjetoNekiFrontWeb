import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import AuthContext from '../../context/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import service from '../../services/api'
import { Modal, Portal, Button, PaperProvider, List } from 'react-native-paper';

const Home = ({ navigation }) => {

  const { user, signOut } = useContext(AuthContext);
  const [lista, setLista] = useState([]);
  const [options, setOptions] = useState([]);
  const [nivel, setNivel] = useState("");
  const [opcao, setOpcao] = useState('');
  const [filtro, setFiltro] = useState([]);

  //modal1
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
    console.log(lista);
    setFiltro(options.filter((skill) => {
      for (let i = 0; i < lista.length; i++) {
        if (skill.nome == lista[i].skills.nome) {
          return false;
        }
      }
      return true;
    }))
  }
  const hideModal = () => {
    setNivel();
    setOpcao();
    setVisible(false)
  };
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  //modal2
  const [visible2, setVisible2] = React.useState(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => {
    setNivel();
    setOpcao();
    setVisible2(false)
  };
  //modal3
  const [visible3, setVisible3] = React.useState(false);
  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => {
    setNivel();
    setOpcao();
    setVisible3(false)
  };

  const pegarskills = async () => {
    await service.get("/skill/listar")
      .then((resposta) => {
        setOptions(resposta.data)
      })
  }
  useEffect(() => {
    pegarskills()
  }, [adicionar])

  const listaSkill = async () => {
    let user = await (AsyncStorage.getItem('infoUser'))
    user = JSON.parse(user);
    service.get(`/usuario/listaSkill/${user.id}`)
      .then((response) => {
        setLista(response.data)

      })
      .catch(() => {
      })
  }
  useEffect(() => {
    listaSkill()
  }, [adicionar])

  const adicionar = async () => {
    let user = await (AsyncStorage.getItem('infoUser'))
    user = JSON.parse(user);
    service.post("/skill/associar", {}, { params: { idSkill: opcao, idUsuario: user.id, nivel: nivel } })
      .then(() => {
        hideModal()
        listaSkill()
        setNivel(null)
        setOpcao(null)
      }).catch(() => {
      })
  }

  const deleta = () => {

    service.delete(`/skill/deletar/${opcao}`)
      .then(() => {
        hideModal2()
        listaSkill()
        setOpcao(null)
      }).catch(() => {
      })
  }

  const editar = () => {
    service.patch(`/skill/atualizar/${opcao}`, {}, { params: { nivel: nivel } })
      .then(() => {
        hideModal3()
        listaSkill()
        setNivel(null)
        setOpcao(null)
      }).catch(() => {
      })
  }

  return (
    <View style={styles.tela}>
      <View style={{ backgroundColor: '#22B3B2', width: '100%', height: "8%" }}>
        <Image style={{ height: 55, width: 55 }} source={require('../../../assets/Logo-Neki.png')} />
        <TouchableOpacity style={styles.logout} TouchableOpacity onPress={() => { signOut() }}>
          <Text style={{
            fontWeight: '500', textShadowColor: '#fff',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 8
          }}>Logout</Text>
        </TouchableOpacity >
      </View>
      {lista.length !== 0 ? <>
        <Text style={{ marginTop: 30, fontSize: 18 }}>Skills</Text>
        <View style={styles.listaTopo}>
          <Text style={{ flex: 1, textAlign: 'center' }}>Imagem</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>Nome</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>Level</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>Descrição</Text>
        </View>
        <FlatList
          data={lista}
          style={styles.lista}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) =>
            <View style={[
              styles.itemlista,
              index % 2 == 0 ? styles.par : styles.impar]}>
              <Image style={{ flex: 1 }} width={50} height={50} resizeMode='contain' source={{ uri: item.skills.imagem }} alt={item.nome} />
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.skills.nome}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.nivel}</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 12 }}>{item.skills.descricao}</Text>
            </View>}
        /></> :
        <View style={{ marginTop: "70%" }}>
          <Text style={{ fontSize: 18 }}>Você ainda não tem skills cadastradas</Text>
        </View>}
      <View style={styles.botoes}>
        {lista.length !== 0 ? <>
          <TouchableOpacity style={styles.botao} TouchableOpacity onPress={() => { showModal3() }}>
            <Text style={{
              textShadowColor: '#fff',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 8
            }}>Editar</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.botao} TouchableOpacity onPress={() => { showModal2() }}>
            <Text style={{
              textShadowColor: '#fff',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 8
            }}>Excluir</Text>
          </TouchableOpacity >
        </> : <></>}
        <TouchableOpacity style={styles.botao} TouchableOpacity onPress={() => { showModal() }}>
          <Text style={{
            textShadowColor: '#fff',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 8
          }}>Adicionar</Text>
        </TouchableOpacity >
      </View>



      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Adicionar skill</Text>
          <List.Section title="">
            <List.Accordion
              title="Adicione sua skill"
              left={props => <List.Icon {...props} icon="folder" />}>

              {filtro.map((skill) =>
                <TouchableOpacity onPress={() => setOpcao(skill.id)}>
                  <List.Item title={skill.nome} style={{backgroundColor:opcao===skill.id?"#22B3B22c":'white'}} />
                </TouchableOpacity>)}

            </List.Accordion>
            <List.Accordion
              title="Adicione seu level"
              left={props => <List.Icon {...props} icon="folder" />}>
              <TouchableOpacity onPress={() => setNivel('Alto')}>
                <List.Item title='Alto'style={{backgroundColor:nivel==='Alto'? '#22B3B22c':'white'}} />
              </TouchableOpacity >
              <TouchableOpacity onPress={() => setNivel('Médio')}>
                <List.Item title='Médio' style={{backgroundColor:nivel==='Médio'? '#22B3B22c':'white'}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNivel('Baixo')}>
                <List.Item title='Baixo' style={{backgroundColor:nivel==='Baixo'? '#22B3B22c':'white'}}/>
              </TouchableOpacity>

            </List.Accordion>
          </List.Section>
          <View style={{flexDirection:'row',gap:20}}>
            <TouchableOpacity style={styles.botao} onPress={adicionar}>
              <Text>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={hideModal}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>

        </Modal>
      </Portal>

      <Portal>
        <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
          <Text>Excluir</Text>
          <List.Section title="">
            <List.Accordion
              title="Exclua sua skill"
              left={props => <List.Icon {...props} icon="folder" />}>
              {lista.map((skill) =>
                <TouchableOpacity onPress={() => setOpcao(skill.id)}>
                  <List.Item title={skill.skills.nome} style={{backgroundColor:opcao===skill.id?"#ff040441":'white'}}/>
                </TouchableOpacity>)}

            </List.Accordion>
          </List.Section>
          <TouchableOpacity style={styles.botaoDelet} onPress={deleta}>
            <Text>Excluir</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>

      <Portal>
        <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
          <Text>Editar</Text>
          <List.Section title="">
            <List.Accordion
              title="Edite sua skill"
              left={props => <List.Icon {...props} icon="folder" />}>
              {lista.map((skill) =>
                <TouchableOpacity onPress={() => setOpcao(skill.id)}>
                  <List.Item title={skill.skills.nome} style={{backgroundColor:opcao===skill.id?"#22B3B22c":'white'}}/>
                </TouchableOpacity>)}
            </List.Accordion>
            <List.Accordion
              title="Edite seu level"
              left={props => <List.Icon {...props} icon="folder" />}>
              <TouchableOpacity onPress={() => setNivel('Alto')}>
                <List.Item title='Alto' style={{backgroundColor:nivel==='Alto'? '#22B3B22c':'white'}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={() => setNivel('Médio')}>
                <List.Item title='Médio'style={{backgroundColor:nivel==='Médio'? '#22B3B22c':'white'}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNivel('Baixo')}>
                <List.Item title='Baixo'style={{backgroundColor:nivel==='Baixo'? '#22B3B22c':'white'}} />
              </TouchableOpacity>

            </List.Accordion>

          </List.Section>
          <TouchableOpacity style={styles.botao} onPress={editar}>
            <Text>Editar</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>

    </View >
  )
}

export default Home