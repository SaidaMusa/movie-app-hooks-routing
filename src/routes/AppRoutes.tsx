import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

import About from "../pages/About/About";

import Details from "../pages/Details/Details";

import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout />
          }
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="movie/:id"
            element={<Home />}
          >
            <Route
              index
              element={
                <Details />
              }
            />
          </Route>

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Route>
      </Routes>
  );
}

export default AppRoutes;