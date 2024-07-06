import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function TopBar() {
  const navigate = useNavigate();
  // const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  // console.log(setIsOpen);

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  async function handleLogOut() {
    try {
        const res = await Axios.get(`/${LOGOUT}`);
        window.location.pathname = "/login";
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
}

  return (
    <>
      <div className="top-bar">
        <div className="d-flex align-items-center justify-content-between h-100">
          <div className="d-flex align-items-center gap-5">
            <h3>E-Commerce</h3>
            <FontAwesomeIcon
              cursor={"pointer"}
              icon={faBars}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          <div>
            <DropdownButton id="dropdown-basic-button" title={name}>
              <Dropdown.Item onClick={handleLogOut} href="#/action-1">Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
}
