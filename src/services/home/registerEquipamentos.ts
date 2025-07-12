import { addDoc, collection, Firestore, getFirestore } from "firebase/firestore";

export type Equipamento = {
    id?: string 
    nome: string;
    consumo_por_hora_kwh: string;
    potencia_watts: string;
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
  
