import styles from "./ListItem.module.css"
import {FlagPennant, Trash, Link} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";


function ListItem({todo, todos, setTodos}) {

    const navigate = useNavigate();

    function toggleCompleted(idParam) {
        setTodos(todos.map((todo) => {
                const {id, completed} = todo;
                if (id === idParam) {
                    return {
                        ...todo,
                        completed: !completed
                    };
                }
                return todo;
            })
        );
    }

    function deleteTask(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }


    return (
        <li key={todo.id} className="to-do-item">
            <input
                type="checkbox"
                name={`${todo.title}-status`}
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
            />
            <span>{todo.title}</span>
            <button
            type="button"
            className="link-button"
            onClick={()=> navigate(`/todo/${todo.id})`)}
            ><Link size={16} color="#380518" /></button>
            <span>{todo.priority === 3 ? <FlagPennant size={16} color="yellow" /> : todo.priority === 2 ? <FlagPennant size={16} color="orange" />  : <FlagPennant size={16} color="red" />}</span>
            <button
                type="button"
                onClick={() => deleteTask(todo.id)}
                className="delete-button"
            ><Trash size={16} color="#380518" />
            </button>
        </li>
    );
}

export default ListItem;
