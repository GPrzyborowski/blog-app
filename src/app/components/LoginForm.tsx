'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const router = useRouter()

	const endpoint = `http://localhost:3000/api/users/login`

	const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const res = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})
		if (!res.ok) {
			setError('Invalid login or password')
			return
		}
		const data = await res.json()
		localStorage.setItem('token', data.token)
		router.push('/')
	}

	return (
		<form onSubmit={submitLogin}>
			<div>
				<label htmlFor="" className="block mb-1">
					Login
				</label>
				<input
					type="text"
					className="border border-black-1 p-1 mb-8"
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="" className="block mb-1">
					Password
				</label>
				<input
					type="password"
					className="border border-black-1 p-1 mb-4"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div className="text-center">
				<button
					type="submit"
					className="border border-black-1 mt-4 px-6 py-2 cursor-pointer hover:bg-stone-950 hover:text-slate-50 duration-100">
					Log in
				</button>
			</div>
			<p className="mt-16 text-red-500 text-center">{error}</p>
		</form>
	)
}
