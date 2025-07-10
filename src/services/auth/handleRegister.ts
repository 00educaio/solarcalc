import { Auth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const db = getFirestore();
const handleRegister = (auth: Auth, name: string, email: string, senha: string, phone: string, estado: string) : void => {
    console.log("Registrando", email, senha);

      createUserWithEmailAndPassword(auth, email, senha)
        .then( async (userCredential) => {
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
          const errorMessage = error.message;
          console.log("Erro ao registrar", errorCode, errorMessage);
          
        });
  }

export default handleRegister;