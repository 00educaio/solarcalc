import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router';

const handleLogin = (auth: Auth, email: string, senha: string) : void => {
    console.log("Logando", email, senha);
    
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Logado", user);

          const router = useRouter();
          router.replace('/home');
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Erro ao logar", errorCode, errorMessage);
          
        });
  }

export default handleLogin;