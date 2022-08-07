import React, { FC, useState } from 'react';
import { AsyncImage } from '../components/AsyncImage';
import { PokeSelect } from '../components/PokeSelect';
import { SideMenu } from '../components/SideMenu';
import { fetchPokemon, getGenerationFromPokedex } from '../PokeApi';

interface BuilderProps {
  game: string;
}
export const Builder: FC<BuilderProps> = (props: BuilderProps) => {
  const { game } = props;
  const [team, setTeam] = useState(['unown', 'unown', 'unown', 'unown', 'unown', 'unown']);
  const teamDataChange = (slot: Number) => {
    return (newPokemon: string) => {
      setTeam(
        team.map((member, index) => {
          return index === slot ? newPokemon : member;
        }),
      );
    };
  };
  const getImage = async (pokemon: string) => {
    const generation = await getGenerationFromPokedex(game);
    const pokemonData = await fetchPokemon(pokemon);
    return pokemonData.sprites.versions[generation[0]][generation[1]].front_default
  };
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="p-2 basis-full grid grid-cols-3 gap-8 items-center">
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[0])} />
          <PokeSelect game={game} onChange={teamDataChange(0)} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[1])} />
          <PokeSelect game={game} onChange={teamDataChange(1)} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[2])} />
          <PokeSelect game={game} onChange={teamDataChange(2)} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[3])} />
          <PokeSelect game={game} onChange={teamDataChange(3)} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[4])} />
          <PokeSelect game={game} onChange={teamDataChange(4)} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <AsyncImage src={getImage(team[5])} />
          <PokeSelect game={game} onChange={teamDataChange(5)} />
        </div>
      </div>
    </div>
  );
};
