import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import FirestoreService from './components/FirestoreService'
import FilterSearchService from './components/searchbar/SearchBar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './util/firebaseConfig'
import PersonalListService from './components/PersonalListService'
import HousingPage from './components/rating/HousingPage'
import DatabaseService from './components/rating/DatabaseService'
import Data from './util/housingData'

onAuthStateChanged(auth, (currentUser) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App user={currentUser} />}>
            <Route path="database-test" element={<HousingPage />}></Route>
            <Route
              path="database-test/:id"
              element={<DatabaseService />}
            ></Route>
            <Route path="firestore-test" element={<FirestoreService />}></Route>
            <Route
              path="filtersearch-test"
              element={<FilterSearchService placeholder="what do u seek" data = {Data} />}
            ></Route>
            <Route
              path="personallist-test"
              element={<PersonalListService />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})
