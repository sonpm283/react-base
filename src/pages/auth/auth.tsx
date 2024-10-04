import { useLocation } from 'react-router'
import LoginForm from './login-form'
import RegisterForm from './register-form'

const Auth: React.FC = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  return (
    <div>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  )
}

export default Auth
