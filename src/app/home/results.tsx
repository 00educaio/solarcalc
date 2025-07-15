import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSimulation } from '@/src/hooks/useSimulation';

const statusBarHeight: number = (StatusBar.currentHeight ?? 30);
const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const router = useRouter();
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const { simulacao, loading, error } = useSimulation(simulationId);

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
          <Text style={{ fontSize: 40, color: "#08364E", width: "70%" }}>Detalhes da Simulação</Text>
          <Avatar.Image size={80} style={{alignSelf: 'flex-end'}} source={require('../../assets/final.png')} />
        </View>
        <View style={styles.corpo}>

          <View style={styles.card}>
            <Text style={styles.top}>Tamanho estimado do Sitema</Text>
            
            <View style={styles.bottom}>

              <FontAwesome5 name="sun" size={30} color="#08364E"/>
              <Text style={styles.texto}>{simulacao?.tamanhoSistema}kWp</Text>

            </View>
          
          </View>
          <View style={styles.card}>
            <Text style={styles.top}>Economia Estimada Mensal</Text>
            
            <View style={styles.bottom}>

              <FontAwesome5 name="solar-panel" size={30} color="#08364E"/>
              <Text style={styles.texto}>{simulacao?.economiaMes}</Text>

            </View>
          
          </View>
          <View style={styles.card}>
            <Text style={styles.top}>Economia Estimada Anual</Text>
            
            <View style={styles.bottom}>

              <FontAwesome5 name="chart-line" size={30} color="#08364E"/>
              <Text style={styles.texto}>R$ {simulacao?.economiaAno},00</Text>

            </View>
          </View>
          <View style={styles.banner}>
              <FontAwesome5 name="dollar-sign" size={45} color="#E3B402"/>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerText}>Payback</Text>
                <Text style={styles.bannerText}>{simulacao?.payback}</Text>
              </View>

          </View>
        </View>
        <Button mode="contained" style={styles.button} onPress={() => router.replace({
                                                                        pathname: '/home/showSimulation',
                                                                        params: {
                                                                          simulationId: simulationId,
                                                                        },
                                                                      })}>
          Ver Simulação
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
    width: width,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,

    width: "90%",
    height: 140,

    backgroundColor: "#E3B402",
    alignItems: "center",
    justifyContent: "space-around"

  },
  top: {
    color: "#08364E",
    fontSize: 20,
    textAlign: "center"

  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,

  },
  texto: {
    color: "#08364E",
    fontSize: 20,

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
    borderRadius: 12,
    alignItems: 'center',
    gap: 30,
    borderWidth: 1,
    borderColor: "#08364E",
    width: width * 0.9,
    alignSelf: 'center',
  },
  banner: {
    borderWidth: 1,
    borderRadius: 10,

    backgroundColor: '#08364E',


    height: 120,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"

  },
  bannerContent:{
    gap: 10,

  },
  bannerText: {
    color: "#E3B402",
    fontSize: 16,
    marginLeft: 10,

  }
});