type Props = {
	title: string
	author: string
	content: string
	date: string
}

export default function PostCard({ title, author, content, date }: Props) {
	return (
		<div className="border border-black-600 px-4 py-2 shadow-lg h-full">
			<p>
				<span className="font-bold">Title:</span> {title}
			</p>
			<p>
				<span className="font-bold">Author:</span> {author}
			</p>
			<p>
				<span className="font-bold">Posted:</span> {date}
			</p>
			<p className="truncate">{content}</p>
		</div>
	)
}
