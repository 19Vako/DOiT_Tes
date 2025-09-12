"use client";
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "../../models/Post";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deletePost } from "../../store/slices/postsSlice"

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{post.title[0]}</Avatar>}
        title={post.title}
        subheader={`Post ID: ${post.id}`}
        action={
          <IconButton onClick={() => dispatch(deletePost(post.id))}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/post/${post.id}`}>
          Переглянути
        </Button>
      </CardActions>
    </Card>
  );
};
