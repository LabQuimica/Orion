"use client";
import {
  Modal,
  ModalClose,
  Typography,
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@mui/joy";

import React from "react";
import { updateRL } from "../fetching/updateRL";
import { fetchReactivosLiquidos } from "../fetching/selectRL";

type ReactivosLiquidos = {
  id_reactivos: string | null;
  num_cas: string | null;
  nombre: string | null;
  formula: string | null;
  marca: string | null;
  cantidad: number | null;
  ubicacion: {
    Nivel: number | null;
    Estado: string | null;
    Mueble: string | null;
    Numero: number | null;
    Estante: number | null;
    id_ubicacion: string | null;
  };
  contenedor: string | null;
  observaciones: string | null;
  Acciones: string;
};

interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void; //
}

const ModalUpdate = ({
  resultado,
  onClose,
  onUpdate,
}: ReactivosComponentProps) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id_reactivos = resultado.id_reactivos;

    const adjustedData: ReactivosLiquidos = {
      id_reactivos: String(data.id_reactivos),
      num_cas: String(data.num_cas),
      nombre: String(data.nombre),
      formula: String(data.formula),
      marca: String(data.marca),
      cantidad: Number(data.cantidad),
      ubicacion: {
        Nivel: Number(data.nivel),
        Estado: String(data.estado),
        Mueble: String(data.mueble),
        Numero: data.numero ? Number(data.numero) : null,
        Estante: Number(data.estante),
        id_ubicacion: resultado.ubicacion.id_ubicacion,
      },
      contenedor: String(data.contenedor),
      observaciones: String(data.observaciones) || null,
      Acciones: "", // Asume que 'Acciones' puede ser una cadena vacía
    };

    console.log(adjustedData);
    await updateRL(adjustedData);
    onUpdate(adjustedData);
    onClose();
  };

  console.log(resultado);

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Editar el reactivo: {resultado.id_reactivos}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormLabel>
                  Nombre:{" "}
                  <Input
                    defaultValue={resultado.nombre}
                    size="sm"
                    type="text"
                    className="ml-3 mt-2"
                    name="nombre"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Num Cas:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.num_cas}
                    name="num_cas"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Formula:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.formula}
                    name="formula"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Marca:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.marca}
                    name="marca"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Cantidad:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.cantidad}
                    name="cantidad"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Mueble:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.ubicacion.Mueble}
                    name="mueble"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Nivel:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.ubicacion.Nivel}
                    name="nivel"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Estante:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.ubicacion.Estante}
                    name="estante"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Estado :{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.ubicacion.Estado}
                    name="estado"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Numero :{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.ubicacion.Numero}
                    name="numero"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                  Contenedor :{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.contenedor}
                    name="contenedor"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                  Observaciones :
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.observaciones}
                    name="observaciones"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <Button type="submit">Actualizar Reactivo</Button>
              </Stack>
            </form>
            {/* <pre>{JSON.stringify(resultado, null, 2)}</pre> */}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdate;
