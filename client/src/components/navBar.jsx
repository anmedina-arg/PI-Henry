import { NavLink } from "react-router-dom";
import { Outlet } from "react-router"
import "../styles/navbar.css"

export default function NavBar() {
    return (
        <div>
        <nav className="nav_bar-container">
            <NavLink className="item_navbar" to="/"> Landing </NavLink>
            <NavLink className="item_navbar" to="/home"> Home </NavLink>
            <NavLink className="item_navbar" to="/addactivity"> Activity </NavLink>
        </nav>
        <Outlet/> 
        {/* este outlet viene de la nueva version de react-router */}
        </div>
    )
}