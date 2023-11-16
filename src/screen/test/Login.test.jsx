import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-util/testing-library-utils';
import Login from '../Login';
import axios from 'axios';
import userEvent from "@testing-library/user-event";
jest.mock('axios');
test('login failed', async () => {
    renderWithProviders(<Login />)
    axios.get.mockResolvedValueOnce({
        data: [
            { username: 'kminchelle', password: '0lelplR' },
        ],
    });
    const inputUserName = screen.getByLabelText("username")
    const inputPassword = screen.getByLabelText("password")

    fireEvent.change(inputUserName, { target: { value: 'Username' } })
    fireEvent.change(inputPassword, { target: { value: 'Password' } })

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
        expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
})

test('login success', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />)
    axios.get.mockResolvedValueOnce({
        data: [
            { username: 'kminchelle', password: '0lelplR' },
        ],
    });
    const inputUserName = screen.getByLabelText("username")
    const inputPassword = screen.getByLabelText("password")

    fireEvent.change(inputUserName, { target: { value: 'kminchelle' } })
    fireEvent.change(inputPassword, { target: { value: '0lelplR' } })

    // fireEvent.click(screen.getByText(/Login/i));
    await user.click(screen.getByText(/Login/i))
    await waitFor(() => {
        expect(screen.getByText(/Invalid username or password/i)).not.toBeInTheDocument();
    });
})