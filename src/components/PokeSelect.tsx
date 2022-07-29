import React, { FC } from 'react';
import { getMultiPokdex, getPokedex } from '../PokeApi';
import AsyncSelect from 'react-select/async';

interface PokeSelectProps {
  game: string;
}
const getPokemon = async (game: string) => {
  const pokemon = game.includes('+')
    ? await getMultiPokdex(game)
    : await getPokedex(game);
  const pokemonValues = [].concat.apply([], pokemon).map((name: string) => {
    return { value: name, label: name.toUpperCase() };
  });
  return pokemonValues;
};
export const PokeSelect: FC<PokeSelectProps> = (props) => {
  const { game } = props;
  const filterPokemon = async (inputValue: string) => {
    const pokemonList = await getPokemon(game);
    return pokemonList.filter((pkmn) => {
      return pkmn.label.includes(inputValue.toUpperCase());
    });
  };
  return (
    <AsyncSelect cacheOptions defaultOptions loadOptions={filterPokemon} />
  );
};
