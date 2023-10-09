import React, { useState, useEffect } from "react";
import axios from "./axios";
import { getImageUrl } from "./utils.js";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  //empty movies array intially
  const [movies, setMovies] = useState([]);
  const baseurl = "https://image.tmdb.org/t/p/original";
  const [trailerUrl, setTrailerUrl] = useState("");

  //a snippet of code that runs based on some condition/variable

  useEffect(() => {
    //this code get executed when the row just loads, pull the information from tmdb
    //[] - empty brackets signify that run this code once and don't run it again
    //if we give movies here, it's going to run once and everytime the movies changes

    //make it asynchronus

    async function fetchData() {
      //wait for the object to give a response and then do something
      //can use file name for the default export instance.get(actually)
      const request = await axios
        .get(fetchUrl, {
          headers: {
            Authorization: "Bearer " + "3070e9d6c28391466ac94ad937f2fbcd",
          },
        })
        .then((response) => {
          //console.log(response.data);
          setMovies(response.data.results);
          //console.table(movies);
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    //call the fetchdata function
    fetchData();
  }, [fetchUrl]);

  const handleClick = (Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(Movie?.name || "")
        .then((url) => {
          //to get string after the question mark
          const urlParams = new URLSearchParams(new URL(url).search);
          //v is a key in parameter
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };
  const posters = movies.map((movie) => (
    //create an element img for every movie ${baseurl}${movie.poster_path}
    <img
      onClick={() => handleClick(movie)}
      key={movie.id}
      className={`row_poster + ${isLargeRow && "row_poster_large"}`}
      src={getImageUrl(movie, isLargeRow)}
      alt={movie.name}
    />
  ));
  //incase you are using a variable inside the useEffect from outside you have to include it in the parameter list so that the render chanegs when the value of that variable changes. Here this render will be triggered when the fetchurl changes that is for a different row

  //adding the request data int the movies array to use in the return;
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">{posters}</div>
      {/*show video only if trailerUrl has some valid value*/}
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
