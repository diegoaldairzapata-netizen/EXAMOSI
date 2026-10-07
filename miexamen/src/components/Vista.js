// App.js
import React, { useState } from 'react';
import { usarControlador } from './components/controlador.js';

function App() {
  const { estudiantes, agregar, eliminar } = usarControlador();

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');

  const manejarGuardado = (evento) => {
    evento.preventDefault(); 
    
    agregar(nombre, matricula, materia, calificacion);
    
    setNombre('');
    setMatricula('');
    setMateria('');
    setCalificacion('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Control Universitario</h1>

      <form onSubmit={manejarGuardado} style={{ display: 'grid', gap: '10px', width: '300px' }}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input placeholder="Matrícula" value={matricula} onChange={e => setMatricula(e.target.value)} required />
        <input placeholder="Materia" value={materia} onChange={e => setMateria(e.target.value)} required />
        <input placeholder="Calificación" type="number" value={calificacion} onChange={e => setCalificacion(e.target.value)} required />
        
        <button type="submit">Registrar Estudiante</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>Alumnos Registrados</h2>
      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.matricula} style={{ marginBottom: '10px' }}>
            <strong>{estudiante.nombre}</strong> (Matrícula: {estudiante.matricula}) - 
            Materia: {estudiante.materia} - Calif: {estudiante.calificacion} 
            
            <button 
              onClick={() => eliminar(estudiante.matricula)} 
              style={{ marginLeft: '10px', color: 'red' }}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;