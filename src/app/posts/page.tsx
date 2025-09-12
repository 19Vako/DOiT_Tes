"use client";

import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Skeleton, Grid, SpeedDial, SpeedDialAction } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PostIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPosts } from "@/store/slices/postsSlice";
import { PostCard } from "@/app/components/PostCard";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: posts, loading } = useSelector((state: RootState) => state.posts);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));

  const speedDialActions = [
    { icon: <AddIcon />, name: "Створити пост", action: () => router.push("/posts/create") },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Пошук за заголовком"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
      </Grid>

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<PostIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
