import { StyleSheet, Dimensions } from 'react-native';


const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },
    card: {
        backgroundColor: "#22B3B2",
        width: '80%',
        height: '50%',
        minHeight: 400,
        alignItems: 'center',
        borderRadius: 20,
        elevation: 10,
    },
    loginLo: {
        marginTop: '20%',
        alignItems: 'center',
        width: '100%',
    },
    senhaLo: {
        marginTop: '10%',
        alignItems: 'center',
        width: '100%'
    },
    inputLo: {
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 5,
        marginTop: 5,

    },
    guarda: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    entrar: {
        backgroundColor: '#0F8B82',
        width: '60%',
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%',
        elevation: 7,
    },
    cadastro: {
        marginTop: '5%',
        backgroundColor: '#107087',
        width: '60%',
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    }
})