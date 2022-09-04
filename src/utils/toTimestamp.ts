export function toTimestamp(dateString: string): number {
    const [ d, m, y ] = dateString.split('/');
    return new Date(`${m}/${d}/${y}`).getTime();
}