import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosClient from '../axios-client.js';
import Dashboard from '../Dashboard';
import { useStateContext } from '../context/ContextProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../axios-client.js');
jest.mock('../context/ContextProvider.jsx');

describe('Dashboard', () => {
  it('fetches and displays users', async () => {
    const users = [
      { id: 1, name: 'User 1', role: 'admin', ville: 'City 1' },
      { id: 2, name: 'User 2', role: 'user', ville: 'City 2' },
    ];

    axiosClient.get.mockResolvedValueOnce({ data: { data: users } });
    useStateContext.mockReturnValue({ setNotification: jest.fn() });

    render(<Router><Dashboard /></Router>);

    expect(axiosClient.get).toHaveBeenCalledWith('/users');

    await waitFor(() => screen.getByText('User 1'));

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('deletes a user', async () => {
    const users = [
      { id: 1, name: 'User 1', role: 'admin', ville: 'City 1' },
    ];

    axiosClient.get.mockResolvedValueOnce({ data: { data: users } });
    axiosClient.delete.mockResolvedValueOnce({});
    useStateContext.mockReturnValue({ setNotification: jest.fn() });

    render(<Router><Dashboard /></Router>);

    await waitFor(() => screen.getByText('User 1'));

    fireEvent.click(screen.getByText('Delete'));

    expect(axiosClient.delete).toHaveBeenCalledWith('/users/1');
  });
});