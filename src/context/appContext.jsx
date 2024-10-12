import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { reducer } from "./reducer";
import { customFetch } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  theme: "",
  AllList: [],
  totalPages: 1,
  token: "",
  user: null,
  userLists: {
    favoriteMovies: [],
    favoriteTv: [],
    watchlistMovies: [],
    watchlistTv: [],
    ratedMovies: [],
    ratedTv: [],
  },
  movieData: {},
  searchTerm: "",
  searchType: "all",
  searchPage: 1,
  searchResults: {},
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //theme
  const toggleTheme = () => {
    const newTheme = state.theme === "" ? "corporate" : "";
    dispatch({ type: "THEME", payload: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  //list
  const loadList = async ({ type, list }) => {
    const resp = await customFetch(`${type}/${list}?language=en-US&page=1`);
    dispatch({
      type: "LOAD_LIST",
      payload: {
        results: resp.data.results,
        totalPages: resp.data.total_pages,
      },
    });
  };

  const updateList = async ({ type, list, activePage }) => {
    const resp = await customFetch(
      `${type}/${list}?language=en-US&page=${activePage + 1}`
    );
    dispatch({ type: "UPDATE_LIST", payload: resp.data.results });
  };

  //movie
  const updateMovie = (allData) => {
    dispatch({ type: "UPDATE_MOVIE", payload: allData });
  };
  //search
  const setSearch = async (value, type = "multi", page = 1) => {
    dispatch({ type: "SET_SEARCH", payload: { value, type, page } });
    const resp = await customFetch(
      `/search/${
        type === "all" ? "multi" : type
      }?query=${value}&include_adult=false&language=en-US&page=${page}`
    );
    dispatch({ type: "SEARCH", payload: resp.data });
  };

  //session
  const getToken = async () => {
    const options = {
      method: "POST",
      url: "https://api.themoviedb.org/4/auth/request_token",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
      },
      data: { redirect_to: "https://mov-movies.netlify.app/approved" },
    };
    try {
      const response = await axios(options);
      dispatch({ type: "SET_TOKEN", payload: response.data.request_token });
      localStorage.setItem("moviesApp-token", response.data.request_token);
    } catch (error) {}
  };

  const getUser = async (id, token) => {
    dispatch({ type: "SET_TOKEN", payload: token });
    try {
      const resp = await customFetch(`/account/${id}`);
      dispatch({
        type: "SET_USER",
        payload: { id: resp.data.id, username: resp.data.username },
      });
      toast.success(`welcome ${resp.data.username}`);
    } catch (error) {
      toast.error(`something went wrong, try again later`);
    }
  };

  const handleLogout = async () => {
    const options = {
      method: "DELETE",
      url: "https://api.themoviedb.org/4/auth/access_token",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
      },
      data: {
        access_token: state.token || localStorage.getItem("moviesApp-token"),
      },
    };
    try {
      const response = await axios(options);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("moviesApp-token");
      localStorage.removeItem("moviesAppUser");
      localStorage.removeItem("moviesAppUserLists");
      toast.success(`logged out`);
    } catch (error) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("moviesApp-token");
      localStorage.removeItem("moviesAppUser");
      localStorage.removeItem("moviesAppUserLists");
      toast.success(`logged out`);
    }
  };

  const getAllUserFavorite = async () => {
    const favoritesMovies = [];
    const favoritesShows = [];
    try {
      const resp = await customFetch(
        `/account/${state.user.id}/favorite/movies?language=en-US&page=1`
      );
      favoritesMovies.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/favorite/movies?language=en-US&page=${i}`
          );
          favoritesMovies.push(...resp2.data.results);
        }
      }

      dispatch({ type: "SET_FAVORITES_MOVIES", payload: favoritesMovies });
    } catch (error) {}
    try {
      const resp = await customFetch(
        `/account/${state.user.id}/favorite/tv?language=en-US&page=1`
      );
      favoritesShows.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/favorite/tv?language=en-US&page=${i}`
          );
          favoritesShows.push(...resp2.data.results);
        }
      }

      dispatch({ type: "SET_FAVORITES_SHOWS", payload: favoritesShows });
    } catch (error) {}
  };
  const getAllUserWatchlist = async () => {
    const watchlistMovies = [];
    const watchlistShows = [];
    try {
      const resp = await customFetch(
        `/account/${state.user.id}/watchlist/movies?language=en-US&page=1`
      );
      watchlistMovies.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/watchlist/movies?language=en-US&page=${i}`
          );
          watchlistMovies.push(...resp2.data.results);
        }
      }

      dispatch({ type: "SET_WATCHLIST_MOVIES", payload: watchlistMovies });
    } catch (error) {}

    try {
      const resp = await customFetch(
        `/account/${state.user.id}/watchlist/tv?language=en-US&page=1`
      );
      watchlistShows.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/watchlist/tv?language=en-US&page=${i}`
          );
          watchlistShows.push(...resp2.data.results);
        }
      }

      dispatch({ type: "SET_WATCHLIST_SHOWS", payload: watchlistShows });
    } catch (error) {}
  };
  const getAllUserRated = async () => {
    const ratedMovies = [];
    const ratedShows = [];
    try {
      const resp = await customFetch(
        `/account/${state.user.id}/rated/movies?language=en-US&page=1`
      );
      ratedMovies.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/rated/movies?language=en-US&page=${i}`
          );
          ratedMovies.push(...resp2.data.results);
        }
      }
      dispatch({ type: "SET_RATED_MOVIES", payload: ratedMovies });
    } catch (error) {}
    try {
      const resp = await customFetch(
        `/account/${state.user.id}/rated/tv?language=en-US&page=1`
      );
      ratedShows.push(...resp.data.results);
      if (resp.data.total_pages > 1) {
        for (let i = 2; i <= resp.data.total_pages; i++) {
          const resp2 = await customFetch(
            `/account/${state.user.id}/rated/tv?language=en-US&page=${i}`
          );
          ratedShows.push(...resp2.data.results);
        }
      }

      dispatch({ type: "SET_RATED_SHOWS", payload: ratedShows });
    } catch (error) {}
  };
  const getAll = () => {
    getAllUserFavorite();
    getAllUserWatchlist();
    getAllUserRated();
  };
  const saveDataToLocalStorage = () => {
    localStorage.setItem("moviesAppUser", JSON.stringify(state.user));
    localStorage.setItem(`moviesAppUserLists`, JSON.stringify(state.userLists));
  };
  const getDataFromLocalStorage = () => {
    if (localStorage.getItem("moviesAppUser")) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(localStorage.getItem("moviesAppUser")),
      });
    }
    if (localStorage.getItem("moviesAppUserLists")) {
      dispatch({
        type: "SET_ALL_USER_LISTS",
        payload: JSON.parse(localStorage.getItem("moviesAppUserLists")),
      });
    }
  };

  //movie update
  const addToFavorite = async (type, id) => {
    if (!state.user) {
      toast.error(`please login first`);
      return;
    }
    const data = { media_type: type, media_id: id, favorite: true };
    try {
      const resp = await customFetch.post(
        `/account/${state?.user?.id}/favorite`,
        data
      );
      toast.success(
        `${type === "movie" ? "the movie" : "the show"}'s been added `
      );
      getAllUserFavorite();
    } catch (error) {
      toast.error("something went wrong,try again later");
    }
  };
  const removeFromFavorite = async (type, id) => {
    const data = { media_type: type, media_id: id, favorite: false };
    try {
      const resp = await customFetch.post(
        `/account/${state?.user?.id}/favorite`,
        data
      );
      toast.success(
        `${type === "movie" ? "the movie" : "the show"}'s been removed `
      );
      getAllUserFavorite();
    } catch (error) {
      toast.error("something went wrong,try again later");
    }
  };
  const addToWatchList = async (type, id) => {
    const data = { media_type: type, media_id: id, watchlist: true };
    if (!state.user) {
      toast.error(`please login first`);
      return;
    }
    try {
      const resp = await customFetch.post(
        `/account/${state?.user?.id}/watchlist`,
        data
      );

      toast.success(
        `${type === "movie" ? "the movie" : "the show"}'s been added `
      );
      getAllUserWatchlist();
    } catch (error) {
      toast.error("something went wrong,try again later");
    }
  };
  const removeFromWatchList = async (type, id) => {
    const data = { media_type: type, media_id: id, watchlist: false };

    try {
      const resp = await customFetch.post(
        `/account/${state?.user?.id}/watchlist`,
        data
      );
      toast.success(
        `${type === "movie" ? "the movie" : "the show"}'s been removed `
      );
      getAllUserWatchlist();
    } catch (error) {
      toast.error("something went wrong,try again later");
    }
  };
  const addRate = async (id, type, rateData) => {
    if (!state.user) {
      toast.error(`please login first`);
      return;
    }
    try {
      const resp = await customFetch.post(`/${type}/${id}/rating`, rateData);
      toast.success(`your rating 've been sent`);
      getAllUserRated();
    } catch (error) {
      toast.error(`something went wrong,try again later`);
    }
  };
  const removeRate = async (id, type) => {
    try {
      const resp = await customFetch.delete(`/${type}/${id}/rating`);
      toast.success(`your rating 've been deleted`);
      getAllUserRated();
    } catch (error) {
      toast.error(`something went wrong,try again later`);
    }
  };
  //useEffects
  useEffect(() => getDataFromLocalStorage(), []);

  useEffect(() => {
    if (state.user) {
      getAll();
    }
  }, [state.user]);
  useEffect(() => {
    if (state.userLists) {
      saveDataToLocalStorage();
    }
  }, [state.userLists]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleTheme,
        loadList,
        updateList,
        updateMovie,
        setSearch,
        getToken,
        getUser,
        handleLogout,
        getAll,
        addToFavorite,
        addToWatchList,
        removeFromFavorite,
        removeFromWatchList,
        addRate,
        removeRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppProvider = () => useContext(AppContext);
export default AppProvider;
