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

  return (
    <div className='app'>
      <div className='form-prin'>
        <h1>Tu app de notas</h1>
        <h4>Algo para guardar?</h4>
        <Form onNewTask={handleNewTask} />
      </div>
      <List taskValues={task}
        onNewTasks={setTask}
      />
    </div>
  );
}