import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingsMainPage from "./components/Ratings/RatingsMainPage";
import FilteredSearch from "./components/FilteredSearch/FilteredSearch";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./util/firebaseConfig";
import HousingList from "./components/Preferred_Housing/HousingList";
import HomePage from "./components/Home/HomePage";
import UnknownPage from "./components/Misc/UnknownPage";
import AuthService from "./components/Auth/AuthService";
import NeedLogin from "./components/Misc/NeedLogin";
import { onValue, ref } from "firebase/database";
import DiningMainPage from "./components/DiningHalls/DiningMainPage";

// Before rendering the react app, 2 listeners :
// 1) We listen for any changes to the auth status of the user
//    to determine how much access the user has to the web app.
//    For instance, a non-logged-in user would not be able to
//    view preferred housing lists, as you need to be logged in for that.
// 2) We also listen for any changes to 'titles' in Firebase Database
//    to cache the value before rendering the web app, as the list of housing
//    and dining titles is used by multiple elements throughout the app, so
//    having the list already ready is convenient. This also allows us to not have
//    to store the list of housing/dining names in a global variable to reduce hard-coded data,
//    as altering a database is much easier than altering hard-coded data,
//    especially when the data becomes larger in scale.

var hasData = false;
var dormKeys = [];
var dormTitles = [];
var diningKeys = [];
var diningTitles = [];
onAuthStateChanged(auth, (currentUser) => {
  if (!hasData) {
    onValue(ref(db, "titles"), (snapshot) => {
      // console.log(snapshot.val());
      hasData = true;
      dormTitles = Object.values(snapshot.val()["housingTitles"]);
      dormKeys = Object.keys(snapshot.val()["housingTitles"]);
      diningTitles = Object.values(snapshot.val()["diningTitles"]);
      diningKeys = Object.keys(snapshot.val()["diningTitles"]);
      ReactDOM.render(
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App housingTitles={dormTitles} />}>
                <Route
                  path="/"
                  element={
                    <HomePage
                      housingTitles={dormTitles}
                      housingKeys={dormKeys}
                      diningKeys={diningKeys}
                      diningTitles={diningTitles}
                    />
                  }
                ></Route>
                <Route
                  path="/housing/:id"
                  element={<RatingsMainPage />}
                ></Route>
                <Route path="login" element={<AuthService />}></Route>
                <Route path="/dining/:id" element={<DiningMainPage />}></Route>
                <Route
                  path="filtered-search"
                  element={<FilteredSearch />}
                ></Route>
                <Route
                  path="preferred-housing"
                  element={
                    currentUser !== null ? (
                      <HousingList housingData={dormTitles} />
                    ) : (
                      <NeedLogin />
                    )
                  }
                ></Route>
                <Route path="*" element={<UnknownPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </React.StrictMode>,
        document.getElementById("root")
      );
    });
  } else {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App housingTitles={dormTitles} />}>
              <Route
                path="/"
                element={
                  <HomePage
                    housingTitles={dormTitles}
                    housingKeys={dormKeys}
                    diningKeys={diningKeys}
                    diningTitles={diningTitles}
                  />
                }
              ></Route>
              <Route path="/housing/:id" element={<RatingsMainPage />}></Route>
              <Route path="login" element={<AuthService />}></Route>
              <Route path="/dining/:id" element={<DiningMainPage />}></Route>
              <Route
                path="filtered-search"
                element={<FilteredSearch />}
              ></Route>
              <Route
                path="preferred-housing"
                element={
                  currentUser !== null ? (
                    <HousingList housingData={dormTitles} />
                  ) : (
                    <NeedLogin />
                  )
                }
              ></Route>
              <Route path="*" element={<UnknownPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
});
