import styles from "./ToDo.module.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArrowLeft, Pencil} from "@phosphor-icons/react";
import axios from "axios";

const URI = "http://localhost:3000/"
const ENDPOINT = "todos"

function Todo() {
    const {id} = useParams();

    const [edit, toggleEdit] = useState(true);
    const [thisTodo, setThisTodo] = useState({});
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchThisTodo() {
            setError("");
            try {
                const results = await axios.get(`${URI}${ENDPOINT}/${id}`);
                console.log(results);
                setThisTodo(results.data);
            } catch (error) {
                console.error(error);
                setError("Failed to get this to do")
            }
        }

        void fetchThisTodo();
    }, []);

        async function editTodo() {

        // const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

        try {
            const editedTodo = await axios.put(`${URI}${ENDPOINT}/${id}`, {
                id: id,
                title: "Ik heb nu iets gewijzigd",
                completed: false,
                description: "Gewijzigde test",
                priority: 3,
                created: date,
            })
            console.log(editedTodo.data);
        } catch (error) {
            console.error(error);
        }
    }

    function cancelEdit() {

    }

    return (
        <>
            {console.log(thisTodo)}
            <h2>To do</h2>
            <p>To do id {id}</p>
            {error && <p>Error to fetch your to do</p>}

            {Object.keys(thisTodo).length > 0 && (
                <p>Title to do: {thisTodo.title}</p>)}

            {edit ?
                <>
                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => toggleEdit(false)}><Pencil size={16} color="#380518"/>Edit
                    </button>
                    <p>Title: {thisTodo.name}</p>
                    <p>Date created: {thisTodo.date}</p>

                    <label
                        htmlFor="check-todo">
                        <input
                            type="checkbox"
                            id="check-todo"
                            name="status-todo"
                        />
                        Done</label>
                    <p>Priority:</p>

                    <span><Link to="/"><ArrowLeft size={16} color="#380518"/>Back to all to-do's</Link></span>
                </>
                :
                <>
                    <form onSubmit={editTodo}>
                        <label
                            htmlFor="title-todo">
                            Title:
                            <input
                                type="text"
                                id="title-todo"
                                name="title-todo"
                            />
                        </label>
                        <label
                            htmlFor="date-todo">
                            Date created:
                            <input
                                type="date"
                                id="date-todo"
                                name="date-todo"
                            />
                        </label>
                        <label
                            htmlFor="check-todo">
                            <input
                                type="checkbox"
                                id="check-todo"
                                name="status-todo"
                            />
                            Done</label>
                        <label htmlFor="priority"> Select priority
                            <select
                                id="priority"
                                name="priority"
                                // value={priority}
                                // onChange={e => setPriority(parseInt(e.target.value))}
                            >
                                <option value="1">High priority</option>
                                <option value="2">Medium priority</option>
                                <option value="3">Low priority</option>
                            </select>
                        </label>
                        <button type="submit">Edit</button>
                        <button type="button" onClick={cancelEdit}>Annuleren</button>
                    </form>
                    <span><Link to="/"><ArrowLeft size={16} color="#380518"/>Back to all to-do's</Link></span>
                </>
            }
        </>
    );
}

export default Todo;
