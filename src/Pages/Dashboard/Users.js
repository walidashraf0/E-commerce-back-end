import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: 'name',
      name: 'Username',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'role',
      name: 'Role',
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers(prev => prev.filter((item) => item.id !== id));
      // setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">Add User</Link>
        </div>
        <TableShow header={ header } data={ users } delete={handleDelete} currentUser={currentUser}/>
      </div>
      {/* <Logout /> */}
    </>
  );
}
