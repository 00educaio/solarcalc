import { Auth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";

const handleForgotPassword = async (auth: Auth, email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Email de redefinição de senha enviado!");
  } catch (error: any) {
    Alert.alert("Erro ao enviar email:", error.code, error.message);
  }
};

export default handleForgotPassword;