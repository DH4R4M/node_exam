import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

function Profile() {
  const [userRecipes, setUserRecipes] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/recipes/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserRecipes(data);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    if (user && token) {
      fetchUserRecipes();
    }
  }, [user, token]);

  return (
    <div>
      <h1>My Profile</h1>
      <h2>Welcome, {user?.username}!</h2>
      <h3>My Recipes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {userRecipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Profile;