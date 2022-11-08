import {OnTask} from "../types"

interface Props {
    taskValues: Array<OnTask>
    onNewTasks: React.Dispatch<React.SetStateAction<OnTask[]>>
}

export default function List({taskValues, onNewTasks}: Props){
    const renderList = (): JSX.Element[] => {
        return taskValues.map((task, i: number) => {
            return (<li key={i}>
                <h1 style={{textDecoration: task.done ? "line-through" : ""}}>{task.name}</h1>
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
            </li>)
        })
    }

    const toggleTask = (i: number) => {
        const newTasks: OnTask[] = [...taskValues]
        newTasks[i].done = !newTasks[i].done
        onNewTasks(newTasks)
    }

    const deleteTask = (i: number) => {
        const deleteTasks: OnTask[] = [...taskValues]
        deleteTasks.splice(i, 1)
        onNewTasks(deleteTasks)
    }

    return(
        <div>
            {renderList()}
        </div>
    )
}

