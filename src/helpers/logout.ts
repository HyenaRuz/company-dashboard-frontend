import { useAppDispatch } from '@/store'
import { clearAuth } from '@/store/slices/auth.slice'

const useLogout = () => {
  const dispatch = useAppDispatch()

  return () => {
    dispatch(clearAuth())
    localStorage.clear()
  }
}

export { useLogout }
