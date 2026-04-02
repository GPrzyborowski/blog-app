'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    id: string,
    title: string,
    content: string
}

export default function EditPost({id, title, content}: Props) {

    const [newTitle, setNewTitle] = useState(title)
    const [newContent, setNewContent] = useState(content)

    const router = useRouter()

    const endpoint = `http://localhost:3000/api/posts/${id}`

    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        if(!token) {
            router.push('/login')
            return
        }

        const res = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newTitle, content: newContent }),
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
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Content</label>
                    <textarea
                        className="border border-black-1 p-1 mb-4 w-full h-64"
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="border border-black-1 mt-4 px-6 py-2 cursor-pointer hover:bg-stone-950 hover:text-slate-50 duration-100">
                        Edit post
                    </button>
                </div>
            </form>
        </div>
    )
}
