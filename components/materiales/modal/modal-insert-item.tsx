import React, { useEffect, useState } from "react";
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
    num_serie: "",
    nombre: "",
    marca: "",
    ubicacion: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    try {
      await insertRL(data);
      onInsert(data);
      setToastMessage("¡Datos insertados con éxito!");
      setToastSeverity("success");
      setShowToast(true);
        } catch (error) {
      console.error("Error al insertar datos:", error);
      setToastMessage("Error al insertar datos. Por favor, intenta de nuevo.");
      setToastSeverity("error");
      setShowToast(true);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Oculta el toast después de 3 segundos
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

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
            Insertar material
          </Typography>

          <Typography id="modal-desc" textColor="text.tertiary">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormLabel>
                  Número de serie:{" "}
                  <Input
                    id="num_css"
                    name="num_serie"
                    value={formData.num_serie}
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
                  Ubicación:{" "}
                  <Input
                    id="ubicacion"
                    name="ubicacion"
                    value={formData.ubicacion}
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

 {/* Toast */}
 {showToast && (
        <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <div
            style={{
              backgroundColor: toastSeverity === "success" ? "green" : "red",
              color: "white",
              padding: "10px 20px",
              borderRadius: 5,
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ExampleComponent;
