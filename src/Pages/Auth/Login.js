import axios from "axios";
import { useState } from "react";
import { LOGIN, baseURL } from "../../Api/Api";

export default function Login() {
    // States
    const [form, setForm] = useState({
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
            await axios.post(`${baseURL}/${LOGIN}`, form);
            console.log("Success");
        }
        catch (err){
            console.log(err.response ? err.response.data : err.message);
        }
    }


    console.log(form);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={form.email} onChange={handleChange} name="email" placeholder="Enter Your Email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter Your Password"
          />
        </div>
          <button>Submit</button>
      </form>
    </div>
  );
}
