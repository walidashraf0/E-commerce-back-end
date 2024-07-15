import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { CATEGORY } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl } from "react-bootstrap";

export default function Category() {

    
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Id
    const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));
    // console.log(id);
    const idc = useParams();
    console.log(idc)

    useEffect(() => {
      setLoading(true);
        Axios.get(`${CATEGORY}/${id}`).then((data) => {
          setTitle(data.data.title);
        //   setImage(data.data.image);
          setLoading(false);
        }).then(() => setDisable(false)).catch(() => navigate("/dashboard/categories/page/404", { replace: true }));
    },[])

    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
          const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
          window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title:</Form.Label>
          <FormControl value={title} onChange={(e) => setTitle(e.target.value)} type="text" required placeholder="title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl type="file" onChange={(e) => setImage(e.target.files.item(0))} required />
        </Form.Group>
        
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
