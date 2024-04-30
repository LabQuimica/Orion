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
import { updateManuales } from "../fetching/updateManuales";

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

interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void; //
}

const ModalUpdateManual = ({
  resultado,
  onClose,
  onUpdate,
}: ReactivosComponentProps) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id_manual = resultado.id_manual;

    const adjustedData: Manuales = {
      id_manual: String(data.id_manual),
      codigo: String(data.codigo),
      manual: String(data.manual),
      topico: String(data.topico),
      cantidad: Number(data.cantidad),
      referencia: String(data.referencia),
      presentacion: String(data.presentacion),
      idioma: String(data.idioma),
      observaciones: String(data.observaciones),
      Acciones: "", 
    };

    console.log(adjustedData);
    await updateManuales(adjustedData);
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
            Editar el material: {resultado.id_manual}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormLabel>
                  Manual:{" "}
                  <Input
                    defaultValue={resultado.manual}
                    size="sm"
                    type="text"
                    className="ml-3 mt-2"
                    name="manual"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Codigo:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.codigo}
                    name="codigo"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Topico:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.topico}
                    name="topico"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Cantidad:{" "}
                  <Input
                    size="sm"
                    type="number"
                    defaultValue={resultado.cantidad}
                    name="cantidad"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Referencia:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.referencia}
                    name="referencia"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Presentacion:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.presentacion}
                    name="presentacion"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Idioma:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.idioma}
                    name="idioma"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Observaciones:{" "}
                  <Input
                    size="sm"
                    type="text"
                    defaultValue={resultado.observaciones}
                    name="observaciones"
                    className="ml-3 mt-1"
                  />{" "}
                </FormLabel>
                <Button type="submit">Actualizar Manual</Button>
              </Stack>
            </form>
            {/* <pre>{JSON.stringify(resultado, null, 2)}</pre> */}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUpdateManual;
