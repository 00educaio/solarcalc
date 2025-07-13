import { SimulationResult } from "./registerSimulation";
import { Firestore, getFirestore, collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";
import { Equipamento } from "./registerEquipamentos";

export const getAllSimulationsAndEquipments = async (): Promise<SimulationResult[]> => {
  const db: Firestore = getFirestore();
  const currentUser: User | null = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  const simulationsRef = collection(db, "simulations");
  const simulationsSnap = await getDocs(simulationsRef);

  const simulations: SimulationResult[] = [];

  for (const docSimulacao of simulationsSnap.docs) {

    const simulationData = docSimulacao.data();
    if(simulationData.createdAt && typeof simulationData.createdAt === 'string') {
        simulationData.createdAt = Timestamp.fromDate(new Date(simulationData.createdAt));
      }

    if (simulationData.user === currentUser.uid) {
      const simulationId = docSimulacao.id;

      const equipamentosRef = collection(db, "equipamentos");
      const equipamentosQuery = query(equipamentosRef, where("simulation", "==", simulationId));
      const equipamentosSnap = await getDocs(equipamentosQuery);

      const equipamentos: Equipamento[] = [];
      equipamentosSnap.forEach((equipamentoDoc) => {
        equipamentos.push(equipamentoDoc.data() as Equipamento);
      });

      simulations.push({
        ...simulationData,
        equipamentos,
      } as SimulationResult);
    }
  }

  return simulations;
};
