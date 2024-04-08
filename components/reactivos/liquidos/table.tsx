import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function LiquidosTabla() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("reactivos_liquidos")
    .select("*, ubicacion(*)");

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Número CAS
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Fórmula
            </th>
            <th scope="col" className="px-6 py-3">
              Marca
            </th>
            <th scope="col" className="px-6 py-3">
              Cantidad
            </th>
            <th scope="col" className="px-6 py-3">
              Nivel{" "}
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Mueble
            </th>
            <th scope="col" className="px-6 py-3">
              Número
            </th>
            <th scope="col" className="px-6 py-3">
              Estante
            </th>
            <th scope="col" className="px-6 py-3">
              ID de Ubicación
            </th>
            <th scope="col" className="px-6 py-3">
              Contenedor
            </th>
            <th scope="col" className="px-6 py-3">
              Observaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id_reactivos}
              >
                <td>{item.num_cas}</td>
                <td>{item.nombre}</td>
                <td>{item.formula}</td>
                <td>{item.marca}</td>
                <td>{item.cantidad}</td>
                <td>{item.ubicacion.Nivel}</td>
                <td>{item.ubicacion.Estado}</td>
                <td>{item.ubicacion.Mueble}</td>
                <td>{item.ubicacion.Numero}</td>
                <td>{item.ubicacion.Estante}</td>
                <td>{item.ubicacion.id_ubicacion}</td>
                <td>{item.contenedor}</td>
                <td>{item.observaciones}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
