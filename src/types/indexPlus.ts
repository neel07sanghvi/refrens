export interface Character
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

export interface CharactersState
{
  characters: Record<number, Character[]>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filters: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  };
  version: string;
}

export type CharactersAction =
  | {type: "FETCH_CHARACTERS_REQUEST"}
  | {type: "FETCH_CHARACTERS_SUCCESS"; payload: {characters: Character[]; page: number; totalPages: number}}
  | {type: "FETCH_CHARACTERS_FAILURE"; payload: string}
  | {type: "SET_FILTERS"; payload: Partial<CharactersState["filters"]>}
  | {type: "SET_PAGE"; payload: number};
