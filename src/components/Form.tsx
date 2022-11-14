import React from 'react'
import { OnTask } from '../types'
import useNewForm from "../hooks/useNewTask"
import "../styles/Form.css"
import {BsFillTrashFill} from "react-icons/bs"

interface FormProps {
  onNewTask: (newTask: OnTask) => void 
}

const Form = ({ onNewTask }: FormProps) => {

  const [inputValues, dispatch] = useNewForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNewTask(inputValues)
    handleClear()
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value
      }
    })
  }

  const handleClear = () => {
    dispatch({ type: "clear_value" })
  }

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        type="text"
        onChange={handleChange}
        value={inputValues.name}
        autoFocus
        name='name'
        placeholder='Escribe aqui'
      />
      {inputValues.name ? <button type='submit'>Save</button> : <button disabled >Guardar</button>}
      {inputValues.name ? <button type='button' onClick={handleClear}><BsFillTrashFill /></button> : <button disabled ><BsFillTrashFill /></button>}

    </form>
  )
}

export default Form;