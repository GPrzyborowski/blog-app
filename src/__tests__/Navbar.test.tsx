import { render, screen, waitFor } from '@testing-library/react'
import Navbar from '../app/components/Navbar'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		pathname: '/',
	}),
	usePathname: () => '/',
}))

afterEach(() => {
	localStorage.clear()
})

describe('Navbar', () => {
	it('renderuje link do strony głównej', () => {
		render(<Navbar />)
		expect(screen.getByText(/Home/i)).toBeInTheDocument()
	})
	it('renderuje link do logowania', () => {
		render(<Navbar />)
		expect(screen.getByText(/Login/)).toBeInTheDocument()
	})
	it('pokazuje adminowi przycisk tworzenia nowego postu', async () => {
		localStorage.setItem('token', 'testowyToken')
		render(<Navbar />)
		await waitFor(() => {
			expect(screen.getByText(/New post/)).toBeInTheDocument()
		})
	})
})
