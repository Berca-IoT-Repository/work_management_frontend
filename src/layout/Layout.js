import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Home from "../components/Home";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function getUser() {
  let user = sessionStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const Layout = () => {
  const [user, setUser] = useState(getUser());
  let token = "";

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    if (user != null) {
      token = user.access_token;
    }
    if (token == "" || token == null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <SideNav />
      <Home />
      <Footer />
    </div>
  );
};

export default Layout;
