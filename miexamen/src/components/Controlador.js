import { useState } from 'react';
import { crearEstudiante } from './Modelo.js';

export const useControlador = () => {
  const [estudiantes, setEstudiantes] = useState([]); 

  const agregar = (nombre, matricula, materia, calificacion) => {

    const nuevoEstudiante = crearEstudiante(nombre, matricula, materia, calificacion);
    
    setEstudiantes([...estudiantes, nuevoEstudiante]); 
  };

  const eliminar = (matriculaParaBorrar) => {
    const listaActualizada = estudiantes.filter(
      (estudiante) => estudiante.matricula !== matriculaParaBorrar
    );
    setEstudiantes(listaActualizada);
  };

  return {
    estudiantes,
    agregar,
    eliminar
  };
};