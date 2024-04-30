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
import { updateMateriales } from "../fetching/updateMateriales";

type Materiales = {
  id_material: string;
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
  Acciones: string;
};

interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void; //
}

const ModalUpdateMaterial = ({
  resultado,
  onClose,
  onUpdate,
}: ReactivosComponentProps) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id_material = resultado.id_material;

    const adjustedData: Materiales = {
      id_material: String(data.id_material),
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
      Acciones: "", 
    };

    console.log(adjustedData);
    await updateMateriales(adjustedData);
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
            Editar el material: {resultado.id_material}
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
                <Button type="submit">Actualizar Material</Button>
              </Stack>
            </form>
            {/* <pre>{JSON.stringify(resultado, null, 2)}</pre> */}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdateMaterial;
