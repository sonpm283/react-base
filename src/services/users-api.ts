import { baseApi } from "./api";
import IUser from "../types/user.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<IUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
  }),
});

export const { useFetchUsersQuery } = userApi;
