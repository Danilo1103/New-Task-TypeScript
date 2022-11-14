import useNewForm from "../hooks/useNewTask"
import { OnTask } from "../types"
import "../styles/List.css"
import EmptyList from "./EmptyList"
import {BiEditAlt, BiExit} from "react-icons/bi"
import {BsXCircle, BsCheckCircle, BsXLg} from "react-icons/bs"
import {FaRegSave} from "react-icons/fa"

interface Props {
    taskValues: Array<OnTask>
    onNewTasks: React.Dispatch<React.SetStateAction<OnTask[]>>
}

export default function List({ taskValues, onNewTasks }: Props) {
    
    const [inputValues, dispatch] = useNewForm()

    const renderList = (): JSX.Element[] => {
        return taskValues.map((task, i: number) => {
            return (<div key={i} className="contain-task">
                
                {task.edit && 
                <div className="container-edit">
                    <input type="text" 
                    placeholder="Escribe aqui los cambios"
                    onChange={handleChange}
                    value={inputValues.name}
                    name="name" />
                    <button type="button" onClick={() => editTasks(i)}><FaRegSave /></button>
                    {task.edit && <button onClick={() => editTask(i)}><BiExit /></button>}
                </div> 
                }
                <div className="task-name" style={{ textDecoration: task.done ? "line-through" : "" }}>
                    <div className="task-name-two">
                    <button onClick={() => editTask(i)}><BiEditAlt /></button>
                    {task.name}
                    </div>
                </div>
                <div className="buttons-delete-complete">
                <button
                    onClick={() => toggleTask(i)} className="button-complete">
                    {task.done ? <BsXCircle /> : <BsCheckCircle />}
                </button>
                <button onClick={() => deleteTask(i)} className="button-delete">
                    Eliminar nota <BsXLg />
                </button>
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

    const deleteTask = (i: number) => {
        const deleteTasks: OnTask[] = [...taskValues]
        deleteTasks.splice(i, 1)
        onNewTasks(deleteTasks)
    }

    const editTask = (i: number) => {
        const editTasks: OnTask[] = [...taskValues]
        editTasks[i].edit = !editTasks[i].edit
        onNewTasks(editTasks)
        dispatch({type: "clear_value"}) 
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

