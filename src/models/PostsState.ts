import {Post} from "./Post"

export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null
}