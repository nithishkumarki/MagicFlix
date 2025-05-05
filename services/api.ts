
export const TMDB_CONFIG=
{
  //baseurl for the api
  BASE_URL:"https://api.themoviedb.org/3",
  // our permission key for the api like a atm card for atm matchine to allow
   API_KEY:process.env.TMDB_API!,
  //  API_KEY:'ca58942334cef3a095e5c26c4e82a733',
  headers:{
    accept:'application/json',
    //  Authorization:`Bearer ${process.env.TMDB_API}`
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTU4OTQyMzM0Y2VmM2EwOTVlNWMyNmM0ZTgyYTczMyIsIm5iZiI6MTc0NTgyODc0Mi45NDcsInN1YiI6IjY4MGYzYjg2YmEyNDFkOGFlYTgwZjAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qUBc_B4bV2yjCaLCkhnGW_TdQC7f8v6UHIRpxb9WkxU'

  }

}

export const fetchMovies = async ({query}:{query:string}):Promise<Movie[]>=>
{
  //if something is in the search display it or else display the popular movies
    const endpoint=query?
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response=await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers,
    });
    if(!response.ok)
    {
        throw new Error('Failed to fetch movies');
    }
    const data=await response.json();
    return data.results;


};

export const fetchMovieDetails= async (movieId:string):Promise<MovieDetails>=>{
  try
  {
       const response=await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
        method:"GET",
        headers:TMDB_CONFIG.headers,
       });
        
       if(!response.ok)
       {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
       }
       const data=await response.json();
       return data;
  }
  catch(error)
  {
    console.error('Error fetching movie details:', error);
    throw error;
  }

}



// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTU4OTQyMzM0Y2VmM2EwOTVlNWMyNmM0ZTgyYTczMyIsIm5iZiI6MTc0NTgyODc0Mi45NDcsInN1YiI6IjY4MGYzYjg2YmEyNDFkOGFlYTgwZjAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qUBc_B4bV2yjCaLCkhnGW_TdQC7f8v6UHIRpxb9WkxU'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));