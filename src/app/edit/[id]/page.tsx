import Navbar from '@/app/components/Navbar'
import EditForm from '@/app/components/EditForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{ id: string }>
}

export default async function NewPost({ params }: Props) {
	const { id } = await params
	const post = await prisma.post.findFirst({
		where: { id: Number(id) },
		select: {
			title: true,
			content: true,
		},
	})
	if (!post) {
		return notFound()
	}
	return (
		<div className="text-center">
			<Navbar />
			<h1 className="text-2xl mb-36">Edit post</h1>
			<EditForm id={id} title={post.title} content={post.content} />
		</div>
	)
}
