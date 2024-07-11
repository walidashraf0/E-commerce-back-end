import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Categories() {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "title",
      name: 'Title',
    },
    {
      key: "image",
      name: 'Image',
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories(prev => prev.filter((item) => item.id !== id));
      // setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories Page</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">
            Add Category
          </Link>
        </div>
        <TableShow header={ header } data={ categories } delete={handleDelete}/>
      </div>
    </>
  );
}
