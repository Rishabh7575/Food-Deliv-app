export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type RootStackParamList = {
  Menu: undefined; // No parameters for Menu screen
  Cart: { item: MenuItem; quantity: number } | undefined; // Parameters for Cart screen
  OrderSummary: { item: MenuItem; quantity: number } | undefined; // Parameters for Order Summary screen
};
