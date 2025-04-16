import MovieCard from "../components/MoviesCard";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css";
import LoaderDot from "./LoadingDot.jsx";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies();
        setMovies(PopularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load the movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault(); // This is used to prevent the submit button from it's default behaviour
    // alert(searchQuery);

    if (!searchQuery.trim()) return;
    setLoading(true);
    if (loading) return;
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null); //this make that it clear if we have error before
    } catch {
      console.log(err);
      setError("Failed to search");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  const search = searchQuery.toLowerCase();
  return (
    <div className="home">
      <form action="" onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="submit"
          name="search-btn"
          id="search-btn"
          className="search-button"
          value="Search"
        />
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">
          <LoaderDot />
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(search) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
