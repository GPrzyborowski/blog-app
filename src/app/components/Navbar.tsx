'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

    const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('token')
		setIsLoggedIn(!!token)
	}, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        router.push('/')
    }

	return (
		<nav className="w-full p-4 text-right">
			{!isLoggedIn && (
				<>
					<Link href="/" className="mx-4">
						Home
					</Link>
					<Link href="/login" className="mx-4" prefetch={true}>
						Login
					</Link>
				</>
			)}

			{isLoggedIn && (
				<>
					<Link href="/" className="mx-4">
						Home
					</Link>
					<Link href="/newpost" className="mx-4" prefetch={true}>
						New post
					</Link>
					<button onClick={handleLogout} className='mx-4 cursor-pointer'>Log out</button>
				</>
			)}
		</nav>
	)
}
