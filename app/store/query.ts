import type { IMeta } from "~/types";

export interface QueryState {
  query: Record<string, string>;
  tempQuery: Record<string, string>;
  meta: IMeta;
}
export const defaultMeta = {
  current_page: 1,
  per_page: 10,
  last_page: 1,
  total: 0,
}
export const useQueryStore = () => {
  const state = useState<QueryState>('query', () => ({
    query: {
    },
    tempQuery: {
    },
    meta: defaultMeta
  }));
  const setQuery = (query: Record<string, string>) => {
    state.value.query = { ...state.value.query, ...query };
  };
  const setTempQuery = (query: Record<string, string>) => {
    state.value.tempQuery = { ...state.value.tempQuery, ...query };
  };
  const resetQuery = () => {
    state.value.query = {};
    state.value.tempQuery = {};
    state.value.meta = { ...defaultMeta };
  };
  const applyTempQuery = () => {
    state.value.query = { ...state.value.query, ...state.value.tempQuery };
    state.value.tempQuery = {};
  };
  const removeQuery = (key: string) => {
    delete state.value.query[key];
  };
  const resetTempQuery = (key: string) => {
    delete state.value.tempQuery[key];
  };
  const setMeta = (meta: QueryState['meta']) => {
    state.value.meta = meta;
  };
  return { state, setQuery, setTempQuery, setMeta, resetQuery, removeQuery, defaultMeta, applyTempQuery, resetTempQuery };
};