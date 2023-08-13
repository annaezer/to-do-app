import "./NotFound.css";
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
        <>
            <div className="inner-container">
                <h1 className="not-found-message">Oops!</h1>
                <h3>This page doesn't exist. You'll be redirected to the homepage in 3 seconds...</h3>
            </div>
        </>
    );
}

export default NotFound;
