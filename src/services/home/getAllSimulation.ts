import { SimulationResult } from "./handleSimulation";
import { Firestore, getFirestore, collection, getDocs, query, where, Timestamp, QueryDocumentSnapshot, DocumentData, orderBy, startAfter, limit } from "firebase/firestore";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";
import { Equipamento } from "./registerEquipamentos";

export const getAllSimulationsAndEquipments = async (
                                                pageSize: number,
                                                lastDoc: QueryDocumentSnapshot<DocumentData> | null
                                              ): 
                                              Promise<{
                                                simulations: SimulationResult[],
                                                lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null
                                              }> => {

  const db: Firestore = getFirestore();
  const currentUser: User | null = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  const simulationsRef = collection(db, "simulations");

  const simualtionsQuery = query (
    simulationsRef,
    orderBy("createdAt", "desc"),
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(pageSize)
  )

  const simulationsSnap = await getDocs(simualtionsQuery);

  const lastVisibleDoc = simulationsSnap.docs[simulationsSnap.docs.length -1] ?? null

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
        id: docSimulacao.id,
        ...simulationData,
        equipamentos,
      } as SimulationResult);
    }
  }

  return {simulations, lastVisibleDoc};
};
