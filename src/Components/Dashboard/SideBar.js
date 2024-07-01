import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";


export default function SideBar() {

    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    // console.log(isOpen);
    // console.log(menu);

    return (
        <>
        <div className="side-bar pt-3" style={{ width: isOpen? "240px": "fit-content"}}>
            <NavLink to={"users"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={faUsers} style={{ padding: isOpen? "10px 8px 10px 15px": "10px 14px" }}/>
            <p className="m-0" style={{
                display: isOpen? "block": "none",
            }}>Users</p>
            </NavLink>

            {/* <NavLink to={"products"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={faUsers} />
            <p className="m-0">Products</p>
            </NavLink> */}
        </div>
        </>
    );
}