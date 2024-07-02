import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";


export default function SideBar() {

    const menu = useContext(Menu);
    const WindowContext = useContext(WindowSize);
    const windowSize = WindowContext.windowSize;
    // console.log(windowSize.windowSize);
    const isOpen = menu.isOpen;
    // console.log(isOpen);
    // console.log(menu);

    return (
        <>
        <div className="side-bar pt-3" style={{ 
            left: windowSize < '768' ? (isOpen ? 0: "-100%"): '',
            width: isOpen? "240px": "fit-content"}}>
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