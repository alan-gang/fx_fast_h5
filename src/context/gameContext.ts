import { createContext } from 'react';

export interface GameCommonDataType {
  gameId: number;
  gameType: string;
}

export const GameCommonDataContext = createContext<GameCommonDataType>({
  gameId: -1,
  gameType: ''
});
