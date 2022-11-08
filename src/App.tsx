import React, { useState } from 'react';
import Form from './components/Form';
import List from './components/List';
import {OnTask} from './types'

interface AppState {
  task: Array<OnTask>
}

function App() {

  const [task, setTask] = useState<AppState["task"]>([])

  const handleNewTask = (newTask: OnTask): void => {
    setTask(task => [...task, newTask])
  }

  return (
    <div>
      <Form onNewTask={handleNewTask} />
      <List taskValues={task} onNewTasks={setTask}/>
      {/* {
        task.map((e: ITask, i: number) => (
          <div key={i}>
            <h2 style={{ textDecoration: e.done ? "line-through" : "" }}>{e.name}</h2>
            <div>
              <button onClick={() => toggleTask(i)}>{e.done ? "✗" : "✓"}</button>
              {<button onClick={() => deleteTask(i)}>Eliminar</button>}
            </div>
          </div>
        ))
      } */}
    </div>
  );
}

export default App;