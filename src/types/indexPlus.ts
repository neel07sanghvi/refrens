export interface ICharacter
{
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type TypeStatus =
  | "alive"
  | "dead"
  | "unknown"

export type TypeGender =
  | "female"
  | "male"
  | "genderless"
  | "unknown"

export type TypeSpecies =
  | "human"
  | "alien"
  | "humanoid"
  | "unknown"

export interface ICharactersState
{
  characters: Record<number, ICharacter[]>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filters: {
    name?: string;
    status?: TypeStatus;
    species?: TypeSpecies;
    type?: string;
    gender?: TypeGender;
  };
  version: string;
}

export type TypeCharactersAction =
  | {type: "FETCH_CHARACTERS_REQUEST"}
  | {type: "FETCH_CHARACTERS_SUCCESS"; payload: {characters: ICharacter[]; page: number; totalPages: number}}
  | {type: "FETCH_CHARACTERS_FAILURE"; payload: string}
  | {type: "SET_FILTERS"; payload: Partial<ICharactersState["filters"]>}
  | {type: "SET_PAGE"; payload: number};

export interface ILocation
{
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface IEpisode
{
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
