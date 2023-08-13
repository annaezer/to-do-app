import "./ListItem.css"
import {FlagPennant, Trash, Link} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ListItem({todo, todos, setTodos, URI, ENDPOINT}) {

    const navigate = useNavigate();

    async function toggleCompleted(id) {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? {
                ...todo,
                completed: !todo.completed
            } : todo);
        setTodos(updatedTodos);

        try {
            const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
            const editedTodo = await axios.put(
                `${URI}${ENDPOINT}/${id}`,
                {
                    title: todoToUpdate.title,
                    completed: todoToUpdate.completed,
                    description: todoToUpdate.description,
                    priority: todoToUpdate.priority,
                    created: todoToUpdate.created,
                }
            );
            console.log(editedTodo.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTodo(id) {
        try {
            const deletedTodo = await axios.delete(`${URI}${ENDPOINT}/${id}`);
            console.log("This to do is deleted:", deletedTodo.data);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <li key={todo.id} className="todo-item">
            <div className="todo-check-and-title">
                <input
                    className="todo-checkbox"
                    type="checkbox"
                    name={`${todo.title}-status`}
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                />
                <h3 className="todo-title">{todo.title}</h3>
            </div>
            <div className="todo-buttons">
                <button
                    type="button"
                    className="link-button"
                    onClick={() => navigate(`/todo/${todo.id}`)}
                ><Link size={28} color="#380518"/></button>
                <span className="priority-button">{todo.priority === 3 ?
                    <FlagPennant size={28} color="#fff047" weight="fill"/> : todo.priority === 2 ?
                        <FlagPennant size={28} color="#e57506" weight="fill"/> :
                        <FlagPennant size={28} color="#a31300" weight="fill"/>}</span>
                <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                ><Trash size={28} color="#380518"/>
                </button>
            </div>
        </li>
    );
}

export default ListItem;
