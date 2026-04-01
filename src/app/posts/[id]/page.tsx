import Navbar from '@/app/components/Navbar'
import AdminActions from '@/app/components/AdminActions'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
	const { id } = await params
	const post = await prisma.post.findFirst({
		where: { id: Number(id) },
		select: {
			title: true,
			content: true,
			created_at: true,
			author: {
				select: { login: true },
			},
		},
	})
	if (!post) {
		return notFound()
	}
	return (
		<>
			<Navbar />
			<div className='mt-8 mx-64 text-center'>
				<p className='font-bold'>{post.title}</p>
				<p className='italic'>{post.author.login}</p>
				<p className='text-gray-500'>
					{new Date(post.created_at).toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}
				</p>
                <p className='mt-16 text-justify'>{post.content}</p>
                <AdminActions postId={id} />
			</div>
		</>
	)
}
