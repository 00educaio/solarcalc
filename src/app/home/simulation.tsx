import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, RadioButton, Divider, Menu, Avatar, Provider } from 'react-native-paper';
import {  simulation } from '../../services/home/registerSimulation';
import { SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import equipamentoJsons from '../../assets/equipamentos.json';
import { Equipamento } from '@/src/services/home/registerEquipamentos';

const statusBarHeight: number = (StatusBar.currentHeight ?? 30);
const { width } = Dimensions.get('window');
const equipamentoJson = equipamentoJsons as Equipamento[];
export default function SimulacaoScreen() {
    const [codigoUC, setCodigoUC] = useState('');
    const [consumo, setConsumo] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [tipoImovel, setTipoImovel] = useState('');
    
    const [espacoInstalacao, setEspacoInstalacao] = useState('Sim');
    const [areaTelhado, setAreaTelhado] = useState('');
    const [tipoLigacao, setTipoLigacao] = useState('');
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);

    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamento | null>(null);
    const [equipamentoQtd, setEquipamentoQtd] = useState('1');
    const simularSistema = () => {
      simulation(codigoUC, consumo, localizacao, tipoImovel, espacoInstalacao, areaTelhado, tipoLigacao, equipamentos);      
    };
    
    const addEquipamento = () => {
      if (selectedEquipamento && parseInt(equipamentoQtd)) {
        const newEquipamento : Equipamento = { ...selectedEquipamento, qtd: parseInt(equipamentoQtd) };
        setEquipamentos([...equipamentos, newEquipamento]);
        setSelectedEquipamento(null);
        setEquipamentoQtd('1')
      }
      else {
        alert('Selecione um equipamento');
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
          <Provider>
            <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
              <View style={styles.header}>
                <Text style={{ fontSize: 40, color: "#08364E" }}>Simulação</Text>
                <Avatar.Image size={80} style={{alignSelf: 'flex-end'}} source={require('../../assets/final.png')} />
              </View>
              <View style={styles.card}>
                <TextInput label="Código da Unidade Consumidora" value={codigoUC} onChangeText={setCodigoUC} style={styles.input} />
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
                <Picker
                  selectedValue={selectedEquipamento}
                  onValueChange={(itemValue) => setSelectedEquipamento(itemValue as Equipamento)}
                  style={styles.picker}
                  mode="dropdown"
                  >
                  <Picker.Item label="Selecione o equipamento" value={equipamentoJson[0].nome} />
                  {equipamentoJson.map((item, index) => (
                    <Picker.Item key={index} label={item.nome} value={item} />
                  ))}                  

                </Picker>
                <TextInput
                  label="Quantidade"
                  value={equipamentoQtd}
                  onChangeText={setEquipamentoQtd}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Button onPress={addEquipamento} mode="outlined" style={{ marginVertical: 10, width: '100%'}}>
                  Adicionar equipamento selecionado
                </Button>

                {equipamentos.length > 0 && (
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text style={styles.label}>Equipamentos Adicionados:</Text>
                    {equipamentos.map((eq, index) => (
                      <View key={index} style={styles.equipamentoBox}>
                        <Text>Nome: {eq.nome}</Text>
                        <Text>Consumo/hora: {eq.consumo_por_hora_kwh} kWh</Text>
                        <Text>Potência: {eq.potencia_watts} Watts</Text>
                        <Text>Quantidade: {eq.qtd}</Text>
                      </View>
                    ))}
                  </View>
                )}

              </View>
              <Button mode="contained" onPress={simularSistema} style={styles.button}>
                Simular Sistema Ideal
              </Button>
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
      height: 50,
      color: '#000',
    },
  });