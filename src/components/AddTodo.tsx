import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./AddTodo.css";

function AppTodo() {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        todo: "Eating breakfast",
        id: crypto.randomUUID(),
        done: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(lists));
  }, [lists]);

  function addInputText(event) {
    setInputText(event.target.value);
  }

  function addTodoList() {
    setLists([
      ...lists,
      {
        todo: inputText,
        id: crypto.randomUUID(),
        done: false,
      },
    ]);
    setInputText("");
  }

  function toggleTodo(id) {
    setLists(
      lists.map((element) =>
        element.id === id ? { ...element, done: !element.done } : element,
      ),
    );
  }

  function pressKey(event) {
    if (event.key === "Enter") {
      addTodoList();
    }
  }

  function deleteTodo(id) {
    setLists(lists.filter((element) => element.id !== id));
  }

  const filteredLists = lists.filter((element) => {
    if (filter === "todo") {
      return !element.done;
    }
    if (filter === "done") {
      return element.done;
    }
    return true;
  });

  const leftTasks = lists.filter((element) => {
    return !element.done;
  });

  return (
    <>
      <p>{leftTasks.length} left to do</p>
      <input
        type="text"
        placeholder="Add a new task..."
        onChange={addInputText}
        className="input-feild"
        value={inputText}
        onKeyDown={pressKey}
      />
      <button onClick={addTodoList} className="add-btn">
        Add
      </button>
      <br />
      <div className="filter-bar">
        <button
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "todo" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("todo")}
        >
          To do
        </button>
        <button
          className={filter === "done" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
      </div>
      {filteredLists.map((element) => {
        return (
          <TodoItem
            key={element.id}
            todo={element.todo}
            id={element.id}
            done={element.done}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </>
  );
}

export default AppTodo;
