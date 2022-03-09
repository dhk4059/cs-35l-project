import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://admission.ucla.edu/sites/default/files/hero-landing-images/campus-downtown-2x.jpg")`,
      }}
    >
      <NavBar></NavBar>
      <div style={{ marginTop: "50px" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
