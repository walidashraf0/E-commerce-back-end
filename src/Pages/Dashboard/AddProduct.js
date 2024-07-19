import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, PRODUCT } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {

    const [form, setForm ] = useState({
      category: "",
      title: "",
      description: "",
      price: "",
      discount: "",
      about: "",
    });

    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();


    // console.log(images);

    async function handleSubmit(e) {
      setLoading(true);
        e.preventDefault();
        // const form = new FormData();
        // form.append('title', form.title);
        // form.append('image', image);
        try {
          const res = await Axios.post(`${PRODUCT}/add`, form);
          nav("/dashboard/products");
          // window.location.pathname = "/dashboard/categories";
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
    }, []);

    useEffect(() => {
      Axios.get(`/${CATEGORIES}`)
        .then((data) => setCategories(data.data))
        .catch((err) => console.log(err));
    }, []);


    function handleChange(e) {
      setForm({...form, [e.target.name]: e.target.value});
    }

    const categoriesShow = categories.map((item, key) => {
      return <option key={key} value={item.id}>{item.title}</option>;
    });

    // console.log(form);


  return (
    <>
    {/* <h1>User</h1> */}
        {loading ? <Loading />: ""}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" ref={focus} value={form.category} onChange={handleChange}>
            <option disabled value={""}>Select Category</option>
            {categoriesShow}
            {/* <option value={"5"}>Category 1</option>
            <option value={"10"}>Category 2</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} type="text" placeholder="title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={form.description} onChange={handleChange} type="text" placeholder="description..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" value={form.price} onChange={handleChange} type="text" placeholder="price..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control name="discount" value={form.discount} onChange={handleChange} type="text" placeholder="discount..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control name="about" value={form.about} onChange={handleChange} type="text" placeholder="about..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control multiple name="image" onChange={(e) => setImages(e.target.files)} type="file" />
        </Form.Group>
        
        
        <button disabled={form.title.length > 1 ? false: true} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}