import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { CATEGORY } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function AddCategory() {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
          const res = await Axios.post(`${CATEGORY}/add`, form);
          window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control ref={focus} value={title} onChange={(e) => setTitle(e.target.value)} type="text" required placeholder="title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files.item(0))} required />
        </Form.Group>
        
        <button disabled={title.length > 1 ? false: true} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
