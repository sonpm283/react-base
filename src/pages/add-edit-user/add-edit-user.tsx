import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { skipToken } from '@reduxjs/toolkit/query/react'

import {
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useCreateContactMutation,
} from '../../services/contacts-api'
import TextField from '@components/textbox/textbox'

type FormData = {
  name: string
  email: string
  contact: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
  email: yup.string().required('Email is required').email('Invalid email'),
  contact: yup
    .string()
    .required('Contact number is required')
    .matches(/^\d+$/, 'Contact number must only contain digits'),
})

const AddEditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(userId)

  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateContactMutation()
  const [addUserMutation, { isLoading: isAdding }] = useCreateContactMutation()

  const {
    data: user,
    isLoading: isFetching,
    error,
  } = useGetContactByIdQuery(isEditMode ? parseInt(userId!, 10) : skipToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (user && isEditMode) {
      reset({
        name: user.name,
        email: user.email,
        contact: user.contact,
      })
    }
  }, [user, reset, isEditMode])

  useEffect(() => {
    if (isEditMode && !userId) {
      toast.error('Invalid user ID')
      navigate('/')
    }
  }, [isEditMode, userId, navigate])

  const onSubmit = async (data: FormData) => {
    if (isEditMode) {
      try {
        await updateUserMutation({ id: parseInt(userId!, 10), ...data }).unwrap()
        toast.success('Successfully updated!')
        navigate('/')
      } catch (error) {
        console.error('Error updating:', error)
        toast.error('Update failed. Please try again.')
      }
    } else {
      try {
        await addUserMutation(data).unwrap()
        toast.success('Successfully added!')
        navigate('/')
      } catch (error) {
        console.error('Error adding:', error)
        toast.error('Add failed. Please try again.')
      }
    }
  }

  if (isEditMode && !userId) {
    return null
  }

  if (isEditMode && isFetching) {
    return <div>Loading...</div>
  }

  if (isEditMode && error) {
    return <div>An error occurred while fetching user information</div>
  }

  return (
    <>
      <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          placeholder="Enter name"
        />
        <TextField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          type="email"
          placeholder="Enter email"
        />
        <TextField
          label="Contact Number"
          name="contact"
          register={register}
          errors={errors}
          placeholder="Enter contact number"
        />
        <button type="submit" className="btn btn-primary" disabled={isUpdating || isAdding}>
          {(isUpdating && 'Updating...') ||
            (isAdding && 'Adding...') ||
            (isEditMode ? 'Update' : 'Add')}
        </button>
      </form>
    </>
  )
}

export default AddEditUser
