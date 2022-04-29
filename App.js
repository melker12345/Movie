import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Link to API
const API_URL = "http://www.omdbapi.com?apikey=d11fde9c";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Establish connection to api endpoint to gain information.
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  // Default movie displayed
  useEffect(() => {
    searchMovies("toy story");
  }, []);

  /* Returns the HTML elements */
  return (
    <div className="app">
      <h1>Movies</h1>
      <div className="search">
        <input
          placeholder="Search for movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>{" "}
      {/*If movies array is grater then 0 display api information. Else render h2 "No movies found!"*/}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>NO MOVIES FOUND!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
