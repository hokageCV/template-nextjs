import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const LOCAL_LOGGEDIN_KEY = 'template_user_is_logged_in'

// const getInitialLoggedIn = () => {
//   const isLoggedIn = localStorage.getItem(LOCAL_LOGGEDIN_KEY) || 'false'
//   return isLoggedIn ? JSON.parse(isLoggedIn) : false
// }

// const useAuthStore = create<AuthStore>((set) => ({
//   isLoggedIn: getInitialLoggedIn(),

//   setIsLoggedIn: (isLoggedIn) =>
//     set(() => {
//       localStorage.setItem(LOCAL_LOGGEDIN_KEY, JSON.stringify(isLoggedIn))
//       return { isLoggedIn }
//     }),
// }))


const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false, // default value if nothing is stored yet

      setIsLoggedIn: (isLoggedIn) =>
        set(() => ({ isLoggedIn })),
    }),
    {
      name: LOCAL_LOGGEDIN_KEY, // name of the item in storage
    }
  )
)

export default useAuthStore
