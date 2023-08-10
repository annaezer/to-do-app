import './styles/global.css'
import './styles/variables.css'
import axios from "axios";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Todo from "./pages/toDo/Todo.jsx";
import Navigation from "./components/navbar/Navigation.jsx";
import NotFound from "./pages/notFound/NotFound.jsx"
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/todo/:id" element={<Todo/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
