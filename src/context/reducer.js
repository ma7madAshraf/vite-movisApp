export const reducer = (state, action) => {
  if (action.type === "LOAD_LIST") {
    const { results, totalPages } = action.payload;
    return { ...state, AllList: [...results], totalPages: totalPages };
  }
  if (action.type === "UPDATE_LIST") {
    return { ...state, AllList: [...state.AllList, ...action.payload] };
  }
  if (action.type === "UPDATE_MOVIE") {
    return { ...state, movieData: action.payload };
  }
  if (action.type === "SET_SEARCH") {
    return {
      ...state,
      searchTerm: action.payload.value,
      searchType: action.payload.type,
      searchPage: action.payload.page,
    };
  }
  if (action.type === "THEME") {
    return { ...state, theme: action.payload };
  }
  if (action.type === "SEARCH") {
    return { ...state, searchResults: action.payload };
  }
  if (action.type === "SET_TOKEN") {
    return { ...state, token: action.payload };
  }
  if (action.type === "SET_USER") {
    return { ...state, user: action.payload };
  }
  if (action.type === "LOGOUT") {
    return { ...state, user: null, token: "", userLists: {} };
  }
  if (action.type === "SET_FAVORITES_MOVIES") {
    return {
      ...state,
      userLists: { ...state.userLists, favoriteMovies: action.payload },
    };
  }
  if (action.type === "SET_FAVORITES_SHOWS") {
    return {
      ...state,
      userLists: { ...state.userLists, favoriteTv: action.payload },
    };
  }
  if (action.type === "SET_WATCHLIST_MOVIES") {
    return {
      ...state,
      userLists: { ...state.userLists, watchlistMovies: action.payload },
    };
  }
  if (action.type === "SET_WATCHLIST_SHOWS") {
    return {
      ...state,
      userLists: { ...state.userLists, watchlistTv: action.payload },
    };
  }
  if (action.type === "SET_RATED_MOVIES") {
    return {
      ...state,
      userLists: { ...state.userLists, ratedMovies: action.payload },
    };
  }
  if (action.type === "SET_RATED_SHOWS") {
    return {
      ...state,
      userLists: { ...state.userLists, ratedTv: action.payload },
    };
  }
  return state;
};
