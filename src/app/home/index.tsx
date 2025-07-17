import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { auth } from '../../../firebase.config';
import  handleLogout from '../../services/auth/handleLogout';
import { seedEquipamentosPadrao } from '@/src/services/seedEquipamentosPadrao';

export default function HomeScreen() {
  const user = auth.currentUser;
  
  // const handleSeed = async () => {
  //   try {
  //     await seedEquipamentosPadrao();
  //     Alert.alert("Seed finalizada com sucesso!");
  //   } catch (err) {
  //     Alert.alert("Erro ao executar seed.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Simulador Solar!</Text>
      <Text style={styles.subtitle}>
        {user?.displayName || "Usuário"}
      </Text>

      <View>
        <Text style={styles.subtitle}>
        Atenção! A simulação é apenas uma estimativa, aguarde a adição das empresas parceiras para obter melhores resultados!
        </Text>
      </View>

      <Link href="/home/simulation" asChild>
        <Button mode="contained" style={styles.button}>
          Começar Simulação
        </Button>
      </Link>

      <Link href="/home/allsimulation" asChild>
        <Button mode="contained" style={styles.button}>
          Minhas Simulações
        </Button>
      </Link>

      {/* <View>
        <Button mode="contained" style={styles.button} onPress={handleSeed}>
          Seeder
        </Button>
      </View> */}

      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={() => handleLogout(auth)}
        textColor="#08364E"
      >
        Sair da conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#08364E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#08364E',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutButton: {
    borderColor: '#08364E',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
