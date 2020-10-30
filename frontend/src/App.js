import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import AddReview from './components/AddReview';

import { loadUser } from './actions/auth';


//const App = () =>{
class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/product' component={Product} />
              <Route exact path='/product/:id' component={ProductDetail} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/review/:productId' component={AddReview} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
};

export default App;

