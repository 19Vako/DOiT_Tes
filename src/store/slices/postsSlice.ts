import axios from "axios";
import { PostsState } from "@/models/PostsState";
import { Post } from "@/models/Post"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  return res.data
})

export const createPost = createAsyncThunk("posts/createPost", async (newPost: Omit<Post, "id">) => {
  const res = await axios.post<Post>("https://jsonplaceholder.typicode.com/posts", newPost, {headers: { "Content-Type": "application/json" }});
  return res.data
})

export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, data }: { id: number; data: Omit<Post, "id"> }) => {
    const res = await axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, data, {headers: { "Content-Type": "application/json" }});
    return res.data
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching posts";
      })

      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

