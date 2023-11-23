import React from 'react'
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';

const Movies = ({data,inputChange}) => {

  return (
    <div >
      
      {data && data.results && data.results.length > 0 && (
        <main className="flex flex-col gap-6 min-h-screen min-w-full p-12 dark:bg-gray-800">
          
          <p className=" dark:text-white " ><Link to="/movie/favoris">
            Favoris
            </Link></p>
            
          <div className="flex flex-wrap gap-2 sm:justify-between "><p className="text-2xl sm:text-4xl dark:text-white">🎬🍿 Movie library </p>
          <input className="pl-4 rounded-full min-w-full sm:min-w-[20rem]  dark:bg-gray-700" type="text" placeholder="🔎 Search for movie" 
           onChange={inputChange}/></div>
        <div className="flex flex-wrap justify-center grid grid-cols-[repeat(auto-fit,minmax(254px,1fr))] gap-4">
        {data.results.map((movie, index) => (
          <div
            className="shadow-lg h-auto transition ease-in-out rounded-md hover:scale-105 hover:cursor-pointer hover:shadow-2xl"
          >
           <Link to={`/movie/${movie.id}`}>
            <img className="rounded-md object-cover" height="100%" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Image ${index + 1}`} />
            </Link> 
          </div>
        ))}
        
      </div>
      </main>
      )}
  
    </div>
  );
}

export default Movies
