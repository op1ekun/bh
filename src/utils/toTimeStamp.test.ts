import { toTimestamp } from './toTimestamp';

describe('toTimestamp', () => {
    test('return ZERO for an empty string', () => {
        const timestamp = toTimestamp('');
        expect(timestamp).toEqual(0);
    });

    test('converts dd/mm/yyyy to correct timestamp', () => {
        const timestamp = toTimestamp('22/05/1981');
        expect(timestamp).toEqual(new Date(1981, 4, 22).getTime());
    });
});