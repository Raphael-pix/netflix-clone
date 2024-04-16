import { useEffect, useState } from "react";
import "./rows.css";
import fetchMovies from "../../utils/fetchmovies";
import {FaAngleRight,FaAngleLeft} from "react-icons/fa"

export default function Row({ title, url, isLarge }) {
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [isClicked,setIsClicked] = useState(false)

  async function fetchData() {
    try {
      const data = await fetchMovies(url);
      setMovies(data);
      
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

function handleClick(){
  setIsClicked(!isClicked) 
}

  return (
    <div className="row-container">
      <h1 className="row-title">{title}</h1>
      <div className="movie-posters">
        {movies.map((movie) => 
          <div className={`poster ${isLarge?"poster-large":""}`} key={movie.id} onClick={()=>handleClick()}>
              <img
                src={`${imageUrl}${ movie.poster_path}`}
                alt={movie.title || movie.name}
                className={`movie-poster ${isLarge?"movie-poster-large":""}`}
              />

          </div> 
        )}
       {/* <div className="row-icon left" > */}
           {/* <FaAngleLeft size={26} className='left-icon'/> */}
       {/* </div> */}
       {/* <div className="row-icon right"> */}
           {/* <FaAngleRight size={26} className='right-icon'/> */}
       {/* </div> */}
      
      </div>
    </div>
  );
}