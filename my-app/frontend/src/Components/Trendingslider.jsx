import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';



const Trendingslider = () => {
    const [data, setData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const api = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian")
            const data = await api.json();

            //console.log(data.meals);
            setData(data.meals)
        }

        fetchData();
    }, [])
   
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      
      cssEase: "linear"
    };

    return (         
    
    
        <>
        < div style={{
        height:'50vh',
        width:'90%',
        margin:'auto',
        overflowX:'hidden'
        
      }} >



        

            
              
                <Slider  {...settings}>
                    {data.map((data) => {
                        return (
                            <Link to={`/${data.idMeal}`} className='link'>
                            <div style={{textAlign:'center',fontSize:'1rem'}}>
                                <div className="img">
                                <img src={data.strMealThumb} alt='' style={{ width:'6rem', height:'6rem',right:'50rem' ,marginTop:'5rem'}} />
                                </div>
                                 <h3>{data.strMeal}</h3>
                            </div>
                            </Link>
                        )
                    })}
                    

                </Slider>
                <div style={{ textAlign: "center" ,justifyContent:"center"}}>
                    
                </div>
            </div>



        </>
    )
}

export default Trendingslider
