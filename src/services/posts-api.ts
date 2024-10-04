import { IPost } from '../types/post.type'
import { baseApi } from './api'

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], { page: number; limit: number; order: string }>({
      query: ({ page, limit, order }) => `/posts?_page=${page}&_limit=${limit}&_order=${order}`,
    }),
    createPost: builder.mutation<IPost, Omit<IPost, 'id'>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation } = postsApi
