import axios from "axios";
import Cookie from "cookie-universal";
import { LOGOUT, baseURL } from "../../Api/Api";

export default function Logout() {

    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    async function handleLogout() {
        try {
            const res = await axios.get(`${baseURL}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }



    return(
        <>
        <button onClick={handleLogout}>Log Out</button>
        </>
    );
}