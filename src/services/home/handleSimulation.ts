import { router } from "expo-router";
import { addDoc, collection, Firestore, getFirestore, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";
import { Equipamento, registerEquipamentos } from "./registerEquipamentos";
import { Alert } from "react-native";

export type SimulationData = {
  codigoUC: string,
  consumo: string,
  localizacao: string,
  tipoImovel: string,
  espacoInstalacao: string,
  areaTelhado: string,
  tipoLigacao: string,
}

export enum Status {
  PENDENTE = 'Pendente',
  ACEITO = 'Aceito',
  RECUSADO = 'Recusado',
  CONCLUIDO = 'Concluido' //Usado para simulacoes sem empresas
}
export type SimulationResult = {
  id?: string;
  dadosIniciais: SimulationData;
  tamanhoSistema?: string;
  // qtdPaineis?: number;
  economiaMes?: string;
  economiaAno?: string;
  // custoProjeto?: number;
  payback?: string;
  status: Status;
  equipamentos?: Equipamento[];
  createdAt?: Timestamp;
}

export const simulationManager = async (dadosSimulacao: SimulationData, equipamentos: Equipamento[]) => {
    
  const isEmpty = Object.values(dadosSimulacao).some(value => value === '');
  if (isEmpty) {
    Alert.alert("Preencha todos os campos");
    return;
  }
    try {
      const resultado: SimulationResult = calcSimulation(dadosSimulacao, equipamentos);
      const docId = await saveSimulation(resultado, equipamentos);
      router.replace({
          pathname: '/home/results',
          params: {
            simulationId: docId,
          },
        },        
      );
    } catch (error) {
      console.error("Erro na simulação:", error);
      Alert.alert("Erro ao realizar a simulação");

    }
}

const calcSimulation = (dados: SimulationData, equipamentos: Equipamento[]) : SimulationResult => {
    const consumoEquipamentos = equipamentos.reduce((total, equipamento) => total + parseInt(equipamento.kilowatts_hora_mes), 0);
    const consumo = parseInt(dados.consumo);
    if (isNaN(consumo)) {
      throw new Error("Consumo inválido");
    }
    const consumoTotal = consumo + consumoEquipamentos;
    dados.consumo = consumoTotal.toString();
    const systemSize = consumoTotal / 120;
    const retorno = "3 anos";
    const economyMonth = (systemSize * 102);
    const economyAnual = economyMonth * 12
    const economyMonthFormatted = economyMonth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const economyAnualFormatted = economyAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const simulationResult: SimulationResult = {
      dadosIniciais: dados,
      tamanhoSistema: systemSize.toFixed(2),
      economiaMes: economyMonthFormatted,
      economiaAno: economyAnualFormatted,
      payback: retorno,
      status: Status.CONCLUIDO,
      createdAt: Timestamp.fromDate(new Date()),      
    };
    return simulationResult;
}

const saveSimulation = async (data: SimulationResult, equipamentos: Equipamento[]) : Promise<string> => {
  const db: Firestore = getFirestore();
  const user: User | null = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  const docRef = await addDoc(collection(db, "simulations"), {
    user: user.uid,
    ...data,
  });
  const docId = docRef.id;
  
  if (equipamentos.length > 0) {
    await registerEquipamentos(equipamentos, docId);
    
  }
  console.log("Simulação salva com sucesso");
  return docId;
  
}