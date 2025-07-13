import { router } from "expo-router";
import { addDoc, collection, Firestore, getFirestore, Timestamp } from "firebase/firestore";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";
import { Equipamento, registerEquipamentos } from "./registerEquipamentos";

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
  tamanhoSistema?: number;
  qtdPaineis?: number;
  economia?: number;
  custoProjeto?: number;
  payback?: number;
  status: Status;
  equipamentos?: Equipamento[];
  createdAt?: Timestamp;
}

export const simulationManager = async (dadosSimulacao: SimulationData, equipamentos: Equipamento[]) => {

    try {
      const resultado: SimulationResult = calculoMock(dadosSimulacao);
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
      alert("Erro ao realizar a simulação");

    }
}

//Brincando
const calculoMock = (dados: SimulationData) : SimulationResult => {
    const numberRamdom = (final: number) : number => {
        return Math.floor(Math.random() * final)
    };

    const simulationResult: SimulationResult = {
      dadosIniciais: dados,
      tamanhoSistema: numberRamdom(1000),
      qtdPaineis: numberRamdom(100),
      economia: numberRamdom(10000),
      custoProjeto: numberRamdom(100),
      payback: numberRamdom(100),
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