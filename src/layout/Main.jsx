import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import "./main.scss";

//svg
import wave from "../assets/wave.svg";

//component
import Nav from "../components/Nav";
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      {/* <img src={wave} /> */}
    </div>
  );
}
