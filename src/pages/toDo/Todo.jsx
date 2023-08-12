import styles from "./ToDo.module.css";
import {Link, useParams} from "react-router-dom";
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
    const [inputValue, setInputValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [priority, setPriority] = useState(3);
    const [completed, setCompleted] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState("");

    useEffect(() => {
        async function fetchThisTodo() {
            setError("");
            try {
                const results = await axios.get(`${URI}${ENDPOINT}/${id}`);
                console.log(results);
                setThisTodo(results.data);
                setInputValue(results.data.title);
                setDateValue(results.data.created);
                setPriority(results.data.priority);
                setCompleted(results.data.completed);
                setDescriptionValue(results.data.description);
            } catch (error) {
                console.error(error);
                setError("Failed to get this to do")
            }
        }

        void fetchThisTodo();
    }, []);

    async function editTodo() {
        try {
            const editedTodo = await axios.put(`${URI}${ENDPOINT}/${id}`, {
                title: inputValue,
                completed: completed,
                description: descriptionValue,
                priority: priority,
                created: dateValue,
            })
            console.log(editedTodo.data);
        } catch (error) {
            console.error(error);
        }
    }

    function cancelEdit() {
        setInputValue(thisTodo.title);
        setDateValue(thisTodo.created);
        setPriority(thisTodo.priority);
        setCompleted(thisTodo.completed);
        setDescriptionValue(thisTodo.description);
    }

    return (
        <>
            <h2>To do</h2>

            {error && <p>Error to fetch your to do</p>}

            {Object.keys(thisTodo).length > 0 && (
                edit ?
                    <>
                        <button
                            type="button"
                            className="edit-button"
                            onClick={() => toggleEdit(false)}><Pencil size={16} color="#380518"/>Edit
                        </button>
                        <p>Title: {thisTodo.title}</p>
                        <p>Description: {thisTodo.description}</p>
                        <p>Date created: {thisTodo.created}</p>
                        <p>Status: {thisTodo.completed === true ? "Done" : "To do"}</p>
                        <p>Priority: {thisTodo.priority === 3 ? "Low" : thisTodo.priority === 2 ? "Medium" : "High"}</p>
                    </>
                    :
                    <form onSubmit={editTodo}>
                        <label
                            htmlFor="title-todo">
                            Title:
                            <input
                                type="text"
                                id="title-todo"
                                name="title-todo"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="description-todo">
                            Description:
                            <input
                                type="text"
                                id="description-todo"
                                name="description-todo"
                                value={descriptionValue}
                                onChange={e => setDescriptionValue(e.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="date-todo">
                            Date created:
                            <input
                                type="date"
                                id="date-todo"
                                name="date-todo"
                                value={dateValue}
                                onChange={e => setDateValue(e.target.value)}
                            />
                        </label>
                        <label htmlFor="check-todo">
                            <input
                                type="checkbox"
                                id="check-todo"
                                name="status-todo"
                                checked={completed}
                                onChange={() => setCompleted(!completed)}
                            />
                            Done</label>
                        <label htmlFor="priority"> Select priority
                            <select
                                id="priority"
                                name="priority"
                                value={priority}
                                onChange={e => setPriority(parseInt(e.target.value))}
                            >
                                <option value="1">High priority</option>
                                <option value="2">Medium priority</option>
                                <option value="3">Low priority</option>
                            </select>
                        </label>
                        <button type="submit">Edit</button>
                        <button type="reset" onClick={cancelEdit}>Annuleren</button>
                    </form>
            )}
            <span><Link to="/"><ArrowLeft size={16} color="#380518"/>Back to all to-do's</Link></span>
        </>
    );
}

export default Todo;
