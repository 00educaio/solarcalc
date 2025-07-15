import { deleteDoc, doc } from "firebase/firestore";
import { getFirestore, Firestore } from "firebase/firestore";

export const deleteSimulation = async (id: string | undefined) => {
    if (!id) {
        console.warn("Simulação sem ID");
        return;
      }
    const db: Firestore = getFirestore();
    await deleteDoc(doc(db, "simulations", id));
    console.log("Simulação excluida com sucesso");
}