import React, { useState, useEffect } from "react";
import Post from "./Post";
import {
  getApiData,
  deleteApiData,
  postApiData,
  putApiData,
} from "../services/post-api";
import AddPost from "./AddPost";
import Search from "./Search";
import { Container, Typography, Box, Pagination } from "@mui/material";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const postsPerPage = 10;
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiData(8);
        setPosts(data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };
    fetchData();
  }, []);

  const isTitleExists = (posts: IPost[], newTitle: string): boolean => {
    return posts.some((post) => post.title === newTitle);
  };

  const handleAddPost = async () => {
    if (isTitleExists(posts, newPost.title)) {
      return alert("use unique title");
    }
    try {
      const response = await postApiData(newPost);
      setPosts([...posts, response]);
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDeletePost = async (postId: number, postTitle: string) => {
    if (postId === 101) {
      // this if needs for editing because resource will not be really updated on the server (it always give response with id 101)
      setPosts(posts.filter((post) => post.title !== postTitle));
    } else {
      try {
        await deleteApiData(postId);
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = async (
    postId: number,
    title: string,
    editedTitle: string,
    editedBody: string
  ) => {
    if (isTitleExists(posts, editedTitle)) {
      return alert("use unique title");
    }
    if (postId === 101) {
      // this if needs for editing because resource will not be really updated on the server (it always give response with id 101)
      setPosts(
        posts.map((post) =>
          post.title === title
            ? { ...post, title: editedTitle, body: editedBody }
            : post
        )
      );
    } else {
      try {
        await putApiData(postId, { title: editedTitle, body: editedBody });
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? { ...post, title: editedTitle, body: editedBody }
              : post
          )
        );
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePaginate = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Пости
      </Typography>
      <Search onSearch={handleSearch} />
      {filteredPosts.map((post) => (
        <Post
          key={post.title}
          post={post}
          onEdit={handleEdit}
          onDelete={() => handleDeletePost(post.id, post.title)}
        />
      ))}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={currentPage}
          shape="rounded"
          onChange={handlePaginate}
        />
      </Box>
      <AddPost
        newPost={newPost}
        setNewPost={setNewPost}
        handleAddPost={handleAddPost}
      />
    </Container>
  );
};

export default Posts;
