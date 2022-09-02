import { renderHook } from '@testing-library/react';

import {
    QueryType,
    IDataQuery,
    useData
} from './useData';

describe('useData', () => {
    test('returns data for custom date range', () => {
        const query: IDataQuery = {
            queryString: '01/03/2022-03/03/2022',
            queryType: QueryType.RANGE
        };

        const { result } = renderHook(() => useData(query));

        expect(result.current).toHaveLength(3);
    });
});