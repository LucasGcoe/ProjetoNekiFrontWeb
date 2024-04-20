import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import service from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/auth'
import { Snackbar } from 'react-native-paper';

const Login = ({ navigation }) => {

  const [ver, setVer] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { signIn } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);


  const verSenha = () => {
    setVer(!ver);
    console.log(ver);
  }

  const guardarSenha = () => {
    setGuardar(!guardar);
    console.log(guardar);
  }

  const logar = async () => {
    const log = {
      email: login,
      password: senha
    }
    console.log(log);
    await service.post('/usuario/login', log)
      .then(async (response) => {
        console.log('deu certo');
        // console.log(response.data);
        // if (guardar) {
        await AsyncStorage.setItem('infoUser', JSON.stringify(response.data));
        // }
        signIn(response.data);
      }).catch(() => {
        console.log('deu errado');
        onToggleSnackBar()
      })
    console.log(await AsyncStorage.getItem('infoUser'));

  }

  return (
    <View style={styles.tela}>
      <Text>Login</Text>
      <View style={styles.card}>
        <View style={styles.loginLo}>
          <Text>Email</Text>
          <TextInput placeholder='Email' style={styles.inputLo} keyboardType='email-address' value={login} onChangeText={setLogin} />
        </View>

        <View style={styles.senhaLo}>
          <Text>Senha</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Senha' style={styles.inputLo} secureTextEntry={!ver} value={senha} onChangeText={setSenha} />
            <TouchableOpacity style={{ position: 'absolute', right: 2, top: 4, padding: 3 }} onPress={verSenha}>
              <Text >{ver ? <Entypo name="eye-with-line" size={24} color="black" /> : <Entypo name="eye" size={24} color="black" />}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.guarda} onPress={guardarSenha} >
          {guardar ?
            <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" />
            : <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />}
          <Text>Guardar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.entrar} onPress={logar}>
          <Text>Entrar</Text>
        </TouchableOpacity>

        < TouchableOpacity style={styles.cadastro} onPress={() => navigation.navigate('Cadastro')}>
          <Text>Cadastrar-se</Text>
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
        Senha ou login incorretos
      </Snackbar>
    </View>
  )
}

export default Login