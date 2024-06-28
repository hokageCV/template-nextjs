import { create } from 'zustand'

type AuthStore = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const LOCAL_LOGGEDIN_KEY = 'template_user_is_logged_in'

const getInitialLoggedIn = () => {
  const isLoggedIn = localStorage.getItem(LOCAL_LOGGEDIN_KEY) || 'false'
  return isLoggedIn ? JSON.parse(isLoggedIn) : false
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: getInitialLoggedIn(),

  setIsLoggedIn: (isLoggedIn) =>
    set(() => {
      localStorage.setItem(LOCAL_LOGGEDIN_KEY, JSON.stringify(isLoggedIn))
      return { isLoggedIn }
    }),
}))

export default useAuthStore
