import { View, StyleSheet, ScrollView, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import { Text, Button, Surface, ActivityIndicator, Avatar, Card, Divider } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import StatusIndicator from '@/src/components/StatusIndicator';
import { useSimulation } from '@/src/hooks/useSimulation';
import { deleteSimulation } from '@/src/services/home/deleteSimulation';
import { LoadingButton } from '@/src/components/LoadingButton';

const statusBarHeight: number = (StatusBar.currentHeight ?? 30);
const { width } = Dimensions.get('window');

export default function showSimulation() {
  const router = useRouter();
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const { simulacao, loading, error } = useSimulation(simulationId);

  const handleDeleteSimulation = async () => {
    await deleteSimulation(simulationId);
    router.back();
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  if (!simulacao) {
    return <Text>Simulação não encontrada</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 40, color: "#08364E" }}>Simulação </Text>
          <Avatar.Image size={80} style={{alignSelf: 'flex-end'}} source={require('../../assets/final.png')} />
        </View>
        <View style={styles.corpo}>
            <Card style={styles.card}>
            <Card.Title title="#123456789swdwdwsdsd" subtitle={ simulacao?.createdAt?.toDate().toLocaleDateString() ?? "Data nao disponivel"}/>
            <Card.Content>
              <Text style={styles.cardLabel}>Código da Unidade Consumidora: <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.codigoUC}</Text></Text>
              <Text style={styles.cardLabel}>Maior consumo mensal (kWh/mês):  <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.consumo}</Text></Text>
              <Text style={styles.cardLabel}>Localização completa: <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.localizacao}</Text></Text>
              <Text style={styles.cardLabel}>Tiṕo de Imóvel: <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.tipoImovel}</Text></Text>

              <Text style={styles.cardLabel}>Possui Espaço pra Instalção: <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.espacoInstalacao}</Text></Text>

              <Text style={styles.cardLabel}>Área disponível no telhado (m²): <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.areaTelhado}</Text></Text>

              <Text style={styles.cardLabel}>Tipo de ligação: <Text style={{ fontWeight: "bold" }}>{simulacao?.dadosIniciais.tipoLigacao}</Text></Text>

              
              <Divider style={{ marginVertical: 10 }} />

              <Text style={styles.cardLabel}>Tamanho Estimado: <Text style={{ fontWeight: "bold" }}>{simulacao?.tamanhoSistema}(kWp)</Text></Text>
              <Text style={styles.cardLabel}>Economia Mensal Estimada: <Text style={{ fontWeight: "bold" }}>{simulacao?.economiaMes}</Text></Text>
              <Text style={styles.cardLabel}>Economia Anual Estimada: <Text style={{ fontWeight: "bold" }}>{simulacao?.economiaAno}</Text></Text>
              <Divider style={{ marginVertical: 10 }} />
              
              {simulacao?.equipamentos && simulacao.equipamentos.length > 0 && (
                <View>
                  <Text style={styles.cardLabel}>Equipamentos:</Text>
                  <View style={styles.cardEquipamentos}>
                    {simulacao.equipamentos.map((equipamento, index) => (
                      <View key={index}>
                        <Text style={{ fontWeight: "bold" }}>{equipamento.nome} x{equipamento.qtd}</Text>
                        <Text> - Consumo Por Mês (kWh/mês): <Text style={{ fontWeight: "bold" }}>{equipamento.kilowatts_hora_mes}</Text> </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <Divider style={{ marginVertical: 10 }} />

              <View>
                <Text>Status: </Text>
                <StatusIndicator status={simulacao?.status ?? ""} />
              </View>
            </Card.Content>
            <Card.Actions style={{ flexDirection: "column" }}>
              <LoadingButton onPressFunction={handleDeleteSimulation} texto="Excluir" />
              <LoadingButton onPressFunction={() => router.replace('/home')} texto="Home" />
            </Card.Actions>
          </Card>

        </View>
        <Button mode="contained" style={styles.button} onPress={() => router.replace('/home')}>
          Voltar
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 17
  },
  cardEquipamentos: {
    gap: 10,
    marginTop: 5
  },
  button: {
    backgroundColor: '#08364E',
    marginTop: 20,
    marginBottom: 30,
    width: '90%', // Ajustei para 90% para ser responsivo
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: statusBarHeight,
    textAlign: 'center',
    alignSelf: 'flex-start',
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    width: '100%',
  },
  corpo: {
    padding: 20,
    gap: 30,
    borderColor: "#08364E",
    width: width * 0.9,
    alignSelf: 'center',
  },
});