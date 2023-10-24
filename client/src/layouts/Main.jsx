import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Main = () => {
  return (
    <section className=" mx-auto h-screen max-w-[85%]">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
