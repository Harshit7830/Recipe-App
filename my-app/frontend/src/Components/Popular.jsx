import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';



const Popular = () => {
    const [data, setData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
            const data = await api.json();

            //console.log(data.meals);
            setData(data.meals)
        }

        fetchData();
    }, [])
   
    const settings = {
        dots:false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 4,
        autoplaySpeed: 10,
        speed: 1000,
        
      };

    return (         
    
    
        <>
        < div style={{
        height:'50vh',
        width:'90%',
        margin:'auto',
        
       
      }} >



        

            
              
                <Slider  {...settings}>
                    {data.map((data) => {
                        return (
                            <Link to={`/${data.idMeal}`} className='link'>
                            <div style={{textAlign:'center',fontSize:'1rem'}}>
                                <div className="img">
                                <img src={data.strMealThumb} alt='' style={{ width:'12rem',height:'12rem',marginTop:'2rem'}} />
                                </div>
                                 <h3>{data.strMeal}</h3>
                            </div>
                            </Link>
                        )
                    })}
                    

                </Slider>
                <div style={{ textAlign: "center",justifyContent:"center" }}>
                    
                </div>
            </div>



        </>
    )
}

export default Popular
