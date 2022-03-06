//<<<<<<< Updated upstream
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
import PersonalListService from './components/PersonalListService'
import HousingPage from './components/rating/HousingPage'
import DatabaseService from './components/rating/DatabaseService'

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
              element={<FilterSearchService />}
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
//=======
/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';*/

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
//>>>>>>> Stashed changes
