import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import service from '../../services/api';


const Cadastro = ({ navigation }) => {

  const [ver, setVer] = useState(false);
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const [login, setLogin] = useState();
  //Snackbar1
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  //Snackbar2
  const [visible2, setVisible2] = React.useState(false);
  const onToggleSnackBar2 = () => setVisible2(!visible2);
  const onDismissSnackBar2 = () => setVisible2(false);
  //Snackbar3
  const [visible3, setVisible3] = React.useState(false);
  const onToggleSnackBar3 = () => setVisible3(!visible3);
  const onDismissSnackBar3 = () => {
    setVisible3(false);
    navigation.navigate('Login')
  }
  //Snackbar4
  const [visible4, setVisible4] = React.useState(false);
  const onToggleSnackBar4 = () => setVisible4(!visible4);
  const onDismissSnackBar4 = () => setVisible4(false);
  //Snackbar5
  const [visible5, setVisible5] = React.useState(false);
  const onToggleSnackBar5 = () => setVisible5(!visible5);
  const onDismissSnackBar5 = () => setVisible5(false);

  const verSenha = () => {
    setVer(!ver);
    console.log(ver);
  }
  function validateEmail(login) {
    let res = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return res.test(login);
  }

  const cadastro = async () => {
    // console.log(login);
    // console.log(senha);
    // console.log(confirmarSenha);
    if (login == undefined || senha == undefined || confirmarSenha == undefined||login == '' || senha == '' || confirmarSenha == '') {
      onToggleSnackBar4()
      return;
    }
    if (!validateEmail(login)) {
      onToggleSnackBar5();
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
          onToggleSnackBar3()

        }).catch(() => {
          console.log("erro");
          onToggleSnackBar2()
        })

    } else {
      onToggleSnackBar()
    }
  }

  return (
    <View style={styles.tela}>
      <Text>Cadastro</Text>
      <View style={styles.card}>
        <View style={styles.loginLo}>
          <Text>Email</Text>
          <TextInput placeholder='Email' style={styles.inputLo} keyboardType='email-address' onChangeText={setLogin} />
        </View>

        <View style={styles.senhaLo}>
          <Text>Senha</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Senha' style={styles.inputLo} secureTextEntry={!ver} onChangeText={setSenha} />
            <TouchableOpacity style={{ position: 'absolute', right: 2, top: 4, padding: 3 }} onPress={verSenha}>
              <Text >{ver ? <Entypo name="eye-with-line" size={24} color="black" /> : <Entypo name="eye" size={24} color="black" />}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.senhaLo}>
          <Text>Confirmar senha</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Confirmar email' style={styles.inputLo} secureTextEntry={!ver} onChangeText={setConfirmarSenha} />
            <TouchableOpacity style={{ position: 'absolute', right: 2, top: 4, padding: 3 }} onPress={verSenha}>
              <Text >{ver ? <Entypo name="eye-with-line" size={24} color="black" /> : <Entypo name="eye" size={24} color="black" />}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.cadastro} onPress={() => cadastro()}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>

      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        As senhas não coincidem
      </Snackbar>

      <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        Email já cadastrado!
      </Snackbar>

      <Snackbar
        visible={visible3}
        onDismiss={onDismissSnackBar3}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        Cadastro realizado com sucesso
      </Snackbar>

      <Snackbar
        visible={visible4}
        onDismiss={onDismissSnackBar4}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        Preencha todos os campos
      </Snackbar>

      <Snackbar
        visible={visible5}
        onDismiss={onDismissSnackBar5}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        Email inválido
      </Snackbar>
    </View>
  )
}

export default Cadastro