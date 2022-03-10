import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";

// Main render page: a navbar and the Outlet decided
// by the path route is rendered with a background image
// displaying on all pages

function App({ housingTitles }) {
  return (
    <div
      style={{
        backgroundImage: `url("https://admission.ucla.edu/sites/default/files/hero-landing-images/campus-downtown-2x.jpg")`,
      }}
    >
      <NavBar housingTitles={housingTitles}></NavBar>
      <div style={{ marginTop: "50px" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
