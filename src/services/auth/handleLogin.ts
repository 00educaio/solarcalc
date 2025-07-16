import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const handleLogin = (auth: Auth, email: string, senha: string): void => {
  console.log("Logando", email, senha);

  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logado", user);

      const router = useRouter();
      router.replace('/home' as any);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("Erro ao logar", errorCode);

      let mensagem = "Erro ao fazer login. Tente novamente.";
      if (errorCode === "auth/invalid-email") {
        mensagem = "E-mail inválido.";
      } else if (errorCode === "auth/user-not-found") {
        mensagem = "Usuário não encontrado.";
      } else if (errorCode === "auth/wrong-password") {
        mensagem = "Senha incorreta.";
      }

      Alert.alert("Erro no login", mensagem);
    });
};

export default handleLogin;
