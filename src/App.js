import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.js";
import Selections from "./components/Selections.js";
import Game from "./components/Game.js";
import Summary from "./components/Summary.js";
import FailedSearch from "./components/FailedSearch.js";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/selections", element: <Selections /> },
  { path: "/game", element: <Game /> },
  { path: "/failed-search", element: <FailedSearch /> },
  { patch: "/summary", element: <Summary /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
