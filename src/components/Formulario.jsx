import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({ crearCita }) => {

    //Crear State de Citas
    const [ cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    //state para validar
    const [ error, actualizarError ] = useState(false);

    //Funcion que se ejecuta cada que el usuario tipea en el input

    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario envia el formulario
    const submitCita = e =>{
        e.preventDefault();

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || 
        sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuidv4();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form 
                onSubmit={submitCita}
            >
                <label htmlFor="">Nombre Mascota: </label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label htmlFor="">Nombre Dueño: </label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label htmlFor="">Fecha: </label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label htmlFor="">Hora </label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label htmlFor="">Sintomas</label>
                <textarea 
                    name="sintomas" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
);
}
 
export default Formulario;