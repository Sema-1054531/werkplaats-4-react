import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Toast} from "bootstrap";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastRef = useRef(null);

  const navigate = useNavigate();

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log('proceed');
      fetch("http://localhost:5000/api/login/" + email)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            showWarningToast("Vul alsjeblieft een geldige e-mail in.");
          }
            else {
            if (resp.password === password) {
              showWarningToast.success("Success");
              navigate("/surveys");
            }
              else {
              showWarningToast("Vul alsjeblieft een geldige wachtwoord in.");
            }
          }
        })
        .catch((err) => {
          showWarningToast.error("Login mislukt: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;

    if (email === "" || email === null) {
      result = false;
      showWarningToast("Vul alsjeblieft je e-mail in");
    }
    if (password === "" || password === null) {
      result = false;
      showWarningToast("Vul alsjeblieft je wachtwoord in");
    }

    return result;
  };

  const showWarningToast = (message) => {
    const toastEl = toastRef.current;
    const toast = new Toast(toastEl, {
      autohide: true,
      delay: 3000,
    });

    toastEl.querySelector(".toast-body").textContent = message;
    toast.show();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-lg-6">
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>E-mail <span className="errmsg">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>Wachtwoord <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Log in</button>
              <Link className="btn btn-secondary" to={'/register'}>Nieuw account</Link>
            </div>
          </div>
        </form>
        <div
          ref={toastRef}
          className="toast position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
