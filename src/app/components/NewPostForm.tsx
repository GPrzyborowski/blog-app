'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPost() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const router = useRouter()

	const endpoint = `http://localhost:3000/api/posts`

	const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const token = localStorage.getItem('token')

        if(!token) {
            router.push('/login')
            return
        }

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, content }),
		})
		if (!res.ok) {
			return
		}
		router.push('/')
	}

	return (
		<div className="w-fit mx-auto text-left">
			<form onSubmit={submitPost} className="w-[80vw]">
				<div>
					<label className="block mb-1">Title</label>
					<input
						type="text"
						className="border border-black-1 p-1 mb-8 w-full"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-1">Content</label>
					<textarea
						className="border border-black-1 p-1 mb-4 w-full h-64"
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
				</div>
				<div className="text-center">
					<button
						type="submit"
						className="border border-black-1 mt-4 px-6 py-2 cursor-pointer hover:bg-stone-950 hover:text-slate-50 duration-100">
						Add post
					</button>
				</div>
			</form>
		</div>
	)
}
