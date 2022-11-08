import React, { useRef, useState } from 'react';

type Form = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string,
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>("")
  const [task, setTask] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null);
  

  const handleSubmit = (e: Form) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask("")
    taskInput.current?.focus()
  }

  const addTask = (name: string) => {
    const newSetTask: ITask[] = [{ name, done: false }, ...task]
    setTask(newSetTask)
  }

  const toggleTask = (i: number) => {
    const newTasks: ITask[] = [...task];
    newTasks[i].done = !newTasks[i].done;
    setTask(newTasks)
  }

  const deleteTask = (i: number) => {
    const newTasks: ITask[] = [...task];
    newTasks.splice(i,1)
    setTask(newTasks)
  }

  return (
    <div className="container p-4">
      <div className='row'>
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                { newTask ? <button type='submit' className='btn btn-success btn-block mt-2'>Guardar</button> : <button disabled className='btn btn-success btn-block mt-2'>Guardar</button>}
              </form>
            </div>
          </div>
          {
            task.map((e: ITask, i: number) => (
              <div key={i} className='card card-body mt-2'>
              <h2 style={{textDecoration: e.done ? "line-through" : ""}}>{e.name}</h2>
              <div>
                <button onClick={() => toggleTask(i)}>{e.done ? "✗" : "✓"}</button>
                { <button onClick={() => deleteTask(i)}>Eliminar</button> }
              </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
