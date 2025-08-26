"use client"

import { useState, useEffect } from "react"

export default function TodoApp() {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "jump", completed: true },
    { id: 2, text: "breathe", completed: false },
    { id: 3, text: "davaleba", completed: false },
    { id: 4, text: "3432", completed: false },
    { id: 5, text: "fgrh", completed: false },
  ])

  const [inputValue, setInputValue] = useState("")
  const [currentFilter, setCurrentFilter] = useState("all")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode === true) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }, [darkMode])

  function handleAddTodo(e) {
    e.preventDefault()

    if (inputValue.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      }

      const updatedTodos = [...todoList, newTodoItem]
      setTodoList(updatedTodos)
      setInputValue("")
    }
  }

  function handleToggleTodo(todoId) {
    const updatedTodos = []

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === todoId) {
        updatedTodos.push({
          ...todoList[i],
          completed: !todoList[i].completed,
        })
      } else {
        updatedTodos.push(todoList[i])
      }
    }

    setTodoList(updatedTodos)
  }

  function handleDeleteTodo(todoId) {
    const filteredTodos = []

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id !== todoId) {
        filteredTodos.push(todoList[i])
      }
    }

    setTodoList(filteredTodos)
  }

  function handleClearCompleted() {
    const activeTodos = []

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].completed === false) {
        activeTodos.push(todoList[i])
      }
    }

    setTodoList(activeTodos)
  }

  function getFilteredTodos() {
    const filtered = []

    for (let i = 0; i < todoList.length; i++) {
      const todo = todoList[i]

      if (currentFilter === "active" && todo.completed === false) {
        filtered.push(todo)
      } else if (currentFilter === "completed" && todo.completed === true) {
        filtered.push(todo)
      } else if (currentFilter === "all") {
        filtered.push(todo)
      }
    }

    return filtered
  }

  function getActiveTodosCount() {
    let count = 0
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].completed === false) {
        count = count + 1
      }
    }
    return count
  }

  const todosToShow = getFilteredTodos()
  const activeCount = getActiveTodosCount()

  return (
    <div className="app-container">
      <div className="header-section">
        <div className="mountain-background">
  <img
    src={darkMode ? "/Bitmap (1).jpg" : "/Bitmap.jpg"}
    alt="Mountain background"
    className="mountain-svg"
  />
</div>


        <div className="header-content">
          <h1 className="app-title">TODO</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="theme-button">
            {darkMode ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="todo-wrapper">
        <div className="todo-card">
          <form onSubmit={handleAddTodo} className="input-section">
            <div className="input-container">
              <div className="input-circle"></div>
              <input
                type="text"
                placeholder="Create a new todo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="todo-input"
              />
            </div>
          </form>

          <div className="todo-list">
            {todosToShow.map((todoItem) => (
              <div key={todoItem.id} className="todo-item">
                <button onClick={() => handleToggleTodo(todoItem.id)} className="todo-checkbox">
                  {todoItem.completed && (
                    <div className="checkbox-checked">
                      <span className="checkmark">✓</span>
                    </div>
                  )}
                </button>

                <span className={todoItem.completed ? "todo-text completed" : "todo-text"}>{todoItem.text}</span>

                <button onClick={() => handleDeleteTodo(todoItem.id)} className="delete-button">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bottom-controls">
            <span className="items-left">{activeCount} items left</span>

            <div className="filter-buttons desktop-only">
              <button
                onClick={() => setCurrentFilter("all")}
                className={currentFilter === "all" ? "filter-btn active" : "filter-btn"}
              >
                All
              </button>
              <button
                onClick={() => setCurrentFilter("active")}
                className={currentFilter === "active" ? "filter-btn active" : "filter-btn"}
              >
                Active
              </button>
              <button
                onClick={() => setCurrentFilter("completed")}
                className={currentFilter === "completed" ? "filter-btn active" : "filter-btn"}
              >
                Completed
              </button>
            </div>

            <button onClick={handleClearCompleted} className="clear-button">
              Clear Completed
            </button>
          </div>
        </div>

        <div className="mobile-filters mobile-only">
          <button
            onClick={() => setCurrentFilter("all")}
            className={currentFilter === "all" ? "mobile-filter-btn active" : "mobile-filter-btn"}
          >
            All
          </button>
          <button
            onClick={() => setCurrentFilter("active")}
            className={currentFilter === "active" ? "mobile-filter-btn active" : "mobile-filter-btn"}
          >
            Active
          </button>
          <button
            onClick={() => setCurrentFilter("completed")}
            className={currentFilter === "completed" ? "mobile-filter-btn active" : "mobile-filter-btn"}
          >
            Completed
          </button>
        </div>

        <p className="drag-text">Drag and drop to reorder list</p>
      </div>
    </div>
  )
}
