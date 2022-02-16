import {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './components/Home';
import Details from './components/Details';
import NotFound from './components/NotFound';
import Orders from './components/Orders';
import Login from './components/Login';
import UserContext from './context/UserContext';
import { CartTypes, useCartReducer } from './reducers/cartReducer';

function App() {
  const [cart, dispatch] = useCartReducer();
  const [items, setItems] = useState([]);
  const [userDetails, setUserDetails] = useState({
    access: '',
    username: '',
  });
  const addToCart = useCallback(
    (itemId: string | undefined) => dispatch({ type: CartTypes.ADD, itemId }),
    [dispatch],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/items');
        setItems(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/auth/current-user');
        setUserDetails(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const userContextValue = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails],
  );

  return (
    <Router>
      <UserContext.Provider value={userContextValue}>
        <Header cart={cart} />
        {items.length === 0
          ? <div>Loading...</div>
          : (
            <Routes>
              <Route
                path="/cart"
                element={<Cart cart={cart} dispatch={dispatch} items={items} />}
              />
              <Route
                path="/details/:id"
                element={<Details addToCart={addToCart} items={items} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders items={items} />} />
              <Route path="/" element={<Home items={items} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
