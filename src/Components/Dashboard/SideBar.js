import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { links } from "./NavLink";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  // console.log(windowSize.windowSize);
  const isOpen = menu.isOpen;
  // console.log(isOpen);
  // console.log(menu);

  //User
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  // console.log(user);

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.2",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : "",
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}>

          {links.map((link, key) => (
            link.role.includes(user.role) && (
             <NavLink
             key={key}
          to={link.path}
          className="d-flex align-items-center gap-2 side-bar-link">
          <FontAwesomeIcon
            icon={link.icon}
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 14px" }}
          />
          <p
            className="m-0"
            style={{
              display: isOpen ? "block" : "none",
            }}>
            {link.name}
          </p>
        </NavLink>
          )))}
       

        {/* <NavLink to={"products"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={faUsers} />
            <p className="m-0">Products</p>
            </NavLink> */}
      </div>
    </>
  );
}
