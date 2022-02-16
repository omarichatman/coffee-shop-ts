import { useReducer } from 'react';

// type CartItem = {
//   id: string;
//   quantity: number;
//   type: string;
// };

// type StateType = {
//   id: string;
//   quantity: number;
//   type: string;
// };

// type ActionType = {
//   type: string;
//   itemId: string;
// };

const initialCart: Array<any> = [];

export const CartTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  EMPTY: 'EMPTY',
};

const findItem = (cart:Array<any>, itemId: string) => cart.find((item) => item.id === itemId);

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (action.itemId) {
        if (findItem(state, action.itemId)) {
          return state.map((item: any) => {
            if (item.id === action.itemId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        }
      }

      return [
        ...state,
        { id: action.itemId, quantity: 1 },
      ];

    case CartTypes.EMPTY:
      return [];

    case CartTypes.REMOVE:
      return state.filter((item: any) => item.id !== action.itemId);

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

export const useCartReducer = () => useReducer(cartReducer, initialCart);
