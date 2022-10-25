import React from 'react';
import Highcharts from 'highcharts/highstock';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('renders App in initial state', () => {
        const { getByText } = render(<App />);
        expect(getByText('BH Homework')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        Highcharts.useSerialIds(true);
        const tree = render(<App />);
        expect(tree).toMatchSnapshot();
    });
});
