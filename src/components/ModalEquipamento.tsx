import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Equipamento } from '../services/home/registerEquipamentos';

type Props = {
  onSubmit: (equipamento: Equipamento) => void;
};

const ModalEquipamento: React.FC<Props> = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [consumo, setConsumo] = useState('');
  const [potencia, setPotencia] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const addCustomEquipamento = () => {
    const equipamento: Equipamento = {
      nome: nome,
      consumo_por_hora_kwh: consumo,
      potencia_watts: potencia,
      qtd: quantidade,
    };
    onSubmit(equipamento);
    setNome('');
    setConsumo('');
    setPotencia('');
    setQuantidade('');
    hideModal();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
      >
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Adicione seu Equipamento</Text>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Consumo Por Hora (kWh)"
              value={consumo}
              onChangeText={setConsumo}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Potência (Watts)"
              value={potencia}
              onChangeText={setPotencia}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#888"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={addCustomEquipamento}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={hideModal}
              >
                <Text style={[styles.buttonText, { color: '#08364E' }]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.showButton}
        onPress={showModal}
      >
        <Text style={styles.showButtonText}>Adicionar Equipamento Personalizado</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2000, // High zIndex to ensure modal is above all content
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    minHeight: 500, // Spacious height to avoid squished look
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#08364E',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#08364E',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    height: 50, // Matches parent input height
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    flex: 1,
    height: 50, // Matches parent button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#08364E',
  },
  closeButton: {
    borderWidth: 1,
    borderColor: '#08364E',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  showButton: {
    borderWidth: 1,
    borderColor: '#08364E',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  showButtonText: {
    color: '#08364E',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalEquipamento;