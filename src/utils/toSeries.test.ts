import { toSeries } from './toSeries';
import { IDataItemResult } from '../useData';

let data: Array<IDataItemResult> = [];

describe('toSeries', () => {
    beforeEach(() => {
        data = [
            {
                date: 42,
                open: 5,
                high: 7,
                low: 3,
                close: 4,
                volume: 88
            },
            {
                date: 77,
                open: 15,
                high: 17,
                low: 13,
                close: 14,
                volume: 100
            }
        ];
    });

    test('converts ohlc whole data to series', () => {
        const series = toSeries<IDataItemResult>(data, [ 'date', 'open', 'high', 'low', 'close' ]);

        expect(series).toStrictEqual([
            [
                42, 5, 7, 3, 4
            ],
            [
                77, 15, 17, 13, 14
            ]
        ]);
    });

    test('converts ohlc to any series', () => {
        const series = toSeries<IDataItemResult>(data, [ 'open', 'volume', 'date' ]);

        expect(series).toStrictEqual([
            [
                5, 88, 42
            ],
            [
                15, 100, 77
            ]
        ]);
    });
});