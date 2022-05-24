import { ObjectId } from 'mongodb';
import { getDb } from './db';

interface Character {
  name:string;
  tvShowId:ObjectId;
}

const getCollection = async () => {
  const db = await getDb();
  return db.collection<Character>('characters');
};

export const createCharacters = async (character: Character) => {
  const col = await getCollection();
  const ret = await col.insertOne(character);
  
   

  return ret.insertedId;
};

export const getCharacters = async (name:string) => {
  const col = await getCollection();
  const ret = col.find();
  return ret.toArray();
};

export const getCharactersByTvShow = async (tvshowId:ObjectId) => {
  const col = await getCollection();
  const ret = col.find(tvshowId);

  return ret.toArray();
};
