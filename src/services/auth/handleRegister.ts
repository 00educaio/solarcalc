import { Auth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const db = getFirestore();
const handleRegister = async (auth: Auth, name: string, email: string, senha: string, phone: string, estado: string) : Promise<void> => {
  if(!name || !email || !senha || !phone || !estado) {
    Alert.alert("Erro", "Por favor, preencha todos os campos.");
    return;
  }
  console.log("Registrando", email, senha);

  createUserWithEmailAndPassword(auth, email, senha)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        createdAt: new Date(),
        phone: phone,
        estado: estado
      });

      console.log("Registrado", user);

      const router = useRouter();
      router.replace('/home' as any);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("Erro ao registrar", errorCode);

      // Mensagens personalizadas
      let mensagem = "Erro ao registrar. Tente novamente.";

      switch (errorCode) {
        case "auth/email-already-in-use":
          mensagem = "Este e-mail já está em uso.";
          break;
        case "auth/invalid-email":
          mensagem = "E-mail inválido.";
          break;
        case "auth/weak-password":
          mensagem = "A senha deve ter pelo menos 6 caracteres.";
          break;
        case "auth/missing-password":
          mensagem = "A senha é obrigatória.";
          break;
        default:
          mensagem = "Ocorreu um erro inesperado.";
          break;
      }

      Alert.alert("Erro no cadastro", mensagem);
    });
};

export default handleRegister;
