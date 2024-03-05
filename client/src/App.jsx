import "./App.css";
import Todos from "./components/Todos";
import "./index.css";
import taskImage from "./todo_task.png"

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="text-center text-3xl text-slate-700 mt-8">
          Todo List ✅
        </h1>
      </header>
      <main className="text-center">
        <img src={taskImage} alt="slate with tasks" className="w-[350px] block mx-auto"/>
        <Todos />
      </main>
    </div>
  );
}

export default App;
