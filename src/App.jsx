import './styles/global.css'
import './styles/variables.css'
import axios from "axios";

function App() {

    const URI = "http://localhost:3000/"
    const ENDPOINT = "todos"

    async function fetchTodos() {
        try {
            const results = await axios.get(`${URI}${ENDPOINT}`)
            console.log(results.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addTodo() {
        const idToDo = new Date().getMilliseconds();
        console.log(idToDo);
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        console.log(date);

        try {
            const addToDo = await axios.post(`${URI}${ENDPOINT}`, {
                id: idToDo,
                title: "test",
                completed: false,
                description: "test",
                priority: 3,
                created: date,
            });
            console.log(addToDo);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTodo() {
        const id = "576"
        try {
            const deletedTodo = await axios.delete(`${URI}${ENDPOINT}/${id}`);
            console.log("To do is deleted:", deletedTodo.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function editTodo() {
        const id = "949"
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
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

    return (
        <>
            <h1>TO DO APP</h1>
            <h2>Oswald lettertype voor kleinere headings</h2>
            <p>Ik ben er nog niet over uit maar deze is wel mooi voor de lopende tekst. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Culpa distinctio eum facere minima modi obcaecati vitae. Alias est illum
                iusto laboriosam necessitatibus obcaecati voluptate! Accusamus cum debitis, doloremque et quis totam?
                Amet architecto aut minima nesciunt pariatur quod velit. Ad aliquid eligendi eum, exercitationem
                inventore magnam necessitatibus non soluta vitae voluptatem! Eos eveniet incidunt ipsum quia
                voluptatibus! At cumque delectus eos fugit ipsam iure, maxime, non omnis porro quibusdam quod sequi!
                Atque blanditiis eum provident quia? Blanditiis dignissimos distinctio, dolore eaque eius enim
                exercitationem expedita illo ipsum mollitia natus omnis recusandae voluptate. Ex harum illum itaque
                provident quidem repudiandae similique.</p>
            <button
                type="button"
                onClick={fetchTodos}
            >Get To Do's
            </button>
            <button
                type="button"
                onClick={addTodo}
            >Add To Do
            </button>
            <button
                type="button"
                onClick={deleteTodo}
            >Delete To Do
            </button>
            <button
                type="button"
                onClick={editTodo}
            >Edit To Do
            </button>
        </>
    )
}

export default App
