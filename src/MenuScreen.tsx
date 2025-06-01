import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from './type'; // Ensure this path is correct
   


type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const snapshot = await firestore().collection('menuItems').get();
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<MenuItem, 'id'>),
        }));
        setMenuItems(items);
      } catch (err) {
        setError('Failed to load menu items.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Button title="Add to Cart" onPress={() => navigation.navigate('Cart', { item, quantity: 1 })} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  list: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    marginVertical: 8,
    fontWeight: '600',
    color: '#2e7d32',
    fontSize: 16,
  },
});

export default MenuScreen;
