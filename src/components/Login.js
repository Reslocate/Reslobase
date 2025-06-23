import React from 'react';

const Login = ({ onLogin }) => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const cardStyle = {
    background: 'white',
    padding: '3rem',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%'
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '1rem',
    fontSize: '2.5rem',
    fontWeight: 'bold'
  };

  const subtitleStyle = {
    color: '#666',
    marginBottom: '2rem',
    fontSize: '1.1rem'
  };

  const featuresBoxStyle = {
    background: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem'
  };

  const featureListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    color: '#555'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1rem',
    borderRadius: '25px',
    cursor: 'pointer',
    width: '100%',
    transition: 'transform 0.2s',
    fontWeight: 'bold'
  };

  const handleMouseOver = (e) => {
    e.target.style.transform = 'translateY(-2px)';
  };

  const handleMouseOut = (e) => {
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          🚀 RESLOBASE
        </h1>
        <p style={subtitleStyle}>
          Your Backend as a Service Platform
        </p>
        <div style={featuresBoxStyle}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>✨ Features</h3>
          <ul style={featureListStyle}>
            <li style={{ marginBottom: '0.5rem' }}>🔐 Authentication with Keycloak</li>
            <li style={{ marginBottom: '0.5rem' }}>📊 GraphQL API with Hasura</li>
            <li style={{ marginBottom: '0.5rem' }}>🗄️ PostgreSQL Database</li>
            <li style={{ marginBottom: '0.5rem' }}>📁 File Storage with MinIO</li>
            <li>⚡ Redis Caching</li>
          </ul>
        </div>
        <button
          onClick={onLogin}
          style={buttonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          🔑 Login / Register
        </button>
      </div>
    </div>
  );
};

export default Login;