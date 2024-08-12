'use client'
import useAuthStore from '@/context/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function page() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn) router.push('/')
  }, [])

  return <main>asd</main>
}
