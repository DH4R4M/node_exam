import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AddRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    imageUrl: ''
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/recipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          ingredients: formData.ingredients.split(',').map(i => i.trim())
        })
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        const data = await response.json();
        alert(data.msg || 'Failed to create recipe');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe');
    }
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Ingredients (comma-separated):</label>
          <textarea
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Instructions:</label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Image URL:</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe; 