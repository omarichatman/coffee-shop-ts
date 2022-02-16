type Item = {
  id: string;
  title: string;
  quantity: number;
};

type Order = {
  id: string;
  name: string;
  phone: string;
  zipCode: string;
  items: Array<Item>;
};

let orders: Array<Order> = [];

export const reset = () => {
  orders = [];
};

export const getOrders = () => orders;

export const addOrder = (newOrder: any) => {
  orders.push({ ...newOrder });
};
