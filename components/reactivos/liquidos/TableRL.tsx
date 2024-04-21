import { useEffect, useState } from "react";
import React from "react";
import { fetchReactivosLiquidos } from "./fetching/selectRL";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconCornerRightUp,
  IconCornerRightDown,
} from "@tabler/icons-react";
import { Stack, IconButton, Table, Input, Button } from "@mui/joy";

import ReactivosComponent from "./modal/modal-edit-item";
import ModalUpdate from "./modal/modal-edit-item";
import ModalDeleateRL from "./modal/modal-deleate-item";

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

const TableRL = () => {
  const [data, setData] = useState<any>(null);
  const [shouldUpdate, setShouldUpdate] = useState(false); // Estado para controlar la actualización

  useEffect(() => {
    const getdata = async () => {
      const valores = await fetchReactivosLiquidos();
      setData(valores);
      setShouldUpdate(false);
    };
    getdata();
  }, [shouldUpdate]);

  const handleUpdateData = async (updatedData: any) => {
    // Actualizar los datos localmente
    const updatedDataIndex = data.findIndex(
      (item: any) => item.id_reactivos === updatedData.id_reactivos
    );
    const newData = [...data];
    newData[updatedDataIndex] = updatedData;
    setData(newData);

    // Activar la actualización de la tabla
    setShouldUpdate(true);
  };

  const handleModalClose = () => {
    // Al cerrar el modal, activar la actualización
    setShouldUpdate(true);
  };

  interface RowData {
    original: any;
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
        const [isOpenDelete, setIsOpenDelete] = React.useState(false);

        const handleOpenModal = () => {
          setIsOpen(true);
        };

        const handleCloseModal = () => {
          setIsOpen(false);
          handleModalClose();
        };

        const handleOpenModalDelete = () => {
          setIsOpenDelete(true);
        };

        const handleCloseModalDelete = () => {
          setIsOpenDelete(false);
          handleModalClose();
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
              <ModalUpdate
                resultado={row.original}
                onClose={handleCloseModal}
                onUpdate={handleUpdateData} // Pasar la función de actualización
              />
            )}
            <IconButton
              color="danger"
              variant="plain"
              onClick={handleOpenModalDelete}
            >
              <IconTrash />
              {isOpenDelete && (
                <ModalDeleateRL
                  resultado={row.original.id_reactivos}
                  onClose={handleCloseModalDelete}
                />
              )}
            </IconButton>
          </Stack>
        );
      },
    }),
  ];

  console.log(data);
  type ColumnSort = {
    id: string;
    desc: boolean;
  };
  type SortingState = ColumnSort[];

  const [filtering, setFiltering] = useState(""); /* Para filtrar los datos */
  const [sorting, setsorting] = useState<SortingState>([
    { id: "id_reactivos", desc: false },
  ]);

  // Se crea la tabla
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //Filtracion start
    getSortedRowModel: getSortedRowModel(),

    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onGlobalFilterChange: setFiltering, //Filtracion end
    onSortingChange: setsorting,
  });

  return (
    <>
      {/* Se crean los encabezados */}
      {data ? (
        <main className="pt-5">
          <div className="-mt-[3.5rem] ml-28 font-bold max-w-[200px] text-center">
            Reactivos Liquidos
          </div>
          <div>
            {/* Entrada para realizar la filtracion de los datos*/}
            <div className="flex m-4 gap-2 justify-between">
              <div className="relative">
                <IconSearch className="absolute -top-1 left-0 ml-3 mt-3" />
                <input
                  type="text"
                  className="2xl:w-96 xl:w-80 md:w-72 sm:w-60 p-2 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={filtering}
                  onChange={(e) => setFiltering(e.target.value)}
                  placeholder="  Buscar (entre todas las columnas)"
                />
              </div>

              <Button> Agregar Reactivo</Button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  {table.getHeaderGroups().map((headerGroup, index) => (
                    <tr
                      key={index}
                      className="font-semibold text-[0.95rem] text-secondary-dark"
                    >
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-center align-middle"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {
                            { asc: "🠉", desc: "🠋" }[
                              header.column.getIsSorted() ?? ""
                            ]
                          }
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
                      className="bg-white border-b dark:bg-[#1F1F1F] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td className="p-3 pl-0 text-center align-middle">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => table.setPageIndex(0)}>
                Primera Página
              </Button>
              <Button variant="outlined" onClick={() => table.previousPage()}>
                Página Anterior
              </Button>
              <Button variant="outlined" onClick={() => table.nextPage()}>
                Página Siguiente
              </Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Última Página
              </Button>
            </div>
          </div>
        </main>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default TableRL;
