'use client'

type Props = {
	postId: string
}

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminActions({ postId }: Props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const router = useRouter()

	const endpoint = `http://localhost:3000/api/posts/${postId}`

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem('token'))
	}, [])

	if (!isLoggedIn) {
		return null
	}

	const handleDelete = async () => {
		const token = localStorage.getItem('token')
		await fetch(endpoint, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})
		router.push('/')
	}

	return (
		<div className="mt-16">
			<Link href={`/edit/${postId}`} className="mx-8 px-4 py-2 text-blue-500">
				Edit
			</Link>
			<button className="mx-8 px-2 py-1 text-red-500 cursor-pointer" onClick={handleDelete}>
				Delete
			</button>
		</div>
	)
}
