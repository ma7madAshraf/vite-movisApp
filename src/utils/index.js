import axios from "axios";

const options = {
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}
      `,
  },
};

export const customFetch = axios.create(options);
