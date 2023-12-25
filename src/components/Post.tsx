import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import EditModal from "./EditModal";

interface IPostProps {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  onEdit: (
    postId: number,
    title: string,
    editedTitle: string,
    editedBody: string
  ) => void;
  onDelete: () => void;
}

const Post: React.FC<IPostProps> = ({ post, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleSaveEdit = (editedTitle: string, editedBody: string) => {
    onEdit(post.id, post.title, editedTitle, editedBody);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.body}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleModalOpen}>
            Редагувати
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Видалити
          </Button>
        </Box>
      </CardContent>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEdit}
        initialTitle={post.title}
        initialBody={post.body}
      />
    </Card>
  );
};

export default Post;
