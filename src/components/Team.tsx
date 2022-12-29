import React, { FC, useState } from 'react';
import { Pokemon } from '../containers/Builder';

export interface Team {
  teamName: string;
  team: Array<Pokemon>;
}

export interface TeamProps {
  team: Team;
}

export const Team: FC<TeamProps> = (props) => {
  const { team } = props;
  console.log(team);
  return (
    <div className="flex flex-col rounded-full">
      <div className="bg-light-accent-color text-light-text-color">
        {team.teamName}
      </div>
    </div>
  );
};
