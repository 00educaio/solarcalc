import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { auth } from '../../../firebase.config'; 
import handleLogin from '../../services/auth/handleLogin';
import { LoadingButton } from '@/src/components/LoadingButton';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 500 / 250;
const imageHeight = screenWidth / aspectRatio;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if(auth.currentUser) {
    router.replace("/home");
  }
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
            <Text style={{ fontSize: 40, color: "#08364E" }}>Entrar</Text>
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

          <TextInput
            label="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            left={<TextInput.Icon icon="lock" color="#08364E" />}
            style={styles.input}
          />

          <View style={styles.recuperar}>
            <Link href={"/auth/recover"} asChild>
              <Pressable>
                <Text style={{ fontSize: 13, color: "#08364E" }}>Esqueceu sua senha?</Text>
              </Pressable>
            </Link>
          </View>

          <LoadingButton onPressFunction={() => handleLogin(auth, email, password)} texto="Entrar" />


{/* 
          <View>
            <Text style={{ fontSize: 20, color: "#08364E", marginTop: 10, marginBottom: 10 }}>
              ou
            </Text>
          </View>

          <Button
            mode="contained"
            icon="google"
            style={styles.buttonGoogle}
            labelStyle={{ color: '#08364E', fontWeight: 'bold' }}
          >
            Entrar com Google
          </Button> */}

          <View style={{ marginTop: 20 }}>
            <Link href={"/auth/register"} asChild>
              <Pressable>
                <Text style={{ fontSize: 16, color: "#08364E" }}>
                  Ainda não possui uma conta? Cadastre-se
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
    alignSelf: 'flex-start',
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
  buttonGoogle: {
    marginTop: 8,
    backgroundColor: "#ffffff",
    width: 250,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recuperar: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 15,
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
