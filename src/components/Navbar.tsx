'use client'
import useAuthStore from '@/context/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const logout = async () => {
    try {
      setIsLoggedIn(false)
      router.push('/')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='navbar bg-base-100 shadow-lg mb-5'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-3xl'>Template</a>
      </div>
      <div className='flex-none mr-3'>
        {isLoggedIn ? (
          <button className='btn btn-square btn-ghost text-xl' onClick={logout}>
            Logout
          </button>
        ) : (
          <button className='btn btn-square btn-ghost text-xl'>
            <Link href='/auth/login'>Login</Link>
          </button>
        )}
      </div>
    </div>
  )
}
