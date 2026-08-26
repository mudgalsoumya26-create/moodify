import { useEffect, useState } from "react";
import FaceExpression from "../../expression/components/faceMarker.jsx";
import Player from "../components/Player.jsx";
import { useSong } from "../hooks/useSong.jsx";
import "./Home.css";

const Home = () => {
  const { handleGetSongs, loading, song } = useSong();

  // useEffect(() => {
  //   handleGetSongs({ mood: '' });
  // }, []);
    
  return (
    <main className="home-layout">
      <header className="home-header">
        <div className="brand-lockup">
          <span className="brand-mark">S</span>
          <span>Sonara</span>
        </div>
        <nav className="main-nav" aria-label="Primary navigation">
          <a className="active" href="#home">
            <span className="nav-dot" aria-hidden="true" />
            Home
          </a>
        </nav>
        <span className="header-status">MOOD · MUSIC · MOMENT</span>
      </header>
          
      <section className="face-detector-panel">
        <FaceExpression onClick={(expression)=>{handleGetSongs({mood: expression})}}
          />
      </section>
      

      <section className="player-panel">
        {loading && <p>Loading songs...</p>}

        {!loading && song && (
          <Player
            title={song.title}
            cover={song.posterUrl}
            audioSrc={song.url}
          />
        )}

        {!loading && !song && <p>No song available.</p>}
      </section>
    </main>
  );
};

export default Home;