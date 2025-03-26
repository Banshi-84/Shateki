import { ref, push, query, orderByChild, get, set } from 'firebase/database';
import { database } from '../firebase';
import { Player } from '../types/Player';

const PLAYERS_REF = 'players';

export const addPlayer = async (name: string, score: number): Promise<Player> => {
  const playerData: Player = {
    id: '',
    name,
    score,
    timestamp: Date.now()
  };

  const newPlayerRef = push(ref(database, PLAYERS_REF));
  playerData.id = newPlayerRef.key || '';
  await set(newPlayerRef, playerData);
  return playerData;
};

export const getLeaderboard = async (): Promise<Player[]> => {
  const leaderboardRef = query(
    ref(database, PLAYERS_REF),
    orderByChild('score')
  );

  const snapshot = await get(leaderboardRef);
  const players: Player[] = [];

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      players.push(childSnapshot.val());
    });
  }

  return players.sort((a, b) => b.score - a.score);
};