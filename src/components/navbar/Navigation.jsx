import {NavLink} from "react-router-dom";
import styles from "./Navigation.module.css"

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({isActive}) => isActive ? "active" : "default"}>Home</NavLink></li>
                <li><NavLink to="/about">About me</NavLink></li>
                <li><NavLink to="/todo/:id">To do</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navigation;
