import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, Avatar, Card } from 'react-native-paper';
import { SimulationResult } from '../../services/home/registerSimulation'; // Ajuste o caminho conforme necessário
import { getAllSimulationsAndEquipments } from '@/src/services/home/getAllSimulation';

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
                    <Text style={{ fontSize: 40, color: "#08364E" }}>Resultados</Text>
                    <Avatar.Image size={80} style={{ alignSelf: 'flex-end' }} source={require('../../assets/final.png')} />
                </View>

                {simulations.length === 0 ? (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>Nenhuma simulação encontrada.</Text>
                        <Text style={styles.noResultsSubText}>Faça uma simulação para ver seus resultados aqui!</Text>
                    </View>
                ) : (
                    <View style={styles.resultsList}>
                        {simulations.map((x, index) => (
                            <Card key={index} style={styles.resultCard}>
                                <Card.Content>
                                    <Text style={styles.cardTitle}>Simulação #{index + 1} -- {x.createdAt ? x.createdAt.toDate().toLocaleDateString(): "Data desconhecida" }</Text>
                                    <Text style={styles.cardLabel}>📊 Tamanho estimado do sistema (kWp): {x.tamanhoSistema}</Text>
                                    <Text style={styles.cardLabel}>📦 Quantidade de painéis necessários: {x.qtdPaineis}</Text>
                                    <Text style={styles.cardLabel}>💰 Economia estimada na conta: {x.economia}</Text>
                                    <Text style={styles.cardLabel}>💵 Estimativa de custo do projeto: {x.custoProjeto}</Text>
                                    {x.equipamentos && x.equipamentos.map((equipamento, index) => (
                                    <View>
                                        <Text> Equipamento #{index + 1}</Text>
                                        <Text> Nome: {equipamento.nome}</Text>
                                        <Text> Consumo: {equipamento.consumo_por_hora_kwh}</Text>
                                        <Text> Pontecia: {equipamento.potencia_watts}</Text>
                                        <Text> Quantidade: {equipamento.qtd}</Text>

                                    </View>    
                                    ))}
                                </Card.Content>

                            </Card>
                        ))}
                    </View>
                )}
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
    header: {
        flexDirection: 'row',
        marginTop: statusBarHeight,
        alignSelf: 'flex-start',
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        width: '100%',
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
    cardLabel: {
        fontWeight: 'bold',
        color: '#08364E',
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