import React, { useState } from "react";
import {
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Sheet,
  FormLabel,
  Input,
} from "@mui/joy";

import { insertRL } from "../fetching/insertRL";
import { ModalClose } from "@mui/joy";

interface ReactivosComponentProps {
  onClose: () => void;
  onInsert: (newData: any) => void;
}

const ExampleComponent = ({ onClose, onInsert }: ReactivosComponentProps) => {
  const [formData, setFormData] = useState({
    codigo: "",
    manual: "",
    topico: "",
    cantidad: "",
    referencia:"",
    presentacion:"",
    idioma:"",
    observaciones:""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    try {
      await insertRL(data); // Inserta los datos ajustados
      onInsert(data); // Actualiza la interfaz con los nuevos datos
      showNotification("Datos insertados correctamente", "success");

    } catch (error) {
      console.error("Error al insertar datos:", error);
      showNotification("Error al insertar datos. Inténtalo de nuevo.", "error");

    } finally {
      onClose(); // Cierra el modal
    }
  };

  const showNotification = (message: string, type: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(message);
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };
  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
          <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Insertar manual
          </Typography>

          <Typography id="modal-desc" textColor="text.tertiary">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormLabel>
                  Código:{" "}
                  <Input
                    id="num_css"
                    name="codigo"
                    value={formData.codigo}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>

                <FormLabel htmlFor="manual">
                  Titulo:{" "}
                  <Input
                    id="manual"
                    name="manual"
                    value={formData.manual}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel htmlFor="topico">
                  Tópico:{" "}
                  <Input
                    id="topico"
                    name="topico"
                    value={formData.topico}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Cantidad:{" "}
                  <Input
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Referencia:{" "}
                  <Input
                    id="referencia"
                    name="referencia"
                    value={formData.referencia}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Presentación:{" "}
                  <Input
                    id="presentacion"
                    name="presentacion"
                    value={formData.presentacion}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Idioma:{" "}
                  <Input
                    id="idioma"
                    name="idioma"
                    value={formData.idioma}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Observaciones:{" "}
                  <Input
                    id="observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <Button type="submit" fullWidth>
                  Insertar reactivo
                </Button>
              </Stack>
            </form>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};
export default ExampleComponent;
