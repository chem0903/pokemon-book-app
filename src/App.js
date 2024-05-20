import { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/Pokemon';
import { getPokemon } from './utils/Pokemon';
import './App.css';
import Card from './Components/Card';
import Navbar from './Components/Navbar';

function App() {
  const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon";
  const [isloading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");


  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全体のポケモンデータ（{results:20匹のデータ + next/previous:次/前の20匹のurl}）をfetch
      let res = await getAllPokemon(INITIAL_URL);
      setNextURL(res.next);

      // 全体のポケモンデータに含まれる、各ポケモンの詳細データfetch
      loadPokemon(res.results);
      setIsLoading(false);
    }
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }

  const handleNextPage = async () => {
    if (!nextURL) return;

    setIsLoading(true);
    const data = await getAllPokemon(nextURL);
    setNextURL(data.next);
    setPrevURL(data.previous);

    await loadPokemon(data.results);
    setIsLoading(false);
  }


  const handlePrevPage = async () => {
    if (!prevURL) return;

    setIsLoading(true);
    const data = await getAllPokemon(prevURL);
    setNextURL(data.next);
    setPrevURL(data.previous);

    await loadPokemon(data.results);
    setIsLoading(false);
  }


  return (
    <>
      <Navbar />
      <div className="App">
        {isloading ?
          <h1>now Loading</h1>
          : (
            <>
              <div className='pokemonCardContainer'>
                {pokemonData.map((pokemon, index) => {
                  return <Card key={index} pokemon={pokemon} />
                })}
              </div>
              <div className='btn'>
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default App;
