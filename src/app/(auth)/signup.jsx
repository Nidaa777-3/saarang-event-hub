import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import { useAppStore } from '../../store';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAppStore();
  const router = useRouter();

  const handleSignup = async () => {
    const success = await signup(email, password, name);
    if (success) {
      router.replace('/(tabs)');
    } else {
      alert('Please fill all fields');
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
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Join Us</Text>
              <Text style={styles.welcomeText}>CREATE YOUR</Text>
              <Text style={styles.welcomeText}>ACCOUNT.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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

        <TouchableOpacity onPress={handleSignup} activeOpacity={0.8} style={{ marginTop: 8 }}>
          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Log in</Text>
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
    height: height * 0.42,
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
    paddingTop: 30,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    color: '#3C435A',
    opacity: 0.6,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 4,
    padding: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 14,
  },
  loginLink: {
    color: '#A01D22',
    fontSize: 14,
    fontWeight: '500',
  }
});
