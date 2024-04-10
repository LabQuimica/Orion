"use client";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Sheet,
} from "@mui/joy";
import React from "react";

interface ReactivosComponentProps {
  resultado: any; // Reemplaza 'any' con el tipo real de tus datos
  onClose: () => void; // Añade esto
}

const ReactivosComponent = ({
  resultado,
  onClose,
}: ReactivosComponentProps) => {
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
            En serio funcionas?? {resultado.id_reactivos}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <pre>{JSON.stringify(resultado, null, 2)}</pre>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ReactivosComponent;
