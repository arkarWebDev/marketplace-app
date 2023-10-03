import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  return (
    <nav className=" bg-blue-500 flex items-center justify-between text-white p-4">
      <Link className="font-bold text-4xl " to={"/"}>
        PONIT.IO
      </Link>
      {user ? (
        <Link to={"/profile"} className="  px-2 py-1 flex items-end gap-1">
          <UserIcon width={26} />
          Profile
        </Link>
      ) : (
        <div className=" flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
