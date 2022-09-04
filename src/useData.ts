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

export enum QueryType {
    'RANGE',
    'YTD',
    '1Y',
    '2Y',
    // '3Y',
    // '6M',
    // '3M',
    // '1M',
    // '5D',
    // '1D'
}

export interface IDataQuery {
    queryString?: string;
    queryType: QueryType;
}

export const useData = (query: IDataQuery) => {
    const [ data, setData ] = useState<Array<IDataItemResult>>([]);

    useEffect(() => {
        if (query.queryType === QueryType.RANGE && query.queryString) {
            const [ left, right ] =
                query.queryString.split('-')
                    .map((border) => {
                        return border && toTimestamp(border)
                    });
    
            // always async, simulates fetch request
            Promise.resolve(dataJson)
                .then((responseData) => {
                    const result: Array<IDataItemResult> = responseData
                        .filter((item: IDataItem) => {
                            const timestamp = toTimestamp(item.date);

                            if (timestamp >= left && timestamp <= right) {
                                return true;
                            }
                        })
                        .map((item: IDataItem) => ({
                            ...item,
                            date: toTimestamp(item.date)
                        }));

                    setData(result);
                });
        }
    }, [ query.queryString, query.queryType ]);

    return data;
};