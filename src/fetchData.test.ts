import { waitFor } from "@testing-library/react";
import { fetchData } from "./fetchData";

jest.mock('./data/data.json', () => {
    return [
        {
            date: '13/12/2020',
            // open: 381,
            // high: 384,
            // low: 371,
            // close: 376,
            // volume: 1834
        },
        {
            date: '24/12/2020',
            // open: 24,
            // high: 25,
            // low: 26,
            // close: 27,
            // volume: 28
        },
        {
            date: '31/12/2020',
            // open: 382,
            // high: 385,
            // low: 372,
            // close: 377,
            // volume: 18345
        }
    ];
});

jest.mock('./utils/toTimestamp', () => {
    return {
        toTimestamp: jest.fn()
    };
});

let toTimestampSpy: jest.MockedFunction<any>;

beforeEach(async () => {
    const { toTimestamp } = await import('./utils/toTimestamp');
    toTimestampSpy = (toTimestamp as jest.MockedFunction<typeof toTimestamp>)
        .mockImplementationOnce(() => 1607814000000)
        .mockImplementationOnce(() => 1608764400000)
        .mockImplementationOnce(() => 1609369200000);
});

describe('fetchData', () => {
    test('Calls toTimestamp', async () => {
        fetchData(1,2);

        await waitFor(() => {
            expect(toTimestampSpy).toHaveBeenCalledTimes(3);
            expect(toTimestampSpy).toHaveBeenNthCalledWith(1, '13/12/2020');
            expect(toTimestampSpy).toHaveBeenNthCalledWith(2, '24/12/2020');
            expect(toTimestampSpy).toHaveBeenNthCalledWith(3, '31/12/2020');
        });
    });

    test('returns correct data for the given range', async () => {
        const result = await fetchData(
            new Date(2020, 11, 1).getTime(),
            new Date(2020, 11, 24).getTime()
        );

        expect(result).toEqual([
            {
                date: 1607814000000
            },
            {
                date: 1608764400000
            }
        ]);
    });
});