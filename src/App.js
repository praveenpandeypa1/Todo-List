import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      {<main>
  {/* Form for adding new todos */}
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
    />
    <button type="submit">Add Todo</button>
  </form>
  
  {/* Displaying the list of todos */}
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {/* Checkbox for marking todo as completed */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {/* Displaying the todo text */}
        <span>{todo.text}</span>
        {/* Button for deleting the todo */}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    ))}
  </ul>
</main>}
    </div>
  );
}

export default App;
