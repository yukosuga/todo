import "./App.css";
import Todos from "./components/Todos";
import "./index.css";
import tasksImage from "./tasks.png";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="text-center text-3xl text-slate-700 mt-8">
          Todo List ✅
        </h1>
      </header>
      <main className="text-center">
        <img src={tasksImage} alt="slate with tasks" className="w-[350px] block mx-auto"/>
        <Todos />
      </main>
    </div>
  );
}

export default App;
