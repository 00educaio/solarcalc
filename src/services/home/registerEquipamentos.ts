import { addDoc, collection, Firestore, getFirestore } from "firebase/firestore";

export type Equipamento = {
    nome: string;
    kilowatts_hora_mes: string;
    qtd: string
  };
export const registerEquipamentos = async (equipamentos: Equipamento[], simulationId: string) : Promise<void> => {
    const db: Firestore = getFirestore();
  
    for (const equipamento of equipamentos) {
      await addDoc(collection(db, "equipamentos"), {
        simulation: simulationId,
        ...equipamento,
        createdAt: new Date(),
      });
    }
    console.log("Equipamentos salva com sucesso");

  };
  
