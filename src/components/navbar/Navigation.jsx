import styles from "./Navigation.module.css"
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({isActive}) => isActive ? "active" : "default"}>Home</NavLink></li>
                <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : "default"}>About me</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
