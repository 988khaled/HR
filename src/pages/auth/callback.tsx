import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href)
      const code = searchParams.get('code')
      const next = searchParams.get('next') ?? '/'

      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        router.push(next)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">جاري تسجيل الدخول...</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  )
} 