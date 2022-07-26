import React, { FC } from 'react';
import './App.css';
import { PokeSelect } from './components/PokeSelect';

const App: FC = () => {
  return (
    <div>
      <PokeSelect game="2" />
    </div>
  )
};

export default App;
