export function toDateString(dateInput: string): string {
    if (dateInput === '') return dateInput;

    const [ y, m ,d ] = dateInput.split('-');
    return `${d}/${m}/${y}`;
}