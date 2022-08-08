import React, { FC, useEffect, useState } from 'react';
import { AsyncImage } from '../components/AsyncImage';
import { PokeSelect } from '../components/PokeSelect';
import { SideMenu } from '../components/SideMenu';
import {
  fetchPokemon,
  getGenerationFromPokedex,
  getLocation,
} from '../PokeApi';

interface BuilderProps {
  game: string;
}
export const Builder: FC<BuilderProps> = (props: BuilderProps) => {
  const { game } = props;
  const [team, setTeam] = useState([
    'unown',
    'unown',
    'unown',
    'unown',
    'unown',
    'unown',
  ]);
  const [locations, setLocations] = useState(['', '', '', '', '', '']);
  const teamDataChange = (slot: number) => {
    return (newPokemon: string) => {
      setTeam(
        team.map((member, index) => {
          return index === slot ? newPokemon : member;
        }),
      );
      getLocation(newPokemon, game).then((location) => {
        setLocations(
          locations.map((tempLocation, index) => {
            return index === slot ? location : tempLocation;
          }),
        );
      });
    };
  };
  const getImage = async (pokemon: string) => {
    const generation = await getGenerationFromPokedex(game);
    const pokemonData = await fetchPokemon(pokemon);
    return pokemonData.sprites.versions[generation[0]][generation[1]]
      .front_default;
  };
  console.log(locations);
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="p-2 flex flex-col w-full gap-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 h-1/5 w-full">
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[0])} />
            <PokeSelect game={game} onChange={teamDataChange(0)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[1])} />
            <PokeSelect game={game} onChange={teamDataChange(1)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[2])} />
            <PokeSelect game={game} onChange={teamDataChange(2)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[3])} />
            <PokeSelect game={game} onChange={teamDataChange(3)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[4])} />
            <PokeSelect game={game} onChange={teamDataChange(4)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[5])} />
            <PokeSelect game={game} onChange={teamDataChange(5)} />
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-16">
          <div>
            <span className="text-light-accent-color text-xl font-bold">
              Example Locations
            </span>
            <ul className="text-light-text-color">
              {team.map((pokemon, slot) => (
                <li><span className="font-bold">{pokemon}</span>: {locations[slot]}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-light-accent-color text-xl font-bold">
              Average Stats
            </span>
          </div>
          <div>
            <span className="text-light-accent-color text-xl font-bold">
              Type Matchups
            </span>
          </div>
          <div>
            <span className="text-light-accent-color text-xl font-bold">
              Gym Leaders
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
