import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching medicines...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch medicines" message={error} />;
  }

  // return (
  //   <ul id="meals">
  //     {loadedMeals.map((meal) => (
  //       <MealItem key={meal.id} meal={meal} />
  //     ))}
  //   </ul>
  // );
  // Group medicines by category
  const categorizedMeals = loadedMeals.reduce((acc, meal) => {
    acc[meal.category] = acc[meal.category] || [];
    acc[meal.category].push(meal);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(categorizedMeals).map(([category, meals]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <ul className="meals-list">
            {meals.map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
