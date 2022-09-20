import dataJson from './data/data.json';
import { IDataItemResult } from './useData';
import { toTimestamp } from './utils/toTimestamp';

export interface IDataItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export async function fetchData(left: number, right: number): Promise<Array<IDataItemResult>> {
    // always async, simulates fetch request
    const responseData = await Promise.resolve(dataJson);
    return responseData
        .map((item: IDataItem) => ({
            ...item,
            date: toTimestamp(item.date)
        }))
        .filter((item: IDataItemResult) => {
            const timestamp = item.date;

            if (timestamp >= left && timestamp <= right) {
                return true;
            }

            return false;
        });
}