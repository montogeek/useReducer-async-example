import React, { useState } from "react";
import Teams from "./pages/Teams";
import Conferences from "./pages/Conferences";

function App() {
  const [currentTab, setCurrentTab] = useState("teams");
  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          Challenge
        </a>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-md-block bg-light sidebar">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Football data</span>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setCurrentTab("teams")}
                >
                  Teams
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setCurrentTab("conferences")}
                >
                  Conferences
                </a>
              </li>
            </ul>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
            {currentTab === "teams" ? <Teams /> : <Conferences />}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
