import React from 'react'
import {OnTask} from '../types'
import useNewForm from "../hooks/useNewTask"

interface FormProps {
    onNewTask: (newSub: OnTask) => void
}

const Form = ({onNewTask}: FormProps) => {

    const [inputValues, dispatch] = useNewForm()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNewTask(inputValues)
        handleClear()
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

    const handleClear = () => {
      dispatch({type: "clear_value"})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                value={inputValues.name}
                autoFocus
                name='name'
            />
        {inputValues.name ? <button type='submit'>Guardar</button> : <button disabled >Guardar</button>}
      </form>
      )
}

export default Form 