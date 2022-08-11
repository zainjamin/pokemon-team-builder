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
export interface Pokemon {
  name: string;
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  location: string;
}
export const Builder: FC<BuilderProps> = (props: BuilderProps) => {
  const { game } = props;
  const fakeTeam = [
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
    {
      name: 'unown',
      hp: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      speed: '',
      location: '',
    },
  ];
  const [team, setTeam] = useState(fakeTeam);
  const teamDataChange = (slot: number) => {
    return (newPokemonName: string) => {
      fetchPokemon(newPokemonName).then((data) => {
        getLocation(newPokemonName, game).then((location) => {
          const stats = data.stats.map(({ base_stat }: any) => base_stat);
          const newPokemon = {
            name: newPokemonName,
            hp: stats[0],
            attack: stats[1],
            defense: stats[2],
            specialAttack: stats[3],
            specialDefense: stats[4],
            speed: stats[5],
            location: location,
          };
          setTeam(
            team.map((pokemon, index) => {
              return index === slot ? newPokemon : pokemon;
            }),
          );
        });
      });
    };
  };
  const getImage = async (pokemon: string) => {
    const generation = await getGenerationFromPokedex(game);
    const pokemonData = await fetchPokemon(pokemon);
    return pokemonData.sprites.versions[generation[0]][generation[1]]
      .front_default;
  };
  {
    console.log(team);
  }
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="p-2 flex flex-col w-full gap-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 h-1/5 w-full">
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[0].name)} />
            <PokeSelect game={game} onChange={teamDataChange(0)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[1].name)} />
            <PokeSelect game={game} onChange={teamDataChange(1)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[2].name)} />
            <PokeSelect game={game} onChange={teamDataChange(2)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[3].name)} />
            <PokeSelect game={game} onChange={teamDataChange(3)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[4].name)} />
            <PokeSelect game={game} onChange={teamDataChange(4)} />
          </div>
          <div className="flex flex-col gap-4">
            <AsyncImage src={getImage(team[5].name)} />
            <PokeSelect game={game} onChange={teamDataChange(5)} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>&nbsp;</td>
              <th>HP</th>
              <th>Attack</th>
              <th>Defense</th>
              <th>Special Attack</th>
              <th>Special Defense</th>
              <th>Speed</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {team.map((pokemon) => {
              return (
                <tr>
                  <th>{pokemon.name}</th>
                  <td>{pokemon.hp}</td>
                  <td>{pokemon.attack}</td>
                  <td>{pokemon.defense}</td>
                  <td>{pokemon.specialAttack}</td>
                  <td>{pokemon.specialDefense}</td>
                  <td>{pokemon.speed}</td>
                  <td>{pokemon.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
