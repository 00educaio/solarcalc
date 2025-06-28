import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { auth } from '../../../firebase.config';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth"); // redireciona para login
      console.log("Usuário deslogado");
      
    } catch (error) {
      Alert.alert("Erro ao sair", "Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Simulador Solar!</Text>
      <Text style={styles.subtitle}>
        {user?.displayName || user?.email || "Usuário"}
      </Text>

      <Link href="/home/simulation" asChild>
        <Button mode="contained" style={styles.button}>
          Começar Simulação
        </Button>
      </Link>

      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={handleLogout}
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
