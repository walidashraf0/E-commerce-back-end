import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function User() {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Id
    const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
    // console.log(id);

    useEffect(() => {
      setLoading(true);
        Axios.get(`${USER}/${id}`).then((data) => {
          setName(data.data.name);
          setEmail(data.data.email);
          setRole(data.data.role);
          setLoading(false);
        }).then(() => setDisable(false)).catch(() => navigate("/dashboard/users/page/404", { replace: true }));
    },[])

    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        try {
          const res = await Axios.post(`${USER}/edit/${id}`, {
            name: name,
            email: email,
            role: role,
          });
          window.location.pathname = "/dashboard/users";
        }catch (err) {
          setLoading(false);
          console.log(err);
        }
    }



  return (
    <>
    {/* <h1>User</h1> */}
        {loading ? <Loading />: ""}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder="name..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="email@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value={""}>Select Role</option>
            <option value={1995}>Admin</option>
            <option value={2001}>User</option>
            <option value={1996}>Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
