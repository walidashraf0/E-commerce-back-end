import axios from "axios";
import { useState } from "react";
import { LOGIN, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal';

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
      window.location.pathname = "/users";
      setErr("")
      console.log(res.data);
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

  console.log(form);

  return (
    <>
      {loading === true ? <Loading /> : ""}
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <div className="form-control mb-3">
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
              <div className="form-control mb-3">
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

              <button className="btn btn-primary">Submit</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png" alt="sign in with google"/>
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" ? <span className="error">{err}</span> : ""}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
