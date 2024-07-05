import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function User() {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    
    // Id
    const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
    // console.log(id);


    useEffect(() => {
        Axios.get(`${USER}/${id}`).then((data) => {
            setName(data.data.name);
            setEmail(data.data.email);
        }).then(() => setDisable(false));
    },[])

    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        try {
          const res = await Axios.post(`${USER}/edit/${id}`, {
            name: name,
            email: email,
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
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="name@example.com" />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
