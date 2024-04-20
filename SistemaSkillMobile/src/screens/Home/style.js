import { StyleSheet, Dimensions } from 'react-native';


const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    tela: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logout: {
        backgroundColor: '#0F8B82',
        marginBottom: 20,
        left: '77%',
        top: -40,
        width: 70,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listaTopo: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        marginBottom: 10,
    },
    lista: {
        flexDirection: 'column',
        width: '90%',
    },
    itemlista: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    par: {
        backgroundColor: '#dddddd99'
    },
    impar: {
        backgroundColor: ''

    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    botao: {
        backgroundColor: '#098E9F',
        marginBottom: 20,
        marginTop: 25,
        width: 70,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoDelet: {
        backgroundColor: '#dd5454',
        marginBottom: 20,
        marginTop: 25,
        width: 70,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }

})