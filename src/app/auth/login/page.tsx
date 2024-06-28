'use client'
import useAuthStore from '@/context/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setIsLoading] = useState(false)
  const { setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const create = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const session = await appwriteAuthService.login(formData)

      if (session) {
        setIsLoggedIn(true)
        setIsLoading(false)
        router.push('/home')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <section className='w-9/12 max-w-lg m-auto'>
      {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

      <form onSubmit={create} className='flex flex-col items-center  gap-4'>
        <label className='input input-bordered flex items-center gap-2'>
          <EmailInputIcon />
          <input
            type='text'
            className='grow'
            placeholder='Email'
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prevFormData) => ({ ...prevFormData, email: e.target.value }))
            }
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <PasswordInputIcon />
          <input
            type='password'
            className='grow'
            placeholder='password'
            required
            value={formData.password}
            onChange={(e) =>
              setFormData((prevFormData) => ({ ...prevFormData, password: e.target.value }))
            }
          />
        </label>

        <button type='submit' className='btn'>
          Login
        </button>
        {loading && <span className='loading loading-spinner'></span>}
      </form>
      <div className='divider'></div>
      <div className=' h-20 card rounded-box place-items-center'>
        <p className='mt-2 text-center text-gray-600'>
          Don't have an account?&nbsp;
          <Link
            href='/auth/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Signup
          </Link>
        </p>
      </div>
    </section>
  )
}

const EmailInputIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill='currentColor'
      className='w-4 h-4 opacity-70'
    >
      <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
      <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
    </svg>
  )
}

const PasswordInputIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill='currentColor'
      className='w-4 h-4 opacity-70'
    >
      <path
        fillRule='evenodd'
        d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
