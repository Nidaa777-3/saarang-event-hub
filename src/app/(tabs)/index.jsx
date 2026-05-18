import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { useState } from 'react';
import { useAppStore } from '../../store';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const categories = ['All', 'Proshows', 'Spotlight', 'World Fest', 'Workshops'];

export default function EventsScreen() {
  const { events } = useAppStore();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter events based on category (mock implementation for now)
  const filteredEvents = events;

  const renderCategory = (item) => {
    const isSelected = selectedCategory === item;
    return (
      <TouchableOpacity 
        key={item}
        style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
        onPress={() => setSelectedCategory(item)}
      >
        <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => {
    const dateObj = new Date(item.date);
    const dateString = `${dateObj.getDate()}th ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getFullYear()}`;
    const locationString = item.location || 'OAT';
    const title = item.title;

    const imageSource = index % 2 === 0 ? require('../assets/event1.png') : require('../assets/event2.png');

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/event/${item.id}`)}
        activeOpacity={0.9}
      >
        <Image source={imageSource} style={styles.cardImage} />
        
        <View style={styles.cardContent}>
          <View>
             <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
             
             <View style={styles.infoRow}>
               <Feather name="calendar" size={12} color="#D92A31" style={styles.infoIcon} />
               <Text style={styles.infoText}>{dateString}</Text>
             </View>
             
             <View style={styles.infoRow}>
               <Ionicons name="location-outline" size={14} color="#D92A31" style={styles.infoIcon} />
               <Text style={styles.infoText}>{locationString}</Text>
             </View>
          </View>
          
          <TouchableOpacity style={styles.bookmarkButton}>
            <Feather name="arrow-right" size={24} color="#000" />
          </TouchableOpacity>
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
          
          <Text style={styles.headerTitle}>Events</Text>
          
          <View>
            <ScrollView 
               horizontal 
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.categoriesContainer}
            >
               {categories.map(renderCategory)}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  headerContainer: {
    height: 290,
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
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryPillSelected: {
    borderColor: '#fff',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryTextSelected: {
    opacity: 1,
  },
  list: {
    padding: 24,
    paddingTop: 24,
    paddingBottom: 120, // account for floating tab bar
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 20,
    flexDirection: 'row',
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  cardImage: {
    width: '45%',
    height: '100%',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  bookmarkButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
