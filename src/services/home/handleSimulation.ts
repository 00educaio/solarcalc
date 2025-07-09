export type Equipamento = {
  nome: string;
  potencia: string;
  quantidade: string;
  uso: string;
};
export const simulation = (codigoUC: string, consumo: string, localizacao: string, tipoImovel: string, espacoInstalacao: string, areaTelhado: string, tipoLigacao: string, equipamentos: Equipamento[]) => {

    console.log('codigoUC', codigoUC);
    console.log('consumo', consumo);
    console.log('localizacao', localizacao);
    console.log('tipoImovel', tipoImovel);
    console.log('espacoInstalacao', espacoInstalacao);
    console.log('areaTelhado', areaTelhado);
    console.log('tipoLigacao', tipoLigacao);
    console.log('equipamentos', equipamentos.length);
    
    equipamentos.forEach(equipamento => {
      console.log('equipamento', equipamento);
    })
}
