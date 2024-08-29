import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar'



const Category = () => {
    const {name} = useParams()
   

    const [data, setData] = useState([])

    useEffect(() => {
  
      const fetchData = async () => {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
        const data = await api.json();
  
        
        setData(data.meals)
       
      }
  
      fetchData();
    }, [name])


  return (
 <>
 <Navbar />
<div style={{
    width:'90%',
    
    display:'grid',
    gridTemplateColumns:'repeat(auto-fit, minmax(10rem, 1fr))',
    gridGap:'1rem',
    marginTop:'8rem',
    left:'4rem',
    position:'relative'

}}>


 {
    data.map((d)=>{
        return(
            <Link to={`/${d.idMeal}`} className='link'>
            <div style={{textAlign:'center'}}>
                <div className="img">
                    <img src={d.strMealThumb} alt="" style={{width:'8rem',height:'8rem'}} />
                </div>
                 <h3>{d.strMeal}</h3>
            </div>
            </Link>
        )
    })
 }
 </div>

 
 </>
  )
}

export default Category