import styles from "./ToDo.module.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {ArrowLeft, Pencil} from "@phosphor-icons/react";

function Todo() {
    const {id} = useParams();
    const [edit, toggleEdit] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            <h2>To do</h2>
            <p>To do id {id}</p>
            {edit ?
                <>
                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => toggleEdit(false)}><Pencil size={16} color="#380518"/>Edit</button>
                    <p>Title: blabla</p>
                    <p>Date created: dd/mm/yyyy</p>

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
                    <form>
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
                        <button type="button" onClick={() => console.log("edit")}>Edit</button>
                        <button type="button" onClick={() => navigate(-1)}>Annuleren</button>
                    </form>
                    <span><Link to="/"><ArrowLeft size={16} color="#380518"/>Back to all to-do's</Link></span>
                </>
            }
        </>
    );
}

export default Todo;
