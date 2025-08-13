import { useState } from 'react'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([]) //estado para las tareas
  const [nuevaTarea, setNuevaTarea] = useState(""); //estado para el valor del input
  const [editIndex, setEditIndex] = useState(null); //estado para el indice de la tarea a editar y saber si estamos editando

  //manejo del envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //evitar que se recargue la pagina
    if(nuevaTarea.trim() === "") return; //si el input esta vacio no se arega la tarea

    //agregar la nueva tarea al arreglo
    setTareas([...tareas, nuevaTarea]);
    
    //limpiar el input
    setNuevaTarea("");
  };

  //funcion para eliminar una tarea
  const eliminarTareas = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  //funcion para editar una tarea
  const editarTarea = (index) => {
    setNuevaTarea(tareas[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>Gestor de Tareas To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} />
        <button type="submit">Agregar</button>

        <ul>
          {tareas.map((tarea, index) => (
            <li key={index}>{tarea}
            <button onClick={() => eliminarTareas(index)}>❌</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default App
