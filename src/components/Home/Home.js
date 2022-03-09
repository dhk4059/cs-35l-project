import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Home = () => {
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
};

export default Home;
