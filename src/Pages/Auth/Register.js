import axios from "axios";
import { useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set(`e-commerce`, token);
      navigate('/login', {replace: true});
    } catch (err) {
      setLoading(false);
      console.log(err)
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server Error");
      }
      // console.log(err.response ? err.response.data : err.message);
    }
  }

  console.log(form);

  return (
    <>
      {loading === true ? <Loading /> : ""}
      <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="row w-100">
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="mb-4">Register Now</h1>

              <Form.Group className="form-custom">
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name.."
                  required
                />
                <Form.Label>Name:</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom">
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

              <Form.Group className="form-custom">
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


              {/* <div className="form-control">
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Enter Your Name"
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-control">
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Enter Your Password"
                  minLength="6"
                  required
                />
                <label htmlFor="password">Password</label>
              </div> */}
              <button className="btn btn-primary">Register</button>
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
