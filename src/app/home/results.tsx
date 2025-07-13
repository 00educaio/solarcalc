import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SimulationResult } from '@/src/services/home/registerSimulation';
import { collection, doc, Firestore, getDoc, getDocFromCache, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Equipamento } from '@/src/services/home/registerEquipamentos';

type SimulationWithEquipamentos = SimulationResult & {
  equipamentos?: Equipamento[];
};
export default function ResultsScreen() {
  const router = useRouter();
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const [simulacao, setSimulacao] = useState<SimulationWithEquipamentos | null>(null);

  useEffect(() => {
    const getSimulation = async () => {
      const db: Firestore = getFirestore();
      const docRef = doc(db, "simulations", simulationId); 
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data() as SimulationResult;
  
        // 👇 Buscar os equipamentos relacionados à simulação
        const equipamentosRef = collection(db, "equipamentos");
        const q = query(equipamentosRef, where("simulation", "==", simulationId));
        const querySnapshot = await getDocs(q);
        const equipamentos: Equipamento[] = [];
  
        querySnapshot.forEach(doc => {
          const equipamento = doc.data() as Equipamento;
          equipamentos.push(equipamento);
        });
  
        setSimulacao({ ...data, equipamentos }); 
      } else {
        throw new Error("Simulação não encontrada");
      }
    };
  
    getSimulation();
  }, [simulationId]);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados da Simulação</Text>

      {simulacao && (
        <Surface style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>📊 Tamanho estimado do sistema (kWp): </Text>
            <Text style={styles.value}>{simulacao.tamanhoSistema ?? 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>📦 Quantidade de painéis necessários: </Text>
            <Text style={styles.value}>{simulacao.qtdPaineis ?? 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>💰 Economia estimada na conta: </Text>
            <Text style={styles.value}>{simulacao.economia ?? 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>💵 Estimativa de custo do projeto: </Text>
            <Text style={styles.value}>{simulacao.custoProjeto ?? 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>📈 Estimativa de retorno do investimento (Payback): </Text>
            <Text style={styles.value}>{simulacao.payback ?? 'N/A'}</Text>
          </View>

          {simulacao.equipamentos?.map((equipamento, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.label}>{equipamento.nome}: </Text>
              <Text style={styles.value}>{equipamento.kilowatts_hora_mes}</Text>
            </View>
          ))}
        </Surface>
        
      )}

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => alert('Proposta solicitada!')}
      >
        Solicitar Proposta
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => router.push('/home/simulation')}
      >
        Nova Simulação
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 24,
    color: '#08364E',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginBottom: 24,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: '600',
    color: '#08364E',
    flexShrink: 1,
  },
  value: {
    fontWeight: '700',
    color: '#000',
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#08364E',
  },
});
