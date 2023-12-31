import "./Home.css";
import {useEffect, useState} from 'react';
import {v4 as id} from "uuid";
import {ArrowUp, ArrowDown} from "@phosphor-icons/react";
import ListItem from "../../components/listItem/ListItem.jsx";
import axios from "axios";
import Header from "../../components/header/Header.jsx";

const URI = "http://localhost:3000/"
const ENDPOINT = "todos"

function Home() {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [priority, setPriority] = useState(3);
    const [completed, setCompleted] = useState(false);
    const [sorted, setSorted] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        async function fetchTodos() {
            setError("");
            try {
                const results = await axios.get(`${URI}${ENDPOINT}`);
                console.log(results.data);
                setTodos(results.data);
            } catch (error) {
                console.error(error);
                setError("Failed to get the to do's")
            }
        }

        void fetchTodos();
    }, []);

    async function addTodo(e) {
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        e.preventDefault()

        if (inputValue) {
            try {
                const addTodo = await axios.post(`${URI}${ENDPOINT}`, {
                    id: id(),
                    title: inputValue,
                    completed: completed,
                    description: "No description yet",
                    priority: priority,
                    created: date,
                });
                const newTodo = addTodo.data;
                setTodos([...todos, newTodo]);
                setInputValue("");
                setPriority(3);
                setCompleted(false);
            } catch (error) {
                console.error(error);
            }
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
        <>
            <Header/>
            <main className="outer-container">
                <div className="inner-container">
                    <form onSubmit={addTodo} className="new-todo-form">
                        <label htmlFor="new-task">
                            <input
                                type="text"
                                id="new-task"
                                name="new-task"
                                placeholder="My new task..."
                                maxLength={20}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </label>
                        <label htmlFor="priority">
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
                    <ol>
                        {todos.map((todo) => {
                            return (
                                <ListItem
                                    key={todo.id}
                                    URI={URI}
                                    ENDPOINT={ENDPOINT}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            );
                        })
                        }
                    </ol>

                    {error && <p className="error-message">Error to fetch your to do's</p>}

                    {sorted ?
                        <button className="sorting-button" type="button" onClick={sortOnHighPriority}>High
                            priority <ArrowUp/>
                        </button>
                        :
                        <button className="sorting-button" type="button" onClick={sortOnLowPriority}>Low
                            priority <ArrowDown/>
                        </button>
                    }
                </div>
            </main>
        </>
    );
}

export default Home;
