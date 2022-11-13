import useNewForm from "../hooks/useNewTask"
import { OnTask } from "../types"
import "../styles/List.css"
import { useEffect } from "react"
import EmptyList from "./EmptyList"

interface Props {
    taskValues: Array<OnTask>
    onNewTasks: React.Dispatch<React.SetStateAction<OnTask[]>>
    resetTask: (newSub: OnTask) => void
}

export default function List({ taskValues, onNewTasks, resetTask }: Props) {
    
    const [inputValues, dispatch] = useNewForm()

    const renderList = (): JSX.Element[] => {
        return taskValues.map((task, i: number) => {
            return (<div key={i} className="contain-task">
                <div className="contain-task-two">
                <div className="task">
                {task.edit ? 
                <div>
                    <input type="text" 
                    placeholder="Escribe aqui"
                    onChange={handleChange}
                    value={inputValues.name}
                    name="name" />
                    <button type="button" onClick={() => editTasks(i)}>Guardar</button>
                </div> 
                : 
                <button onClick={() => editTask(i)}>Editar tarea</button>
                }
                {task.edit && <button onClick={() => editTask(i)}>✗</button>}
                <h1 style={{ textDecoration: task.done ? "line-through" : "" }}>{task.name}</h1>
                <p>Is task in complete?</p>
                {!task.done ? (
                    <p>No</p>
                ) : <p>Yes</p>}
                <button
                    onClick={() => toggleTask(i)}>
                    {task.done ? "✗" : "✓"}
                </button>
                <button onClick={() => deleteTask(i)}>
                    Delete
                </button>
                </div>
                </div>
            </div>)
        })
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })   
    }

    const toggleTask = (i: number) => {
        const newTasks: OnTask[] = [...taskValues]
        newTasks[i].done = !newTasks[i].done
        onNewTasks(newTasks)
    }

    useEffect(() => {
        console.log(taskValues); 
    },[taskValues])

    const deleteTask = (i: number) => {
        const deleteTasks: OnTask[] = [...taskValues]
        deleteTasks.splice(i, 1)
        onNewTasks(deleteTasks)
    }

    const editTask = (i: number) => {
        const editTasks: OnTask[] = [...taskValues]
        editTasks[i].edit = !editTasks[i].edit
        onNewTasks(editTasks)
    }

    const editTasks = (i: number) => {
        const copyTask: OnTask[] = [...taskValues]
        copyTask[i].name = inputValues.name
        onNewTasks(copyTask)
        inputValues.name = ""
        editTask(i)
    }

    return (
        <div>
            { taskValues.length > 0 ? renderList() :
            <EmptyList/>}
        </div>
    )
}

