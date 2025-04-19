import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { clearAuth } from '@/store/slices/auth.slice'

const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return () => {
    dispatch(clearAuth())
    localStorage.clear()
    navigate('/login')
  }
}

export { useLogout }
