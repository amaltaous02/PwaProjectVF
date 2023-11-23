import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from "react-feather";
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import ActeurApi from './api/ActeurApi';
import Images from './Images';
import { useQuery } from 'react-query';
const MovieDetail = ({ data,favorites,setFavorites}) => {
    const { id } = useParams();
    const [acteurs, setActeurs] = useState(null);
    const [filmGen, setFilmGen] = useState(null);
    const IMAGE_back = "https://image.tmdb.org/t/p/original/";
    const jeton = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2Q5ZGQ0NWQ3NmE5ODE1YTRmMjVkZDg2OTgwMmUwZSIsInN1YiI6IjY1NTY1OWMwN2YwNTQwMDEzOWVjNjkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIKiwXA0XiCDV1Ad5uBCr0TOGW59ew5KWzl8LZZAk1o'; // Remplacez ceci par votre véritable jeton d'authentification
    
    const { data: moviesActeurs,error,isLoading} = useQuery('acteurs', () => ActeurApi(id));
    const [isRed, setIsRed] = useState(false);

 

  const heartStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    color: isRed ? 'red' : 'white',
  };
   
    
    const addFavorites = (film) => {
      setIsRed((prevIsRed) => !prevIsRed);
        if(favorites.length===0){
            setFavorites([...favorites, film]);
            console.log("dkhal else");
            console.log(favorites);
        }
        else{

        
            favorites.map((item, index) => {
                
              
        if (item.id===film.id) {
          
          setFavorites(favorites.filter((fav) => fav !== item));
          console.log("dkhal if");
          console.log(favorites);
        } else {
          
          setFavorites([...favorites, film]);
          console.log("dkhal else");
          console.log(favorites);
        }
    });
}
        
      };
    useEffect(() => {
        
        const fetchData = async () => {
          try {

                const response3 = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
                    headers: {
                      'Authorization': `Bearer ${jeton}`,
                      'Content-Type': 'application/json',
                      
                    },
                  });
                  
                  const jsonData3 = await response3.json();
                  
                  setFilmGen(jsonData3);
                  
                  setActeurs(moviesActeurs);
          
          } catch (error) {
            console.error('Erreur lors de la récupération des données depuis l\'API', error);
          }
        };
        
        fetchData();
        const movieTest = data.results.find((m) => m.id.toString() === id);
        favorites.map((item, index) => {
                
              
          if (item.id===movieTest.id) {
            
            setIsRed(true);
            
          } else {
            setIsRed(false);
            
          }
      });
        
      }, [moviesActeurs]);
      
      const movie = data.results.find((m) => m.id.toString() === id);
      if (!movie) {
        return <div>Les détails du film n'ont pas été trouvés.</div>;
      }
      if(isLoading){
        return(
            <p>isLoading</p>
        )
    }
    //changement style de date 
      const originalDate = new Date(movie.release_date);
      const options = { month: "short", day: "numeric", year: "2-digit" };

      
      
  return (
    
    <div>
        {acteurs && acteurs.cast && acteurs.cast.length > 0 && (
      <main
      style={{ backgroundImage: `url("${IMAGE_back}${movie.backdrop_path}")` }}
      className="flex min-h-screen min-w-full bg-cover ">
      <div className="flex-1 flex flex-col gap-4 backdrop-blur-2xl bg-slate-800/40 p-6 lg:p-12 overflow-hidden">
        <Link
          to="/"
          className="self-start transition ease-in-out text-white flex gap-1 items-center hover:-translate-x-2"
        >
          <ArrowLeft />
          Back
        </Link>
        <div className="flex flex-col items-center flex-wrap gap-4 justify-center sm:flex-row sm:items-end">
          <img
            className="rounded-md object-cover"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
          />
          <div className="flex flex-col flex-1">
            <p className="text-4xl w-auto text-white">{movie.title} <FaHeart style={heartStyle} onClick={() => addFavorites(movie)} /></p>
            <p className="text-md w-auto text-white">{movie.overview}</p>
            <Genres filmGenre={filmGen.genres}/>
            <p className="text-md text-white italic">
                {originalDate.toLocaleDateString("en-US", options)}
            </p>
          </div>
        </div>
        <p className="text-3xl text-white">Credits</p>
        <div className="flex gap-6 pt-2 overflow-x-scroll">
        {acteurs.cast.map((acteur) => (
            
           <div className="min-w-[200px] w-[200px]">
      <img src={acteur.profile_path ? `https://image.tmdb.org/t/p/w500${acteur.profile_path}`: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-md" />
      <p className="text-white text-sm">{acteur.name}</p>
      <p className="text-stone-300  text-sm">{acteur.character}</p>
    </div>
           
          ))}
     
     </div>
     <p className="text-3xl text-white">Images</p>
      <Images id={id} />
    
        </div>
      </main>
      )}
    </div>
    
  )
}
const Genres = ({ filmGenre }) => {
    return (
      <p className="mt-2 text-md text-white italic">
        {filmGenre.map((genre, index) => {
          if (index + 1 === filmGenre.length) {
            return genre.name;
          }
          return genre.name + ", ";
        })}
      </p>
    );
  };
export default MovieDetail
