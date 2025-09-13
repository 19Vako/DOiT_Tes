"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPosts, deletePost } from "@/store/slices/postsSlice";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) =>
    state.posts.items.find((p: any) => p.id === Number(id))
  );
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    } else {
      setLoading(false);
    }
  }, [dispatch, post]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Пост не знайдено
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card >
        <CardHeader
          avatar={<Avatar>{post.title[0]}</Avatar>}
          title={post.title}
          subheader={`Post ID: ${post.id}`}
        />
        <CardContent>
          <Typography>{post.body}</Typography>
        </CardContent>
        <CardActions>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              dispatch(deletePost(post.id));
              router.push("/posts");
            }}
          >
            Видалити
          </Button>
          <Button onClick={() => router.push("/posts")}>До списку</Button>
        </CardActions>
      </Card>
 
    </Box>
  );
}
