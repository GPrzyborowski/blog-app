import Navbar from '../components/Navbar'
import NewPostForm from '../components/NewPostForm'

export default function NewPost() {
	return (
		<div className='text-center'>
			<Navbar />
			<h1 className="text-2xl mb-36">Add new post</h1>
            <NewPostForm />
		</div>
	)
}
