import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let userCredentials = {
      username,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setUsername("");
        setPassword("");
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="#" className="h1">
              <b>Andalan</b> FLuid
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleLoginEvent}>
              {error && (
                <>
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
