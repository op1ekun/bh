import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('renders App in initial state', () => {
        const { getByText } = render(<App />);
        expect(getByText('BH Homework displaying chart for range: ""')).toBeInTheDocument();
    });
});
