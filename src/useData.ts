import {
    useState,
    useEffect,
} from 'react';
import { toTimestamp } from './utils/toTimestamp';

import { fetchData, IDataItem } from './fetchData';

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

        fetchData(left, right)
            .then((result) => setData(result));
    }, [ leftRange, rightRange ]);

    return data;
};