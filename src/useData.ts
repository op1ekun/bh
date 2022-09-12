import {
    useState,
    useEffect,
} from 'react';
import { toTimestamp } from './utils/toTimestamp';
import dataJson from './data/data.json';

interface IDataItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface IDataItemResult extends Omit<IDataItem, 'date'> {
    date: number;
}

export interface IDataRangeQuery {
    leftRange?: string;
    rightRange?: string;
}

export const useData = (query: IDataRangeQuery): Array<IDataItemResult> => {
    const [ data, setData ] = useState<Array<IDataItemResult>>([]);

    const { 
        leftRange,
        rightRange
    } = query;

    useEffect(() => {
        if (!leftRange || !rightRange) return;

        const left = toTimestamp(leftRange);
        const right = toTimestamp(rightRange);

        // always async, simulates fetch request
        Promise.resolve(dataJson)
            .then((responseData) => {
                const result: Array<IDataItemResult> = responseData
                    .map((item: IDataItem) => ({
                        ...item,
                        date: toTimestamp(item.date)
                    }))
                    .filter((item: IDataItemResult) => {
                        const timestamp = item.date;

                        if (timestamp >= left && timestamp <= right) {
                            return true;
                        }
                    })
                    

                setData(result);
            });
    }, [ query.leftRange, query.rightRange ]);

    return data;
};