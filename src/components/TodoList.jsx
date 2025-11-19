import React from 'react';
import TaskItem from './TaskItem';
import "../styles/TodoList.css";

const TodoList = ({ tasks, onToggle, onDelete }) => {
    return (
        <div className="todo-list-container">
            {tasks.length === 0 ? (
                <p className="empty-text">Aucune tâche</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;
