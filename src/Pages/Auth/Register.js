import axios from "axios";
import { useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";

export default function Register() {
    // States
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });


    //handle For Change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    // handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await axios.post(`${baseURL}/${REGISTER}`, form);
            console.log("Success");
        }
        catch (err){
            console.log(err.response ? err.response.data : err.message);
        }
    }


    console.log(form);

  return (
    <div className="container">
      <div className="row h-100">
        <form className="form" onSubmit={handleSubmit}>
          <div className="custom-form">
            <h1>Register Now</h1>
            <div className="form-control">
                <input type="text" id="name" value={form.name} onChange={handleChange} name="name" placeholder="Enter Your Name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control">
                <input type="email" id="email" value={form.email} onChange={handleChange} name="email" placeholder="Enter Your Email" required />
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
            </div>
        </form>
      </div>
    </div>
  );
}
