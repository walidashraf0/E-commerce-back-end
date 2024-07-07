import { useEffect, useState } from "react";
import { CATEGORIES } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td></td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "Admin"
          : user.role === "2001"
          ? "User"
          : "Writer"}
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          
        </div>
      </td>
    </tr>
  ));

  //Handle Delete
//   async function handleDelete(id) {
//     if (currentUser.id !== id) {
//       try {
//         const res = await Axios.delete(`${CATEGORIES}/${id}`);
//         setDeleteUser((prev) => !prev);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

  return (
    <>
      <div className="bg-white p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">
            Add User
          </Link>
        </div>
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
            ) : users.length === 0 && noUsers ? (
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
    </>
  );
}
