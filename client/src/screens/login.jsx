import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import messageError from "../components/common/messageError";
import messageSucess from "../components/common/messageSuccess";
import http from "../components/service/httpService";
import Loader from "../components/loader";
import Validation from "joi-browser";
import Input from "../components/common/input";
import _ from "lodash";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const Schema = {
    email: Validation.string().required().email(),
    password: Validation.string().required(),
  };

  const handleChange = ({ target: input }) => {
    const data = { ...user };
    data[input.name] = input.value;
    setUser(data);
  };

  async function logIn() {
    try {
      setLoading(true);

      const result = (await http.post("/api/user/login", user)).data;

      setLoading(false);

      if (result.success) messageSucess(result.message);
      else {
        messageError(result.message); 
        return;
      }
      const payLoad = _.omit(result, ['success', 'message']);

      localStorage.setItem('currentUser', JSON.stringify(payLoad))

      window.location.href = '/home';

    } catch (error) {
      messageError(error);
    }
  }

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Validation.validate(user, Schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});

    if (errors) return;

    logIn();
  };

  return (
    <div className="mt-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <input type="image"
                img = "true"
                src={"https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"}
                className="img-fluid"
                alt="Cannot render image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <ToastContainer />
                <div className="form-outline mb-4">
                  <Input
                    type="email"
                    placeHolder="Please enter a valid email address."
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                <div className="form-outline mb-3">
                  <Input
                    type="password"
                    placeHolder="Enter password."
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
          
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                    Login
                    </button>
           
                
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
