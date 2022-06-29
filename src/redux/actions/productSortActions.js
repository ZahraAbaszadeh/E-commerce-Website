import { ASC, DESC } from "../types/sortTypes";

export const sortByDesc = () => {
  return {
    type: DESC,
  };
};

export const sortByAsc = () => {
  return {
    type: ASC,
  };
};
