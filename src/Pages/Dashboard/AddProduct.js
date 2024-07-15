import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../Api/Axios";
import { CATEGORY } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function AddProduct() {

    const [form, setForm ] = useState({
      category: "",
      title: "",
      description: "",
      price: "",
      discount: "",
      about: "",
    });
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);


    // async function handleSubmit(e) {
    //   setLoading(true);
    //     e.preventDefault();
    //     const form = new FormData();
    //     form.append('title', form.title);
    //     form.append('image', image);
    //     try {
    //       const res = await Axios.post(`${CATEGORY}/add`, form);
    //       window.location.pathname = "/dashboard/categories";
    //     }catch (err) {
    //       setLoading(false);
    //       console.log(err);
    //     }
    // }

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
      <Form className="bg-white w-100 mx-2 p-3" >
      <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput4">
          <Form.Label>Category</Form.Label>
          <Form.Select ref={focus} value={form.category} onChange={(e) => setForm(e.target.value)}>
            <option disabled value={""}>Select Category</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control value={form.title} onChange={(e) => setForm(e.target.value)} type="text" required placeholder="title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control value={form.description} onChange={(e) => setForm(e.target.value)} type="text" required placeholder="description..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control value={form.price} onChange={(e) => setForm(e.target.value)} type="text" required placeholder="price..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Discount</Form.Label>
          <Form.Control value={form.discount} onChange={(e) => setForm(e.target.value)} type="text" required placeholder="discount..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>About</Form.Label>
          <Form.Control value={form.about} onChange={(e) => setForm(e.target.value)} type="text" required placeholder="about..." />
        </Form.Group>
        
        
        <button disabled={form.title.length > 1 ? false: true} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
