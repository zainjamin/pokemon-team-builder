import React, { FC, useEffect, useState } from 'react';
import { Pokemon } from './Builder';
import { SideMenu } from '../components/SideMenu';
import { Team } from '../components/Team';

export const MyTeam: FC = () => {
  const storedTeams = localStorage.getItem('teams');
  const savedTeams =
    storedTeams && storedTeams !== 'undefined' ? JSON.parse(storedTeams) : [];
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <Team team={savedTeams[0]}/>
    </div>
  );
};
