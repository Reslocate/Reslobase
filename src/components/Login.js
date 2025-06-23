import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '1rem',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🚀 Nhost Clone
        </h1>
        <p style={{
          color: '#666',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Your Backend as a Service Platform
        </p>
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h3 style={{color: '#333', marginBottom: '1rem'}}>✨ Features</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            color: '#555'
          }}>
            <li style={{marginBottom: '0.5rem'}}>🔐 Authentication with Keycloak</li>
            <li style={{marginBottom: '0.5rem'}}>📊 GraphQL API with Hasura</li>
            <li style={{marginBottom: '0.5rem'}}>🗄️ PostgreSQL Database</li>
            <li style={{marginBottom: '0.5rem'}}>📁 File Storage with MinIO</li>
            <li>⚡ Redis Caching</li>
          </ul>
        </div>
        <button
          onClick={onLogin}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            paddin
