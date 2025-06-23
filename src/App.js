import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import keycloak from './auth/keycloak';
import client from './graphql/apollo-client';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    keycloak.init({ 
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
      setAuthenticated(authenticated);
      if (authenticated) {
        setUser(keycloak.tokenParsed);
      }
      setLoading(false);
    }).catch(error => {
      console.error('Failed to initialize Keycloak:', error);
      setLoading(false);
    });
  }, []);

  const handleLogin = () => {
    keycloak.login();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                authenticated ? 
                <Dashboard user={user} /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                authenticated ? 
                <Dashboard user={user} /> : 
                <Navigate to="/" replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
