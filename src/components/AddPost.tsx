import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

interface IAddPostProps {
  newPost: { title: string; body: string };
  setNewPost: React.Dispatch<
    React.SetStateAction<{ title: string; body: string }>
  >;
  handleAddPost: () => void;
}

const AddPost: React.FC<IAddPostProps> = ({
  newPost,
  setNewPost,
  handleAddPost,
}) => {
  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Додати новий пост
      </Typography>
      <div>
        <TextField
          label="Назва"
          variant="outlined"
          fullWidth
          value={newPost.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPost({ ...newPost, title: e.target.value })
          }
          sx={{ mb: 2 }}
        />
      </div>
      <div>
        <TextField
          label="Тіло"
          variant="outlined"
          fullWidth
          multiline
          value={newPost.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPost({ ...newPost, body: e.target.value })
          }
          sx={{ mb: 2 }}
        />
      </div>
      <Button
        variant="contained"
        fullWidth
        onClick={handleAddPost}
        disabled={!newPost.title || !newPost.body}
      >
        Додати пост
      </Button>
    </Box>
  );
};

export default AddPost;
