import { useRouter } from 'expo-router';
import { Auth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';

const handleLogout = async (auth: Auth) => {
    const router = useRouter();
    try {
      await signOut(auth);
      router.replace("/auth"); // redireciona para login
      console.log("Usuário deslogado");
      
    } catch (error) {
      Alert.alert("Erro ao sair", "Tente novamente.");
    }
  };

export default handleLogout;