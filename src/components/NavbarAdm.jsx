import React from "react";
import Button from "react-bootstrap/Button";
import img from "../assets/LogoMarquesita.jpeg";
import bars from "../assets/bars.svg";
import x from "../assets/x.svg";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";


export const NavbarAdm = ({ to, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    console.log(sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <>
      <a href={to} onClick={handleClick}>
        {children}
      </a>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <a className="navbar-brand" href="#">
          <button
            type="button"
            className="btn btn-black"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <img
                src={x}
                alt="Barra Lateral"
                style={{ width: "30px", height: "30px" }}
              />
            ) : (
              <img
                src={bars}
                alt="Barra Lateral"
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </button>
        </a>
        <img
          src={img}
          alt=""
          style={{ width: "40px", height: "40px", borderRadius: "40px" }}
        />
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-2">
            <Button className="btn btn-dark" ><Link to="ingrediente" style={{textDecoration:"none"}}>Ingrediente</Link></Button>
            </li>
          </ul>
        </div>
        
      </nav>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
