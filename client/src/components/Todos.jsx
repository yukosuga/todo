import {useEffect, useState} from "react";
import {deleteTodo, getTodos, updateTodo} from "../api/api";
import Form from "./Form";
import {FaTrashAlt} from "react-icons/fa";
import {MdCheckBox} from "react-icons/md";
import {MdCheckBoxOutlineBlank} from "react-icons/md";

const Todos = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTasks(data.todos);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (task) => {
    try {
      await deleteTodo(task);
      const filteredTasks = tasks.filter((todo) => todo.id !== task.id);
      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdate = async (task) => {
    try {
      await updateTodo(task);
      setTasks((prevTasks) =>
        prevTasks.map((todo) =>
          todo.id === task.id ? {...todo, isDone: !task.isDone} : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form tasks={tasks} setTasks={setTasks} />
      <ul className="flex flex-col justify-center align-middle pt-3">
        {tasks.map((task, i) => {
          return (
            <li key={i} className="w-[20vw] flex items-center justify-between mt-3 text-xl text-slate-700">
              {task.text}
              <div className="flex items-center">
                <span
                  onClick={() => {
                    handelUpdate(task);
                  }}
                >
                  {task.isDone ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span
                  onClick={() => {
                    handleDelete(task);
                  }}
                >
                  <FaTrashAlt />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
