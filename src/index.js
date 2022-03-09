import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import FirestoreService from './components/FirestoreService'
import FilterSearchService from './components/FilterSearchService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './util/firebaseConfig'
import PersonalListService from './components/preferred_housing_list/PersonalListService'
import HomePage from './components/rating/HomePage'
import HousingPage from './components/rating/HousingPage'
// import DatabaseService from './components/rating/DatabaseService'
import UnknownPage from './components/UnknownPage'

onAuthStateChanged(auth, (currentUser) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App user={currentUser} />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/housing-page" element={<HousingPage />}></Route>
            <Route path="/:id" element={<DatabaseService />}></Route>
            <Route path="firestore-test" element={<FirestoreService />}></Route>
            <Route
              path="filtersearch-test"
              element={<FilterSearchService />}
            ></Route>
            <Route
              path="personallist-test"
              element={<PersonalListService />}
            ></Route>
            <Route path="*" element={<UnknownPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})
