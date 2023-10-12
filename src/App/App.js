
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faStar } from '@fortawesome/free-regular-svg-icons';

import '../App/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false, important: false }]);
      setTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleImportance = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].important = !updatedTasks[index].important;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => task.text.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="App">
      <div className="task-input">
        <input
          type="text"
          placeholder="Введите задачу"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      <div className="filter-input">
        <input
          type="text"
          placeholder="Фильтр"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <TransitionGroup appear={false}>
  {filteredTasks.map((task, index) => (
    <CSSTransition key={index} classNames="task" timeout={1500}>
      <div className="task-container" onClick={() => toggleTask(index)}>
        <span className={`task-circle ${task.completed ? 'completed' : ''}`}>
          <FontAwesomeIcon icon={task.completed ? faCheckCircle : faCircle} />
        </span>
        <span className={`task-text ${task.completed ? 'completed-task' : ''} ${task.important ? 'important-task' : ''}`}>
          {task.text}
        </span>
        <span className="task-icon" onClick={(e) => { e.stopPropagation(); toggleImportance(index); }}>
          <FontAwesomeIcon icon={faStar} className={`star-icon ${task.important ? 'star-filled' : ''}`} />
        </span>
      </div>
    </CSSTransition>
  ))}
</TransitionGroup>

    </div>  
  );
}

export default App;
