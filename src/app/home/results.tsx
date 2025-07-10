import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SimulationResult } from '@/src/services/home/registerSimulation';


export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as SimulationResult;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados da Simulação</Text>

      <Surface style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📊 Tamanho estimado do sistema (kWp): </Text>
          <Text style={styles.value}>{params.tamanhoSistema ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📦 Quantidade de painéis necessários: </Text>
          <Text style={styles.value}>{params.qtdPaineis ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>💰 Economia estimada na conta: </Text>
          <Text style={styles.value}>{params.economia ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>💵 Estimativa de custo do projeto: </Text>
          <Text style={styles.value}>{params.custoProjeto ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📈 Estimativa de retorno do investimento (Payback): </Text>
          <Text style={styles.value}>{params.payback ?? 'N/A'}</Text>
        </View>
      </Surface>

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
