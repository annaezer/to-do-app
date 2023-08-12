import styles from "./NotFound.module.css";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 3000), []
    });


    return (
        <h2>This page doesn't exist. You'll be redirected to the homepage in 3 seconds.</h2>
    );
}

export default NotFound;
