import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import './App.css';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import MovieAPI from './api/MovieApi';
import Favoris from './Favoris';

const App = () => {

  const jeton = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2Q5ZGQ0NWQ3NmE5ODE1YTRmMjVkZDg2OTgwMmUwZSIsInN1YiI6IjY1NTY1OWMwN2YwNTQwMDEzOWVjNjkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIKiwXA0XiCDV1Ad5uBCr0TOGW59ew5KWzl8LZZAk1o'; // Remplacez ceci par votre véritable jeton d'authentification
  const [inputValue, setInputValue] = useState('');

  const inputChange = (e) => {
      const value = e.target.value;
      setInputValue(e.target.value);
    };
  
    const { data: movies, error, isLoading } = useQuery('movies', MovieAPI);
    const [data, setData] = useState(null);
    
    useEffect(() => {
      if(inputValue===''){
        setData(movies);
      }
      else{
        // declaration du fetch 
    const fetchData = async () => {
      try {
           
          
              const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}`, {
              headers: {
                'Authorization': `Bearer ${jeton}`,
                'Content-Type': 'application/json',
                
              },
            });
            const jsonData = await response.json();
            setData(jsonData);
            console.log('else'+data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API', error);
      }
    };
// appel du fetch 
    fetchData();
  }
  }, [movies,inputValue]); 

  const [favorites, setFavorites] = useState([]);
  const [f, setF] = useState(0);
  // recuperation local 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log("storedFavorites");
    console.log(storedFavorites);
    setFavorites(storedFavorites);
  }, []);

  //modification local 
  useEffect(() => {
    if (favorites.length > 0 || f===1) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log("favorites");
    console.log(favorites);
    setF(1);
    }
  }, [favorites]);

  if (error) {
    return <p>Erreur</p>;
  }
  if (!data) {
    return <p>ooooooppppppsssss pas de film</p>;
  }
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<Movies data={data}  inputChange={inputChange}  />} />
      <Route path="/movie/:id" element={<MovieDetail data={data} setFavorites={setFavorites} favorites={favorites} />} />
      <Route path="/movie/favoris" element={<Favoris data={favorites}   />} />
    </Routes>
  </Router>
  );
}

export default App;
