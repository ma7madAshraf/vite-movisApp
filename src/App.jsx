import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Search,
  Reviews,
  SingleLayout,
  FullCast,
  Person,
  TvSeasons,
  SingleShow,
  TvSeason,
  AllMovies,
  Login,
  Login2,
  Profile,
  Keyword,
  ErrorPage,
} from "./pages";
import { loader as SingleLoader } from "./pages/SingleLayout";
import { loader as seasonLoader } from "./pages/TvSeason";
import { loader as personLoader } from "./pages/Person";
import { loader as loginLoader } from "./pages/Login2";
import { loader as KeywordLoader } from "./pages/Keyword";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        { path: "/search", element: <Search /> },
        { path: "/profile", element: <Profile /> },
        { path: "/login", element: <Login /> },
        {
          path: "/approved",
          element: <Login2 />,
          loader: loginLoader,
        },
        {
          path: "/person/:id",
          element: <Person />,
          loader: personLoader(queryClient),
        },
        {
          path: "/keyword/:type/:keyword",
          element: <Keyword />,
          loader: KeywordLoader(queryClient),
        },
        { path: "/tm/:type/:list", element: <AllMovies /> },
        {
          path: "/:type/:id",
          element: <SingleLayout />,
          loader: SingleLoader(queryClient),
          children: [
            { index: true, element: <SingleShow /> },
            { path: "/:type/:id/reviews", element: <Reviews /> },
            { path: "/:type/:id/casting", element: <FullCast /> },
            { path: "/:type/:id/seasons", element: <TvSeasons /> },
            {
              path: "/:type/:id/season/:season",
              element: <TvSeason />,
              loader: seasonLoader,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
