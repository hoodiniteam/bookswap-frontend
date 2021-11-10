import Cookies from "js-cookie";

const LogOut = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
    localStorage.clear()
}
export default LogOut
