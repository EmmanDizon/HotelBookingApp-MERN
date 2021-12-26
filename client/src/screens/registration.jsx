import { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "joi-browser";
import Input from "../components/common/input";
import http from "../components/service/httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import messageSucess from "../components/common/messageSuccess";
import messageError from "../components/common/messageError";
import Loader from "../components/loader";
import _ from "lodash";

function Registration() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [errors, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const Schema = {
    name: Validation.string().required(),
    email: Validation.string().required().email(),
    password: Validation.string().required(),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: Schema[name] };
    const { error } =
      schema[name] === undefined ? "" : Validation.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleOnChange = ({ target: input }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const data = { ...user };
    data[input.name] = input.value;

    setError(error);
    setUser(data);
  };

  const register = async () => {
    try {
      if (user.password !== user.cPassword)
        return messageError("Passwords did not match !");

      setLoading(true);

      const result = (await http.post("/api/user/register_user", user)).data;

      setLoading(false);

      if (result.success) messageSucess(result.message);
      else messageError(result.message);

      setUser({
        name: "",
        email: "",
        password: "",
        cPassword: "",
      });

    } catch (error) {
      messageError(error);
    }
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Validation.validate(
      _.pick(user, ["name", "email", "password"]),
      Schema,
      options
    );

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

    register();
  };

  return (
    <div className="mt-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-9 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="m-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className="form-outline mb-4">
                      <Input
                        type="text"
                        name="name"
                        placeHolder={"Enter your name..."}
                        value={user.name}
                        onChange={handleOnChange}
                        error={errors.name}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Input
                        type="text"
                        name="email"
                        placeHolder={"Enter your email..."}
                        value={user.email}
                        onChange={handleOnChange}
                        error={errors.email}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Input
                        type="password"
                        name="password"
                        placeHolder={"Enter your password..."}
                        value={user.password}
                        onChange={handleOnChange}
                        error={errors.password}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Input
                        type="password"
                        name="cPassword"
                        placeHolder={"Re-enter your password..."}
                        value={user.cPassword}
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <Link to="/login">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
