"use client";
import {
  Modal,
  ModalDialog,
  DialogContent,
  Button,
  Divider,
  DialogTitle,
  DialogActions,
  ModalClose,
} from "@mui/joy";

import { IconAlertTriangle } from "@tabler/icons-react";

import React from "react";
import { deleteMaterial } from "../fetching/deleateMaterial";

interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
}

const ModalDeleateMaterial = ({ resultado, onClose }: ReactivosComponentProps) => {
  const handleSubmit = async () => {
    await deleteMaterial(resultado);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <IconAlertTriangle />
          Confirmación
        </DialogTitle>
        <Divider />
        <DialogContent>
          ¿Estás seguro de que quieres eliminar el reactivo número: {resultado}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Eliminar</Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ModalDeleateMaterial;
