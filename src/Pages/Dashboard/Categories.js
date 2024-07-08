import { useEffect, useState } from "react";
import { CATEGORIES } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Categories() {
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);


  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUser]);

  const header = [
    {
      name: 'Title',
    },
    {
      name: 'Image',
    },
  ];


  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">
            Add User
          </Link>
        </div>
        <TableShow header={ header } data={ users } delete={CATEGORIES}/>
      </div>
    </>
  );
}
