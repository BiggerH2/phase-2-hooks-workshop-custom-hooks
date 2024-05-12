import React, { useEffect, useState } from "react";

export function usePokemon(query) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!query) return;

    setStatus("pending");

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        setData(data);
        setStatus("fulfilled");
      })
      .catch((error) => {
        setErrors(error.message);
        setStatus("rejected");
      });
  }, [query]);

  return { data, status, errors };
}

function Pokemon({ query }) {
  const { data, status, errors } = usePokemon(query);

  if (status === "idle") return <h3>Enter a Pokemon name to search</h3>;
  if (status === "pending") return <h3>Loading...</h3>;
  if (status === "rejected") return <h3>Error: {errors}</h3>;
  if (status === "fulfilled") {
    return (
      <div>
        <h3>{data.name}</h3>
        <img
          src={data.sprites.front_default}
          alt={`${data.name} front sprite`}
        />
      </div>
    );
  }
}

export default function App() {
  const [query, setQuery] = useState("charmander");

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(e.target.search.value);
  }

  return (
    <div>
      <h1>PokéSearcher</h1>
      <Pokemon query={query} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
