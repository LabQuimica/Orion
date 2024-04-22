import React, { useState } from "react";
import { 
  Modal, 
  Typography, 
  Paper, 
  Stack, 
  TextField, 
  Button 
} from "@mui/material";

import { insertRL } from "../fetching/insertRL";

interface ReactivosComponentProps {
     onClose: () => void;
     onInsert: (newData: any) => void;
   }
   
const ExampleComponent = ({ onClose, onInsert }: ReactivosComponentProps) => {
  const [formData, setFormData] = useState({
    num_cas: "",
    nombre: "",
    formula: "",
    contenedor: "",
    marca: "",
    cantidad: "",
    ubicacion: "",
    observaciones: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    await insertRL(data);
    onInsert(data);
    onClose();
  };

  return (
     <React.Fragment>
<Modal
      open={true}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}>
        <Typography component="h2" id="modal-title" variant="h4" mb={1}>
          Insertar reactivo
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={2}>
            <TextField
              id="num_css"
              name="num_cas"
              label="Número CAS"
              value={formData.num_cas}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="formula"
              name="formula"
              label="Fórmula"
              value={formData.formula}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="contenedor"
              name="contenedor"
              label="Contenedor"
              value={formData.contenedor}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="marca"
              name="marca"
              label="Marca"
              value={formData.marca}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="cantidad"
              name="cantidad"
              label="Cantidad (frascos)"
              value={formData.cantidad}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="ubicacion"
              name="ubicacion"
              label="Ubicación"
              value={formData.ubicacion}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="observaciones"
              name="observaciones"
              label="Observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Insertar reactivo
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
     </React.Fragment>

    
  );
};

export default ExampleComponent;
