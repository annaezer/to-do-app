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
        <h2>Deze pagina bestaat niet, je wordt in 3 seconden teruggestuurd naar de Homepagina</h2>
    );
}

export default NotFound;
