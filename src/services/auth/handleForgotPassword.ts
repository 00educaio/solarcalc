import { Auth, sendPasswordResetEmail } from "firebase/auth";

const handleForgotPassword = async (auth: Auth, email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Email de redefinição de senha enviado!");
  } catch (error: any) {
    console.log("Erro ao enviar email:", error.code, error.message);
  }
};

export default handleForgotPassword;