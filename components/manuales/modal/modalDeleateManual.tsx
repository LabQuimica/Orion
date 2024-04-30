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
import { deleteManual } from "../fetching/deleateManual";

interface ReactivosComponentProps {
  resultado: any;
  onClose: () => void;
}

const ModalDeleateManual = ({ resultado, onClose }: ReactivosComponentProps) => {
  const handleSubmit = async () => {
    await deleteManual(resultado);
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

export default ModalDeleateManual;
