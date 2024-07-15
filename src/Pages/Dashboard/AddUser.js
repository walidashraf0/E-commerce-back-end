import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function AddUser() {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        try {
          const res = await Axios.post(`${USER}/add`, {
            name: name,
            email: email,
            password: password,
            role: role,
          });
          window.location.pathname = "/dashboard/users";
        }catch (err) {
          setLoading(false);
          console.log(err);
        }
    }

      //Ref
  const focus = useRef("");

    // Handle Focus
    useEffect(() => {
      focus.current.focus();
    }, [])



  return (
    <>
    {/* <h1>User</h1> */}
        {loading ? <Loading />: ""}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control ref={focus} value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder="name..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="email@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput3">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput4">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value={""}>Select Role</option>
            <option value={1995}>Admin</option>
            <option value={2001}>User</option>
            <option value={1996}>Writer</option>
            <option value={1999}>Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button disabled={name.length > 1 && email.length > 1 && password > 6 && role !== "" ? false: true} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
