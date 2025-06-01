import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { RootStackParamList, MenuItem } from './type'; // Ensure this path is correct

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSummary'>;

const OrderSummaryScreen: React.FC<Props> = ({ route, navigation }) => {
  const item = route.params?.item as MenuItem; // Get the item from route params
  const quantity = route.params?.quantity || 1; // Get the quantity from route params, default to 1

  // If no item is found, display a message
  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>No order data available.</Text>
      </View>
    );
  }

  const totalPrice = (item.price * quantity).toFixed(2); // Calculate total price

  // Function to confirm the order
  const confirmOrder = async () => {
    try {
      await firestore().collection('orders').add({
        itemId: item.id,
        itemName: item.name,
        quantity,
        totalPrice: parseFloat(totalPrice),
        orderDate: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Your order has been placed!');
      navigation.navigate('Menu'); // Navigate back to Menu after placing the order
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again later.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <Text style={styles.item}>{item.name}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>Total Price: ${totalPrice}</Text>

      <Button title="Confirm Order" onPress={confirmOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default OrderSummaryScreen;
