```js
const loadPokemon = async (data) => {
  const _pokemonData = await Promise.all(
    data.map((pokemon) => {
      const pokemonRecord = new Promise((resolve, reject) => {
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((data) => resolve(data));
      });
      return pokemonRecord;
    })
  );
};
```

上のメソッドは下のように化ける

```js
  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all([pokemonRecord1, pokemonRecord2, pokemonRecord3, ..., pokemonRecord20])
  }
```
