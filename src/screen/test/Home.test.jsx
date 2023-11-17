import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../test-util/testing-library-utils';
import Home from '../Home';
import axios from 'axios';
import { listProduct } from '../../test-util/mock-data';

jest.mock('axios');
test('home screen init', async () => {
    renderWithProviders(<Home />)
    await waitFor(() => {
        expect(screen.getByText(/Jeanne Halvorson/i)).toBeInTheDocument()
    });
    expect(screen.queryByRole('button', /Buy now/)).toBeDisabled()
    expect(screen.getByText(/Total: 0/)).toBeInTheDocument()

    await waitFor(() => {
        const product = screen.queryAllByLabelText("listProduct");
        expect(product).toHaveLength(0);
    });

    await waitFor(() => {
        const cart = screen.queryAllByLabelText("listCart");
        expect(cart).toHaveLength(0);
    });
})

test('list product', async () => {
    axios.get.mockResolvedValue({ data: { products: listProduct } });
    renderWithProviders(<Home />)

    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products/')

    const product = await screen.findAllByLabelText("listProduct");
    expect(product).toHaveLength(30);

    const addToCartBtn = await screen.findAllByText(/Add to card/i);

    fireEvent.click(addToCartBtn[0])

    fireEvent.click(addToCartBtn[1])

    const cart = await screen.findAllByLabelText("listCart");
    expect(cart).toHaveLength(2);

    const purchaseBtn = screen.queryByRole('button', /Buy now/)

    expect(purchaseBtn).toBeEnabled()

    fireEvent.click(purchaseBtn)

    await waitFor(() => {
        expect(screen.getByText(/Purchase success/i)).toBeInTheDocument();
    });
})

