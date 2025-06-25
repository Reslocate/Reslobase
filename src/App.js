import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NhostReactProvider, useAuthenticationStatus, useUserData } from '@nhost/react';
import nhost from './nhost-config';
import client from './graphql/apollo-client';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Authentication wrapper component
function AuthWrapper({ children }) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px'
      }}>
        <LoadingSpinner />
        <p style={{ marginTop: '20px', color: '#666', textAlign: 'center' }}>
          Initializing authentication...
        </p>
      </div>
    );
  }

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          authenticated: isAuthenticated,
          user: user,
        })
      )}
    </>
  );
}

// Main App component
function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <ApolloProvider client={client}>
        <Router future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}>
          <AuthWrapper>
            <AppRoutes />
          </AuthWrapper>
        </Router>
      </ApolloProvider>
    </NhostReactProvider>
  );
}

// Routes component
function AppRoutes({ authenticated, user }) {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;