import { useState } from 'react';
import Form from './components/Form';
import List from './components/List';
import { OnTask } from './types'
import "./App.css"

interface AppState {
  task: Array<OnTask>
}

export default function App() {
  const [task, setTask] = useState<AppState["task"]>([])

  const handleNewTask = (newTask: OnTask): void => {
    setTask(task => [newTask, ...task])
  }

  const handleEditTask = (resetTask: OnTask) => {
    const copyTask = [...task]
    console.log(copyTask)
    setTask(task => [...task, resetTask])
  }

  return (
    <div className='app'>
      <div className='form-prin'>
        <h1>Tu app de notas</h1>
        <h4>Algo para guardar?</h4>
        <Form onNewTask={handleNewTask} />
      </div>
        <List taskValues={task}
          onNewTasks={setTask}
          resetTask={handleEditTask}
        />
    </div>
  );
}