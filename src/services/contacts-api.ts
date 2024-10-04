import IUser from '@/types/user.type'
import { baseApi } from './api'

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchContacts: builder.query<IUser[], void>({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    getContactById: builder.query<IUser, number>({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    createContact: builder.mutation<IUser, Omit<IUser, 'id'>>({
      query: (newContact) => ({
        url: `contacts`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<IUser, IUser>({
      query: ({ id, ...data }) => ({
        url: `contacts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id }, 'Contact'],
    }),
  }),
})

export const {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useGetContactByIdQuery,
  useCreateContactMutation,
} = contactsApi
