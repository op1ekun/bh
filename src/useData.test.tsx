import { renderHook, waitFor } from '@testing-library/react';
import {
    IDataRangeQuery,
    useData
} from './useData';

// ESM mocks
jest.mock('./fetchData', () => {
    return {
        // for some reason the implementation cannot be mocked here,
        // and calling mocked fetchData while testing always returns undefined
        fetchData: jest.fn()
    };
});

jest.mock('./utils/toTimestamp', () => {
    return {
        toTimestamp: jest.fn()
    };
});

jest.mock('react', () => {
    const originalReact = jest.requireActual('react');

    return {
        ...originalReact,
        useState: jest.fn()
    };
});

// no specific type yet, we need to import the mocked function first
let fetchDataSpy: jest.MockedFunction<any>;
let toTimestampSpy: jest.MockedFunction<any>;
let setDataSpy: jest.MockedFunction<any>;

beforeEach(async () => {
    // dynamic imports are required for ESM modules
    const { fetchData } = await import('./fetchData');
    fetchDataSpy = (fetchData as jest.MockedFunction<typeof fetchData>)
        .mockImplementation(() => Promise.resolve([
            {
                open: 1,
                high: 2,
                close: 3,
                low: 4,
                date: 42,
                volume: 1234
            }
        ]));

    const { toTimestamp } = await import('./utils/toTimestamp');
    toTimestampSpy = (toTimestamp as jest.MockedFunction<typeof toTimestamp>)
        .mockImplementation(() => 123);

    setDataSpy = jest.fn();
    const { useState } = await import('react');
    (useState as jest.MockedFunction<typeof useState>)
        .mockImplementation(() => [ undefined, setDataSpy ]);
});

const query: IDataRangeQuery = {
    leftRange: 'dummy/left/range',  
    rightRange: 'dummy/right/range'
};

describe('useData', () => {
    test('calls toTimestamp', async () => {
        const { result } = renderHook(() => useData(query));

        await waitFor(() => {
            expect(toTimestampSpy).toHaveBeenCalledTimes(2);
            expect(toTimestampSpy).toHaveBeenNthCalledWith(1, 'dummy/left/range');
            expect(toTimestampSpy).toHaveBeenNthCalledWith(2, 'dummy/right/range');
        });
    });

    test('calls fetchData', async () => {
        const { result } = renderHook(() => useData(query));

        await waitFor(() => {
            expect(fetchDataSpy).toHaveBeenCalledTimes(1);
            expect(fetchDataSpy).toBeCalledWith(123, 123);
        });
    });

    test('calls setData', async () => {
        const { result } = renderHook(() => useData(query));

        await waitFor(() => {
            expect(setDataSpy).toHaveBeenCalledTimes(1);
            expect(setDataSpy).toHaveBeenCalledWith([
                {
                    open: 1,
                    high: 2,
                    close: 3,
                    low: 4,
                    date: 42,
                    volume: 1234
                }
            ]);
        });        
    });
});