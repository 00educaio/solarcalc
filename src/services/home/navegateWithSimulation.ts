import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SimulationResult } from "./registerSimulation";
import { Equipamento } from "./registerEquipamentos";

export type SimulationWithEquipamentos = SimulationResult & {
  equipamentos?: Equipamento[];
};

export const navegateWithSimulation = async (
  simulacaoId: string,
  route: string
) => {
  await AsyncStorage.setItem("currentSimulation", simulacaoId);
  router.replace(route as any); // <- agora está correto
  console.log("Indo para", route);
};
