import axios from "axios";
import { useState } from "react";
import { LOGIN, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // Err
  const [err, setErr] = useState("");

  //handle For Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      cookie.set(`e-commerce`, token);
      window.location.pathname = '/dashboard/users';
      setErr("");
      // console.log(res.data);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Password or Gmail is not correct");
      } else {
        setErr("Internal Server Error");
      }
      // console.log(err.response ? err.response.data : err.message);
    }
  }

  // console.log(form);

  return (
    <>
      {loading === true ? <Loading /> : ""}
      <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="row w-100">
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="mb-4">Login</h1>

              <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email.."
                  required
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password.."
                  minLength="6"
                  required
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>

              <button className="btn btn-primary">Login</button>
              <NavLink className={"btn btn-primary mx-3"} to={"/register"}>Register</NavLink>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" ? <span className="error">{err}</span> : ""}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
