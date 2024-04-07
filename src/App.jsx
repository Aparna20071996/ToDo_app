import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      let todos = JSON.parse(localStorage.getItem("todos"));
    }
    setTodos(todos);
  }, []);

  const toggleFinished = (params) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs();
  };

  const handleCheckbox = (e) => {
    console.log(e);
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container md:mx-auto bg-violet-100 my-5 mx-3 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-4xl">
          iTask- Manage your Todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              placeholder=" Add your Task (Atleast 3 words)"
              onChange={handleChange}
              value={todo}
              type="text"
              className="rounded-lg px-5 py-2 w-full"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 hover:bg-violet-950 p-4 py-3 mx-2 rounded-full text-white  "
            >
              Add
            </button>
          </div>
        </div>
        <input
          className="mx-5 px-2"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          name=""
          id=""
        />
        Show Finished
        <div className="h-[1px] bg-black opacity-15 mx-auto w-[90%] my-4"></div>
        <h2 className="text-2xl font-bold ">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={"todo flex my-3 justify-between md:w-1/2"}
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
