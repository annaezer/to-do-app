
// function App() {
//
//     const URI = "http://localhost:3000/"
//     const ENDPOINT = "todos"
//     async function addTodo() {
//         const idToDo = new Date().getMilliseconds();
//         console.log(idToDo);
//         const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
//         console.log(date);
//
//         try {
//             const addToDo = await axios.post(`${URI}${ENDPOINT}`, {
//                 id: idToDo,
//                 title: "test",
//                 completed: false,
//                 description: "test",
//                 priority: 3,
//                 created: date,
//             });
//             console.log(addToDo);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     async function deleteTodo() {
//         const id = "576"
//         try {
//             const deletedTodo = await axios.delete(`${URI}${ENDPOINT}/${id}`);
//             console.log("To do is deleted:", deletedTodo.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     async function editTodo() {
//         const id = "949"
//         const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
//         try {
//             const editedTodo = await axios.put(`${URI}${ENDPOINT}/${id}`, {
//                 id: id,
//                 title: "Ik heb nu iets gewijzigd",
//                 completed: false,
//                 description: "Gewijzigde test",
//                 priority: 3,
//                 created: date,
//             })
//             console.log(editedTodo.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     return (
//         <>
//             <button
//                 type="button"
//                 onClick={addTodo}
//             >Add To Do
//             </button>
//             <button
//                 type="button"
//                 onClick={deleteTodo}
//             >Delete To Do
//             </button>
//             <button
//                 type="button"
//                 onClick={editTodo}
//             >Edit To Do
//             </button>
//         </>
//     )
// }
//
// export default App
