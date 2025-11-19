import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [filter, setFilter] = useState("all");


  //  Charger les tâches depuis localStorage au démarrage

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  //  Sauvegarder les tâches à chaque modification

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Fonction pour Ajouter une tache  une tâche

  const addTask = () => {
    if (text.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }])
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  // Fonction pour supprimer une tâche

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1 className="title">Liste des tâches</h1>

      <div className="input-group">
        <input
          type="text"
          name="tache"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="task-input"
          placeholder="Ajouter une tâche..."
        />
        <button onClick={addTask} className="add-btn">Ajouter</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          Tous
        </button>

        <button
          className={filter === "active" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("active")}
        >
          Actifs
        </button>

        <button
          className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("completed")}
        >
          Terminés
        </button>
      </div>

      <TodoList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
