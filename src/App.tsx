import { Navigate, Outlet, Route, Routes } from 'react-router'
import Home from './pages/home/home'
import UserProfile from './pages/user-profile/user-profile'
import Auth from './pages/auth/auth'
import NotFound from './pages/not-found/not-found'
import AddEditUser from './pages/add-edit-user/add-edit-user'
import PostList from './pages/post-list/post-list'

function App() {
  const isAuthentication = false

  const ProtectedRoute = () => {
    if (!isAuthentication) return <Navigate to="/login" replace={true} />

    return <Outlet />
  }

  const UnauthorizedRoute = () => {
    if (isAuthentication) return <Navigate to="/" replace={true} />

    return <Outlet />
  }

  return (
    <Routes>
      <Route path="/posts" element={<PostList />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/user/update/:userId" element={<AddEditUser />} />
        <Route path="/user/create" element={<AddEditUser />} />
        <Route path="/user/view/:userId" element={<UserProfile />} />
      </Route>

      <Route element={<UnauthorizedRoute />}>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
