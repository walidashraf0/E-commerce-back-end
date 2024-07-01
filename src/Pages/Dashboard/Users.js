import { useEffect } from "react";
import { USERS, baseURL } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import Logout from "../Auth/Logout";

export default function Users() {


    const cookie = Cookie();



  useEffect(() => {
    axios
      .get(`${baseURL}/${USERS}`, {headers: {
        Authorization: 'Bearer ' + cookie.get('e-commerce'),
      }})
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [cookie]);

  

  return (
    <>
      <h1>Users Page</h1>
      <Logout />
    </>
  );
}
