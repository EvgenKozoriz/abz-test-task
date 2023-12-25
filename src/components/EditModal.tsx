import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedTitle: string, editedBody: string) => void;
  initialTitle: string;
  initialBody: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTitle,
  initialBody,
}) => {
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedBody, setEditedBody] = useState(initialBody);

  const handleSave = () => {
    onSave(editedTitle, editedBody);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Редагувати пост</DialogTitle>
      <DialogContent>
        <TextField
          label="Назва"
          fullWidth
          value={editedTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTitle(e.target.value)
          }
          margin="normal"
        />
        <TextField
          label="Тіло"
          fullWidth
          multiline
          rows={4}
          value={editedBody}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedBody(e.target.value)
          }
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Скасувати
        </Button>
        <Button onClick={handleSave} color="primary">
          Редагувати
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
