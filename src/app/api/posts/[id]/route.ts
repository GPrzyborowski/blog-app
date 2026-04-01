import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	try {
		const post = await prisma.post.findUnique({ where: { id: Number(id) } })
		if (!post) {
			return new Response('Post not found', { status: 404 })
		}
		return Response.json(post)
	} catch {
		return new Response('There was an error while fetching the post', { status: 500 })
	}
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const body = await req.json()
	try {
		const user = getUserFromRequest(req) as { userId: number; login: string }
		const post = await prisma.post.findUnique({ where: { id: Number(id) } })
		if (!post) {
			return new Response('Post not found', { status: 404 })
		}
		const updated = await prisma.post.update({
			where: { id: Number(id) },
			data: {
				title: body.title,
				content: body.content,
			},
		})
		return Response.json(updated)
	} catch {
		return new Response('There was an error while editing the post', { status: 500 })
	}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	try {
		const user = getUserFromRequest(req) as { userId: number; login: string }
		const post = await prisma.post.findUnique({ where: { id: Number(id) } })
		if (!post) {
			return new Response('Post not found', { status: 404 })
		}
		if (user.login !== 'admin') {
			return new Response('Forbidden', { status: 403 })
		}
		await prisma.post.delete({ where: { id: Number(id) } })
		return new Response(null, { status: 204 })
	} catch {
		return new Response('There was an error while deleting the post', { status: 500 })
	}
}
