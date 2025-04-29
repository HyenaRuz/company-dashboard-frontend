import { queryClient } from '@/main'

const logout = () => {
  localStorage.clear()
  queryClient.clear()
}

export { logout }
