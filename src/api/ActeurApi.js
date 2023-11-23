import React from 'react'
const ActeurApi = async (id) => {
    const jeton = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2Q5ZGQ0NWQ3NmE5ODE1YTRmMjVkZDg2OTgwMmUwZSIsInN1YiI6IjY1NTY1OWMwN2YwNTQwMDEzOWVjNjkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIKiwXA0XiCDV1Ad5uBCr0TOGW59ew5KWzl8LZZAk1o'; // Remplacez ceci par votre véritable jeton d'authentification
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
              headers: {
                'Authorization': `Bearer ${jeton}`,
                'Content-Type': 'application/json',
                
              },
            });
            const jsonData = await response.json();
            return jsonData;
}

export default ActeurApi
