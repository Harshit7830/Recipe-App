import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const RecipeId = () => {
  const { idMeal } = useParams();
  const [data, setData] = useState({});
  const [active, setActive] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await api.json();
      setData(data.meals[0]);
      console.log(data);
    };

    fetchData();
  }, [idMeal]);

  const getSteps = () => {
    if (data.strInstructions) {
      return data.strInstructions.split('. ').map((step, index) => (
        <div key={index} style={{ fontSize: '1rem', margin: '0 -10rem 0' }}>
          Step {index + 1}: {step}.
        </div>
      ));
    }
    return null;
  };

  const buttonStyle = (type) => {
    if (type === 'ingredients') {
      return {
        backgroundColor: active === 'ingredients' ? '#4CAF50' : '#f1f1f1',
        color: active === 'ingredients' ? 'white' : 'black',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '1.5rem',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
      };
    } else if (type === 'instructions') {
      return {
        backgroundColor: active === 'instructions' ? '#4CAF50' : '#f1f1f1',
        color: active === 'instructions' ? 'white' : 'black',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '1.5rem',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
      };
    }
    return {};
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '90%', marginTop: '8rem', textAlign: 'left', fontSize: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>{data.strMeal}</h1>
        <div style={{ display: 'flex' }}>
          <div className="img" style={{ width: '50%', marginTop: '3rem' }}>
            <img src={data.strMealThumb} alt="" style={{ width: '12rem', height: '12rem' }} />
          </div>

          <div className="content" style={{ width: '30rem', height: '30rem', fontSize: '1rem', margin: '1rem 0', position: 'relative' }}>
            <button
              style={buttonStyle('ingredients')}
              onClick={() => setActive('ingredients')}
            >
              Ingredients
            </button>
            <button
              style={buttonStyle('instructions')}
              onClick={() => setActive('instructions')}
            >
              Instructions
            </button>

            {active === 'ingredients' && (
              <div>
                {data.strIngredient1 && (
                  <>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.strIngredient1} - {data.strMeasure1}</div>
                    {data.strIngredient2 && <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.strIngredient2} - {data.strMeasure2}</div>}
                    {data.strIngredient3 && <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.strIngredient3} - {data.strMeasure3}</div>}
                    {data.strIngredient4 && <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.strIngredient4} - {data.strMeasure4}</div>}
                    {data.strIngredient5 && <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.strIngredient5} - {data.strMeasure5}</div>}
                    {data.strIngredient6 && <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.strIngredient6} - {data.strMeasure6}</div>}
                  </>
                )}
              </div>
            )}
            {active === 'instructions' && (
              <div>
                {getSteps()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeId;
