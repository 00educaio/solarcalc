import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface, ActivityIndicator } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

type ProposalStatusParams = {
  nomeProjeto?: string;
  dataEnvio?: string;
  status?: 'Enviado' | 'Em análise' | 'Concluído';
};

export default function ProposalStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as ProposalStatusParams;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(params.status ?? 'Enviado');

  const atualizarStatus = () => {
    setLoading(true);
    setTimeout(() => {
      if (status === 'Enviado') setStatus('Em análise');
      else if (status === 'Em análise') setStatus('Concluído');
      else setStatus('Concluído');
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Em análise':
        return '#FFC107'; // amarelo
      case 'Concluído':
        return '#4CAF50'; // verde
      default:
        return '#9E9E9E'; // cinza
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Status da Proposta</Text>

      <Surface style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📄 Nome do projeto: </Text>
          <Text style={styles.value}>{params.nomeProjeto ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📅 Data de envio: </Text>
          <Text style={styles.value}>{params.dataEnvio ?? 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>🟡 Status: </Text>
          <Text style={[styles.value, { color: getStatusColor() }]}>{status}</Text>
        </View>
      </Surface>

      {loading ? (
        <ActivityIndicator animating size="large" style={{ marginVertical: 20 }} />
      ) : (
        <Button mode="contained" style={styles.button} onPress={atualizarStatus}>
          Atualizar Status
        </Button>
      )}

      <Button mode="outlined" style={styles.button} onPress={() => router.push('/home')}>
        Voltar para Início
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
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#08364E',
  },
});
