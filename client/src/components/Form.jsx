import {useRef} from "react";
import {addTodo} from "../api/api";

export default function Form({tasks, setTasks}) {
  const taskRef = useRef();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const text = taskRef.current.value;
    if (text.trim() === "") {
      return alert("please enter a new task");
    }
    try {
      const data = await addTodo(text);
      setTasks([...tasks, data.todo]);
      taskRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <form className="flex justify-center" onSubmit={handelSubmit}>
        <input
          ref={taskRef}
          type="text"
          placeholder="new task"
          className="text-xl text-slate-700 mr-2 pl-3 py-1 rounded-md bg-white
          border-2 border-slate-300 hover:border-slate-500 focus:border-slate-500"
        />
        <button
          type="submit"
          className="text-center text-xl text-slate-700 px-4 py-1 rounded-md bg-lime-100 border-2 border-slate-300 hover:border-slate-500"
        >
          add
        </button>
      </form>
    </div>
  );
}
