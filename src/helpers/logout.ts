import { removeTokenFromLocalStorage } from './localstorage.helper'

const logout = () => {
  removeTokenFromLocalStorage()
  localStorage.clear()
}

export { logout }
