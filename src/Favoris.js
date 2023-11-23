import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowLeft } from "react-feather";
const Favoris = ({data}) => {
    

    return (
        <div >
          
          
            <main className="flex flex-col gap-6 min-h-screen min-w-full p-12 dark:bg-gray-800">
                <Link
          to="/"
          className="self-start transition ease-in-out text-white flex gap-1 items-center hover:-translate-x-2"
        >
          <ArrowLeft />
          Back
        </Link>
            <div className="flex flex-wrap justify-center grid grid-cols-[repeat(auto-fit,minmax(254px,1fr))] gap-4">
            {data.map((movie, index) => (
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
          
      
        </div>
      );
}

export default Favoris
