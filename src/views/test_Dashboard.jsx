import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  test('renders the component', () => {
    render(<Dashboard />);
    // Assert that the component renders without throwing an error
    expect(screen.getByText('Stagaires')).toBeInTheDocument();
  });

  test('filters users based on input values', () => {
    render(<Dashboard />);
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('search par nom et prenom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('search par ville'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'admin' } });

    // Assert that the filtered users are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  test('shows and hides the filter inputs', () => {
    render(<Dashboard />);
    // Assert that the filter inputs are initially hidden
    expect(screen.queryByPlaceholderText('search par nom et prenom')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('search par ville')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Role')).not.toBeInTheDocument();

    // Click the "show" button
    fireEvent.click(screen.getByText('show'));

    // Assert that the filter inputs are now visible
    expect(screen.getByPlaceholderText('search par nom et prenom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search par ville')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();

    // Click the "hide" button
    fireEvent.click(screen.getByText('Hide'));

    // Assert that the filter inputs are hidden again
    expect(screen.queryByPlaceholderText('search par nom et prenom')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('search par ville')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Role')).not.toBeInTheDocument();
  });

  test('deletes a user', () => {
    render(<Dashboard />);
    // Mock the window.confirm function
    window.confirm = jest.fn(() => true);

    // Click the "Delete" button for the first user
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Assert that the user was deleted
    expect(screen.getByText('User was successfully deleted')).toBeInTheDocument();
  });
});