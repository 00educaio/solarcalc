import { Auth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const db = getFirestore();
const handleRegister = (auth: Auth, email: string, senha: string, confirmaSenha: string, name: string) : void => {
    console.log("Registrando", email, senha);
    if (senha !== confirmaSenha) {
      console.log("As senhas não coincidem");
      return;
    }
      createUserWithEmailAndPassword(auth, email, senha)
        .then( async (userCredential) => {
          const user = userCredential.user;
        
          await updateProfile(user, {
            displayName: name,
          });

          await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            createdAt: new Date()
          });

          console.log("Registrado", user);

          const router = useRouter();
          router.replace('/home');
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Erro ao registrar", errorCode, errorMessage);
          
        });
  }

export default handleRegister;