import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { useAppStore } from '../../store';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MyEventsScreen() {
  const { events, registrations } = useAppStore();
  const router = useRouter();

  const myEvents = events.filter((event) => registrations.includes(event.id));

  const renderItem = ({ item }) => {
    const eventIndex = events.findIndex((e) => e.id === item.id);
    const imageSource = eventIndex % 2 === 0 ? require('../assets/event1.png') : require('../assets/event2.png');
    const dateObj = new Date(item.date);
    const dateString = `${dateObj.getDate()}th ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getFullYear()}`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/event/${item.id}`)}
        activeOpacity={0.8}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            
            <View style={styles.dateRow}>
              <Feather name="calendar" size={14} color="#D92A31" style={{ marginRight: 6 }} />
              <Text style={styles.date}>{dateString}</Text>
            </View>
            
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Registered</Text>
            </View>
          </View>
          
          <View style={styles.arrowContainer}>
            <Feather name="arrow-right" size={20} color="#9CA3AF" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
                <Ionicons name="person-circle-outline" size={28} color="#fff" />
             </TouchableOpacity>
          </View>
          
          <Text style={styles.headerTitle}>My Tickets</Text>
        </ImageBackground>
      </View>

      {myEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket-outline" size={80} color="#D1D5DB" style={{marginBottom: 24}}/>
          <Text style={styles.emptyText}>You haven't registered for any events yet.</Text>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)')} activeOpacity={0.8}>
            <LinearGradient
              colors={['#8A2387', '#E94057', '#F27121']}
              style={styles.exploreButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.exploreButtonText}>Explore Events</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  list: {
    padding: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  image: {
    width: 120,
    height: '100%',
  },
  cardContent: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#FFE4E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCC2D7',
  },
  statusText: {
    color: '#D92A31',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    paddingBottom: 100,
  },
  emptyText: {
    color: '#4B5563',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
    fontWeight: '500',
  },
  exploreButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#E94057',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
