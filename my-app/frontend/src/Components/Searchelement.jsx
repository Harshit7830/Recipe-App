import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams, Link } from 'react-router-dom';

const SearchElement = () => {
    const { searchTerm } = useParams();
    const [combinedData, setCombinedData] = useState([]);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [response1, response3, response4] = await Promise.all([
                    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`), 
                    fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?a=${searchTerm}`), 
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)  
                ]);

                const [data1,  data3, data4] = await Promise.all([
                    response1.json(),
                   
                    response3.json(),
                    response4.json()
                ]);

                
                const meals1 = Array.isArray(data1.meals) ? data1.meals : [];
               
                const meals3 = Array.isArray(data3.meals) ? data3.meals : [];
                const meals4 = Array.isArray(data4.meals) ? data4.meals : [];

                
                const combined = [
                    ...meals1,
                  
                    ...meals3,
                    ...meals4
                ];

               
                const uniqueCombined = Array.from(new Map(combined.map(item => [item.idMeal, item])).values());

                if (uniqueCombined.length > 0) {
                    setCombinedData(uniqueCombined);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                setError(err.message);
                setCombinedData([]);
                setNotFound(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                {loading && <h2>Loading...</h2>}
                {error && !loading && <h2>Error: {error}</h2>}
                {notFound && !loading && <h2>Recipe Not Found</h2>}
                {!loading && !error && !notFound && (
                    <>
                        <h2>Search Results for "{searchTerm}"</h2>
                        <div style={{
                            width: '90%',
                            margin: 'auto',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
                            gridGap: '1rem',
                            marginTop: '-1rem'
                        }}>
                            {combinedData.map((d) => (
                                <Link to={`/${d.idMeal}`} className='link' key={d.idMeal}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="img">
                                            <img src={d.strMealThumb} alt={d.strMeal} style={{ width: '13rem' }} />
                                        </div>
                                        <h3>{d.strMeal}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SearchElement;
