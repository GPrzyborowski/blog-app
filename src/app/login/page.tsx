import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'

export default function Login() {
	return (
		<div className="text-center">
			<Navbar />
			<h1 className="text-2xl mb-64">Log in to your account</h1>
			<div className="w-fit mx-auto text-left">
				<LoginForm />
			</div>
		</div>
	)
}
