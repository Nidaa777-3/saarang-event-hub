import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppStore } from '../../store';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { events, registrations, registerForEvent, unregisterFromEvent } = useAppStore();

  const event = events.find((e) => e.id === id);
  const isRegistered = registrations.includes(id);

  const eventIndex = events.findIndex((e) => e.id === id);
  const imageSource = eventIndex % 2 === 0 ? require('../assets/event1.png') : require('../assets/event2.png');

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const toggleRegistration = () => {
    if (isRegistered) {
      unregisterFromEvent(event.id);
    } else {
      registerForEvent(event.id);
    }
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
             <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={26} color="#fff" />
             </TouchableOpacity>
             <TouchableOpacity>
                <Ionicons name="person-circle-outline" size={28} color="#fff" />
             </TouchableOpacity>
          </View>
          
          <Text style={styles.headerTitle} numberOfLines={1}>Event Details</Text>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <Image source={imageSource} style={styles.eventImage} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Featured</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <Feather name="calendar" size={18} color="#D92A31" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{new Date(event.date).toLocaleDateString()}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <Feather name="clock" size={18} color="#F27121" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>
                  {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <Ionicons name="location-outline" size={20} color="#D92A31" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location || 'OAT'}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About this Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleRegistration} activeOpacity={0.8} style={{ flex: 1 }}>
          <LinearGradient
            colors={isRegistered ? ['#E5E7EB', '#E5E7EB'] : ['#8A2387', '#E94057', '#F27121']}
            style={[styles.button, isRegistered && styles.unregisterButton]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.buttonText, isRegistered && styles.unregisterText]}>
              {isRegistered ? 'Cancel Registration' : 'Register'}
            </Text>
          </LinearGradient>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
  },
  errorText: {
    color: '#E94057',
    fontSize: 18,
  },
  headerContainer: {
    height: 200,
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 140,
  },
  eventImage: {
    width: width - 48,
    height: 220,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  content: {
    padding: 24,
  },
  badge: {
    backgroundColor: '#FFE4E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCC2D7',
  },
  badgeText: {
    color: '#D92A31',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    marginBottom: 24,
    lineHeight: 34,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    minWidth: '28%',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 42, 49, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'rgba(245, 246, 248, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  button: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#E94057',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  unregisterButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unregisterText: {
    color: '#4B5563',
  },
});
