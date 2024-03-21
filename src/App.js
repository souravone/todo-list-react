import { useState } from "react";

function App() {
  const [item, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((i) => [...i, item]);
  }

  function handleDelete(id) {
    setItem((item) => item.filter((i) => i.id !== id));
  }

  function handleToggle(id) {
    setItem((item) =>
      item.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  }

  function handleClear() {
    const confirm = window.confirm("Are you sure?");
    if (confirm) setItem([]);
  }

  return (
    <div className="container">
      <Header />
      <Form onAddItems={handleAddItems} />
      <List item={item} onDeleteItem={handleDelete} onToggle={handleToggle} />
      <Stats item={item} onClear={handleClear} />
    </div>
  );
}

function Header() {
  return <h1>Todo List React</h1>;
}

function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { quantity, description, completed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-header">Add items</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="text"
        placeholder="Add todo item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button className="button">➕</button>
    </form>
  );
}

function List({ item, onDeleteItem, onToggle }) {
  return (
    <ul className="list">
      {item.map((item) => (
        <Items
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

function Items({ item, onDeleteItem, onToggle }) {
  return (
    <li className="list-items">
      <input
        className="checkbox"
        type="checkbox"
        value={item.completed}
        onChange={() => onToggle(item.id)}
      />

      <p
        className="todo-item"
        style={item.completed ? { textDecoration: "line-through" } : {}}
      >
        <span>{item.quantity} </span>
        {item.description}
      </p>
      <div className="item-buttons">
        <button className="edit-button">Edit</button>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </div>
    </li>
  );
}

function Stats({ item, onClear }) {
  const numItems = item.length;
  const numItemsCompleted = item.filter((i) => i.completed).length;
  const percentage = (numItemsCompleted / numItems) * 100;
  return (
    <div className="stats">
      <p>Total items - {numItems}</p>
      <p>
        Completed items - {numItemsCompleted} ({percentage}%)
      </p>
      <p className="clear" onClick={onClear}>
        Clear All
      </p>
    </div>
  );
}

export default App;
