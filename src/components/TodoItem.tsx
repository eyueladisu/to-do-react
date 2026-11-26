import "./TodoItem.css";

function TodoItem({ id, todo, done, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item-container">
      <input
        type="checkbox"
        name="checkbox"
        className="check-box"
        checked={done}
        onChange={() => toggleTodo(id)}
      />
      <label className={done ? "todo-title-line-through" : "todo-title"}>
        {todo}
      </label>
      <button className="delete-btn" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
