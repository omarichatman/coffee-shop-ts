import axios from 'axios';
import { useEffect, useState } from 'react';
import './Orders.css';

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

function Orders({ items }: { items: Array<Item> }) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const ws = new WebSocket(`${(
      window.location.protocol === 'https:' ? 'wss://' : 'ws://'
    )}${window.location.host}/ws-coffee`);

    ws.onopen = () => {
      console.log('connected');
    };

    ws.onerror = (event) => {
      console.error(event);
    };

    ws.onmessage = (message) => {
      const newOrders = JSON.parse(message.data);
      setOrders(newOrders);
    };

    ws.onclose = () => {
      console.log('disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const deleteOrder = (order: Order) => {
    axios.delete(`api/orders/${order.id}`)
      .catch(console.error);
  };

  return (
    <div className="orders-component">
      <h2>Existing Orders</h2>
      {orders.length === 0
        ? <div>No Orders</div>
        : orders.map((order) => (
          <div className="order" key={order.id}>
            <p>{order.name}</p>
            {order.phone ? <p>{order.phone}</p> : null}
            <p>{order.zipCode}</p>
            <p>Items:</p>
            <ul>
              {order.items.map((item: Item) => (
                <li key={item.id}>
                  {item.quantity}
                  {' '}
                  -
                  {' '}
                  {items.find((i: Item) => i.id === item.id)?.title}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => deleteOrder(order)}
            >
              Delete Order
            </button>
          </div>
        ))}
    </div>
  );
}

export default Orders;
