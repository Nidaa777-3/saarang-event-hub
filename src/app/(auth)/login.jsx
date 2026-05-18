import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import { useAppStore } from '../../store';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppStore();
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      alert('Please enter valid email and password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.overlay}>
            <View style={styles.topBar}>
              <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Hi, User</Text>
              <Text style={styles.welcomeText}>WELCOME TO.</Text>
              <Text style={styles.welcomeText}>SAARANG'27.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New here? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  headerContainer: {
    height: height * 0.46,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  headerImage: {
    flex: 1,
    width: '100%',
  },
  headerImageStyle: {
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logo: {
    width: 45,
    height: 45,
    tintColor: '#fff',
  },
  headerTextContainer: {
    justifyContent: 'flex-end',
  },
  greetingText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    color: '#3C435A',
    opacity: 0.6,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#000',
    fontSize: 14,
  },
  signupLink: {
    color: '#A01D22',
    fontSize: 14,
    fontWeight: '500',
  }
});
