import axios from "axios";
import { useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
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
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>
              <div className="form-control">
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
              </div>
              <button className="btn btn-primary">Register</button>
              {err !== "" ? <span className="error">{err}</span> : ""}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
