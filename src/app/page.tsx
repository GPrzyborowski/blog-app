import { prisma } from '@/lib/prisma'
import Navbar from './components/Navbar'
import PostCard from './components/PostCard'
import Link from 'next/link'

export default async function Home() {
	const posts = await prisma.post.findMany({
		orderBy: { created_at: 'desc' },
		include: {
			author: {
				omit: {
					password: true,
				},
			},
		},
	})

	return (
		<div>
			<Navbar />
			<div className="p-20 grid grid-flow-row grid-cols-4 gap-4 mx-auto items-stretch">
				{posts.map(post => (
					<Link key={post.id} href={`/posts/${post.id}`} prefetch={true} className='h-full'>
						<PostCard
							title={post.title}
							author={post.author.login}
							content={post.content}
							date={new Date(post.created_at).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						/>
					</Link>
          
				))}
			</div>
		</div>
	)
}
