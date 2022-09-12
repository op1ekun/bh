import { renderHook, waitFor } from '@testing-library/react';

import {
    IDataRangeQuery,
    useData
} from './useData';

describe('useData', () => {
    test('returns data for custom date range', async () => {
        const query: IDataRangeQuery = {
            leftRange: '01/03/2022',
            rightRange: '03/03/2022'
        };

        const { result } = renderHook(() => useData(query));

        await waitFor(() => {
            expect(result.current).toHaveLength(3);
        });        
    });
});