// src/hooks/useSimulation.ts
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Equipamento } from "../services/home/registerEquipamentos";
import { SimulationResult } from "../services/home/handleSimulation";

export type SimulationWithEquipamentos = SimulationResult & {
  equipamentos?: Equipamento[];
};

export function useSimulation(simulationId?: string) {
  const [simulacao, setSimulacao] = useState<SimulationWithEquipamentos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulationId) return;

    const fetchSimulation = async () => {
      setLoading(true);
      setError(null);

      try {
        const db = getFirestore();

        const docRef = doc(db, "simulations", simulationId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Simulação não encontrada");
        }

        const data = docSnap.data() as SimulationResult;

        // Buscar equipamentos relacionados
        const equipamentosRef = collection(db, "equipamentos");
        const q = query(equipamentosRef, where("simulation", "==", simulationId));
        const querySnapshot = await getDocs(q);

        const equipamentos: Equipamento[] = [];
        querySnapshot.forEach(doc => {
          equipamentos.push(doc.data() as Equipamento);
        });

        setSimulacao({ ...data, equipamentos });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [simulationId]);

  return { simulacao, loading, error };
}
