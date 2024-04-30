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
  Snackbar,
  Alert,
} from "@mui/joy";

import { insertRL } from "../fetching/insertRL";
import { ModalClose } from "@mui/joy";

interface ReactivosComponentProps {
  onClose: () => void;
  onInsert: (newData: any) => void;
}

const ExampleComponent = ({ onClose, onInsert }: ReactivosComponentProps) => {
  const [formData, setFormData] = useState({
    // Estado inicial del formulario
    id_reactivos: "",
    num_cas: "",
    nombre: "",
    formula: "",
    marca: "",
    cantidad: "",
    ubicacion: "",
    contenedor: "",
    observaciones: "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Maneja el cambio en los campos del formulario
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Maneja el envío del formulario
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());

    try {
      await insertRL(data); // Inserta los datos ajustados
      onInsert(data); // Actualiza la interfaz con los nuevos datos
    } catch (error) {
      console.error("Error al insertar datos:", error);
    } finally {
      onClose(); // Cierra el modal
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
            Insertar reactivo sólido
          </Typography>

          <Typography id="modal-desc" textColor="text.tertiary">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormLabel>
                  Número CAS:{" "}
                  <Input
                    id="num_css"
                    name="num_cas"
                    value={formData.num_cas}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>

                <FormLabel htmlFor="nombre">
                  Nombre:{" "}
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>

                <FormLabel>
                  Fórmula:{" "}
                  <Input
                    id="formula"
                    name="formula"
                    value={formData.formula}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Contenedor:{" "}
                  <Input
                    id="contenedor"
                    name="contenedor"
                    value={formData.contenedor}
                    onChange={handleChange}
                    className="ml-3 mt-2"
                  />{" "}
                </FormLabel>
                <FormLabel htmlFor="marca">
                  Marca:{" "}
                  <Input
                    id="marca"
                    name="marca"
                    value={formData.marca}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Cantidad (frascos):{" "}
                  <Input
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    className="ml-3 mt-2"
                    onChange={handleChange}
                  />{" "}
                </FormLabel>
                <FormLabel>
                  Ubicación:{" "}
                  <Input
                    id="ubicacion"
                    name="ubicacion"
                    value={formData.ubicacion}
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
      {/* Snackbar para mostrar mensaje de éxito */}
     
    </React.Fragment>
  );
};
export default ExampleComponent;
