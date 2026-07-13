export type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };
  restaurentId: string;
};

export interface Order extends CheckoutSessionRequest {
  _id: string;
  totalAmount: number;
  status: string;
}

export type OrderState = {
  orders: Order[];
  createCheckoutSession: (
    checkoutSession: CheckoutSessionRequest,
  ) => Promise<void>;
  getOrderDetails: () => Promise<void>;
};
