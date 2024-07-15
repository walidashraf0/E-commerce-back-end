import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Products() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "title",
      name: 'Title',
    },
    {
      key: "description",
      name: 'Description',
    },
    {
      key: "price",
      name: 'Price',
    },
    {
      key: "rating",
      name: 'Rating',
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts(prev => prev.filter((item) => item.id !== id));
      // setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Products Page</h1>
          <Link className="btn btn-primary" to="/dashboard/product/add">
            Add Product
          </Link>
        </div>
        <TableShow header={ header } data={ products } delete={handleDelete}/>
      </div>
    </>
  );
}
