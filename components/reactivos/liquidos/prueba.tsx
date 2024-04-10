import { useEffect, useState } from "react";
import React from "react";
import { fetchReactivosLiquidos } from "./fetchReactivosLiquidos";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { IconEdit, IconTrash } from "@tabler/icons-react";

import { Stack, IconButton } from "@mui/joy";
import ReactivosComponent from "./modal-edit-item";

/*
Ejemplo de datos que se obtienen de la base de datos:

id_reactivos: 'd22cebad-8c25-43dc-9eac-4c24a4e30099',
num_cas: 'CCA0',
nombre: 'Agua',
formula: 'H20',
marca: 'Generico',
cantidad: 2,
ubicacion: {
  Nivel: 1,
  Estado: 'Abierto',
  Mueble: 'Estante',
  Numero: null,
  Estante: 1,
  id_ubicacion: 'EA11'
},
contenedor: 'Vidrio',
observaciones: 'esta rota la tapa'
},*/

// Definición de los tipos de datos que se obtienen de la base de datos
type ReactivosLiquidos = {
  id_reactivos: string;
  num_cas: string;
  nombre: string;
  formula: string;
  marca: string;
  cantidad: number;
  ubicacion: {
    Nivel: number;
    Estado: string;
    Mueble: string;
    Numero: number | null;
    Estante: number;
    id_ubicacion: string;
  };
  contenedor: string;
  observaciones: string | null;
  Acciones: string;
};

// Creación de las columnas
const columnHelper = createColumnHelper<ReactivosLiquidos>();

const Prueba = () => {
  const [data, setdata] = useState<any>(null);
  useEffect(() => {
    const getdata = async () => {
      // Se obtienen los datos de la base de datos
      const valores = await fetchReactivosLiquidos();

      setdata(valores);
    };
    getdata();
  }, []);
  // Se definen las columnas y los valores que se mostrarán en la tabla
  interface RowData {
    original: any; // Reemplaza 'any' con el tipo real de tus datos
  }

  const columns = [
    columnHelper.accessor("id_reactivos", {
      header: "ids",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("num_cas", {
      header: "Num Cas",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("nombre", {
      header: "Nombre",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("formula", {
      header: "Formula",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("marca", {
      header: "Marca",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("cantidad", {
      header: "Cantidad",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.id_ubicacion", {
      header: "Id",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.Nivel", {
      header: "Nivel",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.Estado", {
      header: "Estado",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.Mueble", {
      header: "Mueble",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.Numero", {
      header: "Numero",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ubicacion.Estante", {
      header: "Estante",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("contenedor", {
      header: "Contenedor",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("observaciones", {
      header: "Observaciones",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("Acciones", {
      header: () => <p className="text-center"> Acciones </p>,
      cell: ({ row }) => {
        const [isOpen, setIsOpen] = React.useState(false);

        const handleOpenModal = () => {
          setIsOpen(true);
        };

        const handleCloseModal = () => {
          setIsOpen(false);
        };

        return (
          <Stack className="justify-center gap-4" direction={"row"}>
            <IconButton
              onClick={handleOpenModal}
              color="success"
              variant="plain"
            >
              <IconEdit />
            </IconButton>
            {isOpen && (
              <ReactivosComponent
                resultado={row.original}
                onClose={handleCloseModal}
              />
            )}
            <IconButton color="danger" variant="plain">
              <IconTrash />
            </IconButton>
          </Stack>
        );
      },
    }),
  ];

  console.log(data);

  const [filtering, setFiltering] = useState(""); /* Para filtrar los datos */

  // Se crea la tabla
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(), //Filtracion start
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering, //Filtracion end
  });

  return (
    <div>
      {/* Entrada para realizar la filtracion de los datos*/}
      <input
        type="text"
        size={30}
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="  Buscar (entre todas las columnas)"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="currentColor"
      ></svg>

      {/* Se crean los encabezados */}
      {data ? (
        <table className="w-full my-0 align-middle text-dark border-neutral-200">
          <thead className="align-bottom">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr
                key={index}
                className="font-semibold text-[0.95rem] text-secondary-dark"
              >
                {headerGroup.headers.map((header, index) => (
                  <th key={index} className="pb-3 text-start">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Se ponen los valores */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-dashed last:border-b-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="p-3 pl-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Prueba;
