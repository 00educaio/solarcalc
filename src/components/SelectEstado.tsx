import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';

import estados from '../assets/estados.json'; // caminho do seu JSON

export type Estado = {
  ID: string;
  Sigla: string;
  Nome: string;
}

type Props = {
  onSelect: (name: string) => void
}

const SelectEstado : React.FC<Props> = ( { onSelect }) => {
  const [query, setQuery] = useState(''); // Estado para armazenar o texto digitado
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const estadosFiltrados = query.length > 0 //Lógica da query, num filtro lambda que encontra usando includes 
    ? estados.filter((estado: Estado) => 
      estado.Nome.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || 
      estado.Sigla.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ) : [];

  const handleSelect = (estado: Estado) => {
    onSelect(estado.Nome);
    setQuery(estado.Nome);
    setDropdownVisible(false);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    setDropdownVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o estado"
        value={query}
        onChangeText={handleChangeText}
        left={<TextInput.Icon icon="map" color="#08364E" />}

      />

      {dropdownVisible && estadosFiltrados.length > 0 && (
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={false}
          data={estadosFiltrados}
          keyExtractor={(item) => item.Sigla}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text>{item.Nome} ({item.Sigla})</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Necessário para posicionamento absoluto da FlatList
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#08364E",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    width: 300,
  },
  dropdown: {
    position: 'absolute', // Posiciona a FlatList acima do input
    bottom: 60, // Ajusta a posição para ficar acima do TextInput (ajuste conforme necessário)
    width: 300, // Mesma largura do TextInput para alinhamento
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    backgroundColor: '#ffffff', // Fundo branco para melhor visibilidade
    zIndex: 10, // Garante que a FlatList fique acima de outros elementos
  },
  item: {
    padding: 10,
  },
});

export default SelectEstado ;
