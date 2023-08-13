import "./Todo.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArrowLeft, Pencil} from "@phosphor-icons/react";
import axios from "axios";
import Navigation from "../../components/navbar/Navigation.jsx";

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
            <Navigation/>
            <div className="inner-container">
                <h1 className="todo-head">To do</h1>

                {error && <p className="error-message">Error to fetch your to do</p>}

                {Object.keys(thisTodo).length > 0 && (
                    edit ?
                        <>
                            <h3 className="title-todo">{thisTodo.title}</h3>
                            <div className="box-todo">
                                <span className="text-box"><p className="text-box-title">Description:</p><p>{thisTodo.description}</p></span>
                                <span className="text-box"><p className="text-box-title">Date created:</p><p>{thisTodo.created}</p></span>
                                <span
                                    className="text-box"><p className="text-box-title">Status:</p><p>{thisTodo.completed === true ? "Done" : "To do"}</p></span>
                                <span
                                    className="text-box"><p className="text-box-title">Priority:</p><p>{thisTodo.priority === 3 ? "Low" : thisTodo.priority === 2 ? "Medium" : "High"}</p></span>
                            </div>
                            <button
                                type="button"
                                className="edit-button"
                                onClick={() => toggleEdit(false)}><Pencil size={16} color="#fff6e0"/> Edit
                            </button>
                        </>
                        :
                        <form className="form-to-edit-todo" onSubmit={editTodo}>
                           <span className="input-wrapper">
                            <label
                                htmlFor="title-todo">
                                Title:</label>
                                <input
                                    type="text"
                                    id="title-todo"
                                    name="title-todo"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                />
                        </span>
                            <span className="input-wrapper">
                            <label
                                htmlFor="description-todo">
                                Description:
                            </label>
                                <input
                                    type="text"
                                    id="description-todo"
                                    name="description-todo"
                                    value={descriptionValue}
                                    onChange={e => setDescriptionValue(e.target.value)}
                                />
                        </span>
                            <span className="input-wrapper">
                            <label
                                htmlFor="date-todo">
                                Date created:
                            </label>
                                <input
                                    type="date"
                                    id="date-todo"
                                    name="date-todo"
                                    value={dateValue}
                                    onChange={e => setDateValue(e.target.value)}
                                />
                        </span>
                            <span className="input-wrapper">
                            <label htmlFor="priority"> Select priority:
                                </label>
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
                                </span>
                            <span className="input-wrapper">
                                 <label htmlFor="check-todo">Done:</label>
                                <input
                                    className="check-form"
                                    type="checkbox"
                                    id="check-todo"
                                    name="status-todo"
                                    checked={completed}
                                    onChange={() => setCompleted(!completed)}
                                />
                        </span>
                            <span className="button-wrapper"><button className="save-button" type="submit">Save</button>
                                <button className="cancel-button" type="reset" onClick={cancelEdit}>Cancel</button></span>
                        </form>
                )}
                <span className="back-home-link"><Link to="/"><ArrowLeft size={16} color="#380518"/> Back to all to-do's</Link></span>
            </div>
        </>

    );
}

export default Todo;
