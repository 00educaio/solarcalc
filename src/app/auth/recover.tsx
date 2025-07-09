import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { auth } from '../../../firebase.config';
import handleForgotPassword from '../../services/auth/handleForgotPassword';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 500 / 250;
const imageHeight = screenWidth / aspectRatio;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

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
            <Text style={{ fontSize: 32, color: "#08364E" }}>Recuperar Senha</Text>
            <Text style={{ fontSize: 14, color: "#08364E", marginTop: 8 }}>
              Informe seu e-mail para enviar um link de recuperação
            </Text>
          </View>

          <TextInput
            label="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" color="#08364E" />}
            style={styles.input}
          />

          <Button mode="contained" style={styles.button} onPress={() => handleForgotPassword(auth, email)}>
            Enviar Link
          </Button>

          <View style={{ marginTop: 20 }}>
            <Link href={"/auth/login" as any} asChild>
                <Pressable>
                    <Text style={{ fontSize: 16, color: "#08364E" }}>
                        Retornar para o Login.
                    </Text>
                </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
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
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#08364E",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    width: 300,
    height: 50,
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
