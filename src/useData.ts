import React from 'react';
import {
    useState,
    useEffect,
} from 'react';
import dataJson from './data/data.json';

export interface IDataItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
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

function toTimestamp(dateString: string): number {
    const [ d, m, y ] = dateString.split('/');
    return new Date(`${m}/${d}/${y}`).getTime();
}

export const useData = (query: IDataQuery) => {
    const [ data, setData ] = useState<Array<IDataItem>>([]);

    useEffect(() => {
        if (query.queryType === QueryType.RANGE) {
            const [ left, right ] =
                query?.queryString?.split('-')
                    .map((border) => {
                        return border && toTimestamp(border)
                    }) || [];
    
            const result: Array<IDataItem> = [];

            Promise.resolve(dataJson)
                .then((responseData) => {
                    dataJson.forEach((item: IDataItem) => {
                        const timestamp = toTimestamp(item.date);

                        if (timestamp >= left && timestamp <= right) {
                            result.push(item);
                        }
                    });

                    setData(result);
                });
        }
    }, [ query, setData ]);

    return data;
};