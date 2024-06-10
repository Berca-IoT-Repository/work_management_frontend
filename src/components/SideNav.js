import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationName = location.pathname.replace("/", "");

  const logout = async () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Andalan Fluid</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Admin
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link
                  to="dashboard"
                  className={`nav-link ${
                    locationName == "dashboard" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-home " />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-header">DATA</li>
              <li className="nav-item">
                <Link
                  to="device"
                  className={`nav-link ${
                    locationName == "device" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-desktop" />
                  <p>Device</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="manpower"
                  className={`nav-link ${
                    locationName == "manpower" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-user" />
                  <p>Man Power</p>
                </Link>
              </li>
              <li className="nav-header">WORK</li>{" "}
              <li className="nav-item">
                <Link
                  to="recomendation"
                  className={`nav-link ${
                    locationName == "recomendation" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-certificate" />
                  <p>Recomendation</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="workorder"
                  className={`nav-link ${
                    locationName == "workorder" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-briefcase" />
                  <p>Work Order</p>
                </Link>
              </li>
              {/* <li className="nav-header">CHART</li>
              <li className="nav-item">
                <Link
                  to="chart"
                  className={`nav-link ${
                    locationName == "chart" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-bar-chart" />
                  <p>Chart</p>
                </Link>
              </li> */}
              <li className="nav-header">Settings</li>
              {/* <li className="nav-header">Settings</li>
              <li className="nav-item">
                <Link
                  onClick={logout}
                  className={`nav-link ${
                    locationName == "sigonut" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fa fa-times" />
                  <p>Sign Out</p>
                </Link>
              </li> */}
              <button onClick={logout} className="btn btn-secondary">
                Sign Out
              </button>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
