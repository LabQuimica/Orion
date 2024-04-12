"use client"
import { useState } from 'react';
import {supabase}  from '../../../../supabase'; 


export default function Solidos() {
  // Estado inicial del formulario y los campos que se van a ingresar a la base de datos
  const initialState = {
    num_cas: '',
    nombre: '',
    formula: '',
    marca: '',
    cantidad: '', 
    ubicacion: '',
    contenedor: '',
    observaciones: ''
  };

  // Se inicializa el formulario como el objeto intialState
  const [formData, setFormData] = useState(initialState);
  // Verifica cuando se ha insertado un dato en la BD
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    if (!submitted) {
      try {
        const { data, error } = await supabase.from('reactivos_solidos').insert([formData]);
  
        if (error) {
          console.error('Error al insertar:', error.message);
        } else {
          console.log('Registro insertado exitosamente:', data);
          setFormData(initialState); // Reiniciar el formulario
          setSubmitted(true);
        }
      } catch (error) {
        console.log('Error al insertar ', error);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Formulario de Productos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="num_css" className="block">Número CAS:</label>
        <input type="text" id="num_css" name="num_cas" value={formData.num_cas} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
      </div>
        <div>
          <label htmlFor="nombre" className="block">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="formula" className="block">Fórmula:</label>
          <input type="text" id="formula" name="formula" value={formData.formula} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="contenedor" className="block">Contenedor:</label>
          <input type="text" id="contenedor" name="contenedor" value={formData.contenedor} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="marca" className="block">Marca:</label>
          <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="cantidad" className="block">Cantidad (frascos):</label>
          <input type="text" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="ubicacion" className="block">Ubicación:</label>
          <input type="text" id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label htmlFor="observaciones" className="block">Observaciones:</label>
          <textarea id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Enviar</button>
        </div>
      </form>
    </div>
  );
}

// export default async function Solidos() {
  
//   try {
//     // Insertar datos en la base de datos
//     const { data, error } = await supabase
//       .from('reactivos_solidos')
//       .insert([{
//         num_cas: '12345',
//         nombre: 'Azufre', 
//         formula: 'S',
//         marca: 'Genérico',
//         cantidad: 0,
//         ubicacion:  'EA11',
//         contenedor: 'Rojo',
//         observaciones: 'Tiene rota la tapa'
//       }])
//       .select();

//     if (error) {
//       throw new Error('Error al insertar datos en la base de datos');
//     }

//     console.log("Datos ingresados correctamente :)");
//   } catch (error) {
//     console.error('Error:', error instanceof Error ? error.message : 'Ocurrió un error');
//   }

//   // No devuelvas console.log como un valor de retorno
//   return null;
// }