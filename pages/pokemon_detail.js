export default function PokemonDetail({ data }) {
  const fetchTypes = () => {
    const { types } = data;
    return types.map((type) => type.type.name).join(", ");
  };

  const fetchStats = () => {
    const { stats } = data;
    return stats.map((stat) => {
      const name = stat.stat.name;
      const value = stat.base_stat;
      return `${name}: ${value}`;
    });
  };

  const fetchAbilities = () => {
    const { abilities } = data;
    return abilities.map((ability) => ability.ability.name).join(", ");
  };

  const fetchMoves = (limit = 3) => {
    const { moves } = data;
    return moves
      .map((move) => move.move.name)
      .slice(0, limit)
      .join(", ");
  };

  return (
    <div>
      <div className="center">
        <img
          src={data.sprites.other["official-artwork"].front_default}
          width="200"
        />
        <h1>{data.name}</h1>
      </div>

      <div className="grid">
        <a href="#" className="card">
          <h3>Types &rarr;</h3>
          <p>{fetchTypes()}</p>
        </a>

        <a href="#" className="card">
          <h3>Stats &rarr;</h3>
          <ul>
            {fetchStats().map((stat) => {
              return <li>{stat}</li>;
            })}
          </ul>
        </a>

        <a href="#" className="card">
          <h3>Abilities &rarr;</h3>
          <p>{fetchAbilities()}</p>
        </a>

        <a href="#" className="card">
          <h3>Moves &rarr;</h3>
          <p>{fetchMoves(2)}</p>
        </a>
      </div>
    </div>
  );
}
