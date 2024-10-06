import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
// import { green } from 'colors';

function Home() {
  const green = "#28a745";

  return (
    <>
      <Navbar />
      <div className="container row ">
        <div
          className="col-4 p-3 d-grid justify-content-center bg-secondary rounded-2"
          style={{ height: "35vh" }}
        >
          <div className=" row justify-content-between  rounded-2">
            <div
              className="col m-1  btn rounded-2 "
              style={{ backgroundColor: green }}
            >
              Button
            </div>
            <div
              className="col m-1  btn rounded-2 "
              style={{ backgroundColor: green }}
            >
              Button
            </div>
          </div>
          <br></br>
          <input
            type="text"
            name="Country"
            value=""
            onChange=""
            className=" row rounded-2 "
            placeholder="Country"
            style={{ width: "22vw" }}
          />

          <br></br>
          <div className=" row   rounded-2 ">
            <div
              className="col m-1  btn rounded-2"
              style={{ backgroundColor: green }}
            >
              Button
            </div>
            <div
              className="col m-1  btn rounded-2"
              style={{ backgroundColor: green }}
            >
              Button
            </div>
          </div>
          <br></br>
          <div
            className=" row justify-content-center btn rounded-2 w-25"
            style={{ backgroundColor: green }}
          >
            Search
          </div>
        </div>
        <div
          className="col-6 bg-secondary container"
          style={{ height: "50vh", width: "40vw" }}
        ></div>
      </div>
    </>
  );
}

export default Home;
