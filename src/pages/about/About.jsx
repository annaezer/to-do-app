import styles from "./About.module.css";
import axios from "axios";
import {useEffect, useState} from "react";

const URI = "http://localhost:3000/"
const ENDPOINT = "profile"

function About() {

    const [myData, setMyData] = useState({});

    useEffect(() => {
        async function fetchMyData() {
            try {
                const myData = await axios.get(`${URI}${ENDPOINT}`);
                console.log(myData);
                setMyData(myData.data);
            } catch (error) {
                console.error(error);
            }
        }

        void fetchMyData();
    }, []);

    return (
        <>
            <p>{myData.name}</p>
            <p>{myData.profession}</p>
            <p>{myData.city}</p>
            <p>{myData.description}</p>
        </>
    );
}

export default About;
