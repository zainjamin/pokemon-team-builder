import React, { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { AsyncImage } from '../components/AsyncImage';
import { PokeSelect } from '../components/PokeSelect';
import { SideMenu } from '../components/SideMenu';
import {
  fetchPokemon,
  getGenerationFromPokedex,
  getLocation,
} from '../PokeApi';
import MissingNo from '../images/missingno.png';
import { Prompt } from '../components/Prompt';

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
export const Builder: FC = () => {
  const [game, setGame] = useState('');
  const [team, setTeam] = useState(Array<Pokemon>(6));
  const [savePrompt, setSavePrompt] = useState(false);
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
          team[slot] = newPokemon;
          setTeam(team.concat([]));
        });
      });
    };
  };
  const getImage = async (pokemon: string) => {
    const generation = await getGenerationFromPokedex(game);
    const pokemonData = await fetchPokemon(pokemon);
    return game === '2' && pokemon === 'unown'
      ? MissingNo
      : pokemonData.sprites.versions[generation[0]][generation[1]]
          .front_default;
  };
  const gameOptions = [
    { value: '2', label: 'Pokemon Red / Blue / Yellow' },
    { value: '3', label: 'Pokemon Gold / Silver / Crystal' },
    { value: '4', label: 'Pokemon Ruby / Sapphire / Emerald' },
    { value: '5', label: 'Pokemon Diamond / Pearl' },
    { value: '6', label: 'Pokemon Platinum' },
    { value: '7', label: 'Pokemon Heart Gold / Soul Silver' },
    { value: '8', label: 'Pokemon Black / White' },
    { value: '9', label: 'Pokemon Black 2 / White 2' },
    { value: '12+13+14', label: 'Pokemon X / Y' },
  ];
  const saveButton = (teamName: string) => {
    const storedTeams = localStorage.getItem('teams');
    const savedTeams =
      storedTeams && storedTeams !== 'undefined' ? JSON.parse(storedTeams) : [];
    savedTeams[savedTeams.length] = { team, teamName };
    localStorage.setItem('teams', JSON.stringify(savedTeams));
    setSavePrompt(false);
  };
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="p-2 flex flex-col w-full gap-8">
        <div>
          <h1 className="text-light-text-color font-bold text-2xl mb-2">
            1. Pick a Game
          </h1>
          <Select
            options={gameOptions}
            onChange={(newGame) => {
              newGame && setGame(newGame.value);
              setTeam(Array<Pokemon>(6));
            }}
          />
        </div>
        {game && (
          <div>
            <h1 className="text-light-text-color font-bold text-2xl mb-2">
              2. Pick a Team
            </h1>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 h-1/5 w-full flex-1">
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[0] ? getImage(team[0].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(0)} />
              </div>
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[1] ? getImage(team[1].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(1)} />
              </div>
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[2] ? getImage(team[2].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(2)} />
              </div>
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[3] ? getImage(team[3].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(3)} />
              </div>
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[4] ? getImage(team[4].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(4)} />
              </div>
              <div className="flex flex-col gap-4">
                <AsyncImage
                  src={team[5] ? getImage(team[5].name) : getImage('unown')}
                />
                <PokeSelect game={game} onChange={teamDataChange(5)} />
              </div>
            </div>
          </div>
        )}
        {team[0] && (
          <div>
            <h1 className="text-light-text-color font-bold text-2xl">
              3. Review
            </h1>
            <table
              className="border rounded-lg border-separate overflow-x-auto w-full"
              cellSpacing={0}
            >
              <thead>
                <tr className="bg-red-100">
                  <td className="border-b border-r">&nbsp;</td>
                  <th className="border-b border-r">HP</th>
                  <th className="border-b border-r">Attack</th>
                  <th className="border-b border-r">Defense</th>
                  <th className="border-b border-r">Special Attack</th>
                  <th className="border-b border-r">Special Defense</th>
                  <th className="border-b border-r">Speed</th>
                  <th className="border-b">Location</th>
                </tr>
              </thead>
              <tbody>
                {team.map((pokemon, index) => {
                  return index === team.length - 1 ? (
                    <tr key={index}>
                      <th className="border-r">{pokemon.name}</th>
                      <td className="border-r">{pokemon.hp}</td>
                      <td className="border-r">{pokemon.attack}</td>
                      <td className="border-r">{pokemon.defense}</td>
                      <td className="border-r">{pokemon.specialAttack}</td>
                      <td className="border-r">{pokemon.specialDefense}</td>
                      <td className="border-r">{pokemon.speed}</td>
                      <td>{pokemon.location}</td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <th className="border-b border-r">{pokemon.name}</th>
                      <td className="border-b border-r">{pokemon.hp}</td>
                      <td className="border-b border-r">{pokemon.attack}</td>
                      <td className="border-b border-r">{pokemon.defense}</td>
                      <td className="border-b border-r">
                        {pokemon.specialAttack}
                      </td>
                      <td className="border-b border-r">
                        {pokemon.specialDefense}
                      </td>
                      <td className="border-b border-r">{pokemon.speed}</td>
                      <td className="border-b">{pokemon.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {team[0] && (
          <div className="flex items-center justify-center gap-4">
            <button
              className="
              bg-light-accent-color text-light-text-color rounded-full px-4 py-1 font-semibold
              hover:bg-light-accent-color-hover active:bg-light-accent-color-pressed
              hover:text-light-text-color-hover active:text-light-text-color-pressed
              "
              onClick={() => setSavePrompt(true)}
            >
              Save
            </button>
            <button
              className="
              bg-light-accent-color text-light-text-color rounded-full px-4 py-1 font-semibold
              hover:bg-light-accent-color-hover active:bg-light-accent-color-pressed
              hover:text-light-text-color-hover active:text-light-text-color-pressed
              "
              onClick={() => {
                setTeam(Array<Pokemon>(6));
                setGame("2");
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
      {savePrompt && (
        <Prompt
          onCancel={() => setSavePrompt(false)}
          onSubmit={saveButton}
          title="Team Name"
          helpText="Enter a team name"
        />
      )}
    </div>
  );
};
