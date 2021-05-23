import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de Citas
  const [ citas, guardarCitas ] = useState(citasIniciales);

  // useEffect para realizar algunas operaciones para cuando el state cambia
  useEffect( () => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] );

  // Funcion que elimina citas
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( c => c.id !== id );
    guardarCitas(nuevasCitas);
  }

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            
            <h2>{titulo}</h2>
            {citas.map( c => (
              <Cita 
                key={c.id}
                id={c.id}
                cita={c}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
