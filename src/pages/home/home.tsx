import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDeleteContactMutation, useFetchContactsQuery } from '../../services/contacts-api'
import './home.styles.css'
import Button from '@components/button/button'
import DataTable from '@components/data-table/data-table'
import UserRow from '@components/user-row/user-row'
import ConfirmModal from '@components/confirm-modal/confirm-model'

const Home: React.FC = () => {
  const { data, isLoading } = useFetchContactsQuery()
  const [deleteContact] = useDeleteContactMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<number | null>(null)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const handleDeleteClick = async (id: number) => {
    setContactToDelete(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (contactToDelete !== null) {
      try {
        await deleteContact(contactToDelete).unwrap()
        toast.success('Delete Successfully!')
      } catch (error) {
        console.error('Failed to delete the contact:', error)
      }
    }
    setIsModalOpen(false)
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false)
    setContactToDelete(null)
  }

  return (
    <div className="home-page">
      <div className="btn-box">
        <Button to="/user/create">Add</Button>
      </div>
      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((contact) => (
              <UserRow key={contact.id} onDeleteUser={handleDeleteClick} user={contact} />
            ))}
        </tbody>
      </DataTable>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this contact?"
      />
    </div>
  )
}

export default Home
