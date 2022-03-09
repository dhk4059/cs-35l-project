import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingsMainPage from "./components/Ratings/RatingsMainPage";
import FilteredSearch from "./components/FilteredSearch/FilteredSearch";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebaseConfig";
import HousingList from "./components/Preferred_Housing/HousingList";
import HomePage from "./components/Home/HomePage";
import UnknownPage from "./components/Misc/UnknownPage";

onAuthStateChanged(auth, (currentUser) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App user={currentUser} />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/:id" element={<RatingsMainPage />}></Route>
            <Route path="ratings" element={<RatingsMainPage />}></Route>
            <Route path="filteredsearch" element={<FilteredSearch />}></Route>
            <Route path="housinglist" element={<HousingList />}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
