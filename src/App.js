import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

const API_KEY = "6d5dc2f6";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly; ;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const App = () => {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeOutId, updateTimeOutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onSelectedMovie] = useState([]);

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    clearTimeout(timeOutId);
    updateSearchQuery(e.target.value);
    const timeOut = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeOutId(timeOut);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieIcon src="/movie-icon.svg" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {/* {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onSelectedMovie={onSelectedMovie}
        />
      )} */}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, i) => (
            <MovieComponent
              key={i}
              movie={movie}
              onSelectedMovie={onSelectedMovie}
            />
          ))
        ) : (
          <Placeholder src="/movie-app/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
};

export default App;
