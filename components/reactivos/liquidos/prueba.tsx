import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import React from "react";
import { fetchReactivosLiquidos } from "./fetchReactivosLiquidos";

type Reactivos = {
  id_reactivos: string;
  nombre: string;
  ubicacion: string;
};

const columnHelper = createColumnHelper<Reactivos>();

const Prueba = () => {
  const [smoothies, setSmoothies] = useState<any>(null);
  useEffect(() => {
    const getSmoothies = async () => {
      const data = await fetchReactivosLiquidos();

      // Aplana la lista
      const flattenedData = data!.map((item) => {
        const { ubicacion, ...rest } = item;
        return { ...rest, ...ubicacion };
      });

      setSmoothies(flattenedData);
    };
    getSmoothies();
  }, []);

  const columns = [
    columnHelper.accessor("id_reactivos", {
      header: "ids",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("nombre", {
      header: "Nombre",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion", {
      header: "Ubicacion",
      cell: (info) => info.renderValue(),
    }),
  ];

  console.log(smoothies);

  const table = useReactTable({
    data: smoothies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {smoothies ? (
        <table>
          <thead>
            {
              <div>
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((header, index) => (
                      <th key={index}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </div>
            }
          </thead>
          <tbody>
            {
              <div>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </div>
            }
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Prueba;
