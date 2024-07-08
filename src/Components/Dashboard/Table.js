import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";

export default function TableShow(props) {
  const currentUser = props.currentUser || false;

  //Header Show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);
  //   Body Show
  const dataShow = props.data.map((item, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item[item2.key] === "1995"
            ? "Admin"
            : item[item2.key] === "2001"
            ? "User"
            : item[item2.key] === "1996"
            ? "Writer"
            : item[item2.key] === "1999"
            ? "Product Manger"
            : item[item2.key]}
          {currentUser
            ? item[item2.key] === currentUser.name
              ? " (You)"
              : ""
            : ""}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          {currentUser.name !== item.name ? (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  ));

  //   Return Data
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.data.length === 0 ? (
            <tr className="text-center">
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : (
            ""
          )}
          {dataShow}
        </tbody>
      </Table>
    </>
  );
}
