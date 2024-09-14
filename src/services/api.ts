import axios from 'axios';
import {Character} from "../types/indexPlus";

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number, filters: Record<string, string>) => {
  const queryParams = new URLSearchParams({ page: page.toString(), ...filters });
  const response = await axios.get<{ results: Character[]; info: { pages: number } }>(
    `${API_BASE_URL}/character?${queryParams}`
  );
  return response.data;
};

export const fetchCharacterById = async (id: number) => {
  const response = await axios.get<Character>(`${API_BASE_URL}/character/${id}`);
  return response.data;
};
