import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, Avatar, Card, Divider, Button } from 'react-native-paper';
import { SimulationResult } from '../../services/home/registerSimulation'; // Ajuste o caminho conforme necessário
import { getAllSimulationsAndEquipments } from '@/src/services/home/getAllSimulation';
import StatusIndicator from '@/src/components/StatusIndicator';
import { FontAwesome5 } from '@expo/vector-icons';
import { navegateWithSimulation, SimulationWithEquipamentos } from '@/src/services/home/navegateWithSimulation';
import { router } from 'expo-router';

const LeftContent = (props: any) => (
  <Avatar.Icon
    {...props}
    style={{ backgroundColor: '#f39c12' }} // cor de fundo
    icon={() => (
      <FontAwesome5 name="solar-panel" size={20} color="white" /> // cor do ícone
    )}
  />
);
const statusBarHeight: number = (StatusBar.currentHeight ?? 30);
const { height, width } = Dimensions.get('window');

export default function SimulationResultsScreen() {
    const [simulations, setSimulations] = useState<SimulationResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSimulations = async () => {
            try {
                const results = await getAllSimulationsAndEquipments();
                setSimulations(results);
            } catch (err) {
                setError("Não foi possível carregar as simulações. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSimulations();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#08364E" />
                <Text style={styles.loadingText}>Carregando simulações...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Text style={styles.errorSubText}>Por favor, tente recarregar a tela.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <View style={styles.header}>
              <Text style={{ fontSize: 40, color: "#08364E" }}>Suas Simulações </Text>
              <Avatar.Image size={80} style={{alignSelf: 'flex-end'}} source={require('../../assets/final.png')} />
            </View>
            <View style={styles.corpo}>
                {simulations.map((data, index) => (
                    <Card style={styles.card} key={index}>
                    <Card.Title title="Simulação #123456789swdwdwsdsd" subtitle={data.createdAt?.toDate().toLocaleString() ?? "Data nao disponivel"} left={LeftContent} />
                    <Card.Content>
                    <Text style={styles.cardLabel}>Tamanho Estimado: <Text style={{ fontWeight: "bold" }}>{data.tamanhoSistema} (kWp)</Text></Text>
                    <Text style={styles.cardLabel}>Painel(is): <Text style={{ fontWeight: "bold" }}>{data.qtdPaineis}</Text></Text>
                    <Text style={styles.cardLabel}>Economia estimada: <Text style={{ fontWeight: "bold" }}>R$ {data.economia},00</Text></Text>
                    <Text style={styles.cardLabel}>Custo estimado: <Text style={{ fontWeight: "bold" }}>R$ {data.custoProjeto},00</Text></Text>
                    
                    <Divider style={{ marginVertical: 10 }} />
                    
                    <Text style={styles.cardLabel}>Equipametos Extras: </Text>
                    {data.equipamentos && data.equipamentos.length > 0 ? (
                        <View>
                        {data.equipamentos.map((eq, index) => (
                            <Text>{eq.nome} x{eq.qtd}</Text>
                            
                        ))}
                        </View>
                        
                    ):
                    <Text>Sem Equipamentos Extras</Text>
                    }
                    
                    <Divider style={{ marginVertical: 10 }} />
    
                    <View>
                        <Text>Status: </Text>
                        <StatusIndicator status={data.status ?? ''} />
                    </View>
                    </Card.Content>
                    <Card.Actions>
                    <Button mode="contained" 
                      style={styles.button} 
                      onPress={() => router.replace({
                        pathname: '/home/results',
                        params: {
                          simulationId: data.id,
                        },
                      })}>

                        Detalhes
                    </Button>
                    </Card.Actions>
                    </Card>
                    
                ))}
  
            </View>
            <Button mode="contained" style={styles.button} onPress={() => router.back()}>
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
        fontSize: 17,
        fontWeight: 'bold',
        color: '#08364E',
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

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#08364E',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    errorSubText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    noResultsContainer: {
        flex: 1, // Permite que ocupe o espaço restante para centralizar
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: height * 0.5, // Garante que ocupe pelo menos metade da tela para centralizar melhor
    },
    noResultsText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#08364E',
        textAlign: 'center',
        marginBottom: 10,
    },
    noResultsSubText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    resultsList: {
        width: width * 0.9, // Largura responsiva para a lista de cards
        alignSelf: 'center',
        marginTop: 20,
    },
    resultCard: {
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#08364E",
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#08364E',
    },
    cardParagraph: {
        fontSize: 15,
        marginBottom: 4,
        color: '#333',
    },
    equipamentosLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#08364E',
    },
    equipamentoItem: {
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 2,
        color: '#555',
    }
});