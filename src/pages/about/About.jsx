import "./About.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Navigation from "../../components/navbar/Navigation.jsx";
import an from "/src/assets/an.png"

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
            <Navigation/>
            <div className="inner-container">
                <h1>About me</h1>
                <section className="about-me">
                    <p>Name: {myData.name}</p>
                    <p>Profession: {myData.profession}</p>
                    <p>City: {myData.city}</p>
                    <p>{myData.description}</p>
                </section>
                <span className="image-wrapper">
                    <img src={an} alt="Picture of An"/>
                </span>
            </div>
        </>
    );
}

export default About;
