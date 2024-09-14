import {Reducer} from "react";
import {useCallback} from "react";
import {ReducerState} from "react";
import {useReducer} from "react";
import {fetchCharacters} from "../services/api";
import {CharactersAction} from "../types/indexPlus";
import {CharactersState} from "../types/indexPlus";
import {random} from "../utils/constants";

const initialState: CharactersState = {
  characters: {},
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  filters: {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: ""
  },
  version: random()
};

const fnCharactersReducer = (state: CharactersState, action: CharactersAction): CharactersState =>
{
  switch(action.type)
  {
    case "FETCH_CHARACTERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_CHARACTERS_SUCCESS":
      return {
        ...state,
        loading: false,
        characters: {
          ...state.characters,
          [action.payload.page]: action.payload.characters
        },
        totalPages: action.payload.totalPages
      };
    case "FETCH_CHARACTERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: {...state.filters, ...action.payload},
        currentPage: 1,
        version: random()
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
        version: random()
      };
    default:
      return state;
  }
};

export const useCharacters = () =>
{
  const [state, dispatch] = useReducer(fnCharactersReducer, initialState as ReducerState<Reducer<any, any>>);

  const loadCharacters = useCallback(async() =>
  {
    dispatch({type: "FETCH_CHARACTERS_REQUEST"});

    try
    {
      const {
        results,
        info
      } = await fetchCharacters(state.currentPage, state.filters);

      dispatch({
        type: "FETCH_CHARACTERS_SUCCESS",
        payload: {
          characters: results,
          page: state.currentPage,
          totalPages: info.pages
        }
      });
    }
    catch(error)
    {
      dispatch({
        type: "FETCH_CHARACTERS_FAILURE",
        payload: "Failed to fetch characters"
      });
    }
  }, [state.currentPage, state.filters]);

  const setFilters = useCallback((filters: Partial<CharactersState["filters"]>) =>
  {
    dispatch({
      type: "SET_FILTERS",
      payload: filters
    });

  }, []);

  const setPage = useCallback((page: number) =>
  {
    dispatch({
      type: "SET_PAGE",
      payload: page
    });
  }, []);

  return {
    state,
    loadCharacters,
    setFilters,
    setPage
  };
};
