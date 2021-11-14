import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import PokemonDetail from "./pokemon_detail";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  const findPokemon = async (e) => {
    e.preventDefault();

    reset();

    if (input === "") {
      setError("Input must not be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const URL = "https://pokeapi.co/api/v2/pokemon/";
      const response = await axios.get(URL + input);

      const data = response.data;
      setResult(data);
      setInput("");
    } catch (error) {
      setError("Pokemon not found.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });
    window.addEventListener("online", () => {
      setIsOnline(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setIsOnline(false);
      });
      window.removeEventListener("online", () => {
        setIsOnline(true);
      });
    };
  });

  return (
    <div className="container">
      <Head>
        <title>Find Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Finding Pokemons!</h1>

        <p className="description">
          Get started by typing a Pokemon name below:
        </p>

        <form onSubmit={findPokemon}>
          <input
            type="text"
            placeholder="Type the pokemon name here..."
            className="input-field"
            onChange={handleInput}
            value={input}
          />
          <button type="submit" className="submit">
            Find It!
          </button>
          {result && (
            <button type="button" className="reset" onClick={reset}>
              Reset
            </button>
          )}
        </form>

        <p className="error-field">{err}</p>

        {isLoading && <p>Loading...</p>}

        {result && <PokemonDetail data={result} />}
      </main>

      {!isOnline && (
        <div className="network">
          <p>You are offline.</p>
        </div>
      )}
    </div>
  );
}
