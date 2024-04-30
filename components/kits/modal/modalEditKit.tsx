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
import { updateKit } from "../fetching/updateKit";

type Kits = {
  id_kits: string;
  num_serie: string;
  nombre: string;
  marca: string;
  ubicacion: {
    Nivel: number;
    Estado: string;
    Mueble: string;
    Numero: number | null;
    Estante: number;
    id_ubicacion: string;
  };
  observaciones: string;
  link: string;
  caja: string;
  cantidad_kits: string;
  contenido: string;
  cantidad: string;
  Acciones: string;
};


interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void; //
}

const ModalUpdateKit = ({
  resultado,
  onClose,
  onUpdate,
}: ReactivosComponentProps) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id_kits = resultado.id_kits;

    const adjustedData: Kits = {
      id_kits: String(data.id_kits),
      num_serie: String(data.num_serie),
      nombre: String(data.nombre),
      marca: String(data.marca),
      ubicacion: {
        Nivel: Number(data.nivel),
        Estado: String(data.estado),
        Mueble: String(data.mueble),
        Numero: data.numero ? Number(data.numero) : null,
        Estante: Number(data.estante),
        id_ubicacion: resultado.ubicacion.id_ubicacion,
      },
      observaciones: String(data.observaciones),
      link: String(data.link),
      caja: String(data.caja),
      cantidad_kits: String(data.cantidad_kits),
      contenido: String(data.contenido),
      cantidad: String(data.cantidad),
      Acciones: "", 
    };
    console.log("eNTRO AQUI");
    console.log(adjustedData);
    await updateKit(adjustedData);
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
            Editar el material: {resultado.id_kits}
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
                  Num Serie:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.num_serie}
                    name="num_serie"
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
                  observaciones:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.observaciones}
                    name="observaciones"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                link:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.link}
                    name="link"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                caja:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.caja}
                    name="caja"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                cantidad_kits:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.cantidad_kits}
                    name="cantidad_kits"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>

                <FormLabel>
                contenido:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.contenido}
                    name="contenido"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                cantidad:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.cantidad}
                    name="cantidad"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>


                <Button type="submit">Actualizar Kit</Button>
              </Stack>
            </form>
            {/* <pre>{JSON.stringify(resultado, null, 2)}</pre> */}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdateKit;
