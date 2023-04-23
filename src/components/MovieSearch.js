import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey= http://www.omdbapi.com/?i=tt3896198&apikey=251bf15`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage("Invalid movie name. Please try again.");
        setResults([]);
      } else {
        setResults(data.Search);
        setErrorMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {results.length > 0 &&
        results.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>
              {movie.Title} ({movie.Year})
            </p>
          </div>
        ))}
    </div>
  );
}

export default SearchBar;
