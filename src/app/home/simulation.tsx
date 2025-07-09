import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, RadioButton, Divider, Menu, Provider } from 'react-native-paper';
import { Equipamento, simulation } from '../../services/home/handleSimulation';


export default function SimulacaoScreen() {
    const [codigoUC, setCodigoUC] = useState('');
    const [consumo, setConsumo] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [tipoImovel, setTipoImovel] = useState('');
    const [espacoInstalacao, setEspacoInstalacao] = useState('Sim');
    const [areaTelhado, setAreaTelhado] = useState('');
    const [tipoLigacao, setTipoLigacao] = useState('');
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  
    const [menuTipoImovelVisible, setMenuTipoImovelVisible] = useState(false);
    const [menuTipoLigacaoVisible, setMenuTipoLigacaoVisible] = useState(false);
  
    const addEquipamento = () => {
      setEquipamentos([...equipamentos, {
        nome: '',
        potencia: '',
        quantidade: '',
        uso: 'Imediato'
      }]);
    };
  
    const updateEquipamento = (index: number, field: keyof Equipamento, value: string) => {
      const novos = [...equipamentos];
      novos[index] = {
        ...novos[index],
        [field]: value
      };
      setEquipamentos(novos);
    };
  
    const simularSistema = () => {
      simulation(codigoUC, consumo, localizacao, tipoImovel, espacoInstalacao, areaTelhado, tipoLigacao, equipamentos);      
    };
  
    return (
      <Provider>
        <ScrollView style={styles.container}>
          <TextInput label="Código da Unidade Consumidora" value={codigoUC} onChangeText={setCodigoUC} style={styles.input} />
          <TextInput label="Maior consumo mensal (kWh/mês)" value={consumo} onChangeText={setConsumo} keyboardType="numeric" style={styles.input} />
          <TextInput label="Localização completa" value={localizacao} onChangeText={setLocalizacao} style={styles.input} />
  
          <Menu
            visible={menuTipoImovelVisible}
            onDismiss={() => setMenuTipoImovelVisible(false)}
            anchor={
              <TextInput
                label="Tipo de imóvel"
                value={tipoImovel}
                onFocus={() => setMenuTipoImovelVisible(true)}
                style={styles.input}
              />
            }
          >
            {['Residencial', 'Comercial', 'Industrial'].map((item) => (
              <Menu.Item key={item} onPress={() => { setTipoImovel(item); setMenuTipoImovelVisible(false); }} title={item} />
            ))}
          </Menu>
  
          <Text style={styles.label}>Possui espaço para instalação?</Text>
          <RadioButton.Group onValueChange={setEspacoInstalacao} value={espacoInstalacao}>
            <View style={styles.radioGroup}>
              <RadioButton.Item label="Sim" value="Sim" />
              <RadioButton.Item label="Não" value="Não" />
            </View>
          </RadioButton.Group>
  
          <TextInput label="Área disponível no telhado (m²)" value={areaTelhado} onChangeText={setAreaTelhado} keyboardType="numeric" style={styles.input} />
  
          <Menu
            visible={menuTipoLigacaoVisible}
            onDismiss={() => setMenuTipoLigacaoVisible(false)}
            anchor={
              <TextInput
                label="Tipo de ligação"
                value={tipoLigacao}
                onFocus={() => setMenuTipoLigacaoVisible(true)}
                style={styles.input}
              />
            }
          >
            {['Monofásica', 'Trifásica'].map((item) => (
              <Menu.Item key={item} onPress={() => { setTipoLigacao(item); setMenuTipoLigacaoVisible(false); }} title={item} />
            ))}
          </Menu>
  
          <Divider style={{ marginVertical: 10 }} />
          <Text style={styles.subtitulo}>Equipamentos Elétricos Extras</Text>

          {equipamentos.map((eq, i) => (
            <View key={i} style={styles.equipamentoBox}>
              <TextInput label="Nome do equipamento" value={eq.nome} onChangeText={text => updateEquipamento(i, 'nome', text)} style={styles.input} />
              <TextInput label="Potência (Watts)" value={eq.potencia} onChangeText={text => updateEquipamento(i, 'potencia', text)} keyboardType="numeric" style={styles.input} />
              <TextInput label="Quantidade" value={eq.quantidade} onChangeText={text => updateEquipamento(i, 'quantidade', text)} keyboardType="numeric" style={styles.input} />
  
              <Menu
                visible={eq.uso === 'MenuAberto'}
                onDismiss={() => updateEquipamento(i, 'uso', '')}
                anchor={
                  <TextInput
                    label="Previsão de uso"
                    value={eq.uso === 'MenuAberto' ? '' : eq.uso}
                    onFocus={() => updateEquipamento(i, 'uso', 'MenuAberto')}
                    style={styles.input}
                  />
                }
              >
                {['Imediato', 'Futuro'].map((item) => (
                  <Menu.Item
                    key={item}
                    onPress={() => updateEquipamento(i, 'uso', item)}
                    title={item}
                  />
                ))}
              </Menu>
            </View>
          ))}
  
          <Button onPress={addEquipamento} mode="outlined" style={{ marginVertical: 10 }}>
            Adicionar outro equipamento
          </Button>
  
          <Button mode="contained" onPress={simularSistema} style={styles.button}>
            Simular Sistema Ideal
          </Button>
        </ScrollView>
      </Provider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 40,
      marginHorizontal: 15,
      padding: 16,
      backgroundColor: '#fff'
    },
    input: {
      marginBottom: 12
    },
    label: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold'
    },
    radioGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
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
      backgroundColor: '#f5f5f5',
      borderRadius: 8
    },
    button: {
      backgroundColor: '#08364E',
      marginVertical: 20
    }
  });
  