import React from 'react'
import { useQuery } from 'react-query';
import ImageApi from './api/ImageApi';
const Images = ({id}) => {
    
    const { data: Images,error,isLoading} = useQuery('images', () => ImageApi(id));
    if(isLoading){
        return(
            <p>is loading</p>
        )
    }
  return (
    <div className="flex overflow-x-auto gap-6 pt-2">
        {Images?.backdrops.map((filmImage) => (
          <img
          src={`https://image.tmdb.org/t/p/original/${filmImage.file_path}`}
          className="w-[1200px] rounded-md"

        />
        ))}
      </div>
  )
}

export default Images
