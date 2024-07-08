import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUser]);

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


  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name === currentUser.name ? user.name + " (You)": user.name}</td>
      <td>{user.email}</td>
      <td>{user.role === '1995'? 'Admin': user.role === '2001'? 'User': 'Writer'}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          {currentUser.name !== user.name && (
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        )}
        </div>
      </td>
    </tr>
  ));

  //Handle Delete
  async function handleDelete(id) {
    if(currentUser.id !== id) {
      try {
        const res = await Axios.delete(`${USER}/${id}`);
        setDeleteUser((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">Add User</Link>
        </div>
        <TableShow header={ header } data={ users } delete={USER} />
      </div>
      {/* <Logout /> */}
    </>
  );
}
