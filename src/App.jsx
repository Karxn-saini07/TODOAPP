
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("taskmate-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("taskmate-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  function addTask(e) {
    e.preventDefault();

    if (!input.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
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
          <span className="brand-check">✓</span> TaskMate
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
            <div className="stat-icon purple">📋</div>
            <div>
              <p>Total Tasks</p>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <div>
              <p>Remaining</p>
              <h2>{remaining}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">🎉</div>
            <div>
              <p>Completed</p>
              <h2>{completed}</h2>
            </div>
          </div>
        </section>

        <section className="tasks-panel">
          <div className="panel-heading">
            <h2>My Tasks</h2>
            <p>Keep track of what matters today.</p>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="What do you need to do?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="New task"
            />
            <button type="submit" className="add-btn">
              + Add Task
            </button>
          </form>

          <div className="filter-row">
            <div className="filters">
              {["All", "Active", "Completed"].map((item) => (
                <button
                  key={item}
                  className={`filter-btn ${
                    filter === item ? "selected" : ""
                  }`}
                  onClick={() => setFilter(item)}
                  type="button"
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
                        task.completed ? "task-title done" : "task-title"
                      }
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    🗑
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer>
          Made with <span>♥</span> by TaskMate
        </footer>
      </main>
    </div>
  );
}

export default App;
