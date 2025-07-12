// src/services/seedEquipamentosPadrao.ts
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { equipamentosPadrao } from "../assets/equipamentosPadrao";

export const seedEquipamentosPadrao = async () => {
  const db = getFirestore();
  const equipamentosRef = collection(db, "equipamentos_padrao");

  for (const equipamento of equipamentosPadrao) {
    try {
      // Verifica se já existe equipamento com o mesmo nome
      const q = query(equipamentosRef, where("nome", "==", equipamento.nome));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        console.log(`Equipamento já existe: ${equipamento.nome}`);
        continue;
      }

      // Se não existe, adiciona
      await addDoc(equipamentosRef, equipamento);
      console.log(`Equipamento inserido: ${equipamento.nome}`);
    } catch (error) {
      console.error(`Erro ao inserir ${equipamento.nome}:`, error);
    }
  }

  console.log("Seed de equipamentos padrão finalizada.");
};
