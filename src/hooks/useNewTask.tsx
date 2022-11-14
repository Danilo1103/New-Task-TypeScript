import { useReducer } from "react";
import {OnTask} from "../types"

interface inputVal {
    inputValue: OnTask
}

const INITIAL_STATE = {
    name: "",
    done: false,
    edit: false
}

type formReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear_value"
}

const formReducer = (state: inputVal["inputValue"], action: formReducerAction) => {
    switch(action.type) {
        case "change_value": 
            const {inputName, inputValue} = action.payload
            return {
                ...state,
                [inputName]: inputValue
            }
        case "clear_value":
            return INITIAL_STATE       
}
}

const useNewForm = () => {
    return useReducer(formReducer, INITIAL_STATE)
}

export default useNewForm