import styles from "./Home.module.css";
import {useEffect, useState} from 'react';
import {v4 as id} from "uuid";
import {ArrowUp, ArrowDown} from "@phosphor-icons/react";
import ListItem from "../../components/listItem/ListItem.jsx";
import axios from "axios";

const URI = "http://localhost:3000/"
const ENDPOINT = "todos"
function Home() {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [priority, setPriority] = useState(3);
    const [completed, setCompleted] = useState(false);
    const [sorted, setSorted] = useState(false);


    useEffect(()=> {
        async function fetchTodos() {
            try {
                const results = await axios.get(`${URI}${ENDPOINT}`);
                console.log(results.data);
                setTodos(results.data);
            } catch (error) {
                console.error(error);
            }
        } void fetchTodos();
        }, []);



    async function addTodo(e) {
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        e.preventDefault()

        if (inputValue) {
            setTodos([...todos, {
                id: id(),
                title: inputValue,
                completed: completed,
                priority: priority,
                description: "",
                created: date,
            }])
            setInputValue("");
            setPriority(3);
            setCompleted(false);
        } else {
            alert("Please enter a task");
        }
    }

    function sortTodos(comparator) {
        const sortedTodos = [...todos];
        sortedTodos.sort(comparator);
        setTodos(sortedTodos);
    }

    function sortOnHighPriority() {
        sortTodos((a, b) => a.priority - b.priority);
        setSorted(false);
    }

    function sortOnLowPriority() {
        sortTodos((a, b) => b.priority - a.priority);
        setSorted(true);
    }

    return (
            <main>

                <h1>Todo App</h1>

                <form onSubmit={addTodo}>

                    <label htmlFor="new-task">New task
                        <input
                            type="text"
                            id="new-task"
                            name="new-task"
                            placeholder="Title"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                    </label>

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

                    <button type="submit">Add task</button>

                </form>

                { sorted ?
                    <button type="button" onClick={sortOnHighPriority}>High to low priority<ArrowUp size={16} color="#380518" /></button>
                    :
                    <button type="button" onClick={sortOnLowPriority}>Low to high priority<ArrowDown size={16} color="#380518" /></button>
                }

                <ol>
                    {todos.map((todo) => {
                        return (
                            <ListItem
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        );
                    })
                    }
                </ol>

            </main>
    );
}

export default Home;