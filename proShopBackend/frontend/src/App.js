import { Container  } from 'react-bootstrap';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import AdminEditUserScreen from './screens/AdminEditUserScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path ="/profile" component = {ProfileScreen} />
          <Route path ="/shipping" component = {ShippingScreen} />
          <Route path ="/payment" component={PaymentScreen} />
          <Route path ="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen}/>
          <Route path="/admin/orderlist" component={OrderListScreen}/>
          <Route path="/admin/userlist" component={UserListScreen}/>
          <Route path="/admin/user/:id/edit" component={AdminEditUserScreen}/>
          <Route path = "/admin/productlist" component={AdminProductListScreen}/>
          <Route path = "/admin/product/:id/edit" component={ProductEditScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
