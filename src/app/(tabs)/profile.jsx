import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { useAppStore } from '../../store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout, registrations } = useAppStore();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../assets/bg2.png')}
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.headerTopBar}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
              <Text style={styles.logoText}>Saarang</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>My Profile</Text>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
            style={styles.avatarGradient}
          >
            <View style={styles.avatarInner}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          </LinearGradient>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statIconBox}>
              <Ionicons name="ticket" size={24} color="#D92A31" />
            </View>
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>{registrations.length}</Text>
              <Text style={styles.statLabel}>Tickets</Text>
            </View>
          </View>

          
        </View>

        <TouchableOpacity onPress={logout} activeOpacity={0.8} style={styles.logoutWrapper}>
          <View style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#D92A31" />
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableOpacity>
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
    height: 240,
    borderBottomRightRadius: 60,
    backgroundColor: '#000',
    overflow: 'hidden',
    zIndex: 10,
  },
  headerImage: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
  },
  headerImageStyle: {
    opacity: 0.8,
  },
  headerTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 36,
  },
  avatarGradient: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#E94057',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  avatarInner: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#D92A31',
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  statIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 42, 49, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statTextContainer: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  logoutWrapper: {
    marginTop: 'auto',
    marginBottom: 100,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    backgroundColor: 'rgba(217, 42, 49, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(217, 42, 49, 0.15)',
  },
  logoutText: {
    marginLeft: 12,
    color: '#D92A31',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
