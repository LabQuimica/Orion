import { useEffect, useState } from "react";
import React from "react";

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

import { Modal } from "@mui/material";

import { fetchManuales } from "./fetching/selectManuales";
import ModalUpdateManual from "./modal/modalEditManual";
import ModalDeleateManual from "./modal/modalDeleateManual";
import FormularioInsercion from "./modal/modal-insert-item";

type Manuales = {
  id_manual: string;
  codigo: string;
  manual: string;
  topico: string;
  cantidad: number;
  referencia: string;
  presentacion: string;
  idioma: string;
  observaciones: string;
  Acciones: ''
};

// Creación de las columnas
const columnHelper = createColumnHelper<Manuales>();

const TableManuales = () => {
  const [data, setData] = useState<any>(null);
  const [shouldUpdate, setShouldUpdate] = useState(false); // Estado para controlar la actualización
  const [openInsertForm, setOpenInsertForm] = useState(false); // Estado para controlar la apertura del formulario de inserción

  useEffect(() => {
    const getdata = async () => {
      const valores = await fetchManuales();
      setData(valores);
      setShouldUpdate(false);
    };
    getdata();
  }, [shouldUpdate]);

  const handleUpdateData = async (updatedData: any) => {
    // Actualizar los datos localmente
    const updatedDataIndex = data.findIndex(
      (item: any) => item.id_manual === updatedData.id_manual
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

  const handleOpenInsertForm = () => {
    setOpenInsertForm(true);
  };

  const handleCloseInsertForm = () => {
    setOpenInsertForm(false);
    setShouldUpdate(true); // Activar la actualización de la tabla después de cerrar el formulario
  };

  interface RowData {
    original: any;
  }

  const columns = [
    columnHelper.accessor("id_manual", {
      header: "ids",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("codigo", {
      header: "codigo",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("manual", {
      header: "manual",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("topico", {
      header: "topico",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("cantidad", {
      header: "cantidad",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("referencia", {
      header: "referencia",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("presentacion", {
      header: "presentacion",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("idioma", {
      header: "idioma",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("observaciones", {
      header: "observaciones",
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
              <ModalUpdateManual
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
                <ModalDeleateManual
                  resultado={row.original.id_manual}
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
    { id: "id_manual", desc: false },
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
        <main className="pt-1">
      <div className="ml-28 font-bold max-w-[200px] text-center text-white sm:-mt-[1rem] md:-mt-[3.5rem]">
          Tabla Manuales
        </div>
        <div className="sm:pt-1 md:pt-8" >
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

              <Button onClick={handleOpenInsertForm}>Agregar Material</Button>
              {openInsertForm && (
                <Modal open={openInsertForm} onClose={handleCloseInsertForm}>
                  <FormularioInsercion
                    onClose={handleCloseInsertForm}
                    onInsert={function (newData: any): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </Modal>
              )}
            </div>

            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                          <tr key={index}>
                            {headerGroup.headers.map((header, index) => (
                              <th
                                key={index}
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
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
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {table.getRowModel().rows.map((row) => (
                          <tr
                            key={row.id}
                            className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-800 dark:text-neutral-200">
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
                </div>
              </div>
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

export default TableManuales;
