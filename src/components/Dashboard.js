import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FRUITS, ADD_FRUIT } from '../graphql/queries';
import keycloak from '../auth/keycloak';

const Dashboard = ({ user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFruit, setNewFruit] = useState({
    name: '',
    color: '',
    category: '',
    price: '',
    in_stock: true
  });

  const { loading, error, data, refetch } = useQuery(GET_FRUITS);
  const [addFruit] = useMutation(ADD_FRUIT);

  const handleLogout = () => {
    keycloak.logout();
  };

  const handleAddFruit = async (e) => {
    e.preventDefault();
    try {
      await addFruit({
        variables: {
          ...newFruit,
          price: parseFloat(newFruit.price) || 0
        }
      });
      setNewFruit({ name: '', color: '', category: '', price: '', in_stock: true });
      setShowAddForm(false);
      refetch();
    } catch (err) {
      console.error('Error adding fruit:', err);
    }
  };

  if (loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading fruits...</div>;
  if (error) return <div style={{padding: '2rem', textAlign: 'center', color: 'red'}}>Error: {error.message}</div>;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{margin: 0, color: '#333'}}>🚀 Nhost Clone Dashboard</h1>
          <p style={{margin: '0.5rem 0 0 0', color: '#666'}}>
            Welcome, {user?.preferred_username || user?.email || 'User'}! 👋
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Fruits Section */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{margin: 0, color: '#333'}}>🍎 Fruits Inventory</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➕ Add Fruit
          </button>
        </div>

        {/* Add Fruit Form */}
        {showAddForm && (
          <form onSubmit={handleAddFruit} style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '10px',
            marginBottom: '2rem'
          }}>
            <h3 style={{marginTop: 0, color: '#333'}}>Add New Fruit</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <input
                type="text"
                placeholder="Fruit name"
                value={newFruit.name}
                onChange={(e) => setNewFruit({...newFruit, name: e.target.value})}
                required
                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ddd'}}
              />
              <input
                type="text"
                placeholder="Color"
                value={newFruit.color}
                onChange={(e) => setNewFruit({...newFruit, color: e.target.value})}
                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ddd'}}
              />
              <input
                type="text"
                placeholder="Category"
                value={newFruit.category}
                onChange={(e) => setNewFruit({...newFruit, category: e.target.value})}
                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ddd'}}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={newFruit.price}
                onChange={(e) => setNewFruit({...newFruit, price: e.target.value})}
                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ddd'}}
              />
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <input
                  type="checkbox"
                  checked={newFruit.in_stock}
                  onChange={(e) => setNewFruit({...newFruit, in_stock: e.target.checked})}
                />
                In Stock
              </label>
            </div>
            <div style={{marginTop: '1rem'}}>
              <button type="submit" style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '1rem'
              }}>
                Add Fruit
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Fruits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {data?.fruits?.map((fruit) => (
            <div key={fruit.id} style={{
              background: fruit.in_stock ? '#e8f5e8' : '#ffe6e6',
              padding: '1.5rem',
              borderRadius: '10px',
              border: `2px solid ${fruit.in_stock ? '#28a745' : '#dc3545'}`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: fruit.in_stock ? '#28a745' : '#dc3545',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {fruit.in_stock ? '✅ In Stock' : '❌ Out of Stock'}
              </div>
              <h3 style={{margin: '0 0 1rem 0', color: '#333', fontSize: '1.5rem'}}>
                🍎 {fruit.name}
              </h3>
              <div style={{color: '#555', lineHeight: '1.6'}}>
                <p style={{margin: '0.5rem 0'}}><strong>Color:</strong> {fruit.color}</p>
                <p style={{margin: '0.5rem 0'}}><strong>Category:</strong> {fruit.category}</p>
                <p style={{margin: '0.5rem 0'}}><strong>Price:</strong> ${parseFloat(fruit.price).toFixed(2)}</p>
                <p style={{margin: '0.5rem 0', fontSize: '0.9rem', color: '#888'}}>
                  <strong>Added:</strong> {new Date(fruit.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {(!data?.fruits || data.fruits.length === 0) && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <h3>No fruits found</h3>
            <p>Add your first fruit to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
