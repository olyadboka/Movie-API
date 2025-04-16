// import { Routes } from "react-router-dom";
import "./css/App.css";
import MovieCard from "./components/MoviesCard";
import { MovieProvider } from "./contexts/MovieContext";
import Home from "./pages/Home";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorites";
import NavBar from "./components/NavBar";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
