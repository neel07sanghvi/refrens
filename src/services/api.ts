import axios from "axios";
import {IEpisode} from "../types/indexPlus";
import {ILocation} from "../types/indexPlus";
import {ICharacter} from "../types/indexPlus";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async(page: number, filters: Record<string, string>) =>
{
  const queryParams = new URLSearchParams({page: page.toString(), ...filters});
  const response = await axios.get<{results: ICharacter[]; info: {pages: number}}>(
    `${API_BASE_URL}/character?${queryParams}`
  );
  return response.data;
};

export const fetchCharacterById = async(id: number) =>
{
  const response = await axios.get<ICharacter>(`${API_BASE_URL}/character/${id}`);
  return response.data;
};

export const fetchLocationById = async(id: number): Promise<ILocation> =>
{
  const response = await axios.get(`${API_BASE_URL}/location/${id}`);
  return response.data;
};

export const fetchEpisodeByUrl = async(url: string): Promise<IEpisode> =>
{
  const response = await axios.get(url);
  return response.data;
};
