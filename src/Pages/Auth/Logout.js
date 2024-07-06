import { LOGOUT, baseURL } from "../../Api/Api";
import { Axios } from "../../Api/Axios";


export default function Logout() {

    async function handleLogout() {
        try {
            const res = await Axios.get(`/${LOGOUT}`);
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