import React, { useState } from 'react';
import { useControlador } from './components/Controlador.js'; 
import './App.css'; 

function App() {
  const { estudiantes, agregar, eliminar } = useControlador();

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const manejarGuardado = (evento) => {
    evento.preventDefault();
    agregar(nombre, matricula, materia, calificacion);
    setNombre('');
    setMatricula('');
    setMateria('');
    setCalificacion('');
  };

  const estudiantesFiltrados = estudiantes.filter((estudiante) => {
    const textoBuscado = busqueda.toLowerCase();
    const coincideNombre = estudiante.nombre.toLowerCase().includes(textoBuscado);
    const coincideMatricula = estudiante.matricula.toLowerCase().includes(textoBuscado);
    return coincideNombre || coincideMatricula; 
  });

  return (
    <div className="contenedor">
      <h1>Control Universitario</h1>

      <div className="layout-dos-columnas">
        
        <div className="columna-izquierda">
          <h2>Registrar Alumno</h2>
          <form onSubmit={manejarGuardado} className="formulario">
            <input className="input-texto" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
            <input className="input-texto" placeholder="Matrícula" value={matricula} onChange={e => setMatricula(e.target.value)} required />
            <input className="input-texto" placeholder="Materia" value={materia} onChange={e => setMateria(e.target.value)} required />
            <input className="input-texto" placeholder="Calificación" type="number" value={calificacion} onChange={e => setCalificacion(e.target.value)} required />
            
            <button type="submit" className="btn-guardar">Guardar Estudiante</button>
          </form>
        </div>

        <div className="columna-derecha">
          <h2>Alumnos Registrados</h2>
          
          <input 
            className="input-busqueda" 
            placeholder=" Buscar por nombre o matrícula..." 
            value={busqueda} 
            onChange={e => setBusqueda(e.target.value)} 
          />

          <ul className="lista-alumnos">
            {estudiantesFiltrados.map((estudiante) => (
              <li key={estudiante.matricula} className="item-alumno">
                <div>
                  <strong>{estudiante.nombre}</strong> ({estudiante.matricula}) <br />
                  Materia: {estudiante.materia} | Calificación: {estudiante.calificacion}
                </div>
                
                <button onClick={() => eliminar(estudiante.matricula)} className="btn-borrar">
                  Borrar
                </button>
              </li>
            ))}
            
            {estudiantesFiltrados.length === 0 && estudiantes.length > 0 && (
              <p style={{ textAlign: 'center', opacity: 0.8 }}>No se encontraron alumnos con esa búsqueda.</p>
            )}
            {estudiantes.length === 0 && (
              <p style={{ textAlign: 'center', opacity: 0.8 }}>Aún no hay alumnos registrados.</p>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;