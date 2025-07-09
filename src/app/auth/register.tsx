import { useState } from 'react';
import { StyleSheet, Image, Dimensions, Pressable, KeyboardAvoidingView, View, Alert, SafeAreaView, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { auth } from '../../../firebase.config';
import handleRegister from '../../services/auth/handleRegister';
import { formatPhoneNumber, getCleanPhoneNumber } from '../../services/auth/handlePhone'; // Importe as funções de serviço
import SelectEstado from '../../components/SelectEstado';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 500 / 250;
const imageHeight = screenWidth / aspectRatio;

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [estado, setEstado] = useState('');
  const [phone, setPhone] = useState(''); 

  const handlePhoneChange = (text: string) => {
    const formattedText = formatPhoneNumber(text);
    setPhone(formattedText); // Atualiza o estado com o valor mascarado
  };
  const handleSubmitRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas devem ser iguais.');
      return;
    }
    const unmaskedPhone = getCleanPhoneNumber(phone); // Telefone sem máscara para envio
    handleRegister(auth, name, email, password, unmaskedPhone, estado); // Certifique-se de passar unmaskedPhone se seu handleRegister precisar
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="light" />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/final.png')}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', '#ffffff']}
                style={styles.gradient}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.title}>
                <Text style={{ fontSize: 40, color: "#08364E" }}>Cadastrar</Text>
              </View>

              <TextInput
                label="Digite seu nome"
                value={name}
                onChangeText={setName}
                left={<TextInput.Icon icon="account" color="#08364E" />}
                style={styles.input}
              />

              <TextInput
                label="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" color="#08364E" />}
                style={styles.input}
              />

              <TextInput
                label="Digite seu telefone"
                value={phone} 
                onChangeText={handlePhoneChange} 
                keyboardType="phone-pad" 
                maxLength={15} 
                left={<TextInput.Icon icon="phone" color="#08364E" />}
                style={styles.input}
              />

              <SelectEstado onSelect={setEstado}/>

              <TextInput
                label="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                left={<TextInput.Icon icon="lock" color="#08364E" />}
                style={styles.input}
                autoCapitalize='none'
              />

              <TextInput
                label="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                left={<TextInput.Icon icon="lock-check" color="#08364E" />}
                style={styles.input}
                autoCapitalize='none'
              />

              <Button mode="contained" style={styles.button} onPress={handleSubmitRegister}>
                Cadastrar
              </Button>

              <View style={{ marginTop: 20 }}>
                <Link href={"/auth/" as any} asChild>
                    <Pressable>
                        <Text style={{ fontSize: 16, color: "#08364E" }}>
                        Já possui uma conta? Entrar
                        </Text>
                    </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    padding: 10,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: "#08364E",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    width: 300,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#08364E",
    width: 250,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGoogle: {
    marginTop: 8,
    backgroundColor: "#ffffff",
    width: 250,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: screenWidth,
    height: imageHeight,
    marginTop: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 22,
  },
});