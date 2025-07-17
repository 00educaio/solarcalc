import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, RadioButton, Divider, Avatar, Provider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { simulationManager, SimulationData } from '../../services/home/handleSimulation';
import { Equipamento } from '@/src/services/home/registerEquipamentos';
import ModalEquipamento from '@/src/components/ModalEquipamento';
import { LoadingButton } from '@/src/components/LoadingButton';

const statusBarHeight: number = (StatusBar.currentHeight ?? 30);
const { width } = Dimensions.get('window');

export default function SimulacaoScreen() {
    const [codigoUC, setCodigoUC] = useState('');
    const [consumo, setConsumo] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [tipoImovel, setTipoImovel] = useState('');
    
    const [espacoInstalacao, setEspacoInstalacao] = useState('Sim');
    const [areaTelhado, setAreaTelhado] = useState('');
    const [tipoLigacao, setTipoLigacao] = useState('');

    const [equipamentosProntos, setEquipamentosProntos] = useState<Equipamento[]>([]);
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamento | null>(null);
    

    useEffect(() => {
      const fetchEquipamentosPadrao = async () => {
        try {
          const db = getFirestore();
          const snapshot = await getDocs(collection(db, "equipamentos_padrao"));
          const dados = snapshot.docs.map(doc => ({
            ...doc.data(),
          })) as Equipamento[];
          setEquipamentosProntos(dados);
        } catch (error) {
          console.error("Erro ao buscar equipamentos:", error);
        }
      };
      
      fetchEquipamentosPadrao();
    
    }, []);
    

    const simularSistema = async () => {
      const simulationData: SimulationData = {
        codigoUC: codigoUC,
        consumo: consumo,
        localizacao: localizacao,
        tipoImovel: tipoImovel,
        espacoInstalacao: espacoInstalacao,
        areaTelhado: areaTelhado,
        tipoLigacao: tipoLigacao,
      
      }
      await simulationManager(simulationData, equipamentos);      
    };
    
    const addEquipamento = () => {
      if (selectedEquipamento) {
        const newEquipamento : Equipamento = { ...selectedEquipamento };
        setEquipamentos([...equipamentos, newEquipamento]);
        setSelectedEquipamento(null);
      }
      else {
        alert('Selecione um equipamento');
      }
    };
    
    const removeEquipamento = (index: number) => {
      const newEquipamentos = [...equipamentos];
      newEquipamentos.splice(index, 1);
      setEquipamentos(newEquipamentos);
    };

    return (
      <SafeAreaView style={{ flex: 1, marginBottom: 46, }}>
        <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
          <Provider>
            <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
              <View style={styles.header}>
                <Text style={{ fontSize: 30, color: "#08364E" }}>Simulação</Text>
                <Avatar.Image size={80} style={{alignSelf: 'flex-end'}} source={require('../../assets/final.png')} />
              </View>
              <View style={styles.card}>
                <TextInput label="Código da Unidade Consumidora" value={codigoUC} onChangeText={setCodigoUC} keyboardType="numeric" style={styles.input} />
                <TextInput label="Maior consumo mensal (kWh/mês)" value={consumo} onChangeText={setConsumo} keyboardType="numeric" style={styles.input} />
                <TextInput label="Localização completa" value={localizacao} onChangeText={setLocalizacao} style={styles.input} />
                
                <View><Text style={styles.label}>Tipo de imóvel</Text></View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={tipoImovel}
                    onValueChange={(itemValue) => setTipoImovel(itemValue as string)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione o tipo de imóvel" value="" />
                    {['Residencial', 'Comercial', 'Industrial'].map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </View>
                
                <Text style={styles.label}>Possui espaço para instalação?</Text>
                <RadioButton.Group onValueChange={setEspacoInstalacao} value={espacoInstalacao}>
                  <View style={styles.radioGroup}>
                    <RadioButton.Item label="Sim" value="Sim" />
                    <RadioButton.Item label="Não" value="Não" />
                  </View>
                </RadioButton.Group>
                
                <TextInput label="Área disponível no telhado (m²)" value={areaTelhado} onChangeText={setAreaTelhado} keyboardType="numeric" style={styles.input} />
                
                <Text style={styles.label}>Tipo de ligação</Text>
                <RadioButton.Group onValueChange={setTipoLigacao} value={tipoLigacao}>
                  <View style={styles.radioGroup}>
                    <RadioButton.Item label="Monofásica" value="Monofásica" />
                    <RadioButton.Item label="Trifásica" value="Trifásica" />
                  </View>
                </RadioButton.Group>
                <Divider style={{ marginVertical: 10 }} />

                <Text style={styles.subtitulo}>Equipamentos Elétricos Extras</Text>
                
                {equipamentosProntos.length === 0 ? (
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                  <ActivityIndicator size="large" color="#08364E" />
                  <Text>Carregando equipamentos...</Text>
                </View>
                ) : (
                  <Picker
                    selectedValue={selectedEquipamento}
                    onValueChange={(itemValue) => setSelectedEquipamento(itemValue as Equipamento | null)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione o equipamento" value={equipamentosProntos[0].nome} />
                    {equipamentosProntos.map((item, index) => (
                      <Picker.Item key={index} label={item.nome} value={item} />
                    ))}
                  </Picker>
              )}
                <Button onPress={addEquipamento} mode="outlined" style={{ marginVertical: 10, width: '100%'}}>
                  Adicionar equipamento selecionado
                </Button>

                <ModalEquipamento onSubmit={(equipamento) => setEquipamentos([...equipamentos, equipamento])} />
                
                {equipamentos.length > 0 && (
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text style={styles.label}>Equipamentos Adicionados:</Text>
                    {equipamentos.map((eq, index) => (
                      <View key={index} style={styles.equipamentoBox}>
                        <Text>Nome: {eq.nome}</Text>
                        <Text>Kilowatts/hora mês: {eq.kilowatts_hora_mes} kWh/mês</Text>
                        <Button onPress={() => removeEquipamento(index)} mode="outlined" style={{ marginVertical: 10, width: '100%', borderWidth: 1, height: 40}}>
                          Remover
                        </Button>
                      </View>
                    ))}
                    

                  </View>
                )}

              </View>

              <LoadingButton onPressFunction={simularSistema} texto="Cadastrar" />
              
            </ScrollView>
          </Provider>
        </KeyboardAvoidingView>
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
    // Estilo para TextInputs dentro do card principal
    input: {
      borderWidth: 1,
      borderColor: "#08364E",
      borderRadius: 10,
      backgroundColor: "#ffffff",
      marginBottom: 16,
      width: '100%', // Use 100% da largura do contêiner pai
      height: 50,
    },
    // Estilo para TextInputs dentro de equipamentoBox (se precisar de largura diferente)
    inputEquipamento: {
      borderWidth: 1,
      borderColor: "#08364E",
      borderRadius: 10,
      backgroundColor: "#ffffff",
      marginBottom: 16,
      width: '100%', // Também 100% da largura do seu contêiner (equipamentoBox)
      height: 50,
    },
    label: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      alignSelf: 'flex-start',
    },
    radioGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: 16,
    },
    subtitulo: {
      fontSize: 18,
      marginBottom: 8,
      fontWeight: 'bold',
      color: '#08364E'
    },
    equipamentoBox: {
      marginBottom: 16,
      padding: 10,
      backgroundColor: '#f5f5f5', // Corrigi para um tom de cinza, `fffff` não é uma cor válida
      borderRadius: 8,
      width: '100%',
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
    card: {
      padding: 20,
      borderRadius: 12,
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: "#08364E",
      width: width * 0.9,
      alignSelf: 'center',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#08364E",
      borderRadius: 10,
      backgroundColor: "#ffffff",
      marginBottom: 16,
      width: '100%',
      overflow: 'hidden',
    },
    picker: {
      width: '100%',
      height: 60,
      color: '#000',
    },
  });