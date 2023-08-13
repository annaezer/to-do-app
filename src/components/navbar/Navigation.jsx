import "./Navigation.css"
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <div className="outer-container nav-bar">
            <nav className="nav-content">
                <ul className="menu-items">
                    <li><NavLink to="/" className={({isActive}) => isActive ? "active" : "default"}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : "default"}>About
                        me</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
