import React from 'react';
import { useSelector } from 'react-redux';
import GamePage from './GamePageAudioCall';
import StartPage from './StartPageAudioCall';
import { statusGameSelector } from '../../../redux/games/selectors';

export default function AudioCall() {
  const statusGame = useSelector(statusGameSelector);

  return (
      <div>
          <GamePage />
      </div>
  );
}


