import { CgNotes } from "react-icons/cg"
import "../styles/EmptyList.css"

export default function EmptyList(): JSX.Element {
    return(
        <div className="none-container">
                <CgNotes className="icon"/>
                <h2>Aqui van tus apuntes</h2>
                <h4>Agrega uno</h4>
                <p>*Aun no tienes apuntes*</p>
            </div>
    )
}