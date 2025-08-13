import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }); //estado para las tareas
  const [nuevaTarea, setNuevaTarea] = useState(""); //estado para el valor del input
  const [editIndex, setEditIndex] = useState(null); //estado para el indice de la tarea a editar y saber si estamos editando. si es null estamos agregando tarea nueva

  //manejo del envio del formulario
  const agregarTarea = () => {
    if(nuevaTarea.trim() === "") return; //si el input esta vacio no se arega la tarea

    if (editIndex !== null){
      //si estamos editando
      const tareasActualizadas = [...tareas];
      tareasActualizadas[editIndex] = {
        ...tareasActualizadas[editIndex], //mantener las propiedades existentes
        texto: nuevaTarea //actualizar el texto de la tarea
      };
      setTareas(tareasActualizadas);
      setEditIndex(null); //limpiamos y salimos del modo edición
    }else {
      //si estamos agregando
      setTareas([...tareas, {texto: nuevaTarea, completada: false}]);
    }    
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
    setNuevaTarea(tareas[index].texto); //establecer el valor del input con la tarea a editar
    setEditIndex(index); //guarda qué posicion estamos editando
  };

  //funcion para completar una tarea
  const completarTarea = (index) => {
    const nuevas = [...tareas]; 
    nuevas[index] = {
      ...nuevas[index],
      completada: !nuevas[index].completada 
    }; 
    setTareas(nuevas); 
  }

  //guardar las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  return (
    <div>
      <h1>Gestor de Tareas To-Do List</h1>

        <input type="text" value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} />
        <button onClick={agregarTarea}>{editIndex !== null ? "Guardar" : "Agregar"}</button>

        <ul>
          {tareas.map((tarea, index) => (
            <li key={index}
            style={{ textDecoration: tarea.completada ? "line-through" : "none" }}>
            <input type="checkbox" checked={tarea.completada} onChange={() => completarTarea(index)} />{tarea.texto}{" "}
            <button onClick={() => editarTarea(index)}>✏️</button>
            <button onClick={() => eliminarTareas(index)}>❌</button>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App
