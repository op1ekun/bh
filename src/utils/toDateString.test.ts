import { toDateString } from './toDateString';
describe('toDataString', () => {
    test('return an empty string for an empty string', () => {
        const dateString = toDateString('');
        expect(dateString).toEqual('');
    });

    test('converts yyyy-mm-dd to dd/mm/yyyy format', () => {
        const dateString = toDateString('1981-05-22');
        expect(dateString).toEqual('22/05/1981');
    });
});