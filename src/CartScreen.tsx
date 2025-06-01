import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from './type'; // Ensure this path is correct

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen: React.FC<Props> = ({ route, navigation }) => {
  const item = route.params?.item as MenuItem;
  const initialQuantity = route.params?.quantity || 1;

  const [quantity, setQuantity] = useState<number>(initialQuantity);

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>No item selected.</Text>
      </View>
    );
  }

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>Total: ${totalPrice}</Text>
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('OrderSummary', { item, quantity })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default CartScreen;
