import { router } from "expo-router";
import { addDoc, collection, doc, Firestore, getFirestore, setDoc } from "firebase/firestore";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";

export type Equipamento = {
  nome: string;
  potencia: string;
  quantidade: string;
  uso: string;
};

export type SimulationResult = {
  tamanhoSistema?: number;
  qtdPaineis?: number;
  economia?: number;
  custoProjeto?: number;
  payback?: number;
}
export const simulation = async (codigoUC: string, consumo: string, localizacao: string, tipoImovel: string, espacoInstalacao: string, areaTelhado: string, tipoLigacao: string, equipamentos: Equipamento[]) => {

    // console.log('codigoUC', codigoUC);
    // console.log('consumo', consumo);
    // console.log('localizacao', localizacao);
    // console.log('tipoImovel', tipoImovel);
    // console.log('espacoInstalacao', espacoInstalacao);
    // console.log('areaTelhado', areaTelhado);
    // console.log('tipoLigacao', tipoLigacao);
    // console.log('equipamentos', equipamentos.length);
    
    // equipamentos.forEach(equipamento => {
    //   console.log('equipamento', equipamento);
    // })
    try {
      const resultado: SimulationResult = calculoMock();
      await saveSimulation(resultado);
      router.replace({
          pathname: '/home/results',
          params: {
            tamanhoSistema: resultado.tamanhoSistema,
            qtdPaineis: resultado.qtdPaineis,
            economia: resultado.economia,
            custoProjeto: resultado.custoProjeto,
            payback: resultado.payback,
          },
        },        
      );
    } catch (error) {
      console.error("Erro na simulação:", error);
      alert("Erro ao realizar a simulação");

    }
}

//Brincando
const calculoMock = () : SimulationResult => {

    const numberRamdom = (final: number) : number => {
        return Math.floor(Math.random() * final)
    };

    const Simulationresult: SimulationResult = {
      tamanhoSistema: numberRamdom(1000),
      qtdPaineis: numberRamdom(100),
      economia: numberRamdom(10000),
      custoProjeto: numberRamdom(100),
      payback: numberRamdom(100),
    };
    return Simulationresult;
}

const saveSimulation = async (data: SimulationResult) : Promise<void> => {
  const db: Firestore = getFirestore();
  const user: User | null = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  await addDoc(collection(db, "simulations"), {
    user: user.uid,
    ...data,
    createdAt: new Date(),
  });
  console.log("Simulação salva com sucesso");
  
}