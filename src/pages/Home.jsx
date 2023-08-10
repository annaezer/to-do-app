import {useState} from 'react';
import {v4 as id} from "uuid";
import {ArrowUp, ArrowDown} from "@phosphor-icons/react";
import ListItem from "../../../to-do-app/src/components/listItem/ListItem.jsx";

const todoList = [
    {
        id: id(),
        title: "Learn HTML",
        completed: false,
        priority: 3,
        description: "",
    },
    {
        id: id(),
        title: "Learn CSS",
        completed: false,
        priority: 3,
        description: "",
    },
    {
        id: id(),
        title: "Learn JavaScript",
        completed: false,
        priority: 2,
        description: "",
    },
    {
        id: id(),
        title: "Learn React",
        completed: false,
        priority: 1,
        description: "",
    }]

function Home() {

    const [todos, setTodos] = useState(todoList);
    const [inputValue, setInputValue] = useState("");
    const [priority, setPriority] = useState(3);
    const [completed, setCompleted] = useState(false);
    const [sorted, setSorted] = useState(false);

    function addTodo(e) {
        e.preventDefault()

        if (inputValue) {
            setTodos([...todos, {
                id: id(),
                title: inputValue,
                completed: completed,
                priority: priority,
                description: "",
            }])
            setInputValue("");
            setPriority(3);
            setCompleted(false);
        } else {
            alert("Please enter a task");
        }
    }

    console.log(todos);
    console.log(inputValue, priority, completed);

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
