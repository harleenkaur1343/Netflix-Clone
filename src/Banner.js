import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./requests";

function Banner() {
  /* set a random movie poster every time the site gets loaded */

  const [movie, setMovie] = useState([]);

  //useEffect runs based on a certain condition - run once when component loads - [] or run when a variable value changes - [fetchUrl]

  useEffect(() => {
    //get the movies
    //choose a random index from the movies array

    async function fetchData() {
      const request = await axios
        .get(requests.fetchNetflixOriginals, {
          headers: {
            Authorization: "Bearer " + "3070e9d6c28391466ac94ad937f2fbcd",
          },
        })
        .then((response) => {
          setMovie([
            response.data.results[
              Math.floor(Math.random() * response.data.results.length)
            ],
          ]);
          console.log(movie[0].overview);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);
  // ? -  check if the array contains the content

  //truncate function
  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie[0]?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie[0]?.name || movie[0]?.title || movie[0]?.originalName}
        </h1>
        <button className="banner_button">Play</button>
        <button className="banner_button">My List</button>
        <p className="banner_desc">{truncate(movie[0]?.overview, 250)}</p>
      </div>{" "}
      <div className="banner--fadeBottom"></div>
      {/* background image */}
      {/*title*/}
      {/* 2 buttons */}
      {/* description */}
    </header>
  );
}

export default Banner;
