
import { useEffect, useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Complete React assignment", completed: false },
  { id: 2, title: "Learn CSS Flexbox and Grid", completed: true },
  { id: 3, title: "Practice JavaScript", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("taskmate-tasks");
      return saved === null ? initialTasks : JSON.parse(saved);
    } catch {
      return initialTasks;
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("taskmate-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  function addTask(event) {
    event.preventDefault();

    const title = input.trim();
    if (!title) return;

    setTasks((previous) => [
      ...previous,
      { id: Date.now(), title, completed: false },
    ]);

    setInput("");
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function clearCompleted() {
    setTasks((previous) =>
      previous.filter((task) => !task.completed)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-check">✓</span>
          TaskMate
        </a>
        <span className="nav-caption">MY TASK MANAGER</span>
      </header>

      <main className="container" id="home">
        <section className="hero">
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>
            Make today <span>count.</span>
          </h1>
          <p className="subtitle">
            Small steps every day lead to big results.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple">▤</div>
            <div>
              <p>Total Tasks</p>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <div>
              <p>Remaining</p>
              <h2>{remaining}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Completed</p>
              <h2>{completed}</h2>
            </div>
          </div>
        </section>

        <section className="tasks-panel">
          <div className="panel-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Keep track of what matters today.</p>
            </div>

            {completed > 0 && (
              <button
                className="clear-btn"
                type="button"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="What do you need to do?"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="New task"
            />

            <button className="add-btn" type="submit">
              + Add Task
            </button>
          </form>

          <div className="filter-row">
            <div className="filters">
              {["All", "Active", "Completed"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-btn ${
                    filter === item ? "selected" : ""
                  }`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <span className="task-count">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>
                  {filter === "All"
                    ? "No tasks yet"
                    : `No ${filter.toLowerCase()} tasks`}
                </h3>
                <p>Add a task above and start making progress!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      className={
                        task.completed
                          ? "task-title done"
                          : "task-title"
                      }
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="footer">
          <p>Made with <span>♥</span> by TaskMate</p>
          <p>© 2026 TaskMate. Stay productive.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
