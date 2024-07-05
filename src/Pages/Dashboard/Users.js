import { useEffect, useState } from "react";
import { USER, USERS, baseURL } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  const userFilter = users.filter((user) => user.id !== currentUser.id);

  const usersShow = userFilter.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role === '1995'? 'Admin': user.role === '2001'? 'User': 'Writer'}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        </div>
      </td>
    </tr>
  ));

  //Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white p-2 w-100">
        <h1>Users Page</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center">
                  {" "}
                  Loading...
                </td>
              </tr>
            ) : users.length <= 1 && noUsers ? (
              <tr>
                <td colSpan={12} className="text-center">
                  {" "}
                  No Users Found
                </td>
              </tr>
            ) : (
              usersShow
            )}
          </tbody>
        </Table>
      </div>
      {/* <Logout /> */}
    </>
  );
}
