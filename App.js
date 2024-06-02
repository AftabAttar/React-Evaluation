// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, AuthContext } from './AuthContext';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import ProductDetails from './ProductDetails';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/product/:id" component={ProductDetails} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
