import { render, screen } from '@testing-library/react'
import EditPost from '@/app/components/EditForm'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		pathname: '/',
	}),
}))

it('renderuje formularz edycji', () => {
	render(<EditPost id="1" title="testowy tytul" content="testowy content postu" />)
	expect(screen.getByText(/Title/i)).toBeInTheDocument()
})
