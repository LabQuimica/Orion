"use client"
import { useState } from 'react';
import {supabase}  from '../../../../supabase'; 
// import { useClient } from '@supabase/supabase-js';


export default function Solidos() {
  const [formData, setFormData] = useState({
    num_css: '',
    nombre: '',
    formula: '',
    marca: '',
    cantidad: 0,   // entero
    ubicacion: '',
    contenedor: '',
    observaciones: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Con esta linea se agregan los datos a la tabla
      const { data, error } = await supabase.from('reactivos_solidos').insert([formData]);

      if (error) {
        console.error('Error al insertar:', error.message);
      } else {
        console.log('Registro insertado exitosamente:', data);
        // Aquí puedes agregar cualquier lógica adicional después de la inserción exitosa
      }
    } catch (error) {
      console.log('Error al insertar:' {error});
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Formulario de Productos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="num_css" className="block">Número CSS:</label>
          <input type="text" id="num_css" name="num_css" value={formData.num_css} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
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
          <label htmlFor="cantidad" className="block">Cantidad:</label>
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

// export default async function Solidos(){
//   const [formData, setFormData] = useState({
//     num_css: '12345',
//     nombre: 'Azufre',
//     formula: 'Z',
//     marca: 'Genérica',
//     cantidad: 0,   // entero
//     ubicacion: 'AE3',
//     contenedor: 'Rojo',
//     observaciones: 'Tiene rota la tapa'
//    });

//   const { data, error } = await supabase
//   .from('reactivos_solidos')
//   .insert([formData])
//   .select()

//   return(
//     console.log("Datos ingresados correctamente :)")
//   )
// }