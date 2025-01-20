function RecipeCard({ recipe }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} style={{ maxWidth: '100%' }} />}
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <p>By: {recipe.author.username}</p>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeCard; 