import { useState, useEffect } from "react";
import SearchIcon from "../assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=9e58bfca";

function App() {
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState("");

  async function searchMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  function handleChange(e) {
    const { value } = e.target;
    setUserInput(value);
  }

  useEffect(() => {
    searchMovies(`superman`);
  }, []);

  return (
    <div id="main" className="app">
      <h1>
        <a href="#main">MovieFinder</a>
      </h1>
      <div className="search">
        <input
          placeholder="Cari Film kesukaanmu"
          value={userInput}
          onChange={handleChange}
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(userInput)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>Film yang dicari tidak ditemukan</h2>
        </div>
      )}
    </div>
  );
}

export default App;
