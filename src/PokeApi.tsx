import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';
const POKE_API = axios.create({
  baseURL: BASE_URL,
  method: 'get',
  timeout: 3000,
});

export const fetchPokemon = async (pokemon: string) => {
  const result = await POKE_API.get(`pokemon/${pokemon}`);
  return result.data;
};
export const getLocation = async (pokemon: string, game: string) => {
  const result = await POKE_API.get(`pokemon/${pokemon}/encounters`);
  let data = '';
  result.data.forEach(
    (location: {
      version_details: { version: { name: string } }[];
      location_area: { name: any };
    }) => {
      location.version_details.forEach(
        (versionDetail: { version: { name: string } }) => {
          if (
            getGenerationFromPokedex(game)[1].split('-').includes(versionDetail.version.name)
          ) {
            if(!data) data = location.location_area.name;
          }
        },
      );
    },
  );
  return data;
};
export const getAllPokemon = async () => {
  const result = await POKE_API.get('pokemon?limit=905');
  const allPokemon = await Promise.all(result.data.results);
  return allPokemon;
};

export const getPokedex = async (id: string) => {
  const result = await POKE_API.get(`pokedex/${id}`);
  const pokemon = await Promise.all(result.data.pokemon_entries);
  return pokemon.map((pkmn) => pkmn.pokemon_species.name);
};

export const getMultiPokdex = async (ids: string) => {
  const dexs = ids.split('+');
  const allDexs = await dexs.map(async (id) => {
    const result = await getPokedex(id);
    return result;
  });
  return Promise.all(allDexs);
};

export const getGenerationFromPokedex = (pokdex: string) => {
  switch (pokdex) {
    case '2':
      return ['generation-i', 'yellow'];
    case '3':
      return ['generation-ii', 'crystal'];
    case '4':
      return ['generation-iii', 'emerald'];
    case '5':
      return ['generation-iv', 'diamond-pearl'];
    case '6':
      return ['generation-iv', 'platinum'];
    case '7':
      return ['generation-iv', 'heartgold-soulsilver'];
    case '8':
      return ['generation-v', 'black-white'];
    case '9':
      return ['generation-v', 'black-white'];
    case '12+13+14':
      return ['generation-vi', 'x-y'];
  }
  return 'wrong!';
};
